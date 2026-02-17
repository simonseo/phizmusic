/*
 * PhizMusic visualization helpers — shared Canvas/SVG utilities
 * for interactive widgets across the wiki.
 *
 * Depends on Tone.js (loaded via head.html when has_audio is true).
 */
(function () {
  "use strict";

  /* =========================================================================
   * 1. UTILITY HELPERS
   * ========================================================================= */

  function scale(v, inMin, inMax, outMin, outMax) {
    return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  /** Resize a canvas to match its CSS pixel dimensions (hi-DPI aware). */
  function fitCanvas(canvas) {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w: rect.width, h: rect.height, ctx: ctx };
  }

  /* =========================================================================
   * 2. OSCILLOSCOPE  (time-domain waveform renderer)
   * ========================================================================= */

  /**
   * Create a live oscilloscope on a <canvas>.
   *
   * Usage:
   *   var scope = PhizViz.oscilloscope(canvasEl, { color: '#0f0' });
   *   // connect a Tone.js source:
   *   scope.connect(synth);
   *   scope.start();
   *   // later:
   *   scope.stop();
   *   scope.dispose();
   */
  function createOscilloscope(canvas, opts) {
    opts = opts || {};
    var lineColor = opts.color || "#00e5ff";
    var bgColor = opts.bg || "#111";
    var lineWidth = opts.lineWidth || 2;
    var size = opts.size || 1024;

    var waveform = new Tone.Waveform(size);
    var rafId = null;
    var running = false;

    function draw() {
      if (!running) return;
      rafId = requestAnimationFrame(draw);

      var info = fitCanvas(canvas);
      var ctx = info.ctx;
      var w = info.w;
      var h = info.h;
      var values = waveform.getValue();

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      // center line
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // waveform
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = "round";
      ctx.beginPath();
      var sliceW = w / values.length;
      for (var i = 0; i < values.length; i++) {
        var y = (1 - (values[i] + 1) / 2) * h;
        if (i === 0) ctx.moveTo(0, y);
        else ctx.lineTo(i * sliceW, y);
      }
      ctx.stroke();
    }

    return {
      /** Connect a Tone.js audio node so its signal feeds the waveform analyser. */
      connect: function (node) {
        node.connect(waveform);
      },
      start: function () {
        if (running) return;
        running = true;
        draw();
      },
      stop: function () {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      },
      dispose: function () {
        this.stop();
        waveform.dispose();
      },
      analyser: waveform,
    };
  }

  /* =========================================================================
   * 3. SPECTRUM BARS  (frequency-domain bar chart)
   * ========================================================================= */

  function createSpectrum(canvas, opts) {
    opts = opts || {};
    var barColor = opts.color || "#ff6f00";
    var bgColor = opts.bg || "#111";
    var fftSize = opts.size || 256;
    var maxFreq = opts.maxFreq || 4000; // only draw up to this Hz

    var fft = new Tone.FFT(fftSize);
    fft.normalRange = true; // 0-1 values instead of dB
    var rafId = null;
    var running = false;

    function draw() {
      if (!running) return;
      rafId = requestAnimationFrame(draw);

      var info = fitCanvas(canvas);
      var ctx = info.ctx;
      var w = info.w;
      var h = info.h;
      var values = fft.getValue();

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      // How many bins cover 0..maxFreq?
      var sampleRate = Tone.getContext().sampleRate || 44100;
      var binHz = sampleRate / (fftSize * 2);
      var maxBin = Math.min(Math.ceil(maxFreq / binHz), values.length);

      var barW = w / maxBin;
      for (var i = 0; i < maxBin; i++) {
        var val = clamp(values[i], 0, 1);
        var barH = val * h;
        // gradient from barColor to a lighter shade based on frequency
        var hue = scale(i, 0, maxBin, 20, 60);
        ctx.fillStyle = "hsl(" + hue + ",100%," + (40 + val * 30) + "%)";
        ctx.fillRect(i * barW, h - barH, Math.max(barW - 1, 1), barH);
      }

      // axis label
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "10px PT Sans, sans-serif";
      ctx.fillText("0 Hz", 2, h - 4);
      ctx.fillText(maxFreq + " Hz", w - 46, h - 4);
    }

    return {
      connect: function (node) {
        node.connect(fft);
      },
      start: function () {
        if (running) return;
        running = true;
        draw();
      },
      stop: function () {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      },
      dispose: function () {
        this.stop();
        fft.dispose();
      },
      analyser: fft,
    };
  }

  /* =========================================================================
   * 4. STATIC WAVEFORM DRAWER  (draw a frozen waveform from a function)
   * ========================================================================= */

  /**
   * Draw a static waveform on canvas from a generator function.
   *   PhizViz.drawWaveform(canvas, function(t) { return Math.sin(2*Math.PI*freq*t); }, { duration: 0.01 });
   */
  function drawWaveform(canvas, generatorFn, opts) {
    opts = opts || {};
    var color = opts.color || "#00e5ff";
    var bg = opts.bg || "#111";
    var duration = opts.duration || 0.01;
    var lineWidth = opts.lineWidth || 2;

    var info = fitCanvas(canvas);
    var ctx = info.ctx;
    var w = info.w;
    var h = info.h;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // center line
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // waveform
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.beginPath();
    var numSamples = Math.round(w * 2);
    for (var i = 0; i < numSamples; i++) {
      var t = (i / numSamples) * duration;
      var v = generatorFn(t);
      var x = (i / numSamples) * w;
      var y = (1 - (v + 1) / 2) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  /* =========================================================================
   * 5. STANDING WAVE ANIMATION
   * ========================================================================= */

  /**
   * Animate standing wave modes on a canvas.
   *   var sw = PhizViz.standingWave(canvas, { modes: [1,2,3], colors: [...] });
   *   sw.start();
   *   sw.setModes([1,3,5]);
   */
  function createStandingWave(canvas, opts) {
    opts = opts || {};
    var modes = opts.modes || [1];
    var amplitude = opts.amplitude || 0.35; // fraction of canvas height
    var colors = opts.colors || [
      "#00e5ff",
      "#ff6f00",
      "#76ff03",
      "#e040fb",
      "#ffea00",
      "#ff1744",
      "#00bfa5",
      "#d500f9",
    ];
    var bgColor = opts.bg || "#111";
    var showNodes = opts.showNodes !== false;
    var speed = opts.speed || 1;

    var rafId = null;
    var running = false;
    var startTime = 0;

    function draw() {
      if (!running) return;
      rafId = requestAnimationFrame(draw);

      var info = fitCanvas(canvas);
      var ctx = info.ctx;
      var w = info.w;
      var h = info.h;
      var t = (performance.now() - startTime) / 1000;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      // fixed end markers
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillRect(0, 0, 3, h);
      ctx.fillRect(w - 3, 0, 3, h);

      // draw each mode
      for (var m = 0; m < modes.length; m++) {
        var n = modes[m];
        var col = colors[m % colors.length];
        var amp = (amplitude * h) / (modes.length > 1 ? modes.length * 0.6 : 1);

        ctx.strokeStyle = col;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (var i = 0; i <= w; i++) {
          var xNorm = i / w;
          // standing wave: sin(nπx) * cos(ωt)
          var y =
            h / 2 +
            amp * Math.sin(n * Math.PI * xNorm) * Math.cos(2 * Math.PI * speed * n * t);
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
        ctx.stroke();

        // draw nodes if single mode
        if (showNodes && modes.length === 1) {
          ctx.fillStyle = col;
          for (var k = 0; k <= n; k++) {
            var nx = (k / n) * w;
            ctx.beginPath();
            ctx.arc(nx, h / 2, 4, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }
    }

    return {
      start: function () {
        if (running) return;
        running = true;
        startTime = performance.now();
        draw();
      },
      stop: function () {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
      },
      setModes: function (newModes) {
        modes = newModes;
      },
      dispose: function () {
        this.stop();
      },
    };
  }

  /* =========================================================================
   * 6. PHASOR → SINE  (rotating vector → sine trace)
   * ========================================================================= */

  function createPhasor(canvas, opts) {
    opts = opts || {};
    var radius = opts.radius || 60;
    var freq = opts.freq || 2; // rotations per second
    var circleColor = opts.circleColor || "rgba(255,255,255,0.15)";
    var vectorColor = opts.vectorColor || "#ff6f00";
    var traceColor = opts.traceColor || "#00e5ff";
    var bgColor = opts.bg || "#111";
    var speed = opts.speed || 1;

    var rafId = null;
    var running = false;
    var startTime = 0;
    var history = [];
    var maxHistory = 300;

    function draw() {
      if (!running) return;
      rafId = requestAnimationFrame(draw);

      var info = fitCanvas(canvas);
      var ctx = info.ctx;
      var w = info.w;
      var h = info.h;
      var t = (performance.now() - startTime) / 1000;
      var angle = 2 * Math.PI * freq * speed * t;

      var cx = radius + 30;
      var cy = h / 2;
      var tipX = cx + radius * Math.cos(angle);
      var tipY = cy - radius * Math.sin(angle);

      // sine value for history
      history.push(tipY);
      if (history.length > maxHistory) history.shift();

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      // circle
      ctx.strokeStyle = circleColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // vector
      ctx.strokeStyle = vectorColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      // dot at tip
      ctx.fillStyle = vectorColor;
      ctx.beginPath();
      ctx.arc(tipX, tipY, 4, 0, 2 * Math.PI);
      ctx.fill();

      // connector line from tip to trace
      var traceStartX = cx + radius + 40;
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(traceStartX, tipY);
      ctx.stroke();
      ctx.setLineDash([]);

      // sine trace
      ctx.strokeStyle = traceColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      var traceW = w - traceStartX - 10;
      for (var i = 0; i < history.length; i++) {
        var x = traceStartX + (i / maxHistory) * traceW;
        var y = history[history.length - 1 - i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    return {
      start: function () {
        if (running) return;
        running = true;
        startTime = performance.now();
        history = [];
        draw();
      },
      stop: function () {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
      },
      setFreq: function (f) {
        freq = f;
      },
      dispose: function () {
        this.stop();
      },
    };
  }

  /* =========================================================================
   * 7. DISSONANCE CURVE (Sethares / Plomp-Levelt)
   * ========================================================================= */

  /**
   * Pure-tone dissonance between two frequencies with given loudnesses.
   * Based on Plomp-Levelt (1965) / Sethares (1993).
   */
  function plompLeveltDissonance(f1, f2, l1, l2) {
    var D_STAR = 0.24;
    var S1 = 0.0207;
    var S2 = 18.96;
    var B1 = 3.51;
    var B2 = 5.75;

    var fmin = Math.min(f1, f2);
    var fmax = Math.max(f1, f2);
    var s = D_STAR / (S1 * fmin + S2);
    var p = s * (fmax - fmin);
    var lmin = Math.min(l1, l2);

    return lmin * (Math.exp(-B1 * p) - Math.exp(-B2 * p));
  }

  /** Convert linear amplitude to loudness (sones approximation). */
  function ampToLoudness(amp) {
    if (amp <= 0) return 0;
    var dB = 20 * Math.log10(amp);
    return Math.pow(2, dB / 10) / 16;
  }

  /**
   * Compute a dissonance curve from unison to octave for a given spectrum.
   *
   * @param {Object} spectrum  { freq: [1, 2, 3, ...], amp: [1, 0.5, 0.33, ...] }
   * @param {number} refFreq   base frequency in Hz
   * @param {number} maxRatio   sweep to this ratio (default 2.1)
   * @param {number} steps      number of points (default 400)
   * @returns {Object} { ratios: Float64Array, dissonance: Float64Array }
   */
  function computeDissonanceCurve(spectrum, refFreq, maxRatio, steps) {
    maxRatio = maxRatio || 2.1;
    steps = steps || 400;

    var freqs = spectrum.freq;
    var amps = spectrum.amp;
    var n = freqs.length;
    var loudness = amps.map(ampToLoudness);

    var ratios = new Float64Array(steps);
    var diss = new Float64Array(steps);
    var maxDiss = 0;

    for (var s = 0; s < steps; s++) {
      var c = 1 + (s / (steps - 1)) * (maxRatio - 1);
      ratios[s] = c;
      var total = 0;

      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          var f1 = refFreq * freqs[i];
          var f2 = refFreq * freqs[j];
          var l1 = loudness[i];
          var l2 = loudness[j];
          total +=
            0.5 * plompLeveltDissonance(f1, f2, l1, l2) +
            0.5 * plompLeveltDissonance(c * f1, c * f2, l1, l2) +
            plompLeveltDissonance(f1, c * f2, l1, l2);
        }
      }
      total /= 2;
      diss[s] = total;
      if (total > maxDiss) maxDiss = total;
    }

    // normalise
    if (maxDiss > 0) {
      for (var k = 0; k < steps; k++) {
        diss[k] /= maxDiss;
      }
    }

    return { ratios: ratios, dissonance: diss };
  }

  /**
   * Draw a dissonance curve on a canvas.
   * Marks notable intervals with vertical dashed lines.
   */
  function drawDissonanceCurve(canvas, curveData, opts) {
    opts = opts || {};
    var lineColor = opts.color || "#ff6f00";
    var bg = opts.bg || "#111";
    var labelColor = opts.labelColor || "rgba(255,255,255,0.5)";
    var showIntervals = opts.showIntervals !== false;

    var info = fitCanvas(canvas);
    var ctx = info.ctx;
    var w = info.w;
    var h = info.h;
    var pad = { top: 20, right: 15, bottom: 35, left: 50 };
    var gw = w - pad.left - pad.right;
    var gh = h - pad.top - pad.bottom;

    var ratios = curveData.ratios;
    var diss = curveData.dissonance;
    var minR = ratios[0];
    var maxR = ratios[ratios.length - 1];

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // axes
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, pad.top + gh);
    ctx.lineTo(pad.left + gw, pad.top + gh);
    ctx.stroke();

    // notable intervals as step-distances
    if (showIntervals) {
      var intervals = [
        { r: 1, label: "0" },
        { r: Math.pow(2, 1 / 12), label: "1" },
        { r: Math.pow(2, 3 / 12), label: "3" },
        { r: Math.pow(2, 4 / 12), label: "4" },
        { r: Math.pow(2, 5 / 12), label: "5" },
        { r: Math.pow(2, 7 / 12), label: "7" },
        { r: Math.pow(2, 9 / 12), label: "9" },
        { r: 2, label: "12" },
      ];
      ctx.font = "10px PT Sans, sans-serif";
      ctx.textAlign = "center";
      for (var iv = 0; iv < intervals.length; iv++) {
        var ix = pad.left + ((intervals[iv].r - minR) / (maxR - minR)) * gw;
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(ix, pad.top);
        ctx.lineTo(ix, pad.top + gh);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = labelColor;
        ctx.fillText(intervals[iv].label, ix, pad.top + gh + 14);
      }
      ctx.fillStyle = labelColor;
      ctx.textAlign = "center";
      ctx.fillText("Step-distance", pad.left + gw / 2, pad.top + gh + 30);
    }

    // y-axis label
    ctx.save();
    ctx.fillStyle = labelColor;
    ctx.font = "10px PT Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.translate(12, pad.top + gh / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Dissonance", 0, 0);
    ctx.restore();

    // curve
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (var ci = 0; ci < ratios.length; ci++) {
      var cx = pad.left + ((ratios[ci] - minR) / (maxR - minR)) * gw;
      var cy = pad.top + gh - diss[ci] * gh;
      if (ci === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }

  /* =========================================================================
   * 8. HARMONIC SPECTRUM DISPLAY  (bar chart of harmonics)
   * ========================================================================= */

  /**
   * Draw a static harmonic spectrum (bar chart).
   * @param {HTMLCanvasElement} canvas
   * @param {number[]} amplitudes  array of harmonic amplitudes (index 0 = harmonic 1)
   * @param {Object} opts
   */
  function drawHarmonicSpectrum(canvas, amplitudes, opts) {
    opts = opts || {};
    var barColor = opts.color || "#00e5ff";
    var bg = opts.bg || "#111";
    var labelColor = opts.labelColor || "rgba(255,255,255,0.5)";

    var info = fitCanvas(canvas);
    var ctx = info.ctx;
    var w = info.w;
    var h = info.h;
    var pad = { top: 10, right: 10, bottom: 25, left: 10 };
    var gw = w - pad.left - pad.right;
    var gh = h - pad.top - pad.bottom;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    var n = amplitudes.length;
    var barW = gw / n;
    var maxAmp = Math.max.apply(null, amplitudes) || 1;

    for (var i = 0; i < n; i++) {
      var val = amplitudes[i] / maxAmp;
      var barH = val * gh;
      ctx.fillStyle = barColor;
      ctx.fillRect(
        pad.left + i * barW + 1,
        pad.top + gh - barH,
        Math.max(barW - 2, 2),
        barH
      );
    }

    // labels
    ctx.fillStyle = labelColor;
    ctx.font = "9px PT Sans, sans-serif";
    ctx.textAlign = "center";
    for (var j = 0; j < n; j++) {
      if (n <= 16 || j % 2 === 0) {
        ctx.fillText(
          String(j + 1),
          pad.left + j * barW + barW / 2,
          pad.top + gh + 14
        );
      }
    }
  }

  /* =========================================================================
   * 9. PIANO KEYBOARD  (SVG-based clickable keyboard)
   * ========================================================================= */

  /**
   * Create an SVG piano keyboard inside a container element.
   * @param {HTMLElement} container
   * @param {Object} opts
   * @returns {Object} { highlight(stepNumbers), clearHighlight(), onKeyClick(fn) }
   */
  function createPianoKeyboard(container, opts) {
    opts = opts || {};
    var startOctave = opts.startOctave || 3;
    var numOctaves = opts.numOctaves || 2;
    var whiteKeyW = opts.whiteKeyWidth || 28;
    var whiteKeyH = opts.whiteKeyHeight || 100;
    var blackKeyW = opts.blackKeyWidth || 18;
    var blackKeyH = opts.blackKeyHeight || 65;

    // 0-indexed step within octave → is black key?
    var isBlack = [false, true, false, true, false, false, true, false, true, false, true, false];
    // white key index within the octave for each step
    var whiteIndex = [0, -1, 1, -1, 2, 3, -1, 4, -1, 5, -1, 6];
    // black key offset (fraction of white key width from left edge)
    var blackOffset = [-1, 0.65, -1, 1.65, -1, -1, 3.65, -1, 4.65, -1, 5.65, -1];

    var totalWhites = numOctaves * 7;
    var svgW = totalWhites * whiteKeyW;
    var svgH = whiteKeyH;

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 " + svgW + " " + svgH);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", svgH);
    svg.style.maxWidth = svgW + "px";
    svg.style.display = "block";
    svg.style.margin = "0 auto";

    var keyElements = {};
    var clickCb = null;

    // draw white keys first
    for (var oct = 0; oct < numOctaves; oct++) {
      for (var step = 0; step < 12; step++) {
        if (isBlack[step]) continue;
        var wi = whiteIndex[step] + oct * 7;
        var x = wi * whiteKeyW;
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", 0);
        rect.setAttribute("width", whiteKeyW - 1);
        rect.setAttribute("height", whiteKeyH);
        rect.setAttribute("fill", "#fff");
        rect.setAttribute("stroke", "#999");
        rect.setAttribute("stroke-width", "1");
        rect.setAttribute("data-step", step);
        rect.setAttribute("data-octave", startOctave + oct);
        rect.setAttribute("rx", "2");
        rect.style.cursor = "pointer";
        (function (s, o) {
          rect.addEventListener("click", function () {
            if (clickCb) clickCb(s, o);
          });
        })(step, startOctave + oct);
        svg.appendChild(rect);
        keyElements[step + (startOctave + oct) * 12] = rect;
      }
    }

    // draw black keys on top
    for (var oct2 = 0; oct2 < numOctaves; oct2++) {
      for (var step2 = 0; step2 < 12; step2++) {
        if (!isBlack[step2]) continue;
        var bx = (blackOffset[step2] + oct2 * 7) * whiteKeyW + (whiteKeyW - blackKeyW) / 2;
        var brect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        brect.setAttribute("x", bx);
        brect.setAttribute("y", 0);
        brect.setAttribute("width", blackKeyW);
        brect.setAttribute("height", blackKeyH);
        brect.setAttribute("fill", "#222");
        brect.setAttribute("stroke", "#000");
        brect.setAttribute("stroke-width", "1");
        brect.setAttribute("data-step", step2);
        brect.setAttribute("data-octave", startOctave + oct2);
        brect.setAttribute("rx", "1");
        brect.style.cursor = "pointer";
        (function (s, o) {
          brect.addEventListener("click", function () {
            if (clickCb) clickCb(s, o);
          });
        })(step2, startOctave + oct2);
        svg.appendChild(brect);
        keyElements[step2 + (startOctave + oct2) * 12] = brect;
      }
    }

    container.appendChild(svg);

    return {
      highlight: function (stepNumbers, color) {
        color = color || "#00e5ff";
        for (var si = 0; si < stepNumbers.length; si++) {
          var key = keyElements[stepNumbers[si]];
          if (key) key.setAttribute("fill", color);
        }
      },
      clearHighlight: function () {
        Object.keys(keyElements).forEach(function (k) {
          var el = keyElements[k];
          var step = parseInt(el.getAttribute("data-step"), 10);
          el.setAttribute("fill", isBlack[step] ? "#222" : "#fff");
        });
      },
      onKeyClick: function (fn) {
        clickCb = fn;
      },
      svg: svg,
    };
  }

  /* =========================================================================
   * 10. ADSR ENVELOPE VISUALIZER
   * ========================================================================= */

  function drawADSR(canvas, envelope, opts) {
    opts = opts || {};
    var color = opts.color || "#76ff03";
    var bg = opts.bg || "#111";
    var labelColor = opts.labelColor || "rgba(255,255,255,0.5)";

    var a = envelope.attack || 0.01;
    var d = envelope.decay || 0.2;
    var s = envelope.sustain || 0.5;
    var r = envelope.release || 0.5;
    var hold = opts.hold || 0.5;

    var totalTime = a + d + hold + r;

    var info = fitCanvas(canvas);
    var ctx = info.ctx;
    var w = info.w;
    var h = info.h;
    var pad = { top: 15, right: 15, bottom: 30, left: 15 };
    var gw = w - pad.left - pad.right;
    var gh = h - pad.top - pad.bottom;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // time → x
    function tx(t) {
      return pad.left + (t / totalTime) * gw;
    }
    // amplitude → y
    function ay(amp) {
      return pad.top + (1 - amp) * gh;
    }

    // envelope path
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(tx(0), ay(0));
    ctx.lineTo(tx(a), ay(1)); // attack
    ctx.lineTo(tx(a + d), ay(s)); // decay
    ctx.lineTo(tx(a + d + hold), ay(s)); // sustain hold
    ctx.lineTo(tx(totalTime), ay(0)); // release
    ctx.stroke();

    // labels
    ctx.fillStyle = labelColor;
    ctx.font = "10px PT Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("A", tx(a / 2), ay(0) + 14);
    ctx.fillText("D", tx(a + d / 2), ay(0) + 14);
    ctx.fillText("S", tx(a + d + hold / 2), ay(0) + 14);
    ctx.fillText("R", tx(a + d + hold + r / 2), ay(0) + 14);
  }

  /* =========================================================================
   * 11. STEP-7 CYCLE (modular arithmetic circle)
   * ========================================================================= */

  /**
   * Draw a step-7 cycle (circle of step-distances by 7, mod 12).
   * @param {HTMLCanvasElement} canvas
   * @param {Object} opts
   */
  function drawStep7Cycle(canvas, opts) {
    opts = opts || {};
    var bg = opts.bg || "#111";
    var circleColor = opts.circleColor || "rgba(255,255,255,0.15)";
    var nodeColor = opts.nodeColor || "#00e5ff";
    var lineColor = opts.lineColor || "rgba(0,229,255,0.4)";
    var textColor = opts.textColor || "#fff";
    var highlightSteps = opts.highlight || [];
    var highlightColor = opts.highlightColor || "#ff6f00";
    var showArrows = opts.showArrows !== false;

    var dodeka = ["Do", "Ka", "Re", "Xo", "Mi", "Fa", "Hu", "So", "Bi", "La", "Ve", "Si"];
    // step-7 order: 0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5
    var order = [];
    for (var i = 0; i < 12; i++) {
      order.push((i * 7) % 12);
    }

    var info = fitCanvas(canvas);
    var ctx = info.ctx;
    var w = info.w;
    var h = info.h;
    var cx = w / 2;
    var cy = h / 2;
    var R = Math.min(w, h) / 2 - 35;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // outer circle
    ctx.strokeStyle = circleColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 2 * Math.PI);
    ctx.stroke();

    // positions (clockwise from top)
    var positions = [];
    for (var j = 0; j < 12; j++) {
      var angle = -Math.PI / 2 + (j * 2 * Math.PI) / 12;
      positions.push({
        x: cx + R * Math.cos(angle),
        y: cy + R * Math.sin(angle),
        step: order[j],
      });
    }

    // connecting arrows (step-7 path)
    if (showArrows) {
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.5;
      for (var k = 0; k < 11; k++) {
        ctx.beginPath();
        ctx.moveTo(positions[k].x, positions[k].y);
        ctx.lineTo(positions[k + 1].x, positions[k + 1].y);
        ctx.stroke();
      }
    }

    // nodes
    for (var m = 0; m < 12; m++) {
      var pos = positions[m];
      var step = pos.step;
      var isHighlighted = highlightSteps.indexOf(step) !== -1;

      // node circle
      ctx.fillStyle = isHighlighted ? highlightColor : nodeColor;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 16, 0, 2 * Math.PI);
      ctx.fill();

      // step number
      ctx.fillStyle = isHighlighted ? "#fff" : "#111";
      ctx.font = "bold 11px PT Sans, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(step), pos.x, pos.y);

      // dodeka syllable (outside circle)
      var labelAngle = -Math.PI / 2 + (m * 2 * Math.PI) / 12;
      var lx = cx + (R + 25) * Math.cos(labelAngle);
      var ly = cy + (R + 25) * Math.sin(labelAngle);
      ctx.fillStyle = textColor;
      ctx.font = "10px PT Sans, sans-serif";
      ctx.fillText(dodeka[step], lx, ly);
    }

    // center label
    ctx.fillStyle = textColor;
    ctx.font = "bold 12px PT Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Step-7 Cycle", cx, cy - 8);
    ctx.font = "10px PT Sans, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText("(n × 7) mod 12", cx, cy + 8);
  }

  /* =========================================================================
   * EXPORTS
   * ========================================================================= */

  window.PhizViz = {
    // utilities
    scale: scale,
    clamp: clamp,
    fitCanvas: fitCanvas,

    // live audio visualizers
    oscilloscope: createOscilloscope,
    spectrum: createSpectrum,

    // static drawing
    drawWaveform: drawWaveform,
    drawHarmonicSpectrum: drawHarmonicSpectrum,
    drawDissonanceCurve: drawDissonanceCurve,
    drawADSR: drawADSR,
    drawStep7Cycle: drawStep7Cycle,

    // animations
    standingWave: createStandingWave,
    phasor: createPhasor,

    // piano keyboard
    pianoKeyboard: createPianoKeyboard,

    // computation
    plompLeveltDissonance: plompLeveltDissonance,
    ampToLoudness: ampToLoudness,
    computeDissonanceCurve: computeDissonanceCurve,
  };
})();
