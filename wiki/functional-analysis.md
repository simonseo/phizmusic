---
title: Functional Analysis
aliases: [Roman numeral analysis, harmonic function, key analysis]
tier: 2
category: systems
sidebar_order: 5
tags: [harmony, analysis, chord-function]
prerequisites: [chords.md, scales.md, chord-progressions.md, naming-system.md]
related: [chord-progressions.md, chords.md, scales.md, step-7-cycle.md]
scope-boundary: Functional analysis translated to PhizMusic. Historical Western theory context only in Translation Table.
has_audio: true
---

# Functional Analysis

Functional analysis asks: **given a step-subset and a root, what role does each step-combo play?** Every member of the step-subset can serve as the bottom note of a triad built from that subset. Some of those triads sound stable, others tense, others transitional. The physics of *why* comes down to ratio-set quality and step-interval relationships between roots.

> 🎯 **Simple version**: Pick a scale (step-subset) and a home note (root). You can build a chord on each scale note. Some chords feel like "home," some feel like "tension," some feel like "pull toward home." Functional analysis labels those roles — **Position 0** is home, **Position 7** (root a 7-step-interval above home) pulls hardest toward home. Position numbers are chromatic step-numbers (0-11), so non-scale positions have no triad and are skipped.

## Step-Subsets as Tonal Centers

A "key" in Western theory is two things combined:

1. **A step-subset** — which pitches are available (the scale's structure)
2. **A root step-number** — which pitch is "home" (the tonal anchor)

In PhizMusic, this is explicit: "step-subset {0,2,4,5,7,9,11} rooted at step 0" means the major scale starting on Do. Change the root to step 7 and you get "step-subset {7,9,11,0,2,4,6}" — the same internal structure transposed, now anchored on So.

The root step-number defines the reference frequency. All other pitches in the subset are heard *relative to* this anchor. The auditory system builds expectations around returning to this reference — that pull is the foundation of tonal music.

**Why a root creates gravity**: the root's harmonics overlap most strongly with the harmonic series of the step-subset's most consonant intervals (the 7-step-interval, the 5-step-interval). The auditory system's [harmonic template matching](ear-cochlea.md) reinforces the root as a perceptual anchor.

## What "Key of…" Means in PhizMusic

In Western theory, "Key of C major" is a compact label. In PhizMusic, it unpacks into two explicit pieces of information:

1. **Step-subset pattern** — {0, 2, 4, 5, 7, 9, 11} (the major pattern)
2. **Root step-number** — step 0 (Do, 261.63 Hz)

"Key of G major" is the **same geometric pattern** rooted at a different starting position: step 7 (So, ≈392.00 Hz). The resulting step-subset is {7, 9, 11, 0, 2, 4, 6} — identical interval structure, different absolute pitches.

**Changing key = transposition = same geometry, different starting point on the 12-step circle.** Every relationship between positions is preserved: the triad at the root is still 4+3, the triad 7 steps above the root is still 4+3 with a leading-tone pull, and so on. Only the absolute frequencies change.

### Why the root creates perceptual gravity

The root frequency's harmonics align most strongly with the step-subset's most consonant intervals:

- **Do4 = 261.63 Hz** is the root. Its second harmonic is 523.25 Hz (Do5, octave).
- Its third harmonic is 784.88 Hz. The nearest step-subset member is **So4 = 392.00 Hz**, whose octave is 784.00 Hz — almost exactly the root's third harmonic.
- This means the 7-step-interval (Do→So, ratio ≈ 3:2) has the strongest harmonic overlap with the root after the octave.
- The result: **Position 7's triad root (So) has the strongest harmonic bond with the root (Do)**, which is why Position 7 → Position 0 is the most powerful resolution.

In "Key of step 0 major," Do4 = 261.63 Hz is home. The most consonant interval is the 7-step-interval: 261.63 × 3/2 ≈ 392 Hz (So). This is why Position 7 has the strongest pull back to Position 0.

### Modulation

**Modulation = changing the root = reorienting the listener's harmonic template around a new reference frequency.** If a piece moves from "step-subset rooted at step 0" to "step-subset rooted at step 7," every position relationship is preserved — but the listener's sense of "home" shifts from 261.63 Hz to 392.00 Hz. The brain's harmonic template matcher recalibrates, and what was Position 7 becomes Position 0 in the new key.

## Positions Within a Step-Subset

Given a 7-member step-subset, each member can generate a **triad** by stacking every-other member of the subset. This is the PhizMusic equivalent of "building a chord on each scale degree."

The **Position number** equals the **chromatic step-number of the triad's root** (0-11). Steps that are not in the step-subset have no diatonic triad and are marked "—" in the table.

The procedure for building a triad at a given position:

1. The position's step must be a member of the step-subset
2. From that member, skip one subset member and take the next (the "third")
3. Skip one more and take the next (the "fifth")

The result is a 3-note step-combo built entirely from the step-subset. Different positions produce step-combos with different interval structures — and therefore different ratio-set approximations and different perceptual qualities.

## The Position Table

For step-subset **{0, 2, 4, 5, 7, 9, 11}** (major) rooted at step 0:

| Position | Root in subset? | Step-combo | Intervals | Approx. ratio-set | Quality |
|----------|----------------|----------|-----------|-------------------|---------|
| 0 (Do) | ✓ | {0, 4, 7} | 4 + 3 | 4:5:6 | Bright, stable — **home** |
| 1 (Ka) | — | — | — | — | *not in step-subset* |
| 2 (Re) | ✓ | {2, 5, 9} | 3 + 4 | 10:12:15 | Dark, warm |
| 3 (Xo) | — | — | — | — | *not in step-subset* |
| 4 (Mi) | ✓ | {4, 7, 11} | 3 + 4 | 10:12:15 | Dark, warm |
| 5 (Fa) | ✓ | {5, 9, 0} | 4 + 3 | 4:5:6 | Bright, stable |
| 6 (Hu) | — | — | — | — | *not in step-subset* |
| 7 (So) | ✓ | {7, 11, 2} | 4 + 3 | 4:5:6 | Bright, tense — **strongest pull to Pos 0** |
| 8 (Bi) | — | — | — | — | *not in step-subset* |
| 9 (La) | ✓ | {9, 0, 4} | 3 + 4 | 10:12:15 | Dark, gentle |
| 10 (Ve) | — | — | — | — | *not in step-subset* |
| 11 (Si) | ✓ | {11, 2, 5} | 3 + 3 | ≈25:30:36 | Tense, unstable — **diminished** |

<table>
  <thead>
    <tr><th>Position</th><th>Step-combo</th><th>Hz (root of triad at Do4 = 261.63 Hz)</th><th>Preview</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>0 (Do)</strong></td><td>{0, 4, 7}</td><td>261.63, 329.63, 392.00</td><td><button class="phiz-play-btn" data-steps="[0,4,7]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr style="opacity:0.35;"><td>1 (Ka)</td><td>—</td><td>—</td><td><button class="phiz-play-btn" disabled>—</button></td></tr>
    <tr><td><strong>2 (Re)</strong></td><td>{2, 5, 9}</td><td>293.66, 349.23, 440.00</td><td><button class="phiz-play-btn" data-steps="[2,5,9]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr style="opacity:0.35;"><td>3 (Xo)</td><td>—</td><td>—</td><td><button class="phiz-play-btn" disabled>—</button></td></tr>
    <tr><td><strong>4 (Mi)</strong></td><td>{4, 7, 11}</td><td>329.63, 392.00, 493.88</td><td><button class="phiz-play-btn" data-steps="[4,7,11]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr><td><strong>5 (Fa)</strong></td><td>{5, 9, 0}</td><td>349.23, 440.00, 523.25</td><td><button class="phiz-play-btn" data-steps="[5,9,12]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr style="opacity:0.35;"><td>6 (Hu)</td><td>—</td><td>—</td><td><button class="phiz-play-btn" disabled>—</button></td></tr>
    <tr><td><strong>7 (So)</strong></td><td>{7, 11, 2}</td><td>392.00, 493.88, 587.33</td><td><button class="phiz-play-btn" data-steps="[7,11,14]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr style="opacity:0.35;"><td>8 (Bi)</td><td>—</td><td>—</td><td><button class="phiz-play-btn" disabled>—</button></td></tr>
    <tr><td><strong>9 (La)</strong></td><td>{9, 0, 4}</td><td>440.00, 523.25, 659.26</td><td><button class="phiz-play-btn" data-steps="[9,12,16]" onclick="playStepSet(this)">▶</button></td></tr>
    <tr style="opacity:0.35;"><td>10 (Ve)</td><td>—</td><td>—</td><td><button class="phiz-play-btn" disabled>—</button></td></tr>
    <tr><td><strong>11 (Si)</strong></td><td>{11, 2, 5}</td><td>493.88, 587.33, 698.46</td><td><button class="phiz-play-btn" data-steps="[11,14,17]" onclick="playStepSet(this)">▶</button></td></tr>
  </tbody>
</table>

**Pattern**: Positions 0, 5, and 7 produce step-combos with interval structure 4+3 (ratio ≈ 4:5:6). Positions 2, 4, and 9 produce 3+4 (ratio ≈ 10:12:15). Position 11 produces 3+3 (diminished — no strong harmonic-series alignment). The quality of each position is determined entirely by the step-subset's geometry. Five positions (1, 3, 6, 8, 10) are outside the major step-subset and have no diatonic triad.

> 🔊 **Hz reference**: All frequencies above assume Do4 = 261.63 Hz. For example, Position 7's triad root (So4) is 261.63 × 2^(7/12) ≈ 392.00 Hz. The 3:2 ratio between 392.00 Hz and 261.63 Hz (= 1.4983… ≈ 1.5) is why this interval is the most consonant after the octave.

## Tension and Resolution

The most powerful directional pull in tonal music is **Position 7 → Position 0**. Why?

The root of Position 7 sits at the 7-step-interval from the root of Position 0. The 7-step-interval corresponds to the frequency ratio 3:2 — the strongest consonance after the octave. The [step-7 cycle](step-7-cycle.md) explains this relationship in depth: step-7 is the generator of the diatonic system itself.

But Position 7's step-combo also contains step 11 — which sits at the 1-step-interval from step 0 (the root of Position 0). This 1-step-interval relationship creates maximum melodic tension: the ear expects step 11 to resolve upward to step 0. When it does, that tiny motion produces a disproportionately strong sense of arrival.

**In Hz terms**: Position 7's root is So4 = 392.00 Hz. Position 0's root is Do4 = 261.63 Hz. The ratio 392.00/261.63 ≈ 1.498 ≈ 3/2. Meanwhile, step 11 (Si4 = 493.88 Hz) wants to resolve upward to step 0 in the next octave (Do5 = 523.25 Hz) — a distance of only 29.37 Hz, which the ear perceives as a strong semitone pull.

The combination of:
- **Strong root relationship** (the 7-step-interval between roots, ratio ≈ 3:2)
- **Leading-tone pull** (step 11 → step 0, distance of 1 chromatic step, 493.88 → 523.25 Hz)

makes Position 7 → Position 0 the most powerful resolution in the 7-member step-subset system.

**Position 5 → Position 0** is the second-strongest pull. The root of Position 5 sits at the 5-step-interval from Position 0's root — the ratio 4:3 (349.23/261.63 ≈ 1.335 ≈ 4/3), also highly consonant. But Position 5 lacks the leading-tone (step 11 is not in its step-combo {5, 9, 0}), so the resolution is softer.

## Common Patterns

Progressions expressed as Position sequences (for the major step-subset rooted at step 0):

| Pattern | Step-combos | Character |
|---------|----------|-----------|
| 0 – 5 – 7 – 0 | {0,4,7} → {5,9,0} → {7,11,2} → {0,4,7} | The foundational closed loop. Depart, build tension, resolve. (Western: I–IV–V–I) |
| 0 – 7 – 9 – 5 | {0,4,7} → {7,11,2} → {9,0,4} → {5,9,0} | Tension first, then gradual descent back toward stability. (Western: I–V–vi–IV) |
| 0 – 9 – 5 – 7 | {0,4,7} → {9,0,4} → {5,9,0} → {7,11,2} | The "pop progression" — cycles through all three quality types. (Western: I–vi–IV–V) |
| 2 – 7 – 0 | {2,5,9} → {7,11,2} → {0,4,7} | Strong cadential approach — Position 2's dark quality sets up Position 7's tension. (Western: ii–V–I) |

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

  // Western labels keyed by relative chromatic step (distance from root) for each subset
  var WESTERN_LABELS = {
    0: { 0: "I", 2: "ii", 4: "iii", 5: "IV", 7: "V", 9: "vi", 11: "vii\u00B0" },
    1: { 0: "i", 2: "ii\u00B0", 3: "III", 5: "iv", 7: "v", 8: "VI", 10: "VII" },
    2: { 0: "i", 2: "ii\u00B0", 3: "III+", 5: "iv", 7: "V", 8: "VI", 11: "vii\u00B0" }
  };

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
        selectedPos = rootStep;
        updateAll();
      };
    })(s));
    subsetControls.appendChild(sb);
    subsetBtns.push(sb);
  }

  // --- Build position buttons (all 12 chromatic positions) ---
  var posBtns = [];
  for (var p = 0; p < 12; p++) {
    var pb = document.createElement("button");
    pb.textContent = String(p);
    pb.setAttribute("data-pos", String(p));
    pb.style.minWidth = "32px";
    pb.addEventListener("click", (function (pos) {
      return function () {
        if (!isInSubset(pos)) return;
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

  function isInSubset(chromaticStep) {
    var sub = getSubsetSteps();
    for (var i = 0; i < sub.length; i++) {
      if (sub[i] === chromaticStep) return true;
    }
    return false;
  }

  function getPositionStepSet(chromaticStep) {
    var sub = getSubsetSteps();
    var idx = -1;
    for (var i = 0; i < sub.length; i++) {
      if (sub[i] === chromaticStep) { idx = i; break; }
    }
    if (idx === -1) return null;
    var size = sub.length;
    var root = sub[idx];
    var third = sub[(idx + 2) % size];
    var fifth = sub[(idx + 4) % size];
    return [root, third, fifth];
  }

  function getIntervalStructure(stepSet) {
    if (!stepSet) return [0, 0];
    var a = ((stepSet[1] - stepSet[0]) % 12 + 12) % 12;
    var b = ((stepSet[2] - stepSet[1]) % 12 + 12) % 12;
    return [a, b];
  }

  function getRatioLabel(intervals) {
    var key = intervals[0] + "," + intervals[1];
    return KNOWN_RATIOS[key] || "complex";
  }

  function getWesternLabel(chromaticStep) {
    var relStep = ((chromaticStep - rootStep) % 12 + 12) % 12;
    var labels = WESTERN_LABELS[subsetIdx];
    if (labels && labels[relStep] !== undefined) return labels[relStep];
    return "";
  }

  function formatStepSet(ss) {
    if (!ss) return "\u2014";
    return "{" + ss.join(", ") + "}";
  }

  function stepToFreq(step) {
    return BASE_FREQ * Math.pow(2, step / 12);
  }

  function stopAll() {
    for (var i = 0; i < synths.length; i++) {
      try { synths[i].dispose(); } catch (e) { /* ignore */ }
    }
    synths = [];
  }

  function playPosition(chromaticStep) {
    stopAll();
    var ss = getPositionStepSet(chromaticStep);
    if (!ss) return;
    Tone.start().then(function () {
      for (var i = 0; i < ss.length; i++) {
        var offset = ((ss[i] - ss[0]) % 12 + 12) % 12;
        var freq = stepToFreq(ss[0]) * Math.pow(2, offset / 12);
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

    // Update position button styles (all 12)
    for (i = 0; i < 12; i++) {
      var inSub = isInSubset(i);
      if (i === selectedPos && inSub) {
        posBtns[i].className = "active";
      } else if (inSub) {
        posBtns[i].className = "";
      } else {
        posBtns[i].className = "disabled";
      }
      posBtns[i].style.opacity = inSub ? "1" : "0.3";
      posBtns[i].style.cursor = inSub ? "pointer" : "default";
    }

    // Current position info
    var ss = getPositionStepSet(selectedPos);
    var infoText;
    if (ss) {
      var intervals = getIntervalStructure(ss);
      var ratio = getRatioLabel(intervals);
      var western = getWesternLabel(selectedPos);
      var rootFreq = stepToFreq(ss[0]);

      infoText = "Position " + selectedPos + " (" + DODEKA[selectedPos] + ")" +
        " | Step-combo: " + formatStepSet(ss) +
        " | Ratio-set: \u2248 " + ratio +
        " | Root: " + rootFreq.toFixed(1) + " Hz";
      if (western) {
        infoText = infoText + " | Western: " + western;
      }
    } else {
      infoText = "Position " + selectedPos + " (" + DODEKA[selectedPos] + ") \u2014 not in step-subset";
    }
    infoDiv.textContent = infoText;

    // All positions summary (all 12 chromatic positions)
    allPosDiv.innerHTML = "";
    for (i = 0; i < 12; i++) {
      var pInSub = isInSubset(i);
      var pss = pInSub ? getPositionStepSet(i) : null;
      var prat = "";
      var pw = "";
      if (pss) {
        var pint = getIntervalStructure(pss);
        prat = getRatioLabel(pint);
        pw = getWesternLabel(i);
      }

      var card = document.createElement("div");
      var isSelected = (i === selectedPos);
      var bgColor = isSelected && pInSub ? "rgba(0,229,255,0.15)" : (pInSub ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)");
      var borderColor = isSelected && pInSub ? "rgba(0,229,255,0.4)" : (pInSub ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)");
      var textColor = isSelected && pInSub ? "#00e5ff" : (pInSub ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)");

      card.style.cssText = "padding:6px 8px;border-radius:6px;font-family:monospace;font-size:0.75rem;text-align:center;" +
        "min-width:70px;" +
        "background:" + bgColor + ";" +
        "border:1px solid " + borderColor + ";" +
        "color:" + textColor + ";" +
        (pInSub ? "cursor:pointer;" : "cursor:default;");

      if (pInSub) {
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
      } else {
        card.innerHTML = "<div style=\"font-size:0.85rem;font-weight:bold;\">Pos " + i + "</div>" +
          "<div>\u2014</div>" +
          "<div style=\"font-size:0.65rem;opacity:0.5;\">not in subset</div>";
      }

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
      if (ss) {
        for (var k = 0; k < ss.length; k++) {
          if (ss[k] === i) { inStepSet = true; break; }
        }
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

| Position | Root in subset? | Step-combo | Intervals | Quality |
|----------|----------------|----------|-----------|---------|
| 0 (Do) | ✓ | {0, 3, 7} | 3 + 4 | Dark, warm — **home** |
| 1 (Ka) | — | — | — | *not in step-subset* |
| 2 (Re) | ✓ | {2, 5, 8} | 3 + 3 | Tense, unstable |
| 3 (Xo) | ✓ | {3, 7, 10} | 4 + 3 | Bright, stable |
| 4 (Mi) | — | — | — | *not in step-subset* |
| 5 (Fa) | ✓ | {5, 8, 0} | 3 + 4 | Dark, warm |
| 6 (Hu) | — | — | — | *not in step-subset* |
| 7 (So) | ✓ | {7, 10, 2} | 3 + 4 | Dark — **no leading-tone pull** |
| 8 (Bi) | ✓ | {8, 0, 3} | 4 + 3 | Bright, stable |
| 9 (La) | — | — | — | *not in step-subset* |
| 10 (Ve) | ✓ | {10, 2, 5} | 4 + 3 | Bright, stable |
| 11 (Si) | — | — | — | *not in step-subset* |

Notice: Position 7 in the natural minor produces a 10:12:15 ratio-set instead of 4:5:6. The absence of the leading-tone (step 11, one chromatic step below the root) weakens the resolution pull. This is why Western composers developed the **harmonic minor** — step-subset {0, 2, 3, 5, 7, 8, 11} — which raises step 10 to step 11, restoring the 4:5:6 ratio-set at Position 7 and the leading-tone resolution.

**Harmonic minor {0, 2, 3, 5, 7, 8, 11}** rooted at step 0:

| Position | Root in subset? | Step-combo | Intervals | Quality |
|----------|----------------|----------|-----------|---------|
| 0 (Do) | ✓ | {0, 3, 7} | 3 + 4 | Dark, warm — **home** |
| 1 (Ka) | — | — | — | *not in step-subset* |
| 2 (Re) | ✓ | {2, 5, 8} | 3 + 3 | Tense, unstable |
| 3 (Xo) | ✓ | {3, 7, 11} | 4 + 4 | Bright, augmented |
| 4 (Mi) | — | — | — | *not in step-subset* |
| 5 (Fa) | ✓ | {5, 8, 0} | 3 + 4 | Dark, warm |
| 6 (Hu) | — | — | — | *not in step-subset* |
| 7 (So) | ✓ | {7, 11, 2} | 4 + 3 | Bright, tense — **leading-tone restored** |
| 8 (Bi) | ✓ | {8, 0, 3} | 4 + 3 | Bright, stable |
| 9 (La) | — | — | — | *not in step-subset* |
| 10 (Ve) | — | — | — | *not in step-subset* |
| 11 (Si) | ✓ | {11, 2, 5} | 3 + 3 | Tense, unstable — diminished |

The key difference: Position 7 now contains step 11 (the leading-tone), restoring the Position 7 → Position 0 resolution pull that defines tonal music.

## Translation Table

| Western term | PhizMusic equivalent | Notes |
|-------------|---------------------|-------|
| Key of C major | Step-subset {0,2,4,5,7,9,11} rooted at step 0 (Do, 261.63 Hz) | "Key" = step-subset pattern + root step-number |
| Key of G major | Step-subset {0,2,4,5,7,9,11} rooted at step 7 (So, 392.00 Hz) | Same pattern, different root |
| Key of A minor | Step-subset {0,2,3,5,7,8,10} rooted at step 9 (La, 440.00 Hz) | Minor pattern, root = La |
| Scale degree | Chromatic step-number of the position root (0-11) | Position number = chromatic step; non-subset steps have no triad |
| I (tonic) | Position 0 | Home step-combo; root = reference frequency |
| ii (supertonic) | Position 2 | First dark-quality position (root 2 steps above home) |
| iii (mediant) | Position 4 | Second dark-quality position (root 4 steps above home) |
| IV (subdominant) | Position 5 | Bright, second-strongest pull (root 5 steps above home) |
| V (dominant) | Position 7 | Bright, strongest pull — root at the 7-step-interval (≈ 3:2 ratio) |
| vi (submediant) | Position 9 | Dark, gentle (root 9 steps above home) |
| vii° (leading tone) | Position 11 | Diminished, maximum instability (root 11 steps above home) |
| Tonic function | Position 0 step-combo (highest stability) | Stable arrival point |
| Dominant function | Position 7 step-combo (maximum pull toward Position 0) | Tension seeking resolution; contains leading-tone |
| Subdominant function | Position 5 step-combo (departure from stability) | Transitional; ratio 4:3 root relationship |
| Roman numeral analysis | Position-number analysis | Same concept, using chromatic step-numbers (0-11) |
| Cadence (V → I) | Position 7 → Position 0 | The 7-step-interval root relationship + leading-tone |
| Plagal cadence (IV → I) | Position 5 → Position 0 | The 5-step-interval root relationship |
| Modulation | Changing the root step-number | Same step-subset pattern, new reference frequency |
| Relative minor | Same step-subset members, root shifts to step 9 | e.g., C major → A minor share the same 7 pitches |

## Connections

- [Chord Progressions](chord-progressions.md) — step-combo sequences and voice-leading metrics that underlie position movement
- [Chords](chords.md) — step-combo and ratio-set definitions used to describe each position's triad
- [Scales](scales.md) — step-subsets from which positions and their step-combos are derived
- [Step-7 Cycle](step-7-cycle.md) — the 7-step-interval relationship that makes Position 7 → Position 0 the strongest resolution
- [Consonance & Dissonance](consonance-dissonance.md) — why some positions sound stable and others tense
- [Naming System](naming-system.md) — step-number and Dodeka syllable conventions
