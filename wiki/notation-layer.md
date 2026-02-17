---
title: Notation Layer
aliases: [notation, chromatic grid, piano roll, Dodeka]
tier: 2
tags: [notation, visualization, mapping]
prerequisites: [naming-system.md, scales.md, twelve-tet.md]
related: [naming-system.md, scales.md, intervals.md, twelve-tet.md, digital-audio.md, translation-tables.md]
scope-boundary: Describes existing notation systems (Dodeka and piano roll) plus a continuous log-frequency overlay concept. No new symbols or software implementation.
has_audio: true
---

# Notation Layer

PhizMusic uses an existing notation family: the **chromatic grid** used by Dodeka and DAW piano roll editors. The vertical axis is pitch (12 equal rows per octave), the horizontal axis is time. This representation is isomorphic: the same interval always has the same visual distance, and transposition is a geometric shift instead of a spelling problem.

> 🎯 **Simple version**: Instead of the confusing 5-line staff with sharps and flats, we use a grid: 12 rows (one per note), time going left to right. Like a piano keyboard unrolled. Any pattern looks the same no matter where you start.

## Core Representation: Chromatic Grid

The notation layer has two axes:

- **Vertical (pitch)**: one row per chromatic step, repeating every octave
- **Horizontal (time)**: onset and duration drawn proportionally (like a timeline)

For one octave, the rows are:

| Step | Syllable | Row meaning |
|------|----------|-------------|
| 0 | Do | Base row of cycle |
| 1 | Ka | +1 step |
| 2 | Re | +2 steps |
| 3 | Xo | +3 steps |
| 4 | Mi | +4 steps |
| 5 | Fa | +5 steps |
| 6 | Hu | +6 steps |
| 7 | So | +7 steps |
| 8 | Bi | +8 steps |
| 9 | La | +9 steps |
| 10 | Ve | +10 steps |
| 11 | Si | +11 steps |

Octave index gives absolute position (for example, Do4, Ka4, ... Si4, then Do5).

## Why This Is Better for Pattern Reasoning

Traditional 5-line staff notation is tied to a 7-letter spelling system (A-B-C-D-E-F-G) with accidentals and enharmonic aliases. The chromatic grid removes that indirection.

Key consequences:

1. **Transposition is translation**: add a constant step to every note, and the shape stays identical.
2. **Intervals are visual invariants**: the 7-step-interval always looks like 7 rows, everywhere.
3. **Rhythm is explicit geometry**: duration is literal horizontal length.
4. **No enharmonic ambiguity**: each step has one canonical identity.

This directly matches PhizMusic arithmetic from [naming-system.md](naming-system.md), [intervals.md](intervals.md), and [scales.md](scales.md).

## Dodeka and Piano Roll: Two Faces of the Same Geometry

## Dodeka

Dodeka (Jacques-Daniel Rochat) is a chromatic notation system that assigns one unique syllable to each chromatic step and uses a compact 4-line staff layout with alternating note positions. It keeps interval geometry consistent while staying readable for score-like notation.

PhizMusic uses Dodeka's naming and chromatic-equality philosophy, with explicit attribution to the original system: [https://dodekamusic.com/](https://dodekamusic.com/).

## Piano Roll

Piano roll notation originates from mechanical player-piano media and became the dominant representation in modern DAWs. It has three formal properties that align with PhizMusic:

- **Chromatic completeness**: all 12 steps are represented uniformly
- **Isomorphic layout**: interval shapes are invariant under transposition
- **Time proportionality**: note length and spacing are directly visible

Because of these properties, piano roll is the de facto analysis and production view in electronic music, film scoring workflows, and MIDI editing.

## Continuous Log-Frequency Overlay

The chromatic grid is the discrete base layer. For tuning systems that are not locked to 12-TET (just intonation, microtonal inflection, blue-note bends), PhizMusic adds a conceptual overlay:

- Keep the 12-step grid as reference coordinates
- Superimpose a **continuous log-frequency axis**
- Allow note events to sit between nominal grid rows

This preserves two goals at once:

1. **Discrete compositional structure** (step-combos, scales, progressions)
2. **Continuous intonation detail** (real performance frequencies)

In equation form:

```text
pitch position = discrete_step + cent_offset/100
```

where `cent_offset` can be positive or negative relative to the 12-TET row.

## Psychoacoustics Connection

Human pitch perception is approximately logarithmic: equal ratios feel like equal steps. A chromatic grid with equal vertical spacing per step better matches this perceptual structure than diatonic staff spacing, where visual distances depend on notation spelling conventions.

So the notation layer is not just simpler; it is also closer to how the auditory system organizes pitch categories.

<div class="phiz-viz-container" id="nl-notation">
<div class="phiz-viz-title">Notation Toggle</div>
<canvas id="nl-notation-canvas" height="300" style="width:100%;"></canvas>
<div class="phiz-viz-controls">
<button class="nl-view active" data-view="grid">Chromatic Grid</button>
<button class="nl-view" data-view="roll">Piano Roll</button>
<button class="nl-view" data-view="nums">Step Numbers</button>
<label>Transpose: <input type="range" id="nl-transpose" min="-6" max="6" step="1" value="0"> <span class="slider-value" id="nl-tr-val">0</span></label>
<button id="nl-play">▶ Play</button>
</div>
<div id="nl-info" style="color:#aaa; font-size:0.85rem; padding:4px 8px;"></div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  "use strict";
  var canvas = document.getElementById("nl-notation-canvas");
  var info = document.getElementById("nl-info");
  var SYLLABLES = ["Do","Ka","Re","Xo","Mi","Fa","Hu","So","Bi","La","Ve","Si"];
  var melody = [0, 2, 4, 5, 7, 9, 11, 12];
  var currentView = "grid";

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

  function getTranspose() {
    return parseInt(document.getElementById("nl-transpose").value);
  }

  function transposedMelody() {
    var tr = getTranspose();
    return melody.map(function(s) { return s + tr; });
  }

  function drawGrid(ctx, w, h, notes) {
    var pad = {left: 50, right: 20, top: 15, bottom: 15};
    var gw = w - pad.left - pad.right;
    var gh = h - pad.top - pad.bottom;

    for (var s = 0; s <= 13; s++) {
      var y = pad.top + gh - (s / 13) * gh;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();
      if (s <= 11) {
        ctx.fillStyle = "#666";
        ctx.font = "10px monospace";
        ctx.textAlign = "right";
        ctx.fillText(SYLLABLES[s], pad.left - 5, y + 3);
      }
    }

    var colW = gw / notes.length;
    for (var i = 0; i < notes.length; i++) {
      var nx = pad.left + i * colW + colW * 0.2;
      var nw = colW * 0.6;
      var step = notes[i];
      var ny = pad.top + gh - (step / 13) * gh;
      ctx.fillStyle = "#00e5ff";
      ctx.globalAlpha = 0.85;
      ctx.fillRect(nx, ny - 6, nw, 12);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#111";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(String(((step % 12) + 12) % 12), nx + nw / 2, ny + 4);
    }
  }

  function drawRoll(ctx, w, h, notes) {
    var pad = {left: 30, right: 20, top: 15, bottom: 15};
    var gw = w - pad.left - pad.right;
    var gh = h - pad.top - pad.bottom;
    var colW = gw / notes.length;

    for (var i = 0; i < notes.length; i++) {
      var step = notes[i];
      var ny = pad.top + gh - (step / 13) * gh;
      var nx = pad.left + i * colW + colW * 0.15;
      var nw = colW * 0.7;
      ctx.fillStyle = "#00e5ff";
      ctx.globalAlpha = 0.85;
      ctx.fillRect(nx, ny - 5, nw, 10);
      ctx.globalAlpha = 1;
    }
  }

  function drawNums(ctx, w, h, notes) {
    var pad = {left: 30, right: 20, top: 30, bottom: 30};
    var gw = w - pad.left - pad.right;
    var colW = gw / notes.length;
    var cy = h / 2;

    for (var i = 0; i < notes.length; i++) {
      var step = notes[i];
      var disp = ((step % 12) + 12) % 12;
      var nx = pad.left + i * colW + colW / 2;
      ctx.fillStyle = "#00e5ff";
      ctx.font = "bold 32px monospace";
      ctx.textAlign = "center";
      ctx.fillText(String(disp), nx, cy + 12);
      ctx.fillStyle = "#666";
      ctx.font = "12px sans-serif";
      ctx.fillText(SYLLABLES[disp], nx, cy + 30);
    }
  }

  function redraw() {
    var fit = fitCanvas();
    var ctx = fit.ctx;
    var w = fit.w;
    var h = fit.h;
    var notes = transposedMelody();
    var tr = getTranspose();

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    if (currentView === "grid") drawGrid(ctx, w, h, notes);
    else if (currentView === "roll") drawRoll(ctx, w, h, notes);
    else drawNums(ctx, w, h, notes);

    document.getElementById("nl-tr-val").textContent = (tr >= 0 ? "+" : "") + tr;
    var rootStep = ((0 + tr) % 12 + 12) % 12;
    info.textContent = "Transpose: " + (tr >= 0 ? "+" : "") + tr + " steps | Root: " + SYLLABLES[rootStep] + " | View: " + currentView;
  }

  var viewBtns = document.querySelectorAll(".nl-view");
  for (var i = 0; i < viewBtns.length; i++) {
    viewBtns[i].addEventListener("click", function() {
      for (var j = 0; j < viewBtns.length; j++) viewBtns[j].classList.remove("active");
      this.classList.add("active");
      currentView = this.dataset.view;
      redraw();
    });
  }

  document.getElementById("nl-transpose").addEventListener("input", redraw);

  document.getElementById("nl-play").addEventListener("click", function() {
    var notes = transposedMelody();
    Tone.start().then(function() {
      var synth = new Tone.Synth({oscillator: {type: "sine"}, envelope: {attack: 0.05, decay: 0.1, sustain: 0.4, release: 0.2}}).toDestination();
      var now = Tone.now();
      for (var i = 0; i < notes.length; i++) {
        var freq = 261.63 * Math.pow(2, notes[i] / 12);
        synth.triggerAttackRelease(freq, 0.25, now + i * 0.3);
      }
      setTimeout(function() { synth.dispose(); }, Math.round(notes.length * 300) + 500);
    });
  });

  redraw();
})();
});
</script>

## Translation Table

| PhizMusic | Western | Other Systems |
|-----------|---------|---------------|
| Chromatic grid notation | Piano roll (closest equivalent) | Dodeka chromatic staff |
| Step row | Semitone row | MIDI note lane |
| Shape-preserving transposition | Transpose up/down by interval | Pattern shift in sequencer |
| Continuous log-frequency overlay | Microtonal pitch bend layer | Cents deviation display |

## Connections

- [Naming System](naming-system.md) — defines the step and syllable identities placed on the grid
- [Scales](scales.md) — scales are row subsets on this grid
- [Intervals](intervals.md) — each interval is a fixed row-distance
- [Twelve-TET](twelve-tet.md) — defines the default row spacing in frequency ratio terms
- [Chord Progressions](chord-progressions.md) — progression shapes become visual trajectories
- [Digital Audio](digital-audio.md) — MIDI and DAW workflows use this representation directly
- [Translation Tables](translation-tables.md) — maps notation vocabulary to conventional terms
