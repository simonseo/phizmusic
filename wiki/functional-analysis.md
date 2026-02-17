---
title: Functional Analysis
aliases: [Roman numeral analysis, harmonic function, key analysis]
tier: 2
category: harmony
sidebar_order: 2
tags: [harmony, analysis, chord-function]
prerequisites: [chords.md, scales.md, chord-progressions.md, naming-system.md]
related: [chord-progressions.md, chords.md, scales.md, step-7-cycle.md]
scope-boundary: Functional analysis translated to PhizMusic. Historical Western theory context only in Translation Table.
has_audio: true
---

# Functional Analysis

Functional analysis asks: **given a step-subset and a root, what role does each step-combo play?** Every member of the step-subset can serve as the bottom note of a triad built from that subset. Some of those triads sound stable, others tense, others transitional. The physics of *why* comes down to ratio-set quality and step-interval relationships between roots.

> 🎯 **Simple version**: Pick a scale (step-subset) and a home note (root). You can build a chord on each note of the scale. Some chords feel like "home," some feel like "tension," some feel like "pull toward home." Functional analysis is the system for labeling those roles — Position 0 is home, Position 4 pulls hardest toward home.

## Step-Subsets as Tonal Centers

A "key" in Western theory is two things combined:

1. **A step-subset** — which pitches are available (the scale's structure)
2. **A root step-number** — which pitch is "home" (the tonal anchor)

In PhizMusic, this is explicit: "step-subset {0,2,4,5,7,9,11} rooted at step 0" means the major scale starting on Do. Change the root to step 5 and you get "step-subset {5,7,9,10,0,2,4}" — the same internal structure transposed, now anchored on Fa.

The root step-number defines the reference frequency. All other pitches in the subset are heard *relative to* this anchor. The auditory system builds expectations around returning to this reference — that pull is the foundation of tonal music.

**Why a root creates gravity**: the root's harmonics overlap most strongly with the harmonic series of the step-subset's most consonant intervals (the 7-step-interval, the 5-step-interval). The auditory system's [harmonic template matching](ear-cochlea.md) reinforces the root as a perceptual anchor.

## Positions Within a Step-Subset

Given a 7-member step-subset, each member can generate a **triad** by stacking every-other member of the subset. This is the PhizMusic equivalent of "building a chord on each scale degree."

The procedure:

1. Pick a member of the step-subset (this is the Position number, 0-indexed)
2. From that member, skip one subset member and take the next (the "third")
3. Skip one more and take the next (the "fifth")

The result is a 3-note step-combo built entirely from the step-subset. Different positions produce step-combos with different interval structures — and therefore different ratio-set approximations and different perceptual qualities.

## The Position Table

For step-subset **{0, 2, 4, 5, 7, 9, 11}** (major) rooted at step 0:

| Position | Subset members used | Step-combo | Intervals | Approx. ratio-set | Quality |
|----------|-------------------|----------|-----------|-------------------|---------|
| 0 | 0, 4, 7 | {0, 4, 7} | 4 + 3 | 4:5:6 | Bright, stable |
| 1 | 2, 5, 9 | {2, 5, 9} | 3 + 4 | 10:12:15 | Dark, warm |
| 2 | 4, 7, 11 | {4, 7, 11} | 3 + 4 | 10:12:15 | Dark, warm |
| 3 | 5, 9, 0(+12) | {5, 9, 0} | 4 + 3 | 4:5:6 | Bright, stable |
| 4 | 7, 11, 2(+12) | {7, 11, 2} | 4 + 3 | 4:5:6 | Bright, tense (wants to resolve) |
| 5 | 9, 0(+12), 4(+12) | {9, 0, 4} | 3 + 4 | 10:12:15 | Dark, gentle |
| 6 | 11, 2(+12), 5(+12) | {11, 2, 5} | 3 + 3 | ≈25:30:36 | Tense, unstable |

<table>
  <thead>
    <tr><th>Position</th><th>Step-combo</th><th>Preview</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td><td>{0, 4, 7}</td><td><button class="phiz-play-btn" data-steps="[0,4,7]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr><td>1</td><td>{2, 5, 9}</td><td><button class="phiz-play-btn" data-steps="[2,5,9]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr><td>2</td><td>{4, 7, 11}</td><td><button class="phiz-play-btn" data-steps="[4,7,11]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr><td>3</td><td>{5, 9, 12}</td><td><button class="phiz-play-btn" data-steps="[5,9,12]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr><td>4</td><td>{7, 11, 14}</td><td><button class="phiz-play-btn" data-steps="[7,11,14]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr><td>5</td><td>{9, 12, 16}</td><td><button class="phiz-play-btn" data-steps="[9,12,16]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr><td>6</td><td>{11, 14, 17}</td><td><button class="phiz-play-btn" data-steps="[11,14,17]" onclick="playStepSet(this)">▶</button></td></tr>
  </tbody>
</table>

**Pattern**: Positions 0, 3, and 4 produce step-combos with interval structure 4+3 (ratio ≈ 4:5:6). Positions 1, 2, and 5 produce 3+4 (ratio ≈ 10:12:15). Position 6 produces 3+3 (diminished — no strong harmonic-series alignment). The quality of each position is determined entirely by the step-subset's geometry.

## Tension and Resolution

The most powerful directional pull in tonal music is **Position 4 → Position 0**. Why?

The root of Position 4 sits at the 7-step-interval from the root of Position 0. The 7-step-interval corresponds to the frequency ratio 3:2 — the strongest consonance after the octave. The [step-7 cycle](step-7-cycle.md) explains this relationship in depth: step-7 is the generator of the diatonic system itself.

But Position 4's step-combo also contains step 11 — which sits at the 1-step-interval from step 0 (the root of Position 0). This 1-step-interval relationship creates maximum melodic tension: the ear expects step 11 to resolve upward to step 0. When it does, that tiny motion produces a disproportionately strong sense of arrival.

The combination of:
- **Strong root relationship** (the 7-step-interval between roots)
- **Leading-tone pull** (step 11 → step 0, distance of 1)

makes Position 4 → Position 0 the most powerful resolution in the 7-member step-subset system.

**Position 3 → Position 0** is the second-strongest pull. The root of Position 3 sits at the 5-step-interval from Position 0's root — the ratio 4:3, also highly consonant. But Position 3 lacks the leading-tone (step 11 is not in its step-combo), so the resolution is softer.

## Common Patterns

Progressions expressed as Position sequences (for the major step-subset rooted at step 0):

| Pattern | Step-combos | Character |
|---------|----------|-----------|
| 0 – 3 – 4 – 0 | {0,4,7} → {5,9,0} → {7,11,2} → {0,4,7} | The foundational closed loop. Depart, build tension, resolve. |
| 0 – 4 – 5 – 3 | {0,4,7} → {7,11,2} → {9,0,4} → {5,9,0} | Tension first, then gradual descent back toward stability. |
| 0 – 5 – 3 – 4 | {0,4,7} → {9,0,4} → {5,9,0} → {7,11,2} | The "pop progression" — cycles through all three quality types. |
| 1 – 4 – 0 | {2,5,9} → {7,11,2} → {0,4,7} | Strong cadential approach — Position 1's dark quality sets up Position 4's tension. |

These patterns are not rules. They are commonly observed sequences whose perceptual effects (tension, resolution, surprise) are explained by the voice-leading distances and ratio-set qualities described in [chord-progressions.md](chord-progressions.md).

## The Interactive

<div class="phiz-viz-container" id="fa-func-explorer">
  <div class="phiz-viz-title">Chord Function Explorer</div>

  <div class="phiz-viz-controls" id="fa-root-controls">
    <span style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-right:6px;">Root:</span>
  </div>

  <div class="phiz-viz-controls" id="fa-subset-controls" style="margin-top:6px;">
    <span style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-right:6px;">Step-subset:</span>
  </div>

  <div class="phiz-viz-controls" id="fa-position-controls" style="margin-top:8px;">
    <span style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-right:6px;">Position:</span>
  </div>

  <div id="fa-func-info" style="color:rgba(255,255,255,0.85);font-size:0.9rem;margin:12px 0 6px;text-align:center;font-family:monospace;"></div>

  <div id="fa-all-positions" style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;margin:8px 0;"></div>

  <canvas id="fa-func-canvas" height="120" style="width:100%;"></canvas>
</div>

<script>
window.addEventListener('load', function() {
(function () {
  "use strict";

  var DODEKA = ["Do", "Ka", "Re", "Xo", "Mi", "Fa", "Hu", "So", "Bi", "La", "Ve", "Si"];
  var BASE_FREQ = 261.63;

  var SUBSETS = [
    { name: "Major {0,2,4,5,7,9,11}", steps: [0, 2, 4, 5, 7, 9, 11] },
    { name: "Natural Minor {0,2,3,5,7,8,10}", steps: [0, 2, 3, 5, 7, 8, 10] },
    { name: "Harmonic Minor {0,2,3,5,7,8,11}", steps: [0, 2, 3, 5, 7, 8, 11] }
  ];

  var WESTERN_MAJOR = ["I", "ii", "iii", "IV", "V", "vi", "vii\u00B0"];
  var WESTERN_NAT_MINOR = ["i", "ii\u00B0", "III", "iv", "v", "VI", "VII"];
  var WESTERN_HARM_MINOR = ["i", "ii\u00B0", "III+", "iv", "V", "VI", "vii\u00B0"];

  var KNOWN_RATIOS = {
    "4,3": "4:5:6",
    "3,4": "10:12:15",
    "3,3": "\u224825:30:36",
    "4,4": "\u224816:20:25"
  };

  var rootStep = 0;
  var subsetIdx = 0;
  var selectedPos = 0;
  var synths = [];

  // --- DOM refs ---
  var rootControls = document.getElementById("fa-root-controls");
  var subsetControls = document.getElementById("fa-subset-controls");
  var posControls = document.getElementById("fa-position-controls");
  var infoDiv = document.getElementById("fa-func-info");
  var allPosDiv = document.getElementById("fa-all-positions");
  var canvas = document.getElementById("fa-func-canvas");

  // --- Build root buttons ---
  var rootBtns = [];
  for (var r = 0; r < 12; r++) {
    var rb = document.createElement("button");
    rb.textContent = DODEKA[r];
    rb.setAttribute("data-root", String(r));
    rb.style.minWidth = "36px";
    rb.addEventListener("click", (function (step) {
      return function () {
        rootStep = step;
        updateAll();
      };
    })(r));
    rootControls.appendChild(rb);
    rootBtns.push(rb);
  }

  // --- Build subset buttons ---
  var subsetBtns = [];
  for (var s = 0; s < SUBSETS.length; s++) {
    var sb = document.createElement("button");
    sb.textContent = SUBSETS[s].name;
    sb.setAttribute("data-subset", String(s));
    sb.style.fontSize = "0.75rem";
    sb.addEventListener("click", (function (idx) {
      return function () {
        subsetIdx = idx;
        selectedPos = 0;
        updateAll();
      };
    })(s));
    subsetControls.appendChild(sb);
    subsetBtns.push(sb);
  }

  // --- Build position buttons ---
  var posBtns = [];
  for (var p = 0; p < 7; p++) {
    var pb = document.createElement("button");
    pb.textContent = "Pos " + p;
    pb.setAttribute("data-pos", String(p));
    pb.addEventListener("click", (function (pos) {
      return function () {
        selectedPos = pos;
        updateAll();
        playPosition(pos);
      };
    })(p));
    posControls.appendChild(pb);
    posBtns.push(pb);
  }

  function getSubsetSteps() {
    var base = SUBSETS[subsetIdx].steps;
    var result = [];
    for (var i = 0; i < base.length; i++) {
      result.push((base[i] + rootStep) % 12);
    }
    return result;
  }

  function getPositionStepSet(pos) {
    var sub = getSubsetSteps();
    var size = sub.length;
    var root = sub[pos % size];
    var third = sub[(pos + 2) % size];
    var fifth = sub[(pos + 4) % size];
    return [root, third, fifth];
  }

  function getIntervalStructure(stepSet) {
    var a = ((stepSet[1] - stepSet[0]) % 12 + 12) % 12;
    var b = ((stepSet[2] - stepSet[1]) % 12 + 12) % 12;
    return [a, b];
  }

  function getRatioLabel(intervals) {
    var key = intervals[0] + "," + intervals[1];
    return KNOWN_RATIOS[key] || "complex";
  }

  function getWesternLabel(pos) {
    if (subsetIdx === 0) return WESTERN_MAJOR[pos] || "";
    if (subsetIdx === 1) return WESTERN_NAT_MINOR[pos] || "";
    if (subsetIdx === 2) return WESTERN_HARM_MINOR[pos] || "";
    return "";
  }

  function formatStepSet(ss) {
    return "{" + ss.join(", ") + "}";
  }

  function stopAll() {
    for (var i = 0; i < synths.length; i++) {
      try { synths[i].dispose(); } catch (e) { /* ignore */ }
    }
    synths = [];
  }

  function playPosition(pos) {
    stopAll();
    Tone.start().then(function () {
      var ss = getPositionStepSet(pos);
      for (var i = 0; i < ss.length; i++) {
        var freq = BASE_FREQ * Math.pow(2, ((ss[i] - rootStep + 12) % 12) / 12) * Math.pow(2, rootStep / 12);
        var synth = new Tone.Synth({
          oscillator: { type: "triangle" },
          envelope: { attack: 0.02, decay: 0.3, sustain: 0.4, release: 0.5 }
        }).toDestination();
        synth.volume.value = -12;
        synth.triggerAttackRelease(freq, "2n");
        synths.push(synth);
      }
    });
  }

  function updateAll() {
    var i;

    // Update root button styles
    for (i = 0; i < rootBtns.length; i++) {
      rootBtns[i].className = (i === rootStep) ? "active" : "";
    }

    // Update subset button styles
    for (i = 0; i < subsetBtns.length; i++) {
      subsetBtns[i].className = (i === subsetIdx) ? "active" : "";
    }

    // Update position button styles
    for (i = 0; i < posBtns.length; i++) {
      posBtns[i].className = (i === selectedPos) ? "active" : "";
    }

    // Current position info
    var ss = getPositionStepSet(selectedPos);
    var intervals = getIntervalStructure(ss);
    var ratio = getRatioLabel(intervals);
    var western = getWesternLabel(selectedPos);

    var infoText = "Position " + selectedPos + " | Step-combo: " + formatStepSet(ss) +
      " | Ratio-set: \u2248 " + ratio;
    if (western) {
      infoText = infoText + " | Western: " + western;
    }
    infoDiv.textContent = infoText;

    // All positions summary
    allPosDiv.innerHTML = "";
    for (i = 0; i < 7; i++) {
      var pss = getPositionStepSet(i);
      var pint = getIntervalStructure(pss);
      var prat = getRatioLabel(pint);
      var pw = getWesternLabel(i);

      var card = document.createElement("div");
      card.style.cssText = "padding:6px 10px;border-radius:6px;font-family:monospace;font-size:0.75rem;text-align:center;cursor:pointer;min-width:90px;" +
        "background:" + ((i === selectedPos) ? "rgba(0,229,255,0.15)" : "rgba(255,255,255,0.05)") + ";" +
        "border:1px solid " + ((i === selectedPos) ? "rgba(0,229,255,0.4)" : "rgba(255,255,255,0.1)") + ";" +
        "color:" + ((i === selectedPos) ? "#00e5ff" : "rgba(255,255,255,0.6)") + ";";

      card.innerHTML = "<div style=\"font-size:0.85rem;font-weight:bold;\">Pos " + i + "</div>" +
        "<div>" + formatStepSet(pss) + "</div>" +
        "<div style=\"font-size:0.65rem;opacity:0.7;\">" + prat + (pw ? " (" + pw + ")" : "") + "</div>";

      card.addEventListener("click", (function (pos) {
        return function () {
          selectedPos = pos;
          updateAll();
          playPosition(pos);
        };
      })(i));

      allPosDiv.appendChild(card);
    }

    drawChromatic();
  }

  function drawChromatic() {
    if (typeof PhizViz === "undefined") return;
    var fit = PhizViz.fitCanvas(canvas);
    var w = fit.w;
    var h = fit.h;
    var ctx = fit.ctx;

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    var pad = 20;
    var stripH = 50;
    var stripY = (h - stripH) / 2;
    var cellW = (w - pad * 2) / 12;

    var subset = getSubsetSteps();
    var ss = getPositionStepSet(selectedPos);

    // Draw 12 chromatic cells
    for (var i = 0; i < 12; i++) {
      var x = pad + i * cellW;
      var inSubset = false;
      var inStepSet = false;

      for (var j = 0; j < subset.length; j++) {
        if (subset[j] === i) { inSubset = true; break; }
      }
      for (var k = 0; k < ss.length; k++) {
        if (ss[k] === i) { inStepSet = true; break; }
      }

      // Cell background
      if (inStepSet) {
        ctx.fillStyle = "rgba(0,229,255,0.3)";
      } else if (inSubset) {
        ctx.fillStyle = "rgba(255,255,255,0.08)";
      } else {
        ctx.fillStyle = "rgba(255,255,255,0.02)";
      }
      ctx.fillRect(x + 1, stripY, cellW - 2, stripH);

      // Cell border
      if (inStepSet) {
        ctx.strokeStyle = "rgba(0,229,255,0.6)";
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 1;
      }
      ctx.strokeRect(x + 1, stripY, cellW - 2, stripH);

      // Label
      ctx.fillStyle = inStepSet ? "#00e5ff" : (inSubset ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)");
      ctx.font = (inStepSet ? "bold " : "") + "11px PT Sans, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(DODEKA[i], x + cellW / 2, stripY + stripH / 2 - 8);
      ctx.font = "9px monospace";
      ctx.fillText(String(i), x + cellW / 2, stripY + stripH / 2 + 10);

      // Root marker
      if (i === rootStep) {
        ctx.fillStyle = "#ff6090";
        ctx.font = "bold 9px PT Sans, sans-serif";
        ctx.fillText("root", x + cellW / 2, stripY - 8);
      }
    }
  }

  // --- Initial state ---
  updateAll();
})();
});
</script>

## Other Step-Subsets

The position table above uses the major step-subset. Different step-subsets generate different quality distributions:

**Natural minor {0, 2, 3, 5, 7, 8, 10}** rooted at step 0:

| Position | Step-combo | Intervals | Quality |
|----------|----------|-----------|---------|
| 0 | {0, 3, 7} | 3 + 4 | Dark, warm |
| 1 | {2, 5, 8} | 3 + 3 | Tense, unstable |
| 2 | {3, 7, 10} | 4 + 3 | Bright, stable |
| 3 | {5, 8, 0} | 3 + 4 | Dark, warm |
| 4 | {7, 10, 2} | 3 + 4 | Dark (no leading-tone pull) |
| 5 | {8, 0, 3} | 4 + 3 | Bright, stable |
| 6 | {10, 2, 5} | 4 + 3 | Bright, stable |

Notice: Position 4 in the natural minor produces a 10:12:15 ratio-set instead of 4:5:6. The absence of the leading-tone (step 11, one step below root) weakens the resolution pull. This is why Western composers developed the **harmonic minor** — step-subset {0, 2, 3, 5, 7, 8, 11} — which raises step 10 to step 11, restoring the 4:5:6 ratio-set at Position 4 and the leading-tone resolution.

## Translation Table

| Western term | PhizMusic equivalent | Notes |
|-------------|---------------------|-------|
| Key of C major | Step-subset {0,2,4,5,7,9,11} rooted at step 0 | "Key" = step-subset + root step |
| Key of G major | Step-subset {0,2,4,5,7,9,11} rooted at step 7 | Same subset structure, different root |
| Scale degree | Position within the step-subset (0-indexed) | Western uses 1-indexed |
| I (tonic) | Position 0 | Home step-combo |
| ii (supertonic) | Position 1 | First dark-quality position |
| iii (mediant) | Position 2 | Second dark-quality position |
| IV (subdominant) | Position 3 | Bright, second-strongest pull |
| V (dominant) | Position 4 | Bright, strongest pull (root at the 7-step-interval) |
| vi (submediant) | Position 5 | Dark, gentle |
| vii° (leading tone) | Position 6 | Diminished, maximum instability |
| Tonic function | Position 0 step-combo (highest stability) | Stable arrival point |
| Dominant function | Position 4 step-combo (maximum pull toward Position 0) | Tension seeking resolution |
| Subdominant function | Position 3 step-combo (departure from stability) | Transitional |
| Roman numeral analysis | Position-number analysis | Same system, 0-indexed, no cultural naming |
| Cadence (V → I) | Position 4 → Position 0 | The 7-step-interval root relationship + leading-tone |
| Plagal cadence (IV → I) | Position 3 → Position 0 | The 5-step-interval root relationship |

## Connections

- [Chord Progressions](chord-progressions.md) — step-combo sequences and voice-leading metrics that underlie position movement
- [Chords](chords.md) — step-combo and ratio-set definitions used to describe each position's triad
- [Scales](scales.md) — step-subsets from which positions and their step-combos are derived
- [Step-7 Cycle](step-7-cycle.md) — the 7-step-interval relationship that makes Position 4 → Position 0 the strongest resolution
- [Consonance & Dissonance](consonance-dissonance.md) — why some positions sound stable and others tense
- [Naming System](naming-system.md) — step-number and Dodeka syllable conventions
