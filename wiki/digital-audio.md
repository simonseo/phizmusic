---
title: Digital Audio
aliases: [ADC, sampling, Nyquist, aliasing, bit depth]
tier: 2
tags: [audio engineering, signal processing, recording]
prerequisites: [sound-waves.md, fourier-analysis.md, adsr-envelope.md]
related: [sound-waves.md, fourier-analysis.md, adsr-envelope.md, auditory-masking.md, equal-loudness.md, instrument-physics.md]
scope-boundary: Fundamentals only (ADC, sampling, aliasing, bit depth, clipping, echo, room basics). No codec internals or advanced DSP design.
has_audio: true
---

# Digital Audio

Digital audio converts a continuous pressure-wave signal into discrete numerical samples. The conversion quality is constrained by two core design choices: **how often** you sample (sampling rate) and **how finely** you quantize amplitude (bit depth).

> 🎯 **Simple version**: To store sound in a computer, you take very fast snapshots of the waveform. More snapshots per second and finer volume steps make a more accurate recording. Too few snapshots causes false tones (aliasing).

## 1) Analog-to-Digital Conversion (ADC)

The microphone produces a continuous voltage proportional to air pressure. ADC measures that voltage at discrete times:

```text
x[n] = x(n * Ts)
```

where `Ts = 1/Fs`, and `Fs` is the sampling rate in samples/second.

This is sampling a continuous function on a time lattice.

## 2) Sampling Rate and Nyquist

Nyquist-Shannon condition for band-limited reconstruction:

```text
Fs >= 2 * Fmax
```

where `Fmax` is the highest frequency component you want to preserve.

Example:

- Human hearing upper bound is roughly 20 kHz (age dependent)
- CD rate `Fs = 44,100 Hz`
- Nyquist frequency `Fn = Fs/2 = 22,050 Hz`

So 44.1 kHz is chosen to cover the audible range with practical anti-alias filter margins.

## 3) Aliasing

If frequencies above Nyquist enter the converter, they fold into lower frequencies and become false components:

```text
f_alias = |f_in - k * Fs|   (choose integer k that places result in [0, Fs/2])
```

Example: `f_in = 26 kHz`, `Fs = 44.1 kHz` gives an aliased component at `|26 - 44.1| = 18.1 kHz`.

This is why anti-alias filtering before sampling is mandatory.

## 4) Bit Depth, Gain, and Clipping

Bit depth sets amplitude resolution:

- `N` bits -> `2^N` quantization levels
- Ideal dynamic range approximation:

```text
DR ~ 6.02N + 1.76 dB
```

So:

- 16-bit -> 65,536 levels -> ~98 dB theoretical range (commonly cited as ~96 dB practical)
- 24-bit -> 16,777,216 levels -> much larger headroom for production workflows

**Gain staging** keeps signal within range. If sample magnitude exceeds full-scale limit, waveform tops are truncated:

```text
|x[n]| > 1.0  -> clipping
```

Clipping introduces nonlinear distortion and high-frequency artifacts.

## 5) Echo and Delay

Echo is a delayed copy of a signal summed with the original:

```text
y(t) = x(t) + a * x(t - tau)
```

Physics link for one reflection:

```text
tau ~ distance / speed_of_sound
```

At `c ~ 343 m/s`, a 34.3 m round-trip path gives about 100 ms delay.

Short delays blend as coloration; longer delays are heard as discrete echoes.

## 6) Room Acoustics Basics

A room is a 3D resonator with standing-wave modes (analogous to [instrument-physics.md](instrument-physics.md), but in 3 dimensions).

Two key ideas:

- **Room modes**: frequency-specific peaks/nulls from geometry
- **Reverberation time (RT60)**: time for sound level to drop 60 dB after source stops

Sabine approximation:

```text
RT60 = 0.161 * V / A
```

where `V` is room volume (m^3) and `A` is total absorption (sabins).

This links physical space to recorded/perceived tone and motivates digital reverb models.

## Psychoacoustics Connection

Engineering targets are chosen relative to human perception:

- 44.1 kHz is tied to hearing bandwidth limits
- Bit-depth choices trade quantization noise against practical noise floors
- Perceptual coders (MP3/AAC) remove components that are masked (see [auditory-masking.md](auditory-masking.md))

So "accurate audio" is not only mathematical reconstruction; it is reconstruction sufficient for human hearing constraints.

<div class="phiz-viz-container">
<div class="phiz-viz-title">Sampling &amp; Aliasing Simulator</div>
<canvas id="da-sampling-canvas" height="220" style="width:100%;"></canvas>
<div id="da-info" style="color:rgba(255,255,255,0.6);font-size:0.8rem;margin:6px 0 4px;font-family:monospace;"></div>
<div class="phiz-viz-controls" style="display:grid; grid-template-columns:1fr 1fr; gap:8px 16px;">
  <div>
    <div style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-bottom:2px;">Source frequency: <span id="da-freq-label" style="color:#00e5ff;">440 Hz</span></div>
    <input type="range" id="da-freq" min="100" max="2000" value="440" style="width:100%;accent-color:#00e5ff;">
  </div>
  <div>
    <div style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-bottom:2px;">Sampling rate: <span id="da-sr-label" style="color:#69f0ae;">8000 Hz</span></div>
    <input type="range" id="da-sr" min="500" max="10000" value="8000" step="100" style="width:100%;accent-color:#69f0ae;">
  </div>
</div>
<div class="phiz-viz-controls" style="margin-top:8px;">
  <button id="da-play-orig">&#9654; Play Original</button>
  <button id="da-play-alias">&#9654; Play Aliased</button>
</div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  "use strict";

  var canvas = document.getElementById("da-sampling-canvas");
  var infoEl = document.getElementById("da-info");
  var freqSlider = document.getElementById("da-freq");
  var srSlider = document.getElementById("da-sr");
  var freqLabel = document.getElementById("da-freq-label");
  var srLabel = document.getElementById("da-sr-label");
  var playOrigBtn = document.getElementById("da-play-orig");
  var playAliasBtn = document.getElementById("da-play-alias");

  var TWO_PI = 2 * Math.PI;

  function getParams() {
    var sourceFreq = parseInt(freqSlider.value, 10);
    var sampleRate = parseInt(srSlider.value, 10);
    var nyquist = sampleRate / 2;
    var aliased = sourceFreq > nyquist;
    var aliasFreq = aliased ? Math.abs(sampleRate - sourceFreq) : sourceFreq;
    return {
      sourceFreq: sourceFreq,
      sampleRate: sampleRate,
      nyquist: nyquist,
      aliased: aliased,
      aliasFreq: aliasFreq
    };
  }

  function draw() {
    if (typeof PhizViz === "undefined") return;
    var fit = PhizViz.fitCanvas(canvas);
    var w = fit.w;
    var h = fit.h;
    var ctx = fit.ctx;
    var p = getParams();

    // Background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    var padL = 10;
    var padR = 10;
    var padT = 15;
    var padB = 20;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var midY = padT + plotH / 2;

    // Show ~3 cycles of the source frequency
    var numCycles = 3;
    var duration = numCycles / p.sourceFreq;
    var numSamples = Math.floor(duration * p.sampleRate);
    var samplesPerPx = duration / plotW;

    // Draw axis
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, midY);
    ctx.lineTo(padL + plotW, midY);
    ctx.stroke();

    // Draw original continuous sine wave
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0,229,255,0.5)";
    ctx.lineWidth = 1.5;
    for (var px = 0; px <= plotW; px++) {
      var t = (px / plotW) * duration;
      var y = midY - Math.sin(TWO_PI * p.sourceFreq * t) * (plotH * 0.4);
      if (px === 0) {
        ctx.moveTo(padL + px, y);
      } else {
        ctx.lineTo(padL + px, y);
      }
    }
    ctx.stroke();

    // Draw sample points
    var sampleXs = [];
    var sampleYs = [];
    for (var n = 0; n <= numSamples; n++) {
      var tSample = n / p.sampleRate;
      if (tSample > duration) break;
      var sX = padL + (tSample / duration) * plotW;
      var sY = midY - Math.sin(TWO_PI * p.sourceFreq * tSample) * (plotH * 0.4);
      sampleXs.push(sX);
      sampleYs.push(sY);
    }

    // Draw reconstructed signal (connecting sample points with smooth interpolation)
    if (sampleXs.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = p.aliased ? "rgba(255,23,68,0.7)" : "rgba(105,240,174,0.7)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]);
      // Draw the reconstructed (aliased or not) waveform
      var reconFreq = p.aliased ? p.aliasFreq : p.sourceFreq;
      // Phase-match: at t=0, original is sin(0)=0, alias might differ
      // For proper alias visualization, sample the original at sample times
      // then draw the sinc-interpolated (or alias-freq) reconstruction
      for (var px2 = 0; px2 <= plotW; px2++) {
        var t2 = (px2 / plotW) * duration;
        var yRecon = midY - Math.sin(TWO_PI * reconFreq * t2) * (plotH * 0.4);
        if (px2 === 0) {
          ctx.moveTo(padL + px2, yRecon);
        } else {
          ctx.lineTo(padL + px2, yRecon);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw sample dots on top
    for (var d = 0; d < sampleXs.length; d++) {
      ctx.beginPath();
      ctx.arc(sampleXs[d], sampleYs[d], 3, 0, TWO_PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
    }

    // Legend
    ctx.font = "10px PT Sans, sans-serif";
    ctx.textBaseline = "top";

    ctx.fillStyle = "rgba(0,229,255,0.7)";
    ctx.textAlign = "left";
    ctx.fillText("Original: " + p.sourceFreq + " Hz", padL + 4, padT + 2);

    ctx.fillStyle = p.aliased ? "rgba(255,23,68,0.9)" : "rgba(105,240,174,0.9)";
    ctx.textAlign = "right";
    ctx.fillText(
      p.aliased ? "Reconstructed (alias): " + p.aliasFreq + " Hz" : "Reconstructed: " + p.sourceFreq + " Hz",
      padL + plotW - 4, padT + 2
    );

    // Nyquist indicator line — draw a small marker
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("Nyquist: " + p.nyquist + " Hz", w / 2, h - 2);

    // Info
    var statusText = "Source: " + p.sourceFreq + " Hz | Sample rate: " + p.sampleRate +
      " Hz | Nyquist: " + p.nyquist + " Hz | Status: ";
    if (p.aliased) {
      statusText += "ALIASED \u2192 appears as " + p.aliasFreq + " Hz";
      infoEl.style.color = "#ff1744";
    } else {
      statusText += "OK";
      infoEl.style.color = "rgba(255,255,255,0.6)";
    }
    infoEl.textContent = statusText;
  }

  function onInput() {
    freqLabel.textContent = freqSlider.value + " Hz";
    srLabel.textContent = srSlider.value + " Hz";
    draw();
  }

  freqSlider.addEventListener("input", onInput);
  srSlider.addEventListener("input", onInput);

  /* ── audio playback ─────────────────────────────── */
  var synth = null;

  function stopAudio() {
    if (synth) {
      try { synth.triggerRelease(); } catch (e) {}
      setTimeout(function() {
        try { synth.dispose(); } catch (e) {}
        synth = null;
      }, 300);
    }
  }

  function playTone(freq) {
    if (typeof Tone === "undefined") return;
    stopAudio();
    Tone.start().then(function() {
      synth = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.6, release: 0.3 }
      }).toDestination();
      synth.triggerAttackRelease(freq, "1");
    });
  }

  playOrigBtn.addEventListener("click", function() {
    var p = getParams();
    playTone(p.sourceFreq);
  });

  playAliasBtn.addEventListener("click", function() {
    var p = getParams();
    playTone(p.aliased ? p.aliasFreq : p.sourceFreq);
  });

  // Initial draw
  draw();
})();
});
</script>

## Translation Table

| PhizMusic | Western/Engineering | Notes |
|-----------|---------------------|-------|
| Discrete pressure samples | PCM audio | Same concept |
| Sampling rate Fs | Sample rate | Samples per second |
| Nyquist limit Fs/2 | Nyquist frequency | Highest representable frequency without aliasing |
| Quantization levels 2^N | Bit depth resolution | Amplitude step count |
| Saturation clipping | Digital clipping | Full-scale overflow/truncation |
| Delayed replica mixing | Echo/delay effect | One of the simplest time-domain effects |
| RT60 = 0.161 * V / A | Sabine reverberation formula | First-order room decay model |

## Connections

- [Sound Waves](sound-waves.md) — continuous pressure signal being sampled
- [Fourier Analysis](fourier-analysis.md) — spectral view needed to reason about aliasing
- [ADSR Envelope](adsr-envelope.md) — time-domain envelope represented in sampled data
- [Auditory Masking](auditory-masking.md) — perceptual basis of lossy compression
- [Equal Loudness](equal-loudness.md) — frequency-dependent hearing sensitivity for monitoring decisions
- [Instrument Physics](instrument-physics.md) — source spectra entering the capture chain

### Suggested References

- [Circles, Sines, and Signals](https://jackschaedler.github.io/circles-sines-signals/) — Comprehensive visual guide to digital signal processing, sampling, aliasing, and the DFT
