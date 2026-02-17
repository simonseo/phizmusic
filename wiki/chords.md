---
title: Chords
aliases: [step-combos, ratio-sets, triads, chord]
tier: 1
category: music
sidebar_order: 3
tags: [music, foundation, harmony]
prerequisites: [intervals.md, harmonic-series.md, frequency-ratios.md, naming-system.md]
related: [intervals.md, harmonic-series.md, frequency-ratios.md, chord-progressions.md, consonance-dissonance.md, scales.md]
scope-boundary: Chord definition, step-combo/ratio-set notation, common chord catalog only. No chord progressions, no inversions or voicing in depth.
has_audio: true
---

# Chords

A **chord** is two or more pitches sounding simultaneously. PhizMusic describes every chord in two complementary ways:

- **Ratio-set** — the frequency ratios between the notes, explaining *why* the chord sounds the way it does (physics)
- **Step-combo** — the chromatic step positions relative to the lowest note, specifying *which* notes to play (practical)

Ratio first, then step-combo. The physics explains the perception; the step-combo makes it playable.

> 🎯 **Simple version**: A chord is multiple notes at once. Some combinations sound smooth because they match the natural pattern of vibrating objects (the harmonic series). The chord {0, 4, 7} matches harmonics 4, 5, 6 — that's why it sounds natural. PhizMusic describes chords by their frequency ratio (why it sounds good) AND their step positions (which keys to press).

## Why Ratios First

The conventional approach teaches chord shapes — "stack a third then another third." This tells you *what* to play but not *why* it works.

The physics-first approach starts from the [harmonic series](harmonic-series.md):

```
Harmonics:     1f    2f    3f    4f    5f    6f    7f    8f ...
```

Any subset of consecutive harmonics produces a naturally fused chord because:
1. The components are exact integer multiples of a shared fundamental
2. Their overlapping overtones reinforce rather than clash
3. The auditory system's harmonic template matching (see [ear-cochlea.md](ear-cochlea.md)) recognizes the pattern and groups it as "one sound"

The most important example: **harmonics 4, 5, and 6**.

## The 4:5:6 Chord

Take harmonics 4, 5, and 6 of any fundamental:

```
4f : 5f : 6f
```

Simplify by factoring out f:

```
Ratio-set: 4:5:6
```

What are the intervals?
- Between 4f and 5f: ratio 5/4 = 386 cents ≈ the 4-step-interval
- Between 5f and 6f: ratio 6/5 = 316 cents ≈ the 3-step-interval
- Between 4f and 6f: ratio 6/4 = 3/2 = 702 cents ≈ the 7-step-interval

So the step-combo is: **{0, 4, 7}**

This chord is maximally fused because every component is a harmonic of the implied fundamental (the frequency at 1f, two octaves below the lowest note). The auditory system hears this as a single, rich, stable sound.

Western theory calls this a "major triad." PhizMusic calls it what it is: the 4:5:6 harmonic selection, played as step-combo {0, 4, 7}.

## Common Chords

### Triads (3 notes)

<table>
  <thead>
    <tr>
      <th>Step-combo</th>
      <th>Ratio-set</th>
      <th>Harmonic origin</th>
      <th>Character</th>
      <th>Preview</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{0, 4, 7}</td>
      <td>4:5:6</td>
      <td>Harmonics 4, 5, 6</td>
      <td>Maximum fusion — bright, stable, resolved</td>
      <td><button class="phiz-play-btn" data-steps="[0,4,7]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>{0, 3, 7}</td>
      <td>10:12:15</td>
      <td>No simple harmonic group</td>
      <td>Dark, warm — the 6:5 ratio on bottom gives a minor quality</td>
      <td><button class="phiz-play-btn" data-steps="[0,3,7]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>{0, 3, 6}</td>
      <td>~25:30:36</td>
      <td>No clean harmonic origin</td>
      <td>Tense, unstable — both intervals are imperfect</td>
      <td><button class="phiz-play-btn" data-steps="[0,3,6]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>{0, 4, 8}</td>
      <td>~16:20:25</td>
      <td>No clean harmonic origin</td>
      <td>Symmetrical (equal step-4 intervals), ambiguous, floating</td>
      <td><button class="phiz-play-btn" data-steps="[0,4,8]" onclick="playStepSet(this)">▶</button></td>
    </tr>
  </tbody>
</table>

**Why {0, 3, 7} sounds different from {0, 4, 7}**: The ratio 10:12:15 involves larger numbers than 4:5:6. Larger ratio numbers = more complex relationship = less harmonic overlap = less perceptual fusion. The chord still sounds "good" (the outer 7-step-interval is the solid 3:2 ratio), but the internal structure is less aligned with the harmonic series, giving it a darker, more complex quality.

**Why {0, 3, 6} sounds tense**: Neither internal interval (step-3 and step-3) matches the strong 3:2 or 4:3 ratios. The outer interval (step-6, the tritone) sits at the point of maximum harmonic ambiguity. There is no implied fundamental that neatly generates this combination.

### Tetrads (4 notes)

<table>
  <thead>
    <tr>
      <th>Step-combo</th>
      <th>Ratio-set</th>
      <th>Harmonic origin</th>
      <th>Character</th>
      <th>Preview</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{0, 4, 7, 10}</td>
      <td>4:5:6:7</td>
      <td>Harmonics 4, 5, 6, 7</td>
      <td>The "natural tetrad" — all four notes from the harmonic series. Bluesy, wants to resolve.</td>
      <td><button class="phiz-play-btn" data-steps="[0,4,7,10]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>{0, 4, 7, 11}</td>
      <td>8:10:12:15</td>
      <td>—</td>
      <td>Lush, jazz-inflected, complex but not harsh</td>
      <td><button class="phiz-play-btn" data-steps="[0,4,7,11]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>{0, 3, 7, 10}</td>
      <td>10:12:15:18</td>
      <td>—</td>
      <td>Dark + tension — foundation of blues and minor keys</td>
      <td><button class="phiz-play-btn" data-steps="[0,3,7,10]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>{0, 4, 7, 10, 14}</td>
      <td>~4:5:6:7:9</td>
      <td>Harmonics 4-7 + 9</td>
      <td>Extended "natural" chord — all harmonic series</td>
      <td><button class="phiz-play-btn" data-steps="[0,4,7,10,14]" onclick="playStepSet(this)">▶</button></td>
    </tr>
  </tbody>
</table>

**The {0, 4, 7, 10} tetrad** deserves special attention. Its ratio-set 4:5:6:7 means it literally IS harmonics 4 through 7 of a fundamental. The 7th harmonic (ratio 7:4 = 969 cents) falls 31 cents below the 12-TET step-10 (1000 cents). This means the "natural" version of this chord doesn't quite match the 12-TET approximation. Barbershop quartets and blues singers instinctively tune the top note lower than 12-TET to hit the 7:4 sweet spot. Western theory calls this chord "dominant seventh" and explains it as functional harmony. Physics simply says: "It's harmonics 4-5-6-7."

## Building Chords from Step-Combos

Any combination of step-numbers is a valid chord. But some step-combos produce more perceptual fusion than others. A rough hierarchy:

1. **Step-combos that map to small-integer ratio-sets** (e.g., {0,4,7} → 4:5:6): maximum fusion
2. **Step-combos with a strong 3:2 backbone** (e.g., {0,3,7} — the outer 7 is solid): moderate fusion
3. **Step-combos without any strong ratio anchors** (e.g., {0,1,2}): minimal fusion, maximum roughness

This hierarchy is a description of physics, not a prescription of taste. Composers deliberately use all levels of fusion and roughness for expressive purposes. Tension and resolution are two sides of the same phenomenon (see [chord-progressions.md](chord-progressions.md)).

## Transposition

Because chords are step-combos, transposition is addition:

```
Original:      {0, 4, 7}
Transpose +5:  {5, 9, 0}  (mod 12)
Transpose +7:  {7, 11, 2} (mod 12)
```

The internal intervals — and therefore the ratios, the fusion quality, and the character — are invariant under transposition. In 12-TET, every transposition sounds identical. This is the payoff of equal temperament (see [twelve-tet.md](twelve-tet.md)).

## Voicing and Registration

The step-combo {0, 4, 7} specifies pitch *classes* — which of the 12 chromatic steps to include. It doesn't specify:
- Which octave each note is in (registration)
- How the notes are spaced across octaves (voicing)
- How many times each note appears (doubling)

These choices affect the sound significantly — a closely spaced {0, 4, 7} in one octave sounds different from a widely spaced version across three octaves — but the harmonic identity (4:5:6 ratio relationship) is preserved. Voicing is an expressive dimension beyond the step-combo itself.

<div class="phiz-viz-container">
<div class="phiz-viz-title">Chord Explorer — Build a Step-Combo</div>
<div id="ch-step-buttons" class="phiz-viz-controls" style="flex-wrap:nowrap;justify-content:center;"></div>
<div id="ch-step-info" style="color:rgba(255,255,255,0.7);font-size:0.85rem;margin:8px 0 4px;text-align:center;font-family:monospace;"></div>
<div id="ch-ratio-info" style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin:2px 0 8px;text-align:center;font-family:monospace;"></div>
<canvas id="ch-spectrum-canvas" height="150" style="width:100%;"></canvas>
<div class="phiz-viz-controls" style="margin-top:8px;">
  <button id="ch-play">&#9654; Play</button>
</div>
<div class="phiz-viz-controls" style="margin-top:4px;">
  <span style="color:rgba(255,255,255,0.4);font-size:0.75rem;margin-right:6px;">Presets:</span>
  <button class="ch-preset" data-steps="0,4,7">{0,4,7}</button>
  <button class="ch-preset" data-steps="0,3,7">{0,3,7}</button>
  <button class="ch-preset" data-steps="0,4,7,10">{0,4,7,10}</button>
  <button class="ch-preset" data-steps="0,3,6,9">{0,3,6,9}</button>
  <button class="ch-preset" data-steps="0,4,8">{0,4,8}</button>
</div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  "use strict";

  var ROOT_FREQ = 261.63; // Do4
  var DODEKA = ["Do", "Ka", "Re", "Xo", "Mi", "Fa", "Hu", "So", "Bi", "La", "Ve", "Si", "Do\u2032"];
  var selectedSteps = {};
  var canvas = document.getElementById("ch-spectrum-canvas");
  var stepInfo = document.getElementById("ch-step-info");
  var ratioInfo = document.getElementById("ch-ratio-info");
  var playBtn = document.getElementById("ch-play");
  var stepBtnContainer = document.getElementById("ch-step-buttons");
  var stepButtons = [];

  var oscillators = [];
  var gainNodes = [];
  var playing = false;

  // Build 13 step buttons (0-12)
  for (var i = 0; i <= 12; i++) {
    var btn = document.createElement("button");
    btn.textContent = String(i);
    btn.setAttribute("data-step", String(i));
    btn.style.minWidth = "32px";
    btn.addEventListener("click", (function(step) {
      return function() { toggleStep(step); };
    })(i));
    stepBtnContainer.appendChild(btn);
    stepButtons.push(btn);
  }

  // Default: select {0,4,7}
  selectedSteps[0] = true;
  selectedSteps[4] = true;
  selectedSteps[7] = true;

  function getSelectedArray() {
    var arr = [];
    for (var s = 0; s <= 12; s++) {
      if (selectedSteps[s]) arr.push(s);
    }
    return arr;
  }

  function toggleStep(step) {
    if (selectedSteps[step]) {
      delete selectedSteps[step];
    } else {
      selectedSteps[step] = true;
    }
    updateUI();
  }

  function applyPreset(steps) {
    selectedSteps = {};
    for (var i = 0; i < steps.length; i++) {
      selectedSteps[steps[i]] = true;
    }
    updateUI();
  }

  // Approximate ratio-set for common chords
  var KNOWN_RATIOS = {
    "0,4,7": "4:5:6",
    "0,3,7": "10:12:15",
    "0,3,6": "\u224825:30:36",
    "0,4,8": "\u224816:20:25",
    "0,4,7,10": "4:5:6:7",
    "0,4,7,11": "8:10:12:15",
    "0,3,7,10": "10:12:15:18",
    "0,3,6,9": "\u224810:12:14:17",
    "0,4,7,10,14": "\u22484:5:6:7:9"
  };

  function getRatioLabel(steps) {
    var key = steps.join(",");
    if (KNOWN_RATIOS[key]) return KNOWN_RATIOS[key];
    if (steps.length < 2) return "\u2014";
    // Compute approximate ratios from 12-TET frequencies
    var baseFreq = ROOT_FREQ * Math.pow(2, steps[0] / 12);
    var ratios = [];
    for (var i = 0; i < steps.length; i++) {
      ratios.push(ROOT_FREQ * Math.pow(2, steps[i] / 12) / baseFreq);
    }
    // Try to find small integer approximation
    // Multiply by increasing denominators and check if close to integers
    for (var denom = 1; denom <= 20; denom++) {
      var intRatios = [];
      var allClose = true;
      for (var j = 0; j < ratios.length; j++) {
        var val = ratios[j] * denom;
        var rounded = Math.round(val);
        if (Math.abs(val - rounded) > 0.08) {
          allClose = false;
          break;
        }
        intRatios.push(rounded);
      }
      if (allClose && intRatios.length === ratios.length) {
        return "\u2248" + intRatios.join(":");
      }
    }
    return "complex";
  }

  function updateUI() {
    var arr = getSelectedArray();

    // Update button styles
    for (var i = 0; i <= 12; i++) {
      if (selectedSteps[i]) {
        stepButtons[i].className = "active";
      } else {
        stepButtons[i].className = "";
      }
    }

    // Step-combo display
    if (arr.length === 0) {
      stepInfo.textContent = "Step-combo: (none selected)";
      ratioInfo.textContent = "";
    } else {
      stepInfo.textContent = "Step-combo: {" + arr.join(", ") + "}";
      ratioInfo.textContent = "Ratio-set: " + getRatioLabel(arr);
    }

    drawSpectrum(arr);
    if (playing) stopAudio();
  }

  function drawSpectrum(steps) {
    if (typeof PhizViz === "undefined") return;
    if (steps.length === 0) {
      // Clear canvas
      var fit0 = PhizViz.fitCanvas(canvas);
      fit0.ctx.fillStyle = "#111";
      fit0.ctx.fillRect(0, 0, fit0.w, fit0.h);
      return;
    }

    // Build combined harmonic spectrum
    var NUM_HARMONICS = 16;
    var maxHarmonicFreq = 5000; // limit display
    var freqs = [];
    for (var i = 0; i < steps.length; i++) {
      freqs.push(ROOT_FREQ * Math.pow(2, steps[i] / 12));
    }

    // Collect all harmonic partials with amplitudes
    var partials = []; // {freq, amp}
    for (var n = 0; n < freqs.length; n++) {
      for (var h = 1; h <= NUM_HARMONICS; h++) {
        var hf = freqs[n] * h;
        if (hf > maxHarmonicFreq) break;
        partials.push({ freq: hf, amp: 1.0 / h });
      }
    }

    // Draw custom bar chart
    var fit = PhizViz.fitCanvas(canvas);
    var w = fit.w;
    var ht = fit.h;
    var ctx = fit.ctx;

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, ht);

    if (partials.length === 0) return;

    var padL = 30;
    var padR = 10;
    var padT = 10;
    var padB = 20;
    var plotW = w - padL - padR;
    var plotH = ht - padT - padB;

    // Find max freq for x-axis
    var maxFreq = 0;
    for (var p = 0; p < partials.length; p++) {
      if (partials[p].freq > maxFreq) maxFreq = partials[p].freq;
    }
    maxFreq = Math.min(maxFreq * 1.1, maxHarmonicFreq);

    // X axis
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    // Frequency labels on x-axis
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "9px PT Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    var freqMarks = [500, 1000, 2000, 3000, 4000, 5000];
    for (var fm = 0; fm < freqMarks.length; fm++) {
      if (freqMarks[fm] > maxFreq) break;
      var fmX = padL + (freqMarks[fm] / maxFreq) * plotW;
      ctx.fillText(freqMarks[fm] + "", fmX, padT + plotH + 4);
    }

    // Draw bars
    var barW = Math.max(2, plotW / partials.length * 0.4);
    if (barW > 6) barW = 6;

    // Color based on which note the fundamental belongs to
    var noteColors = ["#ff6090", "#40c4ff", "#69f0ae", "#ffab40", "#ce93d8"];
    for (var b = 0; b < partials.length; b++) {
      var px = padL + (partials[b].freq / maxFreq) * plotW;
      var barH = partials[b].amp * plotH * 0.9;

      // Determine which note this partial belongs to
      var colorIdx = 0;
      for (var ci = freqs.length - 1; ci >= 0; ci--) {
        var ratio = partials[b].freq / freqs[ci];
        var rounded = Math.round(ratio);
        if (rounded >= 1 && Math.abs(ratio - rounded) < 0.01) {
          colorIdx = ci;
          break;
        }
      }

      ctx.fillStyle = noteColors[colorIdx % noteColors.length];
      ctx.globalAlpha = 0.7;
      ctx.fillRect(px - barW / 2, padT + plotH - barH, barW, barH);
      ctx.globalAlpha = 1.0;
    }

    // Y-axis label
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "9px PT Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.translate(8, padT + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Amplitude", 0, 0);
    ctx.restore();
  }

  // Audio
  function startAudio() {
    var steps = getSelectedArray();
    if (steps.length === 0) return;

    Tone.start().then(function() {
      for (var i = 0; i < steps.length; i++) {
        var freq = ROOT_FREQ * Math.pow(2, steps[i] / 12);
        var gain = new Tone.Gain(0.15).toDestination();
        var osc = new Tone.Oscillator(freq, "sine").connect(gain);
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

  // Preset buttons
  var presetBtns = document.querySelectorAll(".ch-preset");
  for (var p = 0; p < presetBtns.length; p++) {
    presetBtns[p].addEventListener("click", (function(btn) {
      return function() {
        var steps = btn.getAttribute("data-steps").split(",").map(function(s) {
          return parseInt(s, 10);
        });
        applyPreset(steps);
      };
    })(presetBtns[p]));
  }

  // Initial render
  updateUI();
})();
});
</script>

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Step-combo {0, 4, 7} | Major triad (C-E-G if rooted on Do) | PhizMusic specifies intervals; Western names require a root |
| Step-combo {0, 3, 7} | Minor triad | — |
| Step-combo {0, 3, 6} | Diminished triad | — |
| Step-combo {0, 4, 8} | Augmented triad | — |
| Step-combo {0, 4, 7, 10} | Dominant 7th | Physics: "natural tetrad" (harmonics 4-5-6-7) |
| Step-combo {0, 4, 7, 11} | Major 7th | — |
| Step-combo {0, 3, 7, 10} | Minor 7th | — |
| Ratio-set 4:5:6 | — | No standard Western term for ratio-based chord description |
| Step-combo | Chord type/quality | PhizMusic is root-agnostic; Western requires stating the root note |

## Connections

- [Intervals](intervals.md) — the step-intervals that make up a chord's internal structure
- [Harmonic Series](harmonic-series.md) — the physical source of the ratio-sets
- [Frequency Ratios](frequency-ratios.md) — why simple ratios produce fusion
- [Chord Progressions](chord-progressions.md) — how chords connect in sequences over time
- [Consonance & Dissonance](consonance-dissonance.md) — the perceptual mechanism behind chord "stability" and "tension"
- [Scales](scales.md) — chords as simultaneous selections from a step-subset

### Suggested References

- [Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/) — 3D triad dissonance surface and heatmap showing why certain step-combos produce minimal roughness
