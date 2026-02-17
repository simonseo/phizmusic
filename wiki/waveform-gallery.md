---
title: "Waveform Gallery"
tier: 1
category: physics
scope-boundary: "Visual and auditory comparison of fundamental waveforms and their spectra"
aliases: ["waveform comparison", "wave shapes"]
tags: [waveform, spectrum, sine, square, sawtooth, triangle, fourier]
prerequisites: [sound-waves, fourier-analysis]
related: [timbre, harmonic-series]
has_audio: true
---

# Waveform Gallery

Every periodic sound has two complementary representations: a **waveform** (pressure vs. time) and a **spectrum** (energy vs. frequency). These are two views of the same physical reality, connected by the [Fourier transform](fourier-analysis.md). This page lets you see and hear the four fundamental periodic waveforms side by side — comparing their time-domain shapes, their frequency-domain spectra, and how they sound.

> 🎯 **Simple version**: Sounds have shapes. A pure tone is a smooth wave. A buzzy tone is a jagged wave. This page shows you four basic wave shapes, what frequencies they contain, and lets you hear the difference. The shape of the wave determines the recipe of frequencies — and that recipe is what your ear actually hears.

## The Four Fundamental Waveforms

These four waveforms are the building blocks of synthesis and appear throughout acoustics. Each has a distinct harmonic recipe that defines its sound.

### Sine

The simplest possible periodic sound: a single frequency with no harmonics. Its spectrum is a single bar at the fundamental frequency f₁. Sine waves sound thin, pure, and "electronic" because there is no spectral richness. No acoustic instrument produces a perfect sine wave — it is a mathematical idealization, the atom from which all complex sounds are built.

```
Spectrum:  H1 = 1, all others = 0
Sound:     Pure, flute-like, featureless
```

### Square

A square wave contains only **odd-numbered harmonics** (1st, 3rd, 5th, 7th...), each with amplitude proportional to 1/n where n is the harmonic number. The missing even harmonics give it a characteristic "hollow" or "woody" quality — like a clarinet in its lower register, which also emphasizes odd harmonics due to the physics of a cylindrical pipe closed at one end.

```
Spectrum:  H1 = 1, H2 = 0, H3 = 1/3, H4 = 0, H5 = 1/5, ...
Formula:   Aₙ = 1/n for odd n, 0 for even n
Sound:     Hollow, reedy, clarinet-like
```

### Sawtooth

A sawtooth wave contains **all harmonics** — both odd and even — each with amplitude 1/n. This makes it the richest of the four fundamental shapes: its spectrum is a smoothly descending staircase. The full harmonic complement gives it a bright, buzzy, string-like quality. Bowed string instruments produce waveforms close to sawtooth because the stick-slip motion of the bow creates a nearly linear ramp in string displacement.

```
Spectrum:  H1 = 1, H2 = 1/2, H3 = 1/3, H4 = 1/4, ...
Formula:   Aₙ = 1/n for all n
Sound:     Bright, buzzy, string-like
```

### Triangle

A triangle wave, like the square, contains only **odd harmonics** — but they fall off much faster, at 1/n². The rapid amplitude decay means that harmonics beyond the 5th are barely audible. This produces the softest, most mellow of the four shapes — closer to a sine wave than any of the others, but with just enough harmonic content to avoid sounding completely sterile.

```
Spectrum:  H1 = 1, H2 = 0, H3 = 1/9, H4 = 0, H5 = 1/25, ...
Formula:   Aₙ = 1/n² for odd n, 0 for even n
Sound:     Soft, mellow, subdued
```

## The Interactive

Explore each waveform visually and aurally. The left canvas shows the waveform in the time domain (pressure vs. time); the right canvas shows its harmonic spectrum (amplitude vs. harmonic number). Select a waveform, adjust the fundamental frequency, and press play to hear it.

<div class="phiz-viz-container" id="wg-interactive">
  <div class="phiz-viz-title">Waveform Gallery — Time Domain ↔ Frequency Domain</div>
  <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
    <div style="flex:1 1 48%; min-width:260px;">
      <div style="color:rgba(255,255,255,0.6); font-size:0.75rem; text-align:center; margin-bottom:4px;">Waveform (Time Domain)</div>
      <canvas id="wg-waveform" height="200" style="width:100%;"></canvas>
    </div>
    <div style="flex:1 1 48%; min-width:260px;">
      <div style="color:rgba(255,255,255,0.6); font-size:0.75rem; text-align:center; margin-bottom:4px;">Spectrum (Frequency Domain)</div>
      <canvas id="wg-spectrum" height="200" style="width:100%;"></canvas>
    </div>
  </div>
  <div class="phiz-viz-controls" style="margin-bottom:8px; display:flex; flex-wrap:wrap; gap:6px; align-items:center;">
    <span style="color:rgba(255,255,255,0.6); font-size:0.8rem;">Waveform:</span>
    <button id="wg-btn-sine" class="active">Sine</button>
    <button id="wg-btn-square">Square</button>
    <button id="wg-btn-sawtooth">Sawtooth</button>
    <button id="wg-btn-triangle">Triangle</button>
  </div>
  <div class="phiz-viz-controls" style="margin-bottom:8px; display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
    <label style="color:rgba(255,255,255,0.6); font-size:0.8rem;" for="wg-freq-slider">Fundamental:</label>
    <input id="wg-freq-slider" type="range" min="50" max="1000" value="220" step="1" style="flex:1; min-width:120px; accent-color:#00e5ff;">
    <span id="wg-freq-value" style="color:#00e5ff; font-family:monospace; font-size:0.85rem; min-width:5em;">220 Hz</span>
  </div>
  <div class="phiz-viz-controls" style="margin-bottom:8px;">
    <button id="wg-play-toggle">▶ Play</button>
  </div>
  <div id="wg-info" style="color:rgba(255,255,255,0.6); font-size:0.8rem; font-family:monospace; text-align:center; padding:4px 0;"></div>
</div>

<script>
(function () {
  "use strict";

  var NUM_HARMONICS = 16;
  var TWO_PI = 2 * Math.PI;

  var currentType = "sine";
  var currentFreq = 220;
  var synth = null;
  var playing = false;

  // --- Harmonic amplitude formulas ---
  var harmonicFormulas = {
    sine: function (n) { return (n === 1) ? 1 : 0; },
    square: function (n) { return (n % 2 === 1) ? (1 / n) : 0; },
    sawtooth: function (n) { return 1 / n; },
    triangle: function (n) { return (n % 2 === 1) ? (1 / (n * n)) : 0; }
  };

  // --- Harmonic description text ---
  var harmonicDescriptions = {
    sine: "Single frequency, no harmonics",
    square: "Odd harmonics at 1/n amplitude",
    sawtooth: "All harmonics at 1/n amplitude",
    triangle: "Odd harmonics at 1/n\u00B2 amplitude"
  };

  // --- Compute amplitudes for current type ---
  function getAmplitudes() {
    var amps = [];
    var formula = harmonicFormulas[currentType];
    for (var i = 0; i < NUM_HARMONICS; i++) {
      amps[i] = formula(i + 1);
    }
    return amps;
  }

  // --- Waveform generator function ---
  function generatorFn(t) {
    var amps = getAmplitudes();
    var sum = 0;
    var maxPossible = 0;
    for (var n = 0; n < NUM_HARMONICS; n++) {
      sum += amps[n] * Math.sin(TWO_PI * currentFreq * (n + 1) * t);
      maxPossible += amps[n];
    }
    if (maxPossible === 0) return 0;
    return sum / maxPossible;
  }

  // --- Redraw both canvases ---
  function redraw() {
    var wfCanvas = document.getElementById("wg-waveform");
    var spCanvas = document.getElementById("wg-spectrum");
    if (typeof PhizViz !== "undefined") {
      PhizViz.drawWaveform(wfCanvas, generatorFn, {
        duration: 3 / currentFreq,
        color: "#00e5ff",
        bg: "#111"
      });
      PhizViz.drawHarmonicSpectrum(spCanvas, getAmplitudes(), {
        color: "#00e5ff",
        bg: "#111",
        labelColor: "#aaa"
      });
    }
  }

  // --- Update info line ---
  function updateInfo() {
    var label = currentType.charAt(0).toUpperCase() + currentType.slice(1);
    var el = document.getElementById("wg-info");
    if (el) {
      el.textContent = "Waveform: " + label +
        " | Fundamental: " + currentFreq + " Hz" +
        " | Harmonics: " + harmonicDescriptions[currentType];
    }
  }

  // --- Audio management ---
  function createSynth() {
    synth = new Tone.Synth({
      oscillator: { type: currentType },
      envelope: { attack: 0.05, decay: 0, sustain: 1, release: 0.1 }
    }).toDestination();
  }

  function startPlaying() {
    Tone.start().then(function () {
      if (!synth) createSynth();
      synth.oscillator.type = currentType;
      synth.triggerAttack(currentFreq);
      playing = true;
      document.getElementById("wg-play-toggle").textContent = "\u25A0 Stop";
      document.getElementById("wg-play-toggle").classList.add("active");
    });
  }

  function stopPlaying() {
    if (synth) {
      synth.triggerRelease();
    }
    playing = false;
    document.getElementById("wg-play-toggle").textContent = "\u25B6 Play";
    document.getElementById("wg-play-toggle").classList.remove("active");
  }

  function restartIfPlaying() {
    if (!playing) return;
    if (synth) {
      synth.triggerRelease();
      synth.dispose();
      synth = null;
    }
    createSynth();
    synth.triggerAttack(currentFreq);
  }

  // --- Waveform selector buttons ---
  var waveTypes = ["sine", "square", "sawtooth", "triangle"];
  for (var i = 0; i < waveTypes.length; i++) {
    (function (type) {
      var btn = document.getElementById("wg-btn-" + type);
      if (!btn) return;
      btn.addEventListener("click", function () {
        currentType = type;
        // Update active button
        for (var j = 0; j < waveTypes.length; j++) {
          var other = document.getElementById("wg-btn-" + waveTypes[j]);
          if (other) other.classList.remove("active");
        }
        btn.classList.add("active");
        redraw();
        updateInfo();
        restartIfPlaying();
      });
    })(waveTypes[i]);
  }

  // --- Frequency slider ---
  var freqSlider = document.getElementById("wg-freq-slider");
  var freqValue = document.getElementById("wg-freq-value");
  if (freqSlider) {
    freqSlider.addEventListener("input", function () {
      currentFreq = parseInt(freqSlider.value, 10);
      if (freqValue) freqValue.textContent = currentFreq + " Hz";
      redraw();
      updateInfo();
      if (playing && synth) {
        synth.frequency.rampTo(currentFreq, 0.05);
      }
    });
  }

  // --- Play / Stop toggle ---
  var playBtn = document.getElementById("wg-play-toggle");
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      if (playing) {
        stopPlaying();
      } else {
        startPlaying();
      }
    });
  }

  // --- Initial draw ---
  function init() {
    redraw();
    updateInfo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
</script>

## Why These Shapes Matter

These four waveforms are not just textbook abstractions — they map directly to real physical phenomena and practical applications:

**Connection to acoustic instruments.** The harmonic recipes of these waveforms approximate real instruments. A clarinet's cylindrical bore emphasizes odd harmonics (square-wave-like). A bowed violin string produces a stick-slip motion close to a sawtooth. A flute's tone approaches a sine wave in its upper register. Understanding these ideal shapes gives you the vocabulary to describe what makes one instrument's [timbre](timbre.md) different from another's.

**Additive synthesis.** [Fourier analysis](fourier-analysis.md) tells us that any periodic sound is a sum of sine waves. These four waveforms demonstrate four different "recipes" — four different ways of mixing harmonics. The entire field of additive synthesis builds on this: start with the harmonic recipe you want, and construct any timbre from scratch.

**The harmonic series connection.** All four waveforms draw their components from the [harmonic series](harmonic-series.md) — integer multiples of the fundamental (f, 2f, 3f, 4f...). What distinguishes them is which harmonics are present and how quickly their amplitudes decay. This is the physical basis of spectral shape and, ultimately, of timbre perception.

**Subtractive synthesis.** Conversely, you can start with a harmonically rich waveform (sawtooth or square) and remove frequencies with filters. This is subtractive synthesis — sculpting timbre by carving away harmonics from a spectrally dense source.

## Translation Table

| PhizMusic | Western | Other Systems |
|-----------|---------|---------------|
| Waveform | Waveform, waveshape | Same across systems |
| Spectrum | Harmonic content, spectral content | Same across systems |
| Fundamental frequency | Fundamental, root frequency | Grundton (German), fondamentale (French) |
| Harmonic (nth) | nth partial, (n-1)th overtone | "Partial" counts from 1; "overtone" counts from the one above the fundamental |
| Harmonic amplitude | Partial strength | — |
| Step-distance | Interval | Intervall (German), intervalle (French), antarah (Arabic) |

## Connections

- [Fourier Analysis](fourier-analysis.md) — the mathematical framework that decomposes any waveform into its spectral components; the four waveforms here are canonical examples
- [Timbre](timbre.md) — the perceptual quality determined by a sound's spectral recipe; these waveforms illustrate how different harmonic mixtures produce different timbres
- [Harmonic Series](harmonic-series.md) — the integer-multiple frequency pattern that all four waveforms draw from; their spectra are subsets of this universal series
- [Sound Waves](sound-waves.md) — the physical foundation: pressure variations in air that these waveforms represent in the time domain
