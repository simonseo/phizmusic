---
title: The Ear & Cochlea
aliases: [ear, cochlea, basilar membrane, auditory system]
tier: 1
category: physics
tags: [biology, physics, perception]
prerequisites: [sound-waves.md]
related: [sound-waves.md, fourier-analysis.md, consonance-dissonance.md, auditory-masking.md, equal-loudness.md, missing-fundamental.md]
scope-boundary: Peripheral auditory system only (outer ear to cochlear nerve). No higher auditory cortex processing, no musical interval theory, no consonance models.
---

# The Ear & Cochlea

The ear is a biological transducer that converts pressure waves in air into electrochemical neural signals. Its most remarkable component — the **cochlea** — is a biological frequency analyzer that physically decomposes complex sounds into their component frequencies, performing in tissue what the Fourier transform performs in mathematics.

> 🎯 **Simple version**: Your inner ear is shaped like a snail shell. Different spots along it vibrate for different pitches — high pitches at the entrance, low pitches deep inside. It's like a piano keyboard made of flesh.

## From Pressure Wave to Neural Signal

Sound processing passes through three stages in the ear:

### 1. Outer Ear: Collection and Funneling

The pinna (visible ear) and ear canal collect pressure waves and channel them to the eardrum (tympanic membrane). The ear canal acts as a resonant tube that amplifies frequencies around 2-4 kHz — the frequency range most critical for speech intelligibility. This is a physical resonance, not a choice: the canal is roughly 2.5 cm long, and a quarter-wavelength resonance at that length peaks near 3.4 kHz.

### 2. Middle Ear: Impedance Matching

The eardrum vibrates in response to pressure waves. Three tiny bones (the ossicles — malleus, incus, stapes) mechanically link the eardrum to the oval window of the cochlea. Their purpose: **impedance matching**. The cochlea is filled with fluid, which has much higher acoustic impedance than air. Without the middle ear's lever action and area-ratio amplification, approximately 99.9% of sound energy would reflect off the fluid boundary. The ossicle chain provides roughly 25-30 dB of gain, making efficient air-to-fluid energy transfer possible.

### 3. Inner Ear (Cochlea): Frequency Analysis

This is where the transformation that matters for music happens.

## The Cochlea as Frequency Analyzer

The cochlea is a fluid-filled, coiled tube roughly 35 mm long when unrolled. Running along its length is the **basilar membrane** — a ribbon of tissue that varies in width and stiffness from one end to the other:

```
Cochlea (unrolled):

   Base (oval window)                              Apex
   ┌──────────────────────────────────────────────────┐
   │  narrow, stiff                   wide, flexible  │
   │  → high frequencies              → low frequencies│
   │                                                  │
   │  20,000 Hz ─────────────────────────────── 20 Hz │
   └──────────────────────────────────────────────────┘
                    Basilar Membrane

   Position maps to frequency (tonotopic organization)
```

When a pressure wave enters the cochlea at the oval window, it creates a traveling wave along the basilar membrane. This wave grows in amplitude as it reaches the region whose local resonant frequency matches the input frequency, then dies off sharply beyond that point.

**Each frequency excites a specific location.** This is **tonotopic organization** — frequency maps to position, just as a piano's keys map to pitch. The mapping is **logarithmic**: equal distances along the basilar membrane correspond to equal frequency *ratios*, not equal Hz differences. This logarithmic mapping is the biological basis for why we hear pitch in ratios (see [sound-waves.md](sound-waves.md) — "Logarithmic Perception").

When a complex sound arrives — one containing many frequencies simultaneously — each frequency component excites its own region of the basilar membrane. The membrane physically separates the mixture into its constituent frequencies, just as a prism separates white light into colors. This is a **biological Fourier transform** performed by mechanical resonance, not computation.

<div class="phiz-viz-container">
<div class="phiz-viz-title">Basilar Membrane Frequency Decomposition</div>
<canvas id="ec-membrane-canvas" height="200" style="width:100%;"></canvas>
<div id="ec-info" style="color:rgba(255,255,255,0.6);font-size:0.8rem;margin:6px 0 4px;"></div>
<div class="phiz-viz-controls" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px 16px;">
  <div style="display:flex;align-items:center;gap:6px;">
    <span style="color:#ff6090;font-family:monospace;font-size:0.8rem;min-width:3.2em;" id="ec-freq1-label">440 Hz</span>
    <input type="range" id="ec-freq1" min="100" max="4000" value="440" style="flex:1;accent-color:#ff6090;">
  </div>
  <div style="display:flex;align-items:center;gap:6px;">
    <span style="color:#40c4ff;font-family:monospace;font-size:0.8rem;min-width:3.2em;" id="ec-freq2-label">554 Hz</span>
    <input type="range" id="ec-freq2" min="100" max="4000" value="554" style="flex:1;accent-color:#40c4ff;">
  </div>
  <div style="display:flex;align-items:center;gap:6px;">
    <span style="color:#69f0ae;font-family:monospace;font-size:0.8rem;min-width:3.2em;" id="ec-freq3-label">659 Hz</span>
    <input type="range" id="ec-freq3" min="100" max="4000" value="659" style="flex:1;accent-color:#69f0ae;">
  </div>
</div>
<div class="phiz-viz-controls" style="margin-top:8px;">
  <button id="ec-play">&#9654; Play</button>
</div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  "use strict";

  var canvas = document.getElementById("ec-membrane-canvas");
  var infoEl = document.getElementById("ec-info");
  var slider1 = document.getElementById("ec-freq1");
  var slider2 = document.getElementById("ec-freq2");
  var slider3 = document.getElementById("ec-freq3");
  var label1 = document.getElementById("ec-freq1-label");
  var label2 = document.getElementById("ec-freq2-label");
  var label3 = document.getElementById("ec-freq3-label");
  var playBtn = document.getElementById("ec-play");

  var COLORS = ["#ff6090", "#40c4ff", "#69f0ae"];
  var oscillators = [];
  var gainNodes = [];
  var playing = false;

  function freqToX(freq, w) {
    // Logarithmic mapping: position = log2(freq/20) / log2(20000/20) * width
    var logMin = Math.log(20) / Math.LN2;
    var logMax = Math.log(20000) / Math.LN2;
    var logF = Math.log(freq) / Math.LN2;
    return ((logF - logMin) / (logMax - logMin)) * w;
  }

  function getFreqs() {
    return [
      parseInt(slider1.value, 10),
      parseInt(slider2.value, 10),
      parseInt(slider3.value, 10)
    ];
  }

  function draw() {
    if (typeof PhizViz === "undefined") return;
    var fit = PhizViz.fitCanvas(canvas);
    var w = fit.w;
    var h = fit.h;
    var ctx = fit.ctx;

    // Background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    var memTop = 60;
    var memBot = h - 30;
    var memH = memBot - memTop;

    // Draw membrane — tapered shape (wide at left/apex/low-freq, narrow at right/base/high-freq)
    // Note: cochlea unrolled has base(high-freq) at left, apex(low-freq) at right
    // But task says: "20 Hz (apex)" on left, "20,000 Hz (base)" on right
    // So left = low freq (wide), right = high freq (narrow)
    var taperTop = 0.15; // fraction of memH for the narrow end
    var taperBot = 0.85; // fraction of memH for the wide end

    ctx.beginPath();
    // Top edge: goes from memTop + memH*(1-taperBot)/2 at left to memTop + memH*(1-taperTop)/2 at right
    var leftHalfH = memH * taperBot;
    var rightHalfH = memH * taperTop;
    var leftTopY = memTop + (memH - leftHalfH) / 2;
    var leftBotY = leftTopY + leftHalfH;
    var rightTopY = memTop + (memH - rightHalfH) / 2;
    var rightBotY = rightTopY + rightHalfH;

    // Gradient fill for membrane
    var grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "rgba(100,120,140,0.35)");
    grad.addColorStop(1, "rgba(100,120,140,0.15)");

    ctx.beginPath();
    ctx.moveTo(0, leftTopY);
    ctx.lineTo(w, rightTopY);
    ctx.lineTo(w, rightBotY);
    ctx.lineTo(0, leftBotY);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Membrane outline
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Center line of membrane
    var centerY = function(x) {
      var t = x / w;
      var topY = leftTopY + (rightTopY - leftTopY) * t;
      var botY = leftBotY + (rightBotY - leftBotY) * t;
      return (topY + botY) / 2;
    };

    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.setLineDash([4, 4]);
    ctx.moveTo(0, centerY(0));
    for (var px = 1; px <= w; px++) {
      ctx.lineTo(px, centerY(px));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw frequency peaks
    var freqs = getFreqs();
    for (var i = 0; i < 3; i++) {
      var freq = freqs[i];
      var x = freqToX(freq, w);
      var cy = centerY(x);
      // Local membrane half-height at this x
      var t = x / w;
      var topAtX = leftTopY + (rightTopY - leftTopY) * t;
      var botAtX = leftBotY + (rightBotY - leftBotY) * t;
      var localHalfH = (botAtX - topAtX) / 2;
      var peakAmp = localHalfH * 0.7;
      var peakWidth = 30;

      // Draw bump as a Gaussian-like displacement
      ctx.beginPath();
      ctx.strokeStyle = COLORS[i];
      ctx.lineWidth = 2.5;
      var started = false;
      for (var dx = -peakWidth * 2; dx <= peakWidth * 2; dx++) {
        var px2 = x + dx;
        if (px2 < 0 || px2 > w) continue;
        var gauss = Math.exp(-(dx * dx) / (2 * peakWidth * peakWidth / 4));
        var yOff = -peakAmp * gauss;
        if (!started) {
          ctx.moveTo(px2, centerY(px2) + yOff);
          started = true;
        } else {
          ctx.lineTo(px2, centerY(px2) + yOff);
        }
      }
      ctx.stroke();

      // Fill under the bump
      ctx.beginPath();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = COLORS[i];
      started = false;
      var firstPx = null;
      var lastPx = null;
      for (var dx2 = -peakWidth * 2; dx2 <= peakWidth * 2; dx2++) {
        var px3 = x + dx2;
        if (px3 < 0 || px3 > w) continue;
        if (firstPx === null) firstPx = px3;
        lastPx = px3;
        var gauss2 = Math.exp(-(dx2 * dx2) / (2 * peakWidth * peakWidth / 4));
        var yOff2 = -peakAmp * gauss2;
        if (!started) {
          ctx.moveTo(px3, centerY(px3));
          started = true;
        }
        ctx.lineTo(px3, centerY(px3) + yOff2);
      }
      // Close back along the center line
      if (lastPx !== null) {
        ctx.lineTo(lastPx, centerY(lastPx));
      }
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Frequency label above peak
      ctx.fillStyle = COLORS[i];
      ctx.font = "bold 11px PT Sans, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      var labelY = centerY(x) - peakAmp - 6;
      if (labelY < 12) labelY = 12;
      ctx.fillText(freq + " Hz", x, labelY);
    }

    // End labels
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "10px PT Sans, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText("20 Hz (apex)", 4, h - 4);
    ctx.textAlign = "right";
    ctx.fillText("20,000 Hz (base)", w - 4, h - 4);

    // Info
    infoEl.textContent = "Frequencies: " + freqs[0] + " Hz, " + freqs[1] + " Hz, " + freqs[2] + " Hz";
  }

  function onSliderInput() {
    label1.textContent = slider1.value + " Hz";
    label2.textContent = slider2.value + " Hz";
    label3.textContent = slider3.value + " Hz";
    draw();
    updateAudio();
  }

  slider1.addEventListener("input", onSliderInput);
  slider2.addEventListener("input", onSliderInput);
  slider3.addEventListener("input", onSliderInput);

  function updateAudio() {
    if (!playing) return;
    var freqs = getFreqs();
    for (var i = 0; i < oscillators.length; i++) {
      if (oscillators[i]) {
        oscillators[i].frequency.value = freqs[i];
      }
    }
  }

  function startAudio() {
    Tone.start().then(function() {
      var freqs = getFreqs();
      for (var i = 0; i < 3; i++) {
        var gain = new Tone.Gain(0.15).toDestination();
        var osc = new Tone.Oscillator(freqs[i], "sine").connect(gain);
        osc.start();
        oscillators.push(osc);
        gainNodes.push(gain);
      }
      playing = true;
      playBtn.textContent = "\u25A0 Stop";
      playBtn.classList.add("active");
    });
  }

  function stopAudio() {
    for (var i = 0; i < oscillators.length; i++) {
      oscillators[i].stop();
      oscillators[i].dispose();
    }
    for (var j = 0; j < gainNodes.length; j++) {
      gainNodes[j].dispose();
    }
    oscillators = [];
    gainNodes = [];
    playing = false;
    playBtn.textContent = "\u25B6 Play";
    playBtn.classList.remove("active");
  }

  playBtn.addEventListener("click", function() {
    if (playing) {
      stopAudio();
    } else {
      startAudio();
    }
  });

  // Initial draw
  draw();
})();
});
</script>

## Hair Cells: Converting Motion to Nerve Signals

Sitting on the basilar membrane are approximately 3,500 **inner hair cells** arranged in a single row. When the membrane vibrates at a given location, the hair cells there bend, opening ion channels, generating electrical signals that propagate via the auditory nerve to the brain.

The pattern of which hair cells fire, and how rapidly, encodes:
- **Which frequencies** are present (place coding — which location along the membrane is active)
- **How loud** each component is (rate coding — faster firing = louder)
- **Temporal fine structure** (phase locking — for frequencies below ~4 kHz, hair cells fire in sync with the waveform cycle, providing timing information)

Phase locking is significant: below roughly 4 kHz, the brain receives both *where* on the membrane is vibrating (place code) and *when* the vibrations occur relative to the wave cycle (temporal code). This dual encoding gives pitch perception its high precision in the musically important frequency range.

## The Cochlear Amplifier

The cochlea is not a passive filter. A second set of cells — roughly 12,000 **outer hair cells** arranged in three rows — act as a **cochlear amplifier**. These cells are motile: they physically change length in response to basilar membrane vibration, pumping energy back into the traveling wave.

This active amplification:
- Boosts sensitivity by **40-60 dB** (the difference between barely audible and easily heard)
- Sharpens frequency selectivity (narrows the excited region on the membrane)
- Creates **nonlinear** behavior — the amplifier saturates at high levels, providing built-in dynamic range compression

The nonlinearity of the cochlear amplifier has a musically important side effect: it generates **combination tones**. When two frequencies f₁ and f₂ enter the cochlea simultaneously, the nonlinear outer hair cells produce distortion products at frequencies like 2f₁ - f₂ and f₂ - f₁. These are physically real vibrations on the basilar membrane — your ear literally creates frequencies that were not in the original sound. The most audible is the **difference tone** (f₂ - f₁), sometimes called a **Tartini tone** after the violinist who first documented it in 1714. Combination tones play a role in consonance perception (see [consonance-dissonance.md](consonance-dissonance.md)).

## Critical Bandwidth

**Critical bandwidth** is the frequency range around a given center frequency within which two simultaneous tones interact — producing beating, roughness, or perceptual fusion rather than being heard as two distinct pitches.

Critical bandwidth is a direct consequence of the basilar membrane's physical properties. Each point on the membrane responds not to a single exact frequency but to a *range* of nearby frequencies. Two tones whose excitation patterns overlap on the membrane fall within the same critical band.

The critical bandwidth varies with frequency:

| Center frequency | Approximate critical bandwidth | As percentage |
|-----------------|-------------------------------|---------------|
| 100 Hz | ~90 Hz | ~90% |
| 500 Hz | ~100 Hz | ~20% |
| 1,000 Hz | ~130 Hz | ~13% |
| 4,000 Hz | ~500 Hz | ~12.5% |

At musically relevant frequencies (200 Hz – 4 kHz), critical bandwidth is roughly **10-20% of center frequency**, or approximately **one-third of an octave** (~3-4 chromatic steps).

Critical bandwidth matters enormously for music:
- Two tones within a critical band create **roughness** — the buzzy, clashing quality of dissonance
- Two tones separated by more than a critical band are heard as **distinct, smooth** pitches
- The harmonic spacing of musical intervals interacts with critical bandwidth to produce the consonance-dissonance spectrum (see [consonance-dissonance.md](consonance-dissonance.md))
- Audio engineers use critical-band models to decide which frequencies can be removed without audible loss (see [auditory-masking.md](auditory-masking.md))

## Summary: The Ear's Signal Chain

```
Sound wave (air pressure)
    ↓
Outer ear: collect + resonant amplify (~2-4 kHz boost)
    ↓
Middle ear: impedance match air → fluid (~25-30 dB gain)
    ↓
Cochlea: frequency decomposition via basilar membrane
    ↓ (place coding)          ↓ (temporal coding)
Inner hair cells fire at     Hair cells phase-lock to
specific membrane locations  waveform cycles (<4 kHz)
    ↓
Auditory nerve → brain
```

The cochlea's output is not a single signal — it is an array of ~3,500 channels, each reporting activity at a different frequency. The brain receives a real-time spectrogram, decomposed by physics.

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Critical bandwidth | — | No standard Western theory term; used in psychoacoustics and audio engineering |
| Tonotopic mapping | — | No Western music theory equivalent; from auditory neuroscience |
| Combination tone / Tartini tone | Difference tone | Western tradition names it after Tartini (1714) |
| Cochlear amplifier | — | Biology term, not used in music theory |

## Connections

- [Sound Waves](sound-waves.md) — the physical pressure waves that the ear receives as input
- [Fourier Analysis](fourier-analysis.md) — the mathematical framework for the frequency decomposition the cochlea performs physically
- [Consonance & Dissonance](consonance-dissonance.md) — how critical bandwidth and combination tones shape the perception of tonal fusion and clash
- [Auditory Masking](auditory-masking.md) — how the cochlea's frequency resolution limits determine which sounds mask others
- [Equal Loudness](equal-loudness.md) — frequency-dependent sensitivity arising from outer/middle ear resonances and cochlear mechanics
- [Missing Fundamental](missing-fundamental.md) — pitch perception when the fundamental frequency is absent, requiring pattern matching beyond the cochlea

### Suggested References

- [Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/) — Visualizes critical bandwidth effects on consonance perception, directly related to cochlear frequency analysis
