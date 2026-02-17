---
title: Shepard Tones
aliases: [Shepard scale, auditory barber pole, pitch circularity]
tier: 2
category: perception
tags: [psychoacoustics, perception, illusion]
prerequisites: [missing-fundamental.md, harmonic-series.md, equal-loudness.md]
related: [missing-fundamental.md, ear-cochlea.md, frequency-ratios.md]
scope-boundary: Shepard tone construction and perception only.
has_audio: true
---

# Shepard Tones

A **Shepard tone** is an auditory illusion of endlessly ascending (or descending) pitch. Like a barber pole that appears to climb forever, a Shepard scale cycles through pitch steps while never actually getting higher or lower in any absolute sense. The illusion works because each "tone" is actually a stack of frequency components spread across many octaves, shaped by a fixed amplitude envelope that masks the recycling of components at the edges of the audible range.

> 🎯 **Simple version**: Imagine a spiral staircase where you keep climbing but never reach a higher floor. A Shepard tone does this with sound — it sounds like it's always going up (or down), but it never actually gets higher or lower. The trick: it's not one pitch, it's many pitches spread across octaves, fading in at the bottom and out at the top so you never notice the recycling.

## How Shepard Tones Work

Each "tone" in a Shepard scale is not a single frequency. It is a set of frequency components spaced exactly one octave apart — for example, 62.5 Hz, 125 Hz, 250 Hz, 500 Hz, 1000 Hz, 2000 Hz, 4000 Hz, and 8000 Hz. That is eight components, each double the frequency of the one below.

The critical ingredient is a **fixed amplitude envelope** — a bell curve (Gaussian) centered on a constant frequency (typically around 500 Hz). Components near the center of the envelope are loud; components far from the center are quiet. The envelope does not move. Only the individual frequency components move.

When the scale ascends by one chromatic step (multiply all frequencies by 2^(1/12) ≈ 1.0595):

1. Every component shifts up slightly in frequency
2. Components above the envelope center get quieter
3. Components below the envelope center get louder
4. The highest component eventually fades to silence and wraps around to the bottom
5. A new low component fades in from silence at the bottom

Because the amplitude envelope stays fixed, the overall brightness (spectral centroid) of the sound never changes. Your ear detects that individual components are moving up, but the macro-level spectral shape is frozen. The result: perpetual ascent with no destination. A sonic barber pole.

## The Mathematics

A Shepard tone at base frequency `f` consists of N frequency components at octave intervals:

```
Component frequencies:  f, 2f, 4f, 8f, 16f, ... , 2^(N-1) × f
```

Each component's amplitude is set by a Gaussian envelope centered on a fixed reference frequency `f_center` (typically ~500 Hz), with a standard deviation of `sigma` octaves (typically ~2 octaves):

```
amplitude(freq) = exp( -( (log2(freq) - log2(f_center)) / sigma )^2 )
```

This means a component at exactly `f_center` has amplitude 1.0, and components further away (in octave distance) fall off as a Gaussian bell curve.

To ascend by one chromatic step, multiply the base frequency by 2^(1/12):

```
f_new = f × 2^(1/12) ≈ f × 1.05946
```

All N components shift accordingly. After 12 steps, `f` has doubled — but since octave-spaced components are perceptually equivalent (octave equivalence), and the amplitude envelope has not moved, the tone sounds identical to where it started. One full "revolution" of the barber pole.

The frequency wrapping boundaries keep components in the audible range:

```
If freq > f_upper (e.g. 8000 Hz):  wrap to freq / 2^(num_octaves)
If freq < f_lower (e.g. 30 Hz):    wrap to freq × 2^(num_octaves)
```

## Why It Works

The illusion exploits a conflict between two pitch cues the brain uses:

**1. Local pitch movement (individual components).** Each frequency component is clearly moving up (or down) by a semitone per step. The [cochlea](ear-cochlea.md) detects this unambiguously — the excitation pattern on the basilar membrane shifts.

**2. Global spectral shape (overall brightness).** The spectral centroid — the "center of mass" of the frequency spectrum — stays fixed because of the stationary Gaussian envelope. The brain also tracks spectral centroid as a cue for "how high" a sound is.

When these cues conflict — individual components rising but overall brightness unchanged — the brain resolves the ambiguity by prioritizing the local movement cue. You hear "going up" because the components you can hear clearly (near the center of the envelope) are all moving up. The recycling at the faint edges is below perceptual threshold.

This is closely related to [harmonic template matching](missing-fundamental.md). The auditory system groups octave-spaced components and assigns a single pitch percept. Because all grouped components move in the same direction, the percept moves too — endlessly.

The phenomenon also depends on [equal loudness](equal-loudness.md) perception: the Gaussian envelope must be calibrated so that the fade-in and fade-out regions are truly below audible threshold at their extremes, accounting for the ear's frequency-dependent sensitivity.

## The Interactive

<div class="phiz-viz-container" id="sh-shepard-demo">
  <div class="phiz-viz-title">Shepard Tone Demo</div>
  <canvas id="sh-viz-canvas" height="200" style="width:100%;"></canvas>
  <div class="phiz-viz-controls" style="margin-top:10px; justify-content:center;">
    <button id="sh-btn-asc">▶ Ascending</button>
    <button id="sh-btn-desc">▶ Descending</button>
    <button id="sh-btn-stop">■ Stop</button>
  </div>
  <div class="phiz-viz-controls" style="margin-top:8px; align-items:center; justify-content:center; gap:10px;">
    <span style="color:rgba(255,255,255,0.6); font-size:0.8rem; font-family:monospace;">Speed:</span>
    <input id="sh-speed-slider" type="range" min="50" max="300" value="100" step="10" style="width:140px; accent-color:#00e5ff;">
    <span id="sh-speed-val" style="color:#00e5ff; font-family:monospace; font-size:0.8rem; min-width:3.5em;">1.0 /s</span>
  </div>
  <div id="sh-info" style="margin-top:8px; color:rgba(255,255,255,0.5); font-family:monospace; font-size:0.75rem; text-align:center;">
    Current base: — Hz | Step: 0/12 | Direction: stopped
  </div>
</div>

<script>
"use strict";

var NUM_COMPONENTS = 10;
var CENTER_FREQ = 500;
var SIGMA = 2;
var WRAP_HIGH = 8000;
var WRAP_LOW = 30;
var WRAP_FACTOR = 256; // 2^8 = 8 octaves

var oscillators = [];
var gains = [];
var baseFreq = 261.63; // start near middle C
var stepCount = 0;
var direction = 0; // 1 = ascending, -1 = descending, 0 = stopped
var intervalId = null;
var animFrameId = null;
var audioStarted = false;
var masterGain = null;

// --- Gaussian amplitude envelope ---
function gaussianAmp(freq) {
  var octaveDist = (Math.log(freq) / Math.LN2 - Math.log(CENTER_FREQ) / Math.LN2) / SIGMA;
  return Math.exp(-(octaveDist * octaveDist));
}

// --- Compute component frequencies from base ---
function getComponentFreqs(base) {
  var freqs = [];
  for (var i = 0; i < NUM_COMPONENTS; i++) {
    freqs.push(base * Math.pow(2, i));
  }
  return freqs;
}

// --- Ensure audio context is started ---
function ensureAudio() {
  if (audioStarted) return Promise.resolve();
  return Tone.start().then(function () {
    audioStarted = true;

    masterGain = new Tone.Gain(0.3).toDestination();

    for (var i = 0; i < NUM_COMPONENTS; i++) {
      var freq = baseFreq * Math.pow(2, i);
      var amp = gaussianAmp(freq);
      var g = new Tone.Gain(amp).connect(masterGain);
      var osc = new Tone.Oscillator(freq, "sine").connect(g);
      osc.start();
      oscillators.push(osc);
      gains.push(g);
    }

    applyAmplitudes();
  });
}

// --- Update oscillator frequencies and amplitudes ---
function applyAmplitudes() {
  var freqs = getComponentFreqs(baseFreq);
  for (var i = 0; i < NUM_COMPONENTS; i++) {
    var f = freqs[i];

    // Wrap frequencies into audible range
    while (f > WRAP_HIGH) { f = f / WRAP_FACTOR; }
    while (f < WRAP_LOW) { f = f * WRAP_FACTOR; }

    freqs[i] = f;
    oscillators[i].frequency.value = f;
    gains[i].gain.value = gaussianAmp(f);
  }
  return freqs;
}

// --- Step one chromatic step ---
function stepOnce() {
  if (direction === 0) return;

  var semitoneRatio = Math.pow(2, direction / 12);
  baseFreq = baseFreq * semitoneRatio;

  // Keep base freq in a reasonable range (wrap after full octave cycle)
  if (baseFreq > 523.26) { baseFreq = baseFreq / 2; }
  if (baseFreq < 130.81) { baseFreq = baseFreq * 2; }

  stepCount = (stepCount + direction + 12) % 12;
  applyAmplitudes();
  updateInfo();
}

// --- Speed from slider ---
function getSpeed() {
  return parseInt(document.getElementById("sh-speed-slider").value, 10) / 100;
}

// --- Start the stepping interval ---
function startStepping() {
  stopStepping();
  var speed = getSpeed();
  var ms = Math.round(1000 / speed);
  intervalId = setInterval(stepOnce, ms);
}

function stopStepping() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// --- Update info line ---
function updateInfo() {
  var dirLabel = direction === 1 ? "ascending" : direction === -1 ? "descending" : "stopped";
  var el = document.getElementById("sh-info");
  if (el) {
    el.textContent = "Current base: " + baseFreq.toFixed(1) + " Hz | Step: " + stepCount + "/12 | Direction: " + dirLabel;
  }
}

// --- Canvas visualization ---
function drawVisualization() {
  var canvas = document.getElementById("sh-viz-canvas");
  if (!canvas) return;

  if (typeof PhizViz !== "undefined" && PhizViz.fitCanvas) {
    PhizViz.fitCanvas(canvas);
  }

  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, w, h);

  var freqs = getComponentFreqs(baseFreq);
  var minLog = Math.log(WRAP_LOW) / Math.LN2;
  var maxLog = Math.log(WRAP_HIGH) / Math.LN2;
  var logRange = maxLog - minLog;

  for (var i = 0; i < NUM_COMPONENTS; i++) {
    var f = freqs[i];

    // Apply same wrapping as audio
    while (f > WRAP_HIGH) { f = f / WRAP_FACTOR; }
    while (f < WRAP_LOW) { f = f * WRAP_FACTOR; }

    var amp = gaussianAmp(f);
    var logF = Math.log(f) / Math.LN2;
    var yNorm = (logF - minLog) / logRange;
    var y = h - yNorm * h; // low freq at bottom, high at top

    var barH = Math.max(2, h / 20);
    var barW = (w - 40) * amp;
    var x = 20 + ((w - 40) - barW) / 2;

    ctx.globalAlpha = 0.2 + 0.8 * amp;
    ctx.fillStyle = "#00e5ff";
    ctx.fillRect(x, y - barH / 2, barW, barH);

    // Frequency label
    ctx.globalAlpha = 0.3 + 0.7 * amp;
    ctx.font = "10px monospace";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "right";
    ctx.fillText(Math.round(f) + " Hz", x - 4, y + 3);
  }

  ctx.globalAlpha = 1.0;

  // Draw Gaussian envelope curve (faint guide)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (var px = 0; px < h; px++) {
    var yN = 1 - px / h;
    var logFreq = minLog + yN * logRange;
    var freq = Math.pow(2, logFreq);
    var envAmp = gaussianAmp(freq);
    var xPos = 20 + ((w - 40) * envAmp) / 2 + (w - 40) / 2;
    if (px === 0) {
      ctx.moveTo(xPos, px);
    } else {
      ctx.lineTo(xPos, px);
    }
  }
  ctx.stroke();

  // Center frequency marker
  var centerLog = Math.log(CENTER_FREQ) / Math.LN2;
  var centerY = h - ((centerLog - minLog) / logRange) * h;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(20, centerY);
  ctx.lineTo(w - 20, centerY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.font = "9px monospace";
  ctx.textAlign = "left";
  ctx.fillText(CENTER_FREQ + " Hz center", w - 90, centerY - 4);

  animFrameId = requestAnimationFrame(drawVisualization);
}

// --- Button handlers ---
document.getElementById("sh-btn-asc").addEventListener("click", function () {
  ensureAudio().then(function () {
    direction = 1;
    startStepping();
    updateInfo();
    if (!animFrameId) { drawVisualization(); }
  });
});

document.getElementById("sh-btn-desc").addEventListener("click", function () {
  ensureAudio().then(function () {
    direction = -1;
    startStepping();
    updateInfo();
    if (!animFrameId) { drawVisualization(); }
  });
});

document.getElementById("sh-btn-stop").addEventListener("click", function () {
  direction = 0;
  stopStepping();

  // Silence all oscillators
  for (var i = 0; i < gains.length; i++) {
    gains[i].gain.value = 0;
  }

  updateInfo();

  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }

  // Redraw once in stopped state
  var canvas = document.getElementById("sh-viz-canvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
});

// --- Speed slider ---
document.getElementById("sh-speed-slider").addEventListener("input", function () {
  var speed = getSpeed();
  document.getElementById("sh-speed-val").textContent = speed.toFixed(1) + " /s";
  if (direction !== 0) {
    startStepping(); // restart interval with new speed
  }
});

// --- Initial draw ---
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () { drawVisualization(); });
} else {
  drawVisualization();
}
</script>

## Translation Table

| PhizMusic | Western | Other Systems |
|-----------|---------|---------------|
| Shepard tone | Shepard tone, Shepard scale | Same term used universally |
| Frequency components (octave-spaced) | Octave-spaced partials | — |
| Gaussian amplitude envelope | Spectral bell curve, amplitude weighting | — |
| Pitch circularity | Pitch paradox, auditory barber pole | Tritone paradox (Diana Deutsch) — related |
| Chromatic step (×2^(1/12)) | Semitone, half step | 100 cents |

## Connections

- [Missing Fundamental](missing-fundamental.md) — harmonic template matching is the same mechanism that makes Shepard tones "fuse" into a single pitch percept per step; octave-spaced components are grouped by the same neural machinery
- [The Ear & Cochlea](ear-cochlea.md) — the basilar membrane's frequency decomposition provides the raw data that feeds the pitch percept; the Shepard illusion depends on components spanning its full range
- [Frequency Ratios](frequency-ratios.md) — the octave (2:1 ratio) is the foundational interval in Shepard tone construction; octave equivalence is what allows the recycling to go unnoticed
- [Equal Loudness](equal-loudness.md) — Fletcher-Munson curves must be considered when designing the Gaussian envelope, since the ear's sensitivity varies with frequency
- [Harmonic Series](harmonic-series.md) — Shepard tones use octave-spaced (powers of 2) subsets of the harmonic series; the brain's harmonic grouping mechanism is what creates the unified percept

### Suggested References

- [Shepard, R. N. (1964). "Circularity in judgments of relative pitch."](https://doi.org/10.1121/1.1919362) — the original paper describing the illusion
- [Diana Deutsch's tritone paradox](https://deutsch.ucsd.edu/psychology/pages.php?i=201) — a related auditory illusion demonstrating individual differences in pitch circularity perception
