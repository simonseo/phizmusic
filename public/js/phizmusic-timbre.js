/*
 * PhizMusic Timbre Designer — reusable spectrum editor widget.
 *
 * Creates an interactive UI for editing frequency ratios and amplitudes
 * of partials, with preset archetypes and additive-synthesis playback.
 *
 * Usage:
 *   var td = PhizTimbre.create("container-id", {
 *     numSlots: 8,
 *     fundamental: 220,
 *     preset: "string",
 *     collapsed: false,
 *     onChange: function(spectrum) { ... }
 *   });
 *
 * API:
 *   td.getSpectrum()       -> { freq: [...], amp: [...] }
 *   td.setPreset(name)
 *   td.setFundamental(hz)
 *   td.destroy()
 *
 * Requires: Tone.js (for playback only — editing works without it).
 * All code is ES5 compatible. No let/const/arrow/template literals.
 */
(function () {
  "use strict";

  /* ── Presets ────────────────────────────────────────────────── */

  var PRESETS = {
    string: {
      label: "String",
      desc: "All integer harmonics with 1/n roll-off. Strongly harmonic — excellent pitch salience.",
      generate: function (n) {
        var ratios = [], amps = [];
        for (var i = 1; i <= n; i++) { ratios.push(i); amps.push(1 / i); }
        return { ratios: ratios, amps: amps };
      }
    },
    flute: {
      label: "Flute",
      desc: "All integer harmonics with fast 1/n\u00B2 roll-off. Bright fundamental, gentle upper partials.",
      generate: function (n) {
        var ratios = [], amps = [];
        for (var i = 1; i <= n; i++) { ratios.push(i); amps.push(2 / (i * i)); }
        return { ratios: ratios, amps: amps };
      }
    },
    clarinet: {
      label: "Clarinet",
      desc: "Odd harmonics only (1f, 3f, 5f...) with 1/n roll-off. Hollow, woody character.",
      generate: function (n) {
        var ratios = [], amps = [];
        for (var i = 1; i <= n; i++) {
          var h = 2 * i - 1;
          ratios.push(h);
          amps.push(1 / h);
        }
        return { ratios: ratios, amps: amps };
      }
    },
    membrane: {
      label: "Membrane",
      desc: "Inharmonic partials at Bessel-function zeros. Drum-like — weak pitch, strong texture.",
      generate: function (n) {
        var besselAll = [1.00, 1.59, 2.14, 2.30, 2.65, 2.92, 3.16, 3.50, 3.60, 3.89, 4.06, 4.24];
        var ratios = [], amps = [];
        for (var i = 0; i < Math.min(n, besselAll.length); i++) {
          ratios.push(besselAll[i]);
          amps.push(1 / (1 + i * 0.4));
        }
        return { ratios: ratios, amps: amps };
      }
    },
    sine: {
      label: "Sine",
      desc: "Pure sine wave — single partial, no overtones.",
      generate: function (n) {
        var ratios = [1], amps = [1];
        for (var i = 1; i < n; i++) { ratios.push(i + 1); amps.push(0); }
        return { ratios: ratios, amps: amps };
      }
    },
    square: {
      label: "Square",
      desc: "Odd harmonics with 1/n amplitude. Equivalent to clarinet but labeled as waveform.",
      generate: function (n) {
        var ratios = [], amps = [];
        for (var i = 1; i <= n; i++) {
          var h = 2 * i - 1;
          ratios.push(h);
          amps.push(1 / h);
        }
        return { ratios: ratios, amps: amps };
      }
    },
    sawtooth: {
      label: "Sawtooth",
      desc: "All integer harmonics with 1/n amplitude. Bright, buzzy timbre.",
      generate: function (n) {
        var ratios = [], amps = [];
        for (var i = 1; i <= n; i++) { ratios.push(i); amps.push(1 / i); }
        return { ratios: ratios, amps: amps };
      }
    },
    equal: {
      label: "Equal Amp",
      desc: "All integer harmonics at equal amplitude. Unnatural but useful for analysis.",
      generate: function (n) {
        var ratios = [], amps = [];
        for (var i = 1; i <= n; i++) { ratios.push(i); amps.push(1); }
        return { ratios: ratios, amps: amps };
      }
    },
    stretched: {
      label: "Stretched",
      desc: "Inharmonic partials with \u03B2 > 0. Piano-like stretching: f_n = n \u00D7 (1 + \u03B2\u00D7n).",
      beta: 0.005,
      generate: function (n, beta) {
        var b = (beta !== undefined) ? beta : 0.005;
        var ratios = [], amps = [];
        for (var i = 1; i <= n; i++) {
          ratios.push(+(i * (1 + b * i)).toFixed(3));
          amps.push(1 / i);
        }
        return { ratios: ratios, amps: amps };
      }
    },
    compressed: {
      label: "Compressed",
      desc: "Inharmonic partials with \u03B2 < 0. Frequencies converge — metallic character.",
      beta: -0.003,
      generate: function (n, beta) {
        var b = (beta !== undefined) ? beta : -0.003;
        var ratios = [], amps = [];
        for (var i = 1; i <= n; i++) {
          var r = i * (1 + b * i);
          if (r < 0.1) r = 0.1;
          ratios.push(+r.toFixed(3));
          amps.push(1 / i);
        }
        return { ratios: ratios, amps: amps };
      }
    }
  };

  var PRESET_ORDER = ["string", "flute", "clarinet", "membrane", "sine", "square", "sawtooth", "equal", "stretched", "compressed"];

  /* ── Helper ─────────────────────────────────────────────────── */

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (attrs.hasOwnProperty(k)) {
          if (k === "style" && typeof attrs[k] === "object") {
            for (var s in attrs[k]) {
              if (attrs[k].hasOwnProperty(s)) e.style[s] = attrs[k][s];
            }
          } else if (k === "className") {
            e.className = attrs[k];
          } else {
            e.setAttribute(k, attrs[k]);
          }
        }
      }
    }
    if (children) {
      if (typeof children === "string") {
        e.textContent = children;
      } else if (Array.isArray(children)) {
        for (var c = 0; c < children.length; c++) {
          if (children[c]) e.appendChild(children[c]);
        }
      } else {
        e.appendChild(children);
      }
    }
    return e;
  }

  /* ── Instance constructor ───────────────────────────────────── */

  function TimbreDesigner(containerId, opts) {
    opts = opts || {};
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn("PhizTimbre: container #" + containerId + " not found");
      return;
    }

    this.numSlots = opts.numSlots || 8;
    this.fundamental = opts.fundamental || 220;
    this.collapsed = opts.collapsed !== undefined ? opts.collapsed : false;
    this.onChange = opts.onChange || null;
    this.currentPreset = opts.preset || "string";

    /* state: arrays of ratio + amp for each slot */
    this.ratios = [];
    this.amps = [];

    /* DOM refs */
    this._dom = {};
    this._oscs = [];
    this._gains = [];
    this._masterGain = null;
    this._isPlaying = false;

    this._build();
    this.setPreset(this.currentPreset);
  }

  /* ── DOM construction ───────────────────────────────────────── */

  TimbreDesigner.prototype._build = function () {
    var self = this;
    var root = this.container;
    root.innerHTML = "";

    /* Wrapper with phiz styling */
    var wrapper = el("div", { className: "phiz-timbre-designer" });

    /* ── Header (collapsible toggle) ── */
    var headerRow = el("div", {
      className: "phiz-timbre-header",
      style: { display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "6px 8px", background: "rgba(255,255,255,0.04)", borderRadius: "4px", marginBottom: "6px" }
    });
    var titleEl = el("span", { style: { color: "rgba(255,255,255,0.8)", fontWeight: "bold", fontSize: "0.9rem" } }, "Timbre Designer");
    var toggleEl = el("span", { style: { color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", userSelect: "none" } }, this.collapsed ? "\u25B6 expand" : "\u25BC collapse");
    headerRow.appendChild(titleEl);
    headerRow.appendChild(toggleEl);
    this._dom.toggle = toggleEl;

    /* ── Body (hidden when collapsed) ── */
    var body = el("div", { className: "phiz-timbre-body" });
    if (this.collapsed) body.style.display = "none";
    this._dom.body = body;

    headerRow.addEventListener("click", function () {
      self.collapsed = !self.collapsed;
      body.style.display = self.collapsed ? "none" : "";
      toggleEl.textContent = self.collapsed ? "\u25B6 expand" : "\u25BC collapse";
    });

    /* ── Spectrum canvas ── */
    var canvas = el("canvas", { height: "140", style: { width: "100%", display: "block", marginBottom: "8px" } });
    this._dom.canvas = canvas;
    body.appendChild(canvas);

    /* ── Description ── */
    var descEl = el("div", { style: { color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginBottom: "8px", lineHeight: "1.4", minHeight: "2em" } });
    this._dom.desc = descEl;
    body.appendChild(descEl);

    /* ── Preset buttons ── */
    var presetRow = el("div", { className: "phiz-viz-controls", style: { marginBottom: "8px", flexWrap: "wrap" } });
    this._dom.presetBtns = {};
    for (var p = 0; p < PRESET_ORDER.length; p++) {
      (function (key) {
        var preset = PRESETS[key];
        var btn = el("button", {}, preset.label);
        btn.addEventListener("click", function () { self.setPreset(key); });
        presetRow.appendChild(btn);
        self._dom.presetBtns[key] = btn;
      })(PRESET_ORDER[p]);
    }
    body.appendChild(presetRow);

    /* ── Beta slider (for stretched/compressed) ── */
    var betaRow = el("div", { style: { display: "none", margin: "6px 0 8px", padding: "0 8px" } });
    var betaLabel = el("label", { style: { color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" } }, "Inharmonicity \u03B2: ");
    var betaSlider = el("input", { type: "range", min: "-0.020", max: "0.020", step: "0.001", value: "0.005", style: { width: "160px", verticalAlign: "middle" } });
    var betaVal = el("span", { style: { color: "#00e5ff", fontFamily: "monospace", fontSize: "0.82rem", marginLeft: "6px" } }, "0.005");
    betaLabel.appendChild(betaSlider);
    betaLabel.appendChild(betaVal);
    betaRow.appendChild(betaLabel);
    this._dom.betaRow = betaRow;
    this._dom.betaSlider = betaSlider;
    this._dom.betaVal = betaVal;

    betaSlider.addEventListener("input", function () {
      var b = parseFloat(betaSlider.value);
      betaVal.textContent = b.toFixed(3);
      self._applyBeta(b);
    });
    body.appendChild(betaRow);

    /* ── Partial rows ── */
    var partialsGrid = el("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "auto auto 1fr auto",
        gap: "3px 6px",
        alignItems: "center",
        margin: "0 0 8px",
        padding: "0 4px"
      }
    });
    this._dom.ratioInputs = [];
    this._dom.ampSliders = [];
    this._dom.ampValues = [];

    for (var i = 0; i < this.numSlots; i++) {
      (function (idx) {
        /* label */
        var lbl = el("span", { style: { color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", fontFamily: "monospace" } }, "#" + (idx + 1));

        /* ratio input */
        var ratioInput = el("input", {
          type: "number",
          min: "0.1",
          max: "30",
          step: "0.01",
          value: "1",
          style: { width: "60px", background: "#222", color: "#00e5ff", border: "1px solid #444", borderRadius: "3px", padding: "2px 4px", fontFamily: "monospace", fontSize: "0.82rem", textAlign: "right" }
        });
        ratioInput.addEventListener("input", function () {
          var v = parseFloat(ratioInput.value);
          if (!isNaN(v) && v > 0) {
            self.ratios[idx] = v;
            self._fireChange();
            self._drawSpectrum();
          }
        });

        /* amp slider */
        var ampSlider = el("input", {
          type: "range",
          min: "0",
          max: "1",
          step: "0.01",
          value: "1",
          style: { width: "100%", minWidth: "80px" }
        });
        ampSlider.addEventListener("input", function () {
          var v = parseFloat(ampSlider.value);
          self.amps[idx] = v;
          ampVal.textContent = v.toFixed(2);
          self._fireChange();
          self._drawSpectrum();
        });

        /* amp value display */
        var ampVal = el("span", {
          style: { color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", fontFamily: "monospace", minWidth: "2.8em", textAlign: "right" }
        }, "1.00");

        partialsGrid.appendChild(lbl);
        partialsGrid.appendChild(ratioInput);
        partialsGrid.appendChild(ampSlider);
        partialsGrid.appendChild(ampVal);

        self._dom.ratioInputs.push(ratioInput);
        self._dom.ampSliders.push(ampSlider);
        self._dom.ampValues.push(ampVal);
      })(i);
    }
    body.appendChild(partialsGrid);

    /* ── Controls row: Play + Fundamental ── */
    var controlsRow = el("div", { className: "phiz-viz-controls", style: { display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" } });

    var playBtn = el("button", { className: "phiz-play-btn" }, "\u25B6 Play Sound");
    this._dom.playBtn = playBtn;
    playBtn.addEventListener("click", function () {
      if (self._isPlaying) {
        self._stopSound();
      } else {
        self._playSound();
      }
    });
    controlsRow.appendChild(playBtn);

    var fundLabel = el("label", { style: { color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" } }, "Fundamental: ");
    var fundInput = el("input", {
      type: "number",
      min: "20",
      max: "4000",
      step: "1",
      value: String(this.fundamental),
      style: { width: "70px", background: "#222", color: "#00e5ff", border: "1px solid #444", borderRadius: "3px", padding: "2px 4px", fontFamily: "monospace", fontSize: "0.82rem", textAlign: "right" }
    });
    var hzLabel = el("span", { style: { color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" } }, " Hz");
    fundInput.addEventListener("input", function () {
      var v = parseFloat(fundInput.value);
      if (!isNaN(v) && v > 0) {
        self.fundamental = v;
        self._fireChange();
      }
    });
    this._dom.fundInput = fundInput;
    fundLabel.appendChild(fundInput);
    fundLabel.appendChild(hzLabel);
    controlsRow.appendChild(fundLabel);

    body.appendChild(controlsRow);

    /* ── Assemble ── */
    wrapper.appendChild(headerRow);
    wrapper.appendChild(body);
    root.appendChild(wrapper);

    /* initial draw (deferred to allow layout) */
    var selfRef = this;
    setTimeout(function () { selfRef._drawSpectrum(); }, 0);
  };

  /* ── Preset application ─────────────────────────────────────── */

  TimbreDesigner.prototype.setPreset = function (name) {
    var preset = PRESETS[name];
    if (!preset) return;

    this.currentPreset = name;
    var beta = preset.beta !== undefined ? preset.beta : 0;
    var data = preset.generate(this.numSlots, beta);

    this.ratios = data.ratios.slice();
    this.amps = data.amps.slice();

    /* pad to numSlots if needed */
    while (this.ratios.length < this.numSlots) {
      this.ratios.push(this.ratios.length + 1);
      this.amps.push(0);
    }

    /* Normalize amps: largest = 1 */
    var maxAmp = 0;
    for (var i = 0; i < this.amps.length; i++) {
      if (this.amps[i] > maxAmp) maxAmp = this.amps[i];
    }
    if (maxAmp > 0 && maxAmp !== 1) {
      for (var j = 0; j < this.amps.length; j++) {
        this.amps[j] = +(this.amps[j] / maxAmp).toFixed(4);
      }
    }

    this._syncDOM();
    this._drawSpectrum();
    this._fireChange();

    /* highlight active preset button */
    for (var k = 0; k < PRESET_ORDER.length; k++) {
      var key = PRESET_ORDER[k];
      if (this._dom.presetBtns[key]) {
        this._dom.presetBtns[key].className = (key === name) ? "active" : "";
      }
    }

    /* show/hide beta slider */
    var showBeta = (name === "stretched" || name === "compressed");
    this._dom.betaRow.style.display = showBeta ? "" : "none";
    if (showBeta) {
      this._dom.betaSlider.value = String(beta);
      this._dom.betaVal.textContent = beta.toFixed(3);
    }

    /* description */
    this._dom.desc.textContent = preset.desc;
  };

  TimbreDesigner.prototype._applyBeta = function (beta) {
    var preset = PRESETS[this.currentPreset];
    if (!preset || !preset.beta === undefined) return;
    var data = preset.generate(this.numSlots, beta);
    this.ratios = data.ratios.slice();
    while (this.ratios.length < this.numSlots) {
      this.ratios.push(this.ratios.length + 1);
    }
    this._syncDOM();
    this._drawSpectrum();
    this._fireChange();
  };

  TimbreDesigner.prototype._syncDOM = function () {
    for (var i = 0; i < this.numSlots; i++) {
      this._dom.ratioInputs[i].value = this.ratios[i] !== undefined ? String(+this.ratios[i].toFixed(3)) : "1";
      var a = this.amps[i] !== undefined ? this.amps[i] : 0;
      this._dom.ampSliders[i].value = String(a);
      this._dom.ampValues[i].textContent = a.toFixed(2);
    }
  };

  /* ── Spectrum visualization ─────────────────────────────────── */

  TimbreDesigner.prototype._drawSpectrum = function () {
    var canvas = this._dom.canvas;
    if (!canvas) return;

    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    var w = rect.width;
    var h = parseInt(canvas.getAttribute("height"), 10) || 140;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var pad = { top: 8, right: 8, bottom: 26, left: 8 };
    var gw = w - pad.left - pad.right;
    var gh = h - pad.top - pad.bottom;

    /* background */
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    var n = this.numSlots;
    var barW = gw / n;

    /* find max amp for scaling */
    var maxAmp = 0;
    for (var i = 0; i < n; i++) {
      if (this.amps[i] > maxAmp) maxAmp = this.amps[i];
    }
    if (maxAmp === 0) maxAmp = 1;

    /* is this inharmonic? */
    var inharmonic = false;
    for (var c = 0; c < n; c++) {
      if (this.amps[c] > 0 && Math.abs(this.ratios[c] - Math.round(this.ratios[c])) > 0.01) {
        inharmonic = true;
        break;
      }
    }

    /* bars */
    for (var j = 0; j < n; j++) {
      var val = this.amps[j] / maxAmp;
      var barH = val * gh;
      ctx.fillStyle = inharmonic ? "#ff6e40" : "#00e5ff";
      if (this.amps[j] === 0) {
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        barH = 2;
      }
      ctx.fillRect(
        pad.left + j * barW + 2,
        pad.top + gh - barH,
        Math.max(barW - 4, 2),
        barH
      );
    }

    /* ratio labels */
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "9px monospace";
    ctx.textAlign = "center";
    for (var k = 0; k < n; k++) {
      var r = this.ratios[k];
      var label = (r === Math.floor(r)) ? String(r) + "f" : r.toFixed(2) + "f";
      ctx.fillText(label, pad.left + k * barW + barW / 2, pad.top + gh + 14);
    }
  };

  /* ── onChange callback ──────────────────────────────────────── */

  TimbreDesigner.prototype._fireChange = function () {
    if (this.onChange) {
      this.onChange(this.getSpectrum());
    }
  };

  TimbreDesigner.prototype.getSpectrum = function () {
    var freq = [], amp = [];
    for (var i = 0; i < this.numSlots; i++) {
      if (this.amps[i] > 0) {
        freq.push(this.ratios[i]);
        amp.push(this.amps[i]);
      }
    }
    return { freq: freq, amp: amp };
  };

  /* ── Audio playback ─────────────────────────────────────────── */

  TimbreDesigner.prototype._playSound = function () {
    var self = this;
    if (typeof Tone === "undefined") {
      console.warn("PhizTimbre: Tone.js not loaded");
      return;
    }

    Tone.start().then(function () {
      self._stopSound(); /* clean previous */

      self._masterGain = new Tone.Gain(0.25).toDestination();
      self._oscs = [];
      self._gains = [];

      for (var i = 0; i < self.numSlots; i++) {
        if (self.amps[i] <= 0) continue;
        var freq = self.fundamental * self.ratios[i];
        var g = new Tone.Gain(self.amps[i]).connect(self._masterGain);
        var osc = new Tone.Oscillator(freq, "sine").connect(g);
        osc.start();
        self._oscs.push(osc);
        self._gains.push(g);
      }

      self._isPlaying = true;
      self._dom.playBtn.textContent = "\u25A0 Stop";
      self._dom.playBtn.classList.add("active");

      /* auto-stop after 3 seconds */
      self._playTimeout = setTimeout(function () {
        self._stopSound();
      }, 3000);
    });
  };

  TimbreDesigner.prototype._stopSound = function () {
    if (this._playTimeout) {
      clearTimeout(this._playTimeout);
      this._playTimeout = null;
    }
    for (var i = 0; i < this._oscs.length; i++) {
      try { this._oscs[i].stop(); } catch (e) { /* ignore */ }
      try { this._oscs[i].dispose(); } catch (e) { /* ignore */ }
    }
    for (var j = 0; j < this._gains.length; j++) {
      try { this._gains[j].dispose(); } catch (e) { /* ignore */ }
    }
    if (this._masterGain) {
      try { this._masterGain.dispose(); } catch (e) { /* ignore */ }
      this._masterGain = null;
    }
    this._oscs = [];
    this._gains = [];
    this._isPlaying = false;
    if (this._dom.playBtn) {
      this._dom.playBtn.textContent = "\u25B6 Play Sound";
      this._dom.playBtn.classList.remove("active");
    }
  };

  /* ── Public helpers ─────────────────────────────────────────── */

  TimbreDesigner.prototype.setFundamental = function (hz) {
    this.fundamental = hz;
    if (this._dom.fundInput) this._dom.fundInput.value = String(hz);
    this._fireChange();
  };

  TimbreDesigner.prototype.destroy = function () {
    this._stopSound();
    if (this.container) this.container.innerHTML = "";
  };

  /* ── Factory ────────────────────────────────────────────────── */

  function create(containerId, opts) {
    return new TimbreDesigner(containerId, opts);
  }

  /* ── Export ──────────────────────────────────────────────────── */

  window.PhizTimbre = {
    create: create,
    PRESETS: PRESETS,
    PRESET_ORDER: PRESET_ORDER
  };

})();
