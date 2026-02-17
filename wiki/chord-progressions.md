---
title: Chord Progressions
aliases: [progressions, harmonic motion, voice-leading]
tier: 2
category: music
sidebar_order: 4
tags: [harmony, time, prediction]
prerequisites: [chords.md, intervals.md, rhythm.md, consonance-dissonance.md]
related: [chords.md, intervals.md, rhythm.md, consonance-dissonance.md, scales.md, notation-layer.md]
scope-boundary: Step-combo sequences, movement metrics, and tension-resolution only. No key modulation or full functional-harmony theory.
has_audio: true
---

# Chord Progressions

A chord progression is a **time-ordered sequence of step-combos**. In PhizMusic, the central question is geometric: how far does each voice move from one step-combo to the next? Small total movement tends to sound smooth and coherent; larger movement tends to increase contrast and perceived tension.

> 🎯 **Simple version**: A chord progression is a journey from one group of notes to another. Some journeys feel like "going home" (resolution), others feel like "still traveling" (tension). The brain predicts where the music is going; surprise creates emotion.

## Progressions as Step-Combo Sequences

Write each simultaneous sonority as a set (or multiset) of chromatic steps relative to a chosen root frame. A progression is then:

```text
S1 -> S2 -> S3 -> ... -> Sn
```

Example sequence:

```text
{0,4,7} -> {0,5,9} -> {2,7,11} -> {0,4,7}
```

This is often labeled with Roman numerals in conventional theory, but PhizMusic keeps the representation literal: actual step content over time.

## Voice-Leading as Distance Minimization

Given two adjacent step-combos `A` and `B`, voice-leading chooses a mapping between notes in `A` and notes in `B` that minimizes total motion. Define circular step distance on the 12-step ring:

```text
d(a,b) = min((b-a) mod 12, (a-b) mod 12)
```

Then total movement for a specific voice assignment is:

```text
D(A,B) = sum d(ai, bi)
```

Lower `D` usually sounds smoother because fewer spectral components move far at once, preserving auditory continuity.

## Stability, Tension, and Resolution

Step-combos that strongly match harmonic-series templates (for example {0,4,7} with 4:5:6 relation) are often perceived as stable endpoints. Moving to sets with weaker fusion or larger voice movement increases tension. Returning to stable sets with reduced movement is heard as resolution.

In this framing:

- **Tension** = departure from high-fusion patterns and/or larger aggregate movement
- **Resolution** = return toward high-fusion patterns and/or smaller aggregate movement

This avoids culturally specific rule language while still capturing the perceptual dynamics.

## Example 1: Closed Loop with Minimal Return Cost

Sequence:

```text
{0,4,7} -> {0,5,9} -> {2,7,11} -> {0,4,7}
```

One low-cost assignment:

| Transition | Voice motions | Total movement |
|-----------|---------------|----------------|
| {0,4,7} -> {0,5,9} | 0->0 (0), 4->5 (1), 7->9 (2) | 3 |
| {0,5,9} -> {2,7,11} | 0->11 (1), 5->7 (2), 9->2 (5) | 8 |
| {2,7,11} -> {0,4,7} | 2->0 (2), 7->7 (0), 11->4 (5) | 7 |

Interpretation: the middle transition has the largest movement and is commonly heard as the point of greatest directional drive. The final return restores the opening spectral template.

## Example 2: Alternating Stable and Ambiguous Sets

Sequence:

```text
{0,4,7} -> {0,4,8} -> {0,4,7}
```

- `{0,4,7}` aligns with 4:5:6 (strong fusion)
- `{0,4,8}` is more symmetric and less harmonic-series aligned

Only one pitch shifts by one step each transition (7 <-> 8), so movement is minimal, but spectral interpretation changes sharply. This is a high-contrast, low-distance tension device.

## Example 3: Stepwise Bass Trajectory

Sequence (root shift by +1 each event, same interval shape):

```text
{0,4,7} -> {1,5,8} -> {2,6,9} -> {3,7,10}
```

Each voice can move by +1 each step, giving constant small motion (`D = 3` per transition). Perceptually, this sounds smooth locally but directionally unstable globally because no high-fusion home set is re-established.

## Psychoacoustics: Prediction Over Time

The auditory system does not evaluate each chord in isolation. It builds short-horizon expectations from recent transition statistics:

- Repeated transition patterns create strong predictions
- Predicted arrivals trigger reward when fulfilled
- Violations create surprise and orienting response

So musical emotion in progression space can be framed as **prediction error over harmonic trajectories**, not mystical harmony rules.

## Hear the Progressions

Click to hear each progression played as a sequence of chords. Listen for the tension-resolution arc described above.

<p><button class="phiz-play-btn" data-chords="[[0,4,7],[7,11,14],[9,12,16],[5,9,12]]" data-octave="4" onclick="playProgression(this)">▶ I – V – vi – IV</button></p>

<p><button class="phiz-play-btn" data-chords="[[0,4,7],[5,9,12],[7,11,14],[0,4,7]]" data-octave="4" onclick="playProgression(this)">▶ I – IV – V – I</button></p>

<p><button class="phiz-play-btn" data-chords="[[2,5,9],[7,11,14],[0,4,7]]" data-octave="4" onclick="playProgression(this)">▶ ii – V – I</button></p>

<div class="phiz-viz-container" id="cp-visualizer">
<div class="phiz-viz-title">Progression Path Visualizer</div>
<canvas id="cp-grid-canvas" height="280" style="width:100%; height:280px;"></canvas>
<div class="phiz-viz-controls">
<button class="cp-preset active" data-idx="0">0→3→4→0</button>
<button class="cp-preset" data-idx="1">0→4→5→3</button>
<button class="cp-preset" data-idx="2">1→4→0</button>
<button id="cp-play">▶ Play</button>
</div>
<div id="cp-info" style="color:#aaa; font-size:0.85rem; padding:4px 8px;"></div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  "use strict";
  var canvas = document.getElementById("cp-grid-canvas");
  var info = document.getElementById("cp-info");
  var SYLLABLES = ["Do","Ka","Re","Xo","Mi","Fa","Hu","So","Bi","La","Ve","Si"];
  var progressions = [
    {label: "0\u21923\u21924\u21920", western: "I\u2013IV\u2013V\u2013I", chords: [[0,4,7],[5,9,12],[7,11,14],[0,4,7]]},
    {label: "0\u21924\u21925\u21923", western: "I\u2013V\u2013vi\u2013IV", chords: [[0,4,7],[7,11,14],[9,12,16],[5,9,12]]},
    {label: "1\u21924\u21920", western: "ii\u2013V\u2013I", chords: [[2,5,9],[7,11,14],[0,4,7]]}
  ];
  var currentIdx = 0;

  function fitCanvas() {
    if (typeof PhizViz !== "undefined" && PhizViz.fitCanvas) return PhizViz.fitCanvas(canvas);
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    var w = rect.width;
    var h = 280;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    var ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    return {w: w, h: h, ctx: ctx};
  }

  function totalMovement(chords) {
    var d = 0;
    for (var i = 1; i < chords.length; i++) {
      var prev = chords[i - 1].slice().sort(function(a, b) { return a - b; });
      var curr = chords[i].slice().sort(function(a, b) { return a - b; });
      for (var v = 0; v < Math.min(prev.length, curr.length); v++) {
        d += Math.abs(curr[v] - prev[v]);
      }
    }
    return d;
  }

  function drawGrid() {
    var fit = fitCanvas();
    var ctx = fit.ctx;
    var w = fit.w;
    var h = fit.h;
    var prog = progressions[currentIdx];
    var chords = prog.chords;
    var pad = {left: 40, right: 20, top: 25, bottom: 25};
    var gw = w - pad.left - pad.right;
    var gh = h - pad.top - pad.bottom;

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    for (var s = 0; s <= 14; s++) {
      var y = pad.top + gh - (s / 14) * gh;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.strokeStyle = (s % 12 === 0) ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1;
      ctx.stroke();
      if (s <= 11) {
        ctx.fillStyle = "#666";
        ctx.font = "10px monospace";
        ctx.textAlign = "right";
        ctx.fillText(String(s), pad.left - 4, y + 3);
      }
    }

    var colW = gw / chords.length;
    var colors = ["#00e5ff", "#ff6090", "#66ff66", "#ffcc00", "#cc99ff"];

    for (var c = 0; c < chords.length; c++) {
      var cx = pad.left + c * colW + colW / 2;
      var chord = chords[c];
      var color = colors[c % colors.length];

      for (var n = 0; n < chord.length; n++) {
        var step = chord[n];
        var ny = pad.top + gh - (step / 14) * gh;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        ctx.fillRect(cx - 14, ny - 8, 28, 16);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#111";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(String(step % 12), cx, ny + 4);
      }

      if (c > 0) {
        var prev = chords[c - 1];
        var pcx = pad.left + (c - 1) * colW + colW / 2;
        for (var v = 0; v < Math.min(prev.length, chord.length); v++) {
          var py = pad.top + gh - (prev[v] / 14) * gh;
          var cy2 = pad.top + gh - (chord[v] / 14) * gh;
          ctx.beginPath();
          ctx.moveTo(pcx + 14, py);
          ctx.lineTo(cx - 14, cy2);
          ctx.strokeStyle = "rgba(255,255,255,0.3)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.fillStyle = "#aaa";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("{" + chord.map(function(s) { return s % 12; }).join(",") + "}", cx, h - 6);
    }

    var D = totalMovement(chords);
    info.textContent = "Progression: " + chords.map(function(ch) { return "{" + ch.map(function(s) { return s % 12; }).join(",") + "}"; }).join(" \u2192 ") + " | Total D: " + D + " (" + prog.western + ")";
  }

  var presetBtns = document.querySelectorAll(".cp-preset");
  for (var i = 0; i < presetBtns.length; i++) {
    presetBtns[i].addEventListener("click", function() {
      for (var j = 0; j < presetBtns.length; j++) presetBtns[j].classList.remove("active");
      this.classList.add("active");
      currentIdx = parseInt(this.dataset.idx);
      drawGrid();
    });
  }

  document.getElementById("cp-play").addEventListener("click", function() {
    var prog = progressions[currentIdx];
    Tone.start().then(function() {
      var synth = new Tone.PolySynth(Tone.Synth, {oscillator: {type: "sine"}, envelope: {attack: 0.05, decay: 0.1, sustain: 0.6, release: 0.3}}).toDestination();
      var now = Tone.now();
      for (var c = 0; c < prog.chords.length; c++) {
        var freqs = prog.chords[c].map(function(step) { return 261.63 * Math.pow(2, step / 12); });
        synth.triggerAttackRelease(freqs, 0.7, now + c * 0.85);
      }
      setTimeout(function() { synth.dispose(); }, Math.round(prog.chords.length * 850) + 800);
    });
  });

  drawGrid();
})();
});
</script>

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Step-combo sequence | Chord progression | Same concept, literalized representation |
| Total movement D | Voice-leading smoothness | Quantitative movement metric |
| Stable high-fusion set | Tonic-like arrival | Function language avoided in core text |
| Tension-resolution arc | Cadential motion | Framed as spectral/predictive dynamics |

## Connections

- [Chords](chords.md) — defines step-combos used as progression states
- [Intervals](intervals.md) — step-interval metric underlying movement cost
- [Consonance & Dissonance](consonance-dissonance.md) — explains fusion and roughness basis of stability
- [Rhythm](rhythm.md) — progression is always embedded in onset timing
- [Scales](scales.md) — progression choices are constrained by selected step-subset
- [Notation Layer](notation-layer.md) — progression trajectories are visualizable as geometric shifts
