---
title: Consonance & Dissonance
aliases: [consonance, dissonance, roughness, tonal fusion]
tier: 2
tags: [perception, psychoacoustics, harmony]
prerequisites: [ear-cochlea.md, harmonic-series.md, intervals.md, chords.md]
related: [ear-cochlea.md, harmonic-series.md, intervals.md, chords.md, frequency-ratios.md, timbre.md, twelve-tet.md]
scope-boundary: Perceptual mechanisms only. No musical application or prescriptive ranking (see chord-progressions.md for application).
has_audio: true
---

# Consonance & Dissonance

Consonance and dissonance are not binary categories but a **continuous spectrum** of perceptual qualities arising from multiple interacting mechanisms. At one end: tones that fuse into a single, smooth percept. At the other: tones that clash, beat, and create roughness. The mechanisms are biological; the aesthetic preferences built on top of them are cultural.

> 🎯 **Simple version**: Two notes close together fight — their vibrations clash and create a buzzy "roughness." Notes far apart or in simple ratios cooperate — their vibrations reinforce each other. That's consonance vs. dissonance. Everyone hears the difference; whether you *like* the clash is cultural.

## Four Mechanisms

Consonance and dissonance arise from at least four interacting mechanisms:

### 1. Roughness (Helmholtz, 1863)

When two frequencies fall within the same **critical bandwidth** (see [ear-cochlea.md](ear-cochlea.md)), the basilar membrane cannot fully separate them. The overlapping excitation patterns create **beating** — periodic amplitude fluctuation at the rate |f₂ - f₁|.

- Slow beating (< ~15 Hz): heard as a gentle "wobble" (tremolo)
- Moderate beating (~15-70 Hz): perceived as **roughness** — a grating, buzzy quality
- Fast beating (> ~70 Hz): resolved as a difference tone rather than roughness

Maximum roughness occurs when the frequency separation is approximately **25-30% of the critical bandwidth** — roughly 30-40 Hz for two tones around 500 Hz.

This means roughness is not about the *ratio* of two frequencies but about their *absolute Hz separation relative to critical bandwidth*. A step-distance 1 (ratio ~1.06) creates strong roughness in the low-to-mid register where critical bandwidth is narrow relative to the step, but less roughness in the extreme high register.

Roughness also applies to **harmonic interactions**: when two complex tones sound together, every pair of nearby harmonics can contribute roughness. Step-distance 1 between two complex tones produces roughness between nearly every pair of harmonics. Step-distance 7 (3:2 ratio) produces very little, because the harmonics align or fall far apart.

### 2. Harmonic Template Matching

The auditory system continuously searches for **harmonic series patterns** in the incoming frequency data (see [harmonic-series.md](harmonic-series.md)). When two or more tones together produce a frequency pattern that fits a single harmonic series template, the brain groups them as fused — heard as "one rich sound" rather than "two separate sounds."

- **Step-distance 7** (3:2): the combined harmonics closely match a harmonic series with fundamental an octave below the lower tone → strong fusion
- **Step-distance 4** (5:4): combined harmonics match a harmonic series with fundamental two octaves below → good fusion
- **Step-distance 1** (~16:15): no common harmonic series template fits well → weak fusion, separate percepts

This mechanism explains why simple frequency ratios produce consonance: they are the ratios that naturally occur between harmonics of a single fundamental. The brain treats them as "one source."

### 3. Combination Tones (Tartini Tones)

The nonlinear response of the cochlear amplifier (outer hair cells — see [ear-cochlea.md](ear-cochlea.md)) generates **distortion products** when two frequencies are present simultaneously. The most prominent:

```
Difference tone:  f₂ - f₁
Cubic difference:  2f₁ - f₂
```

For consonant intervals, the combination tones fall on notes that reinforce the harmonic series implied by the two tones:
- Step-distance 7 (frequencies 200 and 300 Hz): difference tone = 100 Hz = the implied fundamental → reinforces fusion
- Step-distance 1 (frequencies 200 and 212 Hz): difference tone = 12 Hz → sub-audio beat, contributes to roughness

For dissonant intervals, combination tones can add unwanted frequencies that increase roughness and muddy the harmonic picture.

### 4. The Plomp & Levelt Model (1965)

Reinier Plomp and Willem Levelt measured dissonance perception for pairs of pure sine tones (no harmonics) and found a universal curve:

```
Dissonance
    ^
    |     /\
    |    /  \
    |   /    \
    |  /      \
    | /        \___________________
    |/
    +--------------------------------→ Frequency separation
    0   ~25%CB   CB    2×CB    ...
```

- **Zero separation** (unison): no dissonance
- **Maximum dissonance**: at approximately 25% of critical bandwidth
- **Dissonance falls off**: beyond critical bandwidth, tones are heard as separate and smooth
- **Asymptotic consonance**: well-separated tones produce no roughness

For **complex tones** (with harmonics), the total dissonance is the sum of contributions from every pair of harmonic components. This predicts the consonance ranking of intervals quite accurately:

Octave (2:1) > fifth (3:2) > fourth (4:3) > major third (5:4) > minor third (6:5) > ...

This ranking emerges from physics alone, without any cultural input. What cultures differ on is whether they *prefer* the consonant end, the dissonant end, or various mixtures.

## The Dissonance Curve for Complex Tones

When you calculate the total Plomp-Levelt dissonance for all harmonic pairs as a function of interval:

```
Total
Dissonance
    ^
    |  ‖
    | ‖  ‖
    |‖    ‖   ‖                 ‖
    |      ‖ ‖   ‖     ‖   ‖ ‖
    |              ‖ ‖ ‖ ‖
    +--+--+--+--+--+--+--+--+--+--+--+--+→ Step-distance
       1  2  3  4  5  6  7  8  9  10 11 12

   Peaks: near step 1, 2     (maximum roughness)
   Valleys: at step 5, 7, 12 (minimum roughness — consonance)
```

Dissonance peaks near step-distances 1 and 2 (where many harmonic pairs collide within critical bandwidth) and has valleys at step-distances 5, 7, and 12 (where harmonic pairs either align or are well-separated).

This curve varies with:
- **Register**: intervals in the bass produce more roughness (critical bandwidth is narrower relative to step-size)
- **Timbre**: tones with fewer harmonics (flute-like) produce less dissonance at any interval
- **Loudness**: roughness is more pronounced at higher volumes

## Hear the Spectrum

Click any button below to hear the two tones separately and together. Listen for roughness at step 1 (maximum clash), fusion at steps 5 and 7, and the perceptual reset at step 12 (octave).

| Step-distance | Interval | Character | Listen |
|---|---|---|---|
| 0 | Unison | Identity — same frequency | <button class="phiz-play-btn" data-freq1="220" data-freq2="220" onclick="playRatio(this)">▶ Play</button> |
| 1 | Minor 2nd | Maximum roughness | <button class="phiz-play-btn" data-freq1="220" data-freq2="233.08" onclick="playRatio(this)">▶ Play</button> |
| 5 | Perfect 4th | Open, stable | <button class="phiz-play-btn" data-freq1="220" data-freq2="293.66" onclick="playRatio(this)">▶ Play</button> |
| 7 | Perfect 5th | Maximum fusion | <button class="phiz-play-btn" data-freq1="220" data-freq2="329.63" onclick="playRatio(this)">▶ Play</button> |
| 12 | Octave | Perceptual reset | <button class="phiz-play-btn" data-freq1="220" data-freq2="440" onclick="playRatio(this)">▶ Play</button> |

<div class="phiz-viz-container" id="cd-explorer">
<div class="phiz-viz-title">Dissonance Curve Explorer</div>
<canvas id="cd-curve-canvas" height="280" style="width:100%;"></canvas>
<div class="phiz-viz-controls">
<label>Ratio: <input type="range" id="cd-ratio" min="1000" max="2000" step="1" value="1500"> <span class="slider-value" id="cd-ratio-val">1.500</span></label>
<button id="cd-play">▶ Play at Ratio</button>
<button id="cd-stop">■ Stop</button>
</div>
<div id="cd-info" style="color:#aaa; font-size:0.85rem; padding:4px 8px;">Ratio: 1.500 | Step-distance: 7.02 | Dissonance: —</div>
</div>

<script>
(function() {
  "use strict";
  var canvas = document.getElementById("cd-curve-canvas");
  var ratioSlider = document.getElementById("cd-ratio");
  var ratioVal = document.getElementById("cd-ratio-val");
  var info = document.getElementById("cd-info");
  var REF = 220;
  var spectrum = [1, 0.5, 0.33, 0.25, 0.2, 0.17];
  var curveData = null;
  var osc1 = null;
  var osc2 = null;
  var gain = null;

  function computeCurve() {
    if (typeof PhizViz !== "undefined" && PhizViz.computeDissonanceCurve) {
      curveData = PhizViz.computeDissonanceCurve(spectrum, REF, 2.05, 500);
    }
  }

  function drawCurve() {
    if (!curveData) return;
    if (typeof PhizViz !== "undefined" && PhizViz.drawDissonanceCurve) {
      PhizViz.drawDissonanceCurve(canvas, curveData, {showIntervals: true, color: "#ff6090", bg: "#111"});
    }
    var ratio = ratioSlider.value / 1000;
    var ctx = canvas.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.width / dpr;
    var h = canvas.height / dpr;
    var x = ((ratio - 1.0) / 1.05) * w;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  function getDissonanceAtRatio(ratio) {
    if (!curveData) return 0;
    var idx = Math.round(((ratio - 1.0) / 1.05) * (curveData.ratios.length - 1));
    if (idx < 0) idx = 0;
    if (idx >= curveData.dissonance.length) idx = curveData.dissonance.length - 1;
    return curveData.dissonance[idx];
  }

  function updateInfo() {
    var ratio = ratioSlider.value / 1000;
    ratioVal.textContent = ratio.toFixed(3);
    var sd = 12 * Math.log(ratio) / Math.log(2);
    var diss = getDissonanceAtRatio(ratio);
    info.textContent = "Ratio: " + ratio.toFixed(3) + " | Step-distance: " + sd.toFixed(2) + " | Dissonance: " + diss.toFixed(2);
    drawCurve();
  }

  ratioSlider.addEventListener("input", updateInfo);

  document.getElementById("cd-play").addEventListener("click", function() {
    var ratio = ratioSlider.value / 1000;
    Tone.start().then(function() {
      if (osc1) { osc1.stop(); osc1.dispose(); }
      if (osc2) { osc2.stop(); osc2.dispose(); }
      if (gain) { gain.dispose(); }
      gain = new Tone.Gain(0.15).toDestination();
      osc1 = new Tone.Oscillator(REF, "sine").connect(gain);
      osc2 = new Tone.Oscillator(REF * ratio, "sine").connect(gain);
      osc1.start();
      osc2.start();
      setTimeout(function() {
        if (osc1) { osc1.stop(); osc1.dispose(); osc1 = null; }
        if (osc2) { osc2.stop(); osc2.dispose(); osc2 = null; }
        if (gain) { gain.dispose(); gain = null; }
      }, 2000);
    });
  });

  document.getElementById("cd-stop").addEventListener("click", function() {
    if (osc1) { osc1.stop(); osc1.dispose(); osc1 = null; }
    if (osc2) { osc2.stop(); osc2.dispose(); osc2 = null; }
    if (gain) { gain.dispose(); gain = null; }
  });

  function init() {
    computeCurve();
    updateInfo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
</script>

## The Cultural Dimension: Fusion ≠ Preference

A critical distinction established by Josh McDermott and colleagues' research with the **Tsimané** people of Bolivia — an indigenous population with minimal exposure to Western music:

| Dimension | Universal (biology) | Cultural (learned) |
|-----------|--------------------|--------------------|
| **Perceiving** fusion/roughness difference | ✓ Tsimané can distinguish | ✓ Everyone can |
| **Preferring** consonance over dissonance | ✗ Tsimané show no preference | ✓ Western listeners strongly prefer consonance |

The mechanisms described above (roughness, template matching, combination tones, Plomp-Levelt) are **biological** — they operate in every human cochlea and auditory system. But whether the resulting percepts are heard as "pleasant" or "unpleasant" is **learned**.

This means:
- PhizMusic can describe consonance and dissonance objectively as physical/perceptual phenomena
- PhizMusic **cannot** and **should not** prescribe which intervals are "good" or "bad"
- Different musical traditions make different aesthetic choices about where on the consonance-dissonance spectrum their music sits
- Gamelan music deliberately cultivates beating between detuned instrument pairs (ombak) — roughness as texture, not defect
- Jazz and blues exploit the tension of step-distance 1 and 2 ("blue notes") as expressive resources
- Medieval European music considered thirds dissonant; Romantic-era music considered them the foundation of harmony

## Consonance in Context

A final complication: the same interval can sound consonant or dissonant depending on musical context.

- **Step-distance 7** in isolation: maximally consonant
- **Step-distance 7** following an expectation of step-distance 5: surprising, potentially tense
- **Step-distance 1** in isolation: maximally dissonant
- **Step-distance 1** resolving to step-distance 0: satisfying (the resolution of tension)

The brain processes intervals not just as isolated acoustic events but as part of a temporal sequence with built-in expectations. This temporal dimension is the domain of [chord progressions](chord-progressions.md).

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Roughness | Dissonance (partial concept) | Western "dissonance" conflates roughness with harmonic function |
| Perceptual fusion | Consonance (partial concept) | Western "consonance" conflates fusion with aesthetic preference |
| Critical bandwidth interaction | — | No standard Western theory term |
| Combination tone | Difference tone, Tartini tone | Same phenomenon |
| Harmonic template matching | — | Psychoacoustics term |
| Plomp-Levelt dissonance | Sensory dissonance | Acoustics term, not in standard music theory |

## Connections

- [The Ear & Cochlea](ear-cochlea.md) — critical bandwidth and combination tones originate here
- [Harmonic Series](harmonic-series.md) — the template that the brain matches against
- [Intervals](intervals.md) — the step-distances whose consonance/dissonance is being explained
- [Chords](chords.md) — how consonance/dissonance operates in multi-note contexts
- [Frequency Ratios](frequency-ratios.md) — why simple ratios produce fusion
- [Timbre](timbre.md) — how harmonic content affects the dissonance of intervals
- [Twelve-TET](twelve-tet.md) — how temperament error affects consonance purity

### Suggested References

- [Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/) — Interactive dissonance curve explorer based on Sethares' model, with click-to-hear intervals and 3D triad dissonance surfaces
- [Overtone Series (muted.io)](https://muted.io/overtone-series/) — Interactive harmonic series with per-harmonic volume sliders and vibrating string visualization
