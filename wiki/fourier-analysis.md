---
title: Fourier Analysis
aliases: [Fourier transform, spectral decomposition, frequency decomposition]
tier: 1
category: physics
tags: [physics, math, foundation]
prerequisites: [sound-waves.md]
related: [sound-waves.md, ear-cochlea.md, timbre.md, digital-audio.md, harmonic-series.md]
scope-boundary: Conceptual understanding of Fourier decomposition only. No FFT algorithms, no windowing, no DSP implementation details.
has_audio: true
---

# Fourier Analysis

Fourier analysis is the mathematical principle that **any complex waveform can be decomposed into a sum of simple sine waves**, each with its own frequency, amplitude, and phase. It is the formal connection between the two representations of sound introduced in [Sound Waves](sound-waves.md): the **waveform** (pressure vs. time) and the **spectrum** (energy vs. frequency). These are not two different things — they are two views of the same physical reality, connected by the Fourier transform.

> 🎯 **Simple version**: Any sound, no matter how complex, is actually a bunch of simple pure tones added together. Fourier analysis is the math that finds those hidden pure tones. Your ear does this naturally — the cochlea physically separates a complex sound into its component frequencies.

## The Core Insight

In 1807, Joseph Fourier proposed a startling claim: any periodic function can be expressed as a sum of sine and cosine functions. The mathematical statement:

```
f(t) = A₀ + A₁ sin(2π f₁ t + φ₁) + A₂ sin(2π f₂ t + φ₂) + A₃ sin(2π f₃ t + φ₃) + ...
```

Or more compactly:

```
f(t) = A₀ + Σ Aₙ sin(2π fₙ t + φₙ)    for n = 1, 2, 3, ...
```

Each term in this sum is a **sinusoidal component** defined by three numbers:
- **fₙ** — its frequency (Hz): how fast it oscillates
- **Aₙ** — its amplitude: how strong it is
- **φₙ** — its phase: where in the cycle it starts

The claim is extraordinary: a jagged sawtooth wave, a clipped square wave, a vocal "ah" sound, a cymbal crash — all are sums of smooth sine waves. Strip the complexity away and you always find sine waves underneath.

## Waveform ↔ Spectrum: The Same Information, Two Views

The **Fourier transform** is the mathematical operation that converts between these two representations:

```
Waveform (time domain)  ←→  Spectrum (frequency domain)
pressure vs. time            amplitude vs. frequency
         ↕
    Fourier Transform
```

This is a lossless, reversible transformation. No information is created or destroyed — the waveform and the spectrum contain **exactly the same information** arranged differently:

| Waveform shows you... | Spectrum shows you... |
|------------------------|----------------------|
| Pressure at each instant | Energy at each frequency |
| Overall shape of the sound | Which sine components are present |
| Timing information directly | Frequency content directly |
| Hard to see component frequencies | Hard to see timing |

Neither view is more "real" than the other. They are related like a map and its legend — different ways of encoding the same territory.

## Building Complex Sounds from Sine Waves

The reverse process — **additive synthesis** — makes the concept tangible. Start with silence and add sine waves one at a time:

### Example: Building a sawtooth wave

A sawtooth wave at fundamental frequency f₁ is the sum:

```
sawtooth(t) = A sin(2π f₁ t)
            + A/2 sin(2π 2f₁ t)
            + A/3 sin(2π 3f₁ t)
            + A/4 sin(2π 4f₁ t)
            + ...
```

Adding each harmonic progressively transforms the shape:

```
1 harmonic:    ~  (pure sine — smooth, flute-like)
2 harmonics:   ~  (slightly richer)
5 harmonics:   ~  (recognizably buzzy)
20 harmonics:  /| (clearly sawtooth-shaped, bright and buzzy)
```

The pattern: the nth harmonic has frequency n × f₁ and amplitude A/n. The spectrum is a descending staircase of peaks at integer multiples of f₁.

### Example: Building a square wave

```
square(t) = A sin(2π f₁ t)
          + A/3 sin(2π 3f₁ t)
          + A/5 sin(2π 5f₁ t)
          + ...
```

Only **odd** harmonics appear (1st, 3rd, 5th, 7th...). This is why a square wave sounds "hollow" compared to a sawtooth — the even harmonics are missing from its recipe.

### Example: A pure sine wave

```
Spectrum: a single peak at f₁, nothing else.
```

A sine wave is the simplest possible sound — one frequency, one amplitude. It is the atom from which all complex sounds are built. A pure sine wave sounds thin, electronic, and "plain" because there is no spectral richness. No acoustic instrument produces a pure sine wave; all have overtones that shape their characteristic [timbre](timbre.md).

## Hear Additive Synthesis

Build complex timbres from sine waves. Each button adds harmonics at integer multiples of 220 Hz (La3), with amplitudes as described in the examples above.

<p><button class="phiz-play-btn" data-fundamental="220" data-harmonics="[1]" onclick="playAdditive(this)">▶ Pure sine (1 harmonic)</button></p>

<p><button class="phiz-play-btn" data-fundamental="220" data-harmonics="[1,0.5,0.33,0.25,0.2,0.167]" onclick="playAdditive(this)">▶ Sawtooth-like (6 harmonics: 1/n amplitudes)</button></p>

<p><button class="phiz-play-btn" data-fundamental="220" data-harmonics="[1,0,0.33,0,0.2,0,0.143]" onclick="playAdditive(this)">▶ Square-like (odd harmonics only)</button></p>

<p><button class="phiz-play-btn" data-fundamental="220" data-harmonics="[1,0.5,0.33,0.25,0.2,0.167,0.143,0.125,0.111,0.1,0.091,0.083,0.077,0.071,0.067,0.063]" onclick="playAdditive(this)">▶ Rich tone (16 harmonics)</button></p>

<div class="phiz-viz-container" id="fa-additive-synth">
  <div class="phiz-viz-title">Additive Synthesis Visualizer — Fundamental: 220 Hz (La3)</div>
  <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
    <canvas id="fa-waveform-canvas" width="400" height="180" style="flex:1 1 48%; min-width:260px;"></canvas>
    <canvas id="fa-spectrum-canvas" width="400" height="180" style="flex:1 1 48%; min-width:260px;"></canvas>
  </div>
  <div class="phiz-viz-controls" id="fa-sliders" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:4px 12px;"></div>
  <div class="phiz-viz-controls" style="margin-top:10px; justify-content:center;">
    <button id="fa-preset-sawtooth">Sawtooth</button>
    <button id="fa-preset-square">Square</button>
    <button id="fa-preset-triangle">Triangle</button>
    <button id="fa-preset-sine">Pure Sine</button>
    <button id="fa-preset-reset">Reset All</button>
    <button id="fa-play-toggle">▶ Play</button>
  </div>
</div>

<script>
window.addEventListener('load', function() {
(function () {
  "use strict";

  var NUM_HARMONICS = 16;
  var FUNDAMENTAL = 220;
  var TWO_PI = 2 * Math.PI;
  var amplitudes = [];
  var sliderEls = [];
  var valueEls = [];
  var synth = null;
  var playing = false;

  // --- Initialize amplitudes ---
  for (var i = 0; i < NUM_HARMONICS; i++) {
    amplitudes[i] = (i === 0) ? 1.0 : 0.0;
  }

  // --- Build slider rows ---
  var slidersContainer = document.getElementById("fa-sliders");
  for (var h = 0; h < NUM_HARMONICS; h++) {
    var row = document.createElement("div");
    row.style.cssText = "display:flex; align-items:center; gap:4px;";

    var label = document.createElement("span");
    label.style.cssText = "color:rgba(255,255,255,0.6); font-size:0.75rem; font-family:monospace; min-width:2.2em; text-align:right;";
    label.textContent = "H" + (h + 1);

    var slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";
    slider.step = "1";
    slider.value = String(Math.round(amplitudes[h] * 100));
    slider.style.cssText = "flex:1; min-width:60px; accent-color:#00e5ff; height:16px;";
    slider.setAttribute("data-harmonic", String(h));

    var valSpan = document.createElement("span");
    valSpan.className = "slider-value";
    valSpan.style.cssText = "color:#00e5ff; font-family:monospace; font-size:0.75rem; min-width:2.8em; text-align:left;";
    valSpan.textContent = amplitudes[h].toFixed(2);

    row.appendChild(label);
    row.appendChild(slider);
    row.appendChild(valSpan);
    slidersContainer.appendChild(row);

    sliderEls[h] = slider;
    valueEls[h] = valSpan;
  }

  // --- Slider change handler ---
  slidersContainer.addEventListener("input", function (e) {
    if (e.target.type !== "range") return;
    var idx = parseInt(e.target.getAttribute("data-harmonic"), 10);
    amplitudes[idx] = parseInt(e.target.value, 10) / 100;
    valueEls[idx].textContent = amplitudes[idx].toFixed(2);
    redraw();
    updateSynthPartials();
  });

  // --- Waveform generator ---
  function generatorFn(t) {
    var sum = 0;
    var maxPossible = 0;
    for (var n = 0; n < NUM_HARMONICS; n++) {
      sum += amplitudes[n] * Math.sin(TWO_PI * FUNDAMENTAL * (n + 1) * t);
      maxPossible += amplitudes[n];
    }
    if (maxPossible === 0) return 0;
    return sum / maxPossible;
  }

  // --- Redraw both canvases ---
  function redraw() {
    var wfCanvas = document.getElementById("fa-waveform-canvas");
    var spCanvas = document.getElementById("fa-spectrum-canvas");
    if (typeof PhizViz !== "undefined") {
      PhizViz.drawWaveform(wfCanvas, generatorFn, { duration: 2 / FUNDAMENTAL, color: "#00e5ff", bg: "#111" });
      PhizViz.drawHarmonicSpectrum(spCanvas, amplitudes, { color: "#00e5ff", bg: "#111" });
    }
  }

  // --- Set sliders from amplitudes array ---
  function syncSliders() {
    for (var i = 0; i < NUM_HARMONICS; i++) {
      sliderEls[i].value = String(Math.round(amplitudes[i] * 100));
      valueEls[i].textContent = amplitudes[i].toFixed(2);
    }
  }

  // --- Synth management ---
  function updateSynthPartials() {
    if (!synth || !playing) return;
    synth.oscillator.partials = amplitudes.slice();
  }

  function createSynth() {
    synth = new Tone.Synth({
      oscillator: { type: "custom", partials: amplitudes.slice() },
      envelope: { attack: 0.05, decay: 0, sustain: 1, release: 0.1 }
    }).toDestination();
  }

  function startPlaying() {
    Tone.start().then(function () {
      if (!synth) createSynth();
      synth.oscillator.partials = amplitudes.slice();
      synth.triggerAttack(FUNDAMENTAL);
      playing = true;
      document.getElementById("fa-play-toggle").textContent = "■ Stop";
      document.getElementById("fa-play-toggle").classList.add("active");
    });
  }

  function stopPlaying() {
    if (synth) {
      synth.triggerRelease();
    }
    playing = false;
    document.getElementById("fa-play-toggle").textContent = "▶ Play";
    document.getElementById("fa-play-toggle").classList.remove("active");
  }

  // --- Play/Stop ---
  document.getElementById("fa-play-toggle").addEventListener("click", function () {
    if (playing) {
      stopPlaying();
    } else {
      startPlaying();
    }
  });

  // --- Preset functions ---
  function applyPreset(fn) {
    for (var i = 0; i < NUM_HARMONICS; i++) {
      amplitudes[i] = fn(i + 1);
    }
    syncSliders();
    redraw();
    updateSynthPartials();
  }

  document.getElementById("fa-preset-sawtooth").addEventListener("click", function () {
    applyPreset(function (n) { return 1 / n; });
  });

  document.getElementById("fa-preset-square").addEventListener("click", function () {
    applyPreset(function (n) { return (n % 2 === 1) ? (1 / n) : 0; });
  });

  document.getElementById("fa-preset-triangle").addEventListener("click", function () {
    applyPreset(function (n) { return (n % 2 === 1) ? (1 / (n * n)) : 0; });
  });

  document.getElementById("fa-preset-sine").addEventListener("click", function () {
    applyPreset(function (n) { return (n === 1) ? 1 : 0; });
  });

  document.getElementById("fa-preset-reset").addEventListener("click", function () {
    applyPreset(function () { return 0; });
  });

  // --- Initial draw ---
  redraw();
})();
});
</script>

### Phasor Animation

Each harmonic is a rotating vector (phasor). The vertical projection of each phasor gives its instantaneous sine value. Add them up and you get the composite waveform:

<div class="phiz-viz-container" id="fp-phasor">
<div class="phiz-viz-title">Phasor Animation</div>
<canvas id="fp-phasor-canvas" height="300" style="width:100%;"></canvas>
<div class="phiz-viz-controls">
<button id="fp-toggle">▶ Start</button>
<button class="fp-harm-btn active" data-h="0">H1</button>
<button class="fp-harm-btn active" data-h="1">H2</button>
<button class="fp-harm-btn active" data-h="2">H3</button>
<button class="fp-harm-btn active" data-h="3">H4</button>
<label>Speed: <input type="range" id="fp-speed" min="1" max="30" step="1" value="10"> <span class="slider-value" id="fp-speed-val">1.0</span></label>
</div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  "use strict";
  var canvas = document.getElementById("fp-phasor-canvas");
  var running = false;
  var animId = null;
  var angle = 0;
  var harmonics = [true, true, true, true];
  var amps = [1, 0.5, 0.33, 0.25];
  var trail = [];
  var TRAIL_LEN = 200;

  function fitCanvas() {
    if (typeof PhizViz !== "undefined" && PhizViz.fitCanvas) return PhizViz.fitCanvas(canvas);
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    return {w: rect.width, h: rect.height, ctx: ctx};
  }

  function draw() {
    var fit = fitCanvas();
    var ctx = fit.ctx;
    var w = fit.w;
    var h = fit.h;
    var speed = document.getElementById("fp-speed").value / 10;
    document.getElementById("fp-speed-val").textContent = speed.toFixed(1);

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    var phasorW = w * 0.45;
    var trailW = w * 0.5;
    var trailX0 = w * 0.48;
    var cy = h / 2;
    var cols = 2;
    var rows = 2;
    var cellW = phasorW / cols;
    var cellH = h / rows;
    var maxR = Math.min(cellW, cellH) * 0.35;

    var sumY = 0;

    for (var i = 0; i < 4; i++) {
      var col = i % cols;
      var row = Math.floor(i / cols);
      var cx = cellW * col + cellW / 2;
      var ccy = cellH * row + cellH / 2;
      var r = maxR * amps[i];
      var n = i + 1;
      var a = angle * n;

      ctx.beginPath();
      ctx.arc(cx, ccy, maxR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#aaa";
      ctx.font = "11px sans-serif";
      ctx.fillText("H" + n, cx - maxR, ccy - maxR - 4);

      if (!harmonics[i]) {
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("OFF", cx, ccy + 4);
        ctx.textAlign = "left";
        continue;
      }

      var dx = Math.cos(a) * r;
      var dy = -Math.sin(a) * r;

      ctx.beginPath();
      ctx.moveTo(cx, ccy);
      ctx.lineTo(cx + dx, ccy + dy);
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx + dx, ccy + dy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#00e5ff";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx + dx, ccy + dy);
      ctx.lineTo(phasorW + 4, ccy + dy);
      ctx.strokeStyle = "rgba(0,229,255,0.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      sumY += -Math.sin(a) * amps[i];
    }

    trail.unshift(sumY);
    if (trail.length > TRAIL_LEN) trail.length = TRAIL_LEN;

    var trailScale = h * 0.35;
    ctx.beginPath();
    for (var t = 0; t < trail.length; t++) {
      var tx = trailX0 + (t / TRAIL_LEN) * trailW;
      var ty = cy + trail[t] * trailScale;
      if (t === 0) ctx.moveTo(tx, ty);
      else ctx.lineTo(tx, ty);
    }
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(trailX0, cy);
    ctx.lineTo(trailX0 + trailW, cy);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();

    var dotY = cy + sumY * trailScale;
    ctx.beginPath();
    ctx.arc(trailX0, dotY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#ff6090";
    ctx.fill();

    if (running) {
      angle += 0.03 * speed;
      animId = requestAnimationFrame(draw);
    }
  }

  document.getElementById("fp-toggle").addEventListener("click", function() {
    running = !running;
    this.textContent = running ? "■ Stop" : "▶ Start";
    if (running) { this.classList.add("active"); draw(); }
    else { this.classList.remove("active"); if (animId) cancelAnimationFrame(animId); }
  });

  var harmBtns = document.querySelectorAll(".fp-harm-btn");
  for (var b = 0; b < harmBtns.length; b++) {
    harmBtns[b].addEventListener("click", function() {
      var idx = parseInt(this.dataset.h);
      harmonics[idx] = !harmonics[idx];
      if (harmonics[idx]) this.classList.add("active");
      else this.classList.remove("active");
      if (!running) draw();
    });
  }

  draw();
})();
});
</script>

## The Cochlea Does This Physically

The mathematical Fourier transform has a biological analog: the **cochlea** (see [The Ear & Cochlea](ear-cochlea.md)).

When a complex sound enters your ear, the basilar membrane doesn't wait for a computer to run the math. Its varying stiffness and width cause different positions to resonate at different frequencies. A complex sound containing frequencies at 200 Hz, 400 Hz, and 600 Hz will excite three distinct regions of the membrane simultaneously — the sound is physically decomposed into its spectral components.

This is not a metaphor. The cochlea performs a genuine frequency decomposition through mechanical resonance. The brain receives the output: an array of ~3,500 frequency channels reporting "how much energy at my frequency right now."

However, the cochlea's frequency resolution is limited by **critical bandwidth** — the physical width of each resonant region on the basilar membrane. Two frequencies closer together than the critical bandwidth (~10-20% of center frequency at musically relevant pitches) excite overlapping regions and cannot be fully separated. They are heard as a single fused tone, possibly with roughness or beating, rather than as two distinct pitches.

This limit means the ear's Fourier analysis is "blurry" compared to a mathematical FFT — it has excellent but not infinite frequency resolution. The blurriness has real musical consequences: it defines the boundary between consonance and dissonance, determines when two notes fuse versus clash, and sets the minimum frequency spacing that sounds "clean" (see [consonance-dissonance.md](consonance-dissonance.md)).

## What the Spectrum Tells You About a Sound

Reading a spectrum gives you direct insight into a sound's character:

| Spectral feature | Perceptual result |
|-----------------|-------------------|
| Single peak | Pure tone (sine wave) — thin, electronic |
| Peaks at f, 2f, 3f, 4f... (integer multiples) | Harmonic tone — clear pitched sound (voice, strings, brass) |
| Peaks at non-integer ratios | Inharmonic tone — metallic or bell-like (see [instrument-physics.md](instrument-physics.md)) |
| Many closely spaced peaks or continuous energy | Noise-like — hiss, wind, cymbal wash |
| Strong low harmonics, weak high ones | Mellow, dark timbre (flute, covered tone) |
| Strong high harmonics | Bright, sharp timbre (trumpet, "nasal" voice) |

The spectrum is the "fingerprint" of a sound's [timbre](timbre.md). Two instruments playing the same pitch at the same loudness sound different because their spectra differ — they have the same fundamental frequency but different harmonic amplitudes.

## Periodic vs. Non-Periodic Sounds

Fourier's original theorem applies to **periodic** signals — sounds that repeat exactly. For periodic sounds, the spectrum consists of discrete peaks (a line spectrum) at the fundamental and its integer harmonics.

Real-world sounds are rarely perfectly periodic. A plucked guitar string decays. A vowel shifts. A drum hit is a brief transient. For such **non-periodic** and **transient** sounds, a generalized version of the Fourier transform produces a **continuous spectrum** — energy spread across a continuous range of frequencies rather than concentrated at discrete peaks.

The conceptual insight remains the same: any sound, periodic or not, can be described as a combination of sine waves at various frequencies, amplitudes, and phases. The mathematics gets more involved (continuous integrals instead of discrete sums), but the principle is identical.

For the purposes of understanding music, the periodic case — discrete harmonics at integer multiples of a fundamental — is the most important, because it describes the sounds of pitched instruments and voices. That harmonic structure is explored in [Harmonic Series](harmonic-series.md).

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Spectrum | Harmonic content, tone color | Western theory acknowledges "tone color" informally; spectrum is the physics |
| Waveform | — | No standard Western theory equivalent |
| Fourier analysis | — | Not part of traditional music theory; used in acoustics and audio engineering |
| Harmonic | Partial, overtone | "Partial" is any component; "harmonic" specifically = integer multiple; "overtone" = any component above the fundamental |
| Additive synthesis | — | Electronic music / synthesis term, not classical theory |

## Connections

- [Sound Waves](sound-waves.md) — introduces the waveform and spectrum representations that Fourier analysis formally connects
- [The Ear & Cochlea](ear-cochlea.md) — the biological frequency analyzer that physically performs Fourier decomposition
- [Harmonic Series](harmonic-series.md) — the specific pattern of frequencies produced by vibrating strings and air columns, analyzed via Fourier
- [Timbre](timbre.md) — how spectral content determines the perceptual "color" of a sound
- [Digital Audio](digital-audio.md) — how computers perform Fourier analysis (sampling, FFT algorithms, practical DSP)

### Suggested References

- [Circles, Sines, and Signals — DFT Introduction](https://jackschaedler.github.io/circles-sines-signals/dft_introduction.html) — Animated phasor chain visualization demonstrating Fourier decomposition
- [Circles, Sines, and Signals — Sine and Cosine](https://jackschaedler.github.io/circles-sines-signals/sincos.html) — Interactive circle-to-sine-wave animation with frequency and amplitude controls
