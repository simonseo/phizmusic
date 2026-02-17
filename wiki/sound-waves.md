---
title: Sound Waves
aliases: [pressure waves, acoustics basics]
tier: 1
category: deep-physics
sidebar_order: 4
tags: [physics, foundation]
prerequisites: []
related: [ear-cochlea.md, fourier-analysis.md, harmonic-series.md, glossary.md]
scope-boundary: No Fourier, no ear anatomy, no musical intervals
has_audio: true
---

# Sound Waves

Sound is a mechanical pressure wave propagating through a medium — air, water, steel, or anything with atoms close enough to push on each other. There is no sound in vacuum because there are no molecules to transmit the pressure variation.

> 🎯 **Simple version**: Sound is air vibrating. Fast vibration = high pitch. Big vibration = loud. Your ear hears *ratios*: the jump from 100 to 200 Hz sounds like the same "step" as 1000 to 2000 Hz.

## What a Pressure Wave Is

At rest, air pressure is roughly uniform — about 101,325 Pa at sea level. A vibrating object (a guitar string, a speaker cone, your vocal cords) pushes adjacent air molecules together, then pulls back, creating alternating regions of compression (higher pressure) and rarefaction (lower pressure). These pressure variations propagate outward at the speed of sound:

```
v_sound ≈ 343 m/s in dry air at 20°C
```

The propagation speed depends on the medium's density and elasticity, not on the wave's frequency or amplitude. All audible frequencies travel at the same speed in a given medium.

## Frequency

**Frequency** is the number of complete pressure oscillation cycles per second, measured in hertz (Hz).

```
f = 1 / T_period
```

where `T_period` is the time for one complete cycle (not to be confused with pulse period T used in the [rhythm](rhythm.md) system).

A vibrating string completing 440 cycles per second produces a wave at 440 Hz. Human hearing spans roughly **20 Hz to 20,000 Hz**, though the upper limit decreases with age and noise exposure.

Frequency determines **pitch** — the perceptual quality of "highness" or "lowness." Higher frequency = higher pitch. But the relationship between physical frequency and perceived pitch is not linear — it is **logarithmic**. More on that below.

## Amplitude

**Amplitude** is the maximum deviation of pressure from the equilibrium value. Measured in pascals (Pa), it determines how **loud** a sound is perceived to be.

Because the ear responds to an enormous range of pressures — from the threshold of hearing (~20 µPa) to the threshold of pain (~20 Pa), a factor of one million — amplitude is commonly expressed on a logarithmic scale in **decibels** (dB SPL):

```
L = 20 × log₁₀(p / p_ref)
```

where `p_ref = 20 µPa` (the approximate threshold of hearing at 1 kHz).

| Sound | Approximate level |
|-------|-------------------|
| Threshold of hearing | 0 dB SPL |
| Whisper | 30 dB SPL |
| Normal conversation | 60 dB SPL |
| Rock concert | 110 dB SPL |
| Threshold of pain | 130 dB SPL |

Every +6 dB roughly doubles the pressure. Every +10 dB roughly doubles the *perceived* loudness (at moderate levels). The mapping from dB to perceived loudness also depends on frequency — the ear is less sensitive to very low and very high frequencies at moderate levels. That frequency-dependent sensitivity is covered in [equal-loudness.md](equal-loudness.md).

## Three Representations of the Same Sound

A single sound can be viewed three ways. All contain the same physical information, just displayed differently.

### 1. Waveform (Time Domain)

A **waveform** (oscillogram) plots pressure variation versus time. The horizontal axis is time (seconds); the vertical axis is pressure deviation from equilibrium.

```
Pressure
  ^
  |    /\      /\      /\
  |   /  \    /  \    /  \
  |--/----\--/----\--/----\---→ Time
  |        \/      \/      \/
  |
```

From a waveform you can read:
- **Period** (`T_period`): the time between repeated patterns → frequency = 1/T_period
- **Amplitude**: the height of the peaks
- **Shape**: whether the wave is a smooth sine curve, a jagged sawtooth, a square shape, etc.

### 2. Spectrum (Frequency Domain)

A **spectrum** plots energy (or amplitude) versus frequency. Each vertical bar or peak represents a sine-wave component present in the sound.

```
Amplitude
  ^
  |  |
  |  |     |
  |  |     |  |
  |  |     |  |     |
  +--+-----+--+-----+----→ Frequency (Hz)
    f₁    2f₁  3f₁
```

A pure sine wave shows a single peak. A complex tone shows peaks at multiple frequencies — the fundamental and its overtones. The spectrum reveals the internal "recipe" of a sound in a way that the waveform hides.

### 3. Bars / Equalizer Display (Simplified Spectrum)

An equalizer (EQ) display groups frequencies into bands — typically octave-wide or third-octave-wide — and shows the total energy in each band as a bar height. This is a coarsened, simplified spectrum.

```
 Energy
  |  ▉
  |  ▉  ▉
  |  ▉  ▉  ▉     ▉
  |  ▉  ▉  ▉  ▉  ▉
  +--+--+--+--+--+--→ Frequency band
    Low        Mid        High
```

The EQ display throws away detail (you can't see individual harmonics) but gives a quick picture of overall spectral balance — "lots of bass, moderate mids, less treble."

All three representations describe the same physical event. The waveform and spectrum are connected by a mathematical operation called the Fourier transform (see [fourier-analysis.md](fourier-analysis.md)). The EQ display is a further simplification of the spectrum.

## Hear It

Hear pure sine waves at different frequencies, and compare ratio-based perception.

<p><button class="phiz-play-btn" data-freq="100" onclick="playFreq(this)">▶ Low tone (100 Hz)</button></p>

<p><button class="phiz-play-btn" data-freq="440" onclick="playFreq(this)">▶ Concert A (440 Hz)</button></p>

<p><button class="phiz-play-btn" data-freq="1000" onclick="playFreq(this)">▶ High tone (1000 Hz)</button></p>

<p><button class="phiz-play-btn" data-freq1="220" data-freq2="440" onclick="playRatio(this)">▶ Octave: 220 Hz → 440 Hz (2:1 ratio)</button></p>

<div class="phiz-viz-container" id="sw-oscilloscope">
  <div class="phiz-viz-title">Oscilloscope — Real-Time Waveform</div>
  <canvas id="sw-osc-canvas" height="180" style="width:100%;"></canvas>
  <div class="phiz-viz-controls" id="sw-osc-controls" style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:8px;">
    <label style="color:rgba(255,255,255,0.7); font-size:0.8rem; font-family:monospace;">Freq
      <input type="range" id="sw-osc-freq" min="20" max="2000" value="440" style="width:120px; accent-color:#00e5ff;">
    </label>
    <label style="color:rgba(255,255,255,0.7); font-size:0.8rem; font-family:monospace;">Amp
      <input type="range" id="sw-osc-amp" min="0" max="100" value="80" style="width:100px; accent-color:#00e5ff;">
    </label>
    <span style="display:inline-flex; gap:4px;">
      <button id="sw-osc-wf-sine" class="active">Sine</button>
      <button id="sw-osc-wf-square">Square</button>
      <button id="sw-osc-wf-sawtooth">Sawtooth</button>
      <button id="sw-osc-wf-triangle">Triangle</button>
    </span>
    <button id="sw-osc-play">&#9654; Play</button>
  </div>
  <div id="sw-osc-info" style="color:rgba(255,255,255,0.5); font-size:0.75rem; font-family:monospace; margin-top:6px;">
    Frequency: 440 Hz | Amplitude: 80% | Waveform: sine
  </div>
</div>

<script>
window.addEventListener('load', function() {
(function () {
  "use strict";

  var freqSlider = document.getElementById("sw-osc-freq");
  var ampSlider = document.getElementById("sw-osc-amp");
  var playBtn = document.getElementById("sw-osc-play");
  var infoEl = document.getElementById("sw-osc-info");
  var canvas = document.getElementById("sw-osc-canvas");

  var waveformBtns = {
    sine: document.getElementById("sw-osc-wf-sine"),
    square: document.getElementById("sw-osc-wf-square"),
    sawtooth: document.getElementById("sw-osc-wf-sawtooth"),
    triangle: document.getElementById("sw-osc-wf-triangle")
  };

  var currentType = "sine";
  var playing = false;
  var osc = null;
  var gainNode = null;
  var viz = null;

  function getFreq() { return parseInt(freqSlider.value, 10); }
  function getAmp() { return parseInt(ampSlider.value, 10) / 100; }

  function updateInfo() {
    infoEl.textContent = "Frequency: " + getFreq() + " Hz | Amplitude: " +
      parseInt(ampSlider.value, 10) + "% | Waveform: " + currentType;
  }

  function setActiveWaveformBtn(type) {
    var keys = ["sine", "square", "sawtooth", "triangle"];
    for (var i = 0; i < keys.length; i++) {
      waveformBtns[keys[i]].classList.remove("active");
    }
    waveformBtns[type].classList.add("active");
  }

  function startPlaying() {
    Tone.start().then(function () {
      gainNode = new Tone.Gain(getAmp()).toDestination();
      osc = new Tone.Oscillator(getFreq(), currentType);
      osc.connect(gainNode);
      osc.start();

      viz = PhizViz.oscilloscope(canvas, { color: "#00e5ff", bg: "#111" });
      viz.connect(gainNode);
      viz.start();

      playing = true;
      playBtn.textContent = "\u25A0 Stop";
      playBtn.classList.add("active");
    });
  }

  function stopPlaying() {
    if (osc) { osc.stop(); osc.dispose(); osc = null; }
    if (gainNode) { gainNode.dispose(); gainNode = null; }
    if (viz) { viz.stop(); viz.dispose(); viz = null; }
    playing = false;
    playBtn.textContent = "\u25B6 Play";
    playBtn.classList.remove("active");
  }

  playBtn.addEventListener("click", function () {
    if (playing) { stopPlaying(); } else { startPlaying(); }
  });

  freqSlider.addEventListener("input", function () {
    if (osc) { osc.frequency.value = getFreq(); }
    updateInfo();
  });

  ampSlider.addEventListener("input", function () {
    if (gainNode) { gainNode.gain.value = getAmp(); }
    updateInfo();
  });

  function handleWaveformClick(type) {
    return function () {
      currentType = type;
      setActiveWaveformBtn(type);
      if (osc) { osc.type = type; }
      updateInfo();
    };
  }

  waveformBtns.sine.addEventListener("click", handleWaveformClick("sine"));
  waveformBtns.square.addEventListener("click", handleWaveformClick("square"));
  waveformBtns.sawtooth.addEventListener("click", handleWaveformClick("sawtooth"));
  waveformBtns.triangle.addEventListener("click", handleWaveformClick("triangle"));
})();
});
</script>

<div class="phiz-viz-container" id="sw-spectrum-analyzer">
  <div class="phiz-viz-title">Spectrum Analyzer — Frequency Decomposition</div>
  <canvas id="sw-spec-canvas" height="180" style="width:100%;"></canvas>
  <div class="phiz-viz-controls" id="sw-spec-controls" style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:8px;">
    <label style="color:rgba(255,255,255,0.7); font-size:0.8rem; font-family:monospace;">Fundamental
      <input type="range" id="sw-spec-fund" min="100" max="1000" value="220" style="width:120px; accent-color:#ff6090;">
    </label>
    <label style="color:rgba(255,255,255,0.7); font-size:0.8rem; font-family:monospace;">Harmonics
      <input type="range" id="sw-spec-harm" min="1" max="16" value="6" style="width:100px; accent-color:#ff6090;">
    </label>
    <button id="sw-spec-play">&#9654; Play</button>
  </div>
  <div id="sw-spec-info" style="color:rgba(255,255,255,0.5); font-size:0.75rem; font-family:monospace; margin-top:6px;">
    Fundamental: 220 Hz | Harmonics: 6 | Highest partial: 1320 Hz
  </div>
</div>

<script>
window.addEventListener('load', function() {
(function () {
  "use strict";

  var fundSlider = document.getElementById("sw-spec-fund");
  var harmSlider = document.getElementById("sw-spec-harm");
  var playBtn = document.getElementById("sw-spec-play");
  var infoEl = document.getElementById("sw-spec-info");
  var canvas = document.getElementById("sw-spec-canvas");

  var playing = false;
  var oscillators = [];
  var gainNode = null;
  var viz = null;

  function getFund() { return parseInt(fundSlider.value, 10); }
  function getHarm() { return parseInt(harmSlider.value, 10); }

  function updateInfo() {
    var fund = getFund();
    var harm = getHarm();
    infoEl.textContent = "Fundamental: " + fund + " Hz | Harmonics: " +
      harm + " | Highest partial: " + (fund * harm) + " Hz";
  }

  var partialGains = [];

  function disposeOscillators() {
    for (var i = 0; i < oscillators.length; i++) {
      oscillators[i].stop();
      oscillators[i].dispose();
    }
    for (var j = 0; j < partialGains.length; j++) {
      partialGains[j].dispose();
    }
    oscillators = [];
    partialGains = [];
  }

  function createOscillators() {
    var fund = getFund();
    var harm = getHarm();
    for (var n = 1; n <= harm; n++) {
      var pg = new Tone.Gain(1 / n).connect(gainNode);
      var o = new Tone.Oscillator(fund * n, "sine");
      o.connect(pg);
      o.start();
      oscillators.push(o);
      partialGains.push(pg);
    }
  }

  function startPlaying() {
    Tone.start().then(function () {
      gainNode = new Tone.Gain(0.5).toDestination();

      createOscillators();

      viz = PhizViz.spectrum(canvas, { color: "#ff6090", bg: "#111", maxFreq: 5000 });
      viz.connect(gainNode);
      viz.start();

      playing = true;
      playBtn.textContent = "\u25A0 Stop";
      playBtn.classList.add("active");
    });
  }

  function stopPlaying() {
    disposeOscillators();
    if (gainNode) { gainNode.dispose(); gainNode = null; }
    if (viz) { viz.stop(); viz.dispose(); viz = null; }
    playing = false;
    playBtn.textContent = "\u25B6 Play";
    playBtn.classList.remove("active");
  }

  function rebuildOscillators() {
    if (!playing) return;
    disposeOscillators();
    createOscillators();
  }

  playBtn.addEventListener("click", function () {
    if (playing) { stopPlaying(); } else { startPlaying(); }
  });

  fundSlider.addEventListener("input", function () {
    rebuildOscillators();
    updateInfo();
  });

  harmSlider.addEventListener("input", function () {
    rebuildOscillators();
    updateInfo();
  });
})();
});
</script>

## Logarithmic Perception: Hearing in Ratios

Here is a critical fact about human hearing that shapes all of music: **we perceive pitch as proportional to the logarithm of frequency, not frequency itself.** This means we hear frequency *ratios*, not frequency *differences*.

Consider:
- 100 Hz → 200 Hz: a **doubling** (ratio 2:1). Sounds like a large upward jump.
- 1000 Hz → 1100 Hz: an **addition of 100 Hz** (ratio 1.1:1). Sounds like a small step.
- 1000 Hz → 2000 Hz: a **doubling** (ratio 2:1). Sounds like the *same* large jump as 100→200.

The 100→200 jump and the 1000→2000 jump sound like the *same musical distance* because both are the same ratio (2:1). The additive 100 Hz difference is irrelevant to perception. This is a manifestation of the **Weber-Fechner law** — a general principle of sensory perception stating that perceived intensity is proportional to the logarithm of stimulus intensity.

This is why:
- Musical pitch scales are based on **multiplicative ratios**, not additive Hz increments
- The **decibel scale** for loudness is logarithmic
- The **cent scale** for pitch intervals is logarithmic: `c = 1200 × log₂(f₂/f₁)`
- A piano keyboard has equal *ratio* spacing between keys, not equal *Hz* spacing

Logarithmic pitch perception is not arbitrary or cultural — it is a consequence of how the cochlea performs frequency analysis (see [ear-cochlea.md](ear-cochlea.md)). The basilar membrane maps frequency logarithmically: equal distances along the membrane correspond to equal frequency ratios.

## Wavelength

For completeness: wavelength (λ) is the spatial distance between successive compressions. Related to frequency and speed of sound:

```
λ = v / f
```

At 343 m/s:
- 20 Hz → λ ≈ 17 m (low bass notes have wavelengths the size of a room)
- 440 Hz → λ ≈ 0.78 m (arm's length)
- 20,000 Hz → λ ≈ 0.017 m (fingertip-width)

Wavelength matters for acoustics and instrument design (see [instrument-physics.md](instrument-physics.md)) but plays no direct role in pitch perception — we hear frequency, not wavelength.

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Frequency (Hz) | Pitch | PhizMusic uses the physical quantity directly |
| Amplitude (dB SPL) | Dynamics (pp, p, mf, f, ff) | Western uses subjective labels instead of measurements |
| Waveform | — | No standard Western music theory equivalent |
| Spectrum | — | No standard Western music theory equivalent |
| Pressure wave | Sound, tone | "Tone" implies pitched sound; pressure wave is more general |

## Connections

- [The Ear & Cochlea](ear-cochlea.md) — how the ear converts these pressure waves into neural signals, and why perception is logarithmic
- [Fourier Analysis](fourier-analysis.md) — the mathematical relationship between waveform and spectrum representations
- [Harmonic Series](harmonic-series.md) — the specific frequency pattern produced by vibrating strings and air columns
- [Equal Loudness](equal-loudness.md) — why perceived loudness depends on frequency, not just amplitude
- [Instrument Physics](instrument-physics.md) — how physical objects generate specific waveforms and spectra

### Suggested References

- [Circles, Sines, and Signals — Introduction](https://jackschaedler.github.io/circles-sines-signals/) — Visual primer on digital signal processing with animated diagrams of sine waves and sampling
- [Circles, Sines, and Signals — Sine and Cosine](https://jackschaedler.github.io/circles-sines-signals/sincos.html) — Animated phasor showing how circular motion produces sinusoidal pressure waves
