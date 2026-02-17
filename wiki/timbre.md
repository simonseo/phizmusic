---
title: Timbre
aliases: [tone color, spectral signature, auditory scene analysis]
tier: 2
tags: [spectrum, perception, instrumentation]
prerequisites: [fourier-analysis.md, harmonic-series.md, ear-cochlea.md, consonance-dissonance.md]
related: [fourier-analysis.md, harmonic-series.md, ear-cochlea.md, consonance-dissonance.md, instrument-physics.md, twelve-tet.md]
scope-boundary: Timbre definition, spectral envelope, timbre-tuning coupling, and auditory grouping only. No synthesis programming catalog.
has_audio: true
---

# Timbre

Timbre is the **spectral signature** of a sound: which frequency components are present and how strong each component is over time. Two sounds can share the same fundamental frequency and loudness but still be perceived as different sources because their spectral and temporal structures differ.

> 🎯 **Simple version**: Timbre is the "color" of a sound. It comes from which overtones are in the mix and how strong each one is. Same note, different overtone recipe = different instrument identity.

## Timbre as Fourier Content

From [fourier-analysis.md](fourier-analysis.md): any periodic sound can be written as a sum of sine components. Timbre is therefore not an extra property on top of Fourier analysis; timbre **is** the Fourier distribution plus its time evolution.

For a pitched tone:

```text
x(t) = sum A_n * sin(2*pi*f_n*t + phi_n)
```

where the set `{A_n}` (and how it changes during attack/decay) dominates timbre perception.

If two instruments play the same fundamental `f0`:

- Piano might emphasize stronger high partials at onset, then decay quickly
- Violin might show smoother sustained upper harmonics under bow energy

Same `f0`, different `{A_n(t)}` -> different timbre.

## Spectral Envelope

A practical way to describe timbre is the **spectral envelope**: a smooth curve through harmonic amplitudes.

- Bright timbre: slower high-frequency roll-off
- Dark timbre: faster high-frequency roll-off
- Hollow timbre: reduced even or odd harmonic families depending on source physics
- Noisy timbre: significant non-harmonic broadband components

This envelope changes with performance parameters (strike position, bow pressure, embouchure, articulation), so timbre is dynamic, not static.

## Why Piano and Violin Sound Different at the Same Pitch

Both can play (for example) Do4, but they excite different physical systems:

- Piano: impulsive hammer-string interaction, strong onset transient, non-constant energy input
- Violin: continuous bow-string stick-slip interaction, sustained energy input

The resulting spectra differ in both harmonic amplitude ratios and temporal evolution. The auditory system uses both cues.

## Sethares: Timbre-Tuning Coupling

A major insight for cross-cultural music theory:

**Consonance depends on the match between tuning system and instrument timbre.**

- Instruments with near-harmonic spectra (many strings, voice-like sources) align well with harmonic-series-derived ratios
- Instruments with inharmonic spectra (bells, some metallophones, certain percussion) can favor different interval grids

So there is no single universal "best" tuning independent of instrument physics. Tuning is a co-design problem between interval lattice and spectral structure.

This helps explain why gamelan tunings and 12-TET can each be internally coherent in their own instrument ecosystems.

## Auditory Scene Analysis (Bregman)

Timbre perception is part of a larger grouping problem: deciding what belongs to one sound source.

Primary grouping cues include:

- **Harmonicity**: components fitting one harmonic template fuse
- **Common onset/offset**: components starting and stopping together fuse
- **Spatial coherence**: similar location cues fuse
- **Timbre continuity over time**: similar spectral shape across events links into one stream

### Simultaneous Grouping (Fusion)

When multiple components meet these cues at once, they are heard as one source (for example, "one clarinet tone") instead of many separate partials.

### Sequential Grouping (Auditory Streaming)

Across time, the brain links events into streams using pitch proximity, timing regularity, and timbre continuity. This enables "cocktail-party" listening: following one voice in dense mixtures.

Large pitch leaps or strong timbre discontinuities can split one line into separate perceptual streams. This is part of how single-line writing can imply multiple simultaneous voices.

## Psychoacoustics Connection

Timbre is not just a physical spectrum; it is a perceptual decision process. The ear-brain system infers source structure from incomplete acoustic evidence. Harmonicity is the strongest grouping cue, but onset timing and spectral continuity strongly modulate the result.

That is why equal-frequency sounds with different attacks can be instantly identifiable as different instruments, and why rearranging component timing can change perceived source count without changing average spectrum.

## Hear Different Timbres

All four buttons play the same pitch (Do4 = 261.63 Hz) with different oscillator waveforms. Notice how the spectral content changes the perceived "color" of the sound.

| Waveform | Spectral Content | Listen |
|----------|------------------|--------|
| Sine | Pure tone — single frequency, no overtones | <button class="phiz-play-btn" data-freq="261.63" data-waveform="sine" onclick="playWaveform(this)">▶ Sine</button> |
| Triangle | Odd harmonics only, amplitudes fall as 1/n² — soft, mellow | <button class="phiz-play-btn" data-freq="261.63" data-waveform="triangle" onclick="playWaveform(this)">▶ Triangle</button> |
| Square | Odd harmonics only, amplitudes fall as 1/n — hollow, woody | <button class="phiz-play-btn" data-freq="261.63" data-waveform="square" onclick="playWaveform(this)">▶ Square</button> |
| Sawtooth | All harmonics, amplitudes fall as 1/n — bright, buzzy | <button class="phiz-play-btn" data-freq="261.63" data-waveform="sawtooth" onclick="playWaveform(this)">▶ Sawtooth</button> |

<div class="phiz-viz-container" id="tl-timbre-lab">
  <div class="phiz-viz-title">Timbre Lab</div>
  <canvas id="tl-spectrum" height="200" style="width:100%;"></canvas>
  <div id="tl-info" style="color:rgba(255,255,255,0.6);font-size:0.8rem;margin:6px 0 4px;">Preset: Sawtooth</div>
  <div class="phiz-viz-controls" id="tl-sliders" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:4px 12px;"></div>
  <div class="phiz-viz-controls" style="margin-top:10px; justify-content:center;">
    <button id="tl-pr-sawtooth" class="active">Sawtooth</button>
    <button id="tl-pr-square">Square</button>
    <button id="tl-pr-triangle">Triangle</button>
    <button id="tl-pr-sine">Sine</button>
    <button id="tl-pr-flute">Flute-like</button>
    <button id="tl-pr-bell">Bell-like</button>
    <button id="tl-play">▶ Play</button>
  </div>
</div>

<script>
(function () {
  "use strict";

  var NUM_HARMONICS = 8;
  var FUNDAMENTAL = 220;
  var amplitudes = [];
  var sliderEls = [];
  var valueEls = [];
  var synth = null;
  var playing = false;
  var currentPreset = "Sawtooth";

  // --- Preset definitions (return amplitude 0-1 for harmonic index 0-based) ---
  var presets = {
    Sawtooth: function (n) { return 1 / n; },
    Square: function (n) { return (n % 2 === 1) ? (1 / n) : 0; },
    Triangle: function (n) { return (n % 2 === 1) ? (1 / (n * n)) : 0; },
    Sine: function (n) { return (n === 1) ? 1 : 0; },
    "Flute-like": function (n) {
      if (n === 1) return 1;
      if (n === 2) return 0.25;
      if (n === 3) return 0.12;
      return 0;
    },
    "Bell-like": function (n) {
      var vals = [0.3, 0.15, 0.2, 0.8, 1.0, 0.7, 0.2, 0.1];
      return vals[n - 1] !== undefined ? vals[n - 1] : 0;
    }
  };

  // --- Initialize amplitudes to sawtooth ---
  for (var i = 0; i < NUM_HARMONICS; i++) {
    amplitudes[i] = presets.Sawtooth(i + 1);
  }

  // --- Build slider rows ---
  var slidersContainer = document.getElementById("tl-sliders");
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
    valSpan.style.cssText = "color:#00e5ff; font-family:monospace; font-size:0.75rem; min-width:2.8em; text-align:left;";
    valSpan.textContent = amplitudes[h].toFixed(2);

    row.appendChild(label);
    row.appendChild(slider);
    row.appendChild(valSpan);
    slidersContainer.appendChild(row);

    sliderEls[h] = slider;
    valueEls[h] = valSpan;
  }

  // --- Redraw spectrum ---
  function redraw() {
    var canvas = document.getElementById("tl-spectrum");
    if (typeof PhizViz !== "undefined") {
      PhizViz.drawHarmonicSpectrum(canvas, amplitudes, { color: "#00e5ff", bg: "#111", labelColor: "#aaa" });
    }
  }

  // --- Sync sliders from amplitudes ---
  function syncSliders() {
    for (var j = 0; j < NUM_HARMONICS; j++) {
      sliderEls[j].value = String(Math.round(amplitudes[j] * 100));
      valueEls[j].textContent = amplitudes[j].toFixed(2);
    }
  }

  // --- Update info line ---
  function updateInfo(name) {
    currentPreset = name;
    document.getElementById("tl-info").textContent = "Preset: " + name + "  |  Fundamental: " + FUNDAMENTAL + " Hz";
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
      document.getElementById("tl-play").textContent = "\u25A0 Stop";
      document.getElementById("tl-play").classList.add("active");
    });
  }

  function stopPlaying() {
    if (synth) {
      synth.triggerRelease();
    }
    playing = false;
    document.getElementById("tl-play").textContent = "\u25B6 Play";
    document.getElementById("tl-play").classList.remove("active");
  }

  // --- Slider input handler ---
  slidersContainer.addEventListener("input", function (e) {
    if (e.target.type !== "range") return;
    var idx = parseInt(e.target.getAttribute("data-harmonic"), 10);
    amplitudes[idx] = parseInt(e.target.value, 10) / 100;
    valueEls[idx].textContent = amplitudes[idx].toFixed(2);
    updateInfo("Custom");
    redraw();
    updateSynthPartials();
  });

  // --- Play/Stop toggle ---
  document.getElementById("tl-play").addEventListener("click", function () {
    if (playing) {
      stopPlaying();
    } else {
      startPlaying();
    }
  });

  // --- Apply preset ---
  function applyPreset(name) {
    var fn = presets[name];
    for (var j = 0; j < NUM_HARMONICS; j++) {
      amplitudes[j] = fn(j + 1);
    }
    syncSliders();
    updateInfo(name);
    redraw();
    updateSynthPartials();
    // Update active button styling
    var btns = ["tl-pr-sawtooth", "tl-pr-square", "tl-pr-triangle", "tl-pr-sine", "tl-pr-flute", "tl-pr-bell"];
    var names = ["Sawtooth", "Square", "Triangle", "Sine", "Flute-like", "Bell-like"];
    for (var k = 0; k < btns.length; k++) {
      var el = document.getElementById(btns[k]);
      if (names[k] === name) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    }
  }

  // --- Preset button listeners ---
  document.getElementById("tl-pr-sawtooth").addEventListener("click", function () { applyPreset("Sawtooth"); });
  document.getElementById("tl-pr-square").addEventListener("click", function () { applyPreset("Square"); });
  document.getElementById("tl-pr-triangle").addEventListener("click", function () { applyPreset("Triangle"); });
  document.getElementById("tl-pr-sine").addEventListener("click", function () { applyPreset("Sine"); });
  document.getElementById("tl-pr-flute").addEventListener("click", function () { applyPreset("Flute-like"); });
  document.getElementById("tl-pr-bell").addEventListener("click", function () { applyPreset("Bell-like"); });

  // --- Initial draw ---
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { redraw(); updateInfo("Sawtooth"); });
  } else {
    redraw();
    updateInfo("Sawtooth");
  }
})();
</script>

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Spectral signature | Timbre, tone color | Same concept with explicit physics framing |
| Harmonic amplitude envelope | Spectral envelope | Audio engineering term |
| Timbre-tuning coupling | Instrument-dependent temperament preference | Sethares framework |
| Sequential stream segregation | Auditory streaming | Psychoacoustics term, rarely explicit in theory texts |

## Connections

- [Fourier Analysis](fourier-analysis.md) — timbre is Fourier component structure over time
- [Harmonic Series](harmonic-series.md) — defines harmonic templates used in grouping
- [The Ear & Cochlea](ear-cochlea.md) — biological analyzer implementing frequency decomposition
- [Consonance & Dissonance](consonance-dissonance.md) — timbre modulates interval roughness and fusion
- [Instrument Physics](instrument-physics.md) — physical source class determines spectral signature
- [Twelve-TET](twelve-tet.md) — temperament fit depends on source spectrum

### Suggested References

- [Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/) — Demonstrates Sethares' timbre-tuning coupling: how spectral content determines which intervals are consonant
- [Overtone Series (muted.io)](https://muted.io/overtone-series/) — Mix individual harmonics to hear how spectral recipe shapes timbre
