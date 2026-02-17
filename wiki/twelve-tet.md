---
title: Twelve-Tone Equal Temperament (12-TET)
aliases: [12-TET, equal temperament, ET, twelve-tone equal temperament]
tier: 2
category: systems
sidebar_order: 1
tags: [tuning, system, compromise]
prerequisites: [frequency-ratios.md, intervals.md, scales.md]
related: [frequency-ratios.md, intervals.md, scales.md, harmonic-series.md, consonance-dissonance.md, instrument-physics.md]
scope-boundary: 12-TET only. No meantone, well-temperament, or microtonal systems in depth.
has_audio: true
---

# Twelve-Tone Equal Temperament (12-TET)

12-TET is an **engineering compromise**: divide the octave into 12 exactly equal steps, each with a frequency ratio of 2^(1/12) ≈ 1.05946. No interval except the octave is acoustically pure. Every interval is slightly "wrong" — but equally wrong everywhere. This uniformity is the point: it buys **unlimited transposition** at the cost of tuning purity.

> 🎯 **Simple version**: 12-TET is a deal: you make every note slightly imperfect so that you can play in any key equally well. It's like rounding every fraction to a decimal — close enough, and much easier to calculate with.

## The Problem 12-TET Solves

The fundamental mathematical impossibility underlying all tuning systems:

**You cannot simultaneously have pure octaves (2:1) and pure 7-step-intervals (3:2) in a closed cycle.**

The proof, expressed in step arithmetic:

Stack **twelve 7-step-intervals**: 12 × 7 = **84 chromatic steps** = 7 octaves.
Stack **seven octaves** (the 12-step-interval): 7 × 12 = **84 chromatic steps**.

Both paths traverse 84 steps — they *should* land on the same pitch. But the frequency math disagrees:

```
Twelve 3:2 ratios:  (3/2)^12 = 129.7463...
Seven octaves:      2^7      = 128.0000
```

The difference — the **Pythagorean comma** — is:

```
(3/2)^12 / 2^7 = 531441/524288 ≈ 1.01364
```

In cents: approximately **23.46 cents** — roughly a quarter of a chromatic step.

This means: if you tune 12 pure 7-step-intervals in a row (84 chromatic steps = 7 octaves), you overshoot the target octave by 23.46 cents. The cycle doesn't close. The integer arithmetic says 12 × 7 = 7 × 12, but the frequency ratios say (3/2)^12 ≠ 2^7. You can't have it all.

Every tuning system in history is a different strategy for distributing this inevitable error. 12-TET distributes it **equally** across all 12 steps.

## The 12-TET Solution

12-TET defines every chromatic step as exactly:

```
Ratio per step = 2^(1/12) ≈ 1.059463
Cents per step = exactly 100
```

This means:
- Every the 7-step-interval (the "fifth") = 700 cents, vs. just 702.0 cents → error of -2.0 cents
- Every the 5-step-interval (the "fourth") = 500 cents, vs. just 498.0 cents → error of +2.0 cents
- Every the 4-step-interval (the "major third") = 400 cents, vs. just 386.3 cents → error of +13.7 cents
- Every the 3-step-interval (the "minor third") = 300 cents, vs. just 315.6 cents → error of -15.6 cents

The fifths and fourths are excellent approximations (2 cents off — barely perceptible). The thirds are noticeably compromised (14-16 cents off — clearly audible in sustained chords to trained listeners). This is the central trade-off.

See the complete comparison in the [Intervals](intervals.md) table.

## What 12-TET Sacrifices

**1. Pure thirds.** The 5:4 ratio (386.3 cents) is approximated by 400 cents — 13.7 cents sharp. In a sustained {0,4,7} chord on a piano, the step-4 interval beats at a rate determined by the 13.7-cent mistuning. This is why barbershop quartets and a cappella groups naturally drift toward just intonation on sustained chords — the singers' ears pull them toward the pure ratios.

**2. Harmonic series alignment.** The 7th harmonic (ratio 7:4 = 968.8 cents) falls 31.2 cents below the 12-TET step-10 (1000 cents). The 11th harmonic is 48.7 cents off the nearest step. 12-TET is optimized for 3-limit and 5-limit intervals; higher-prime harmonics are poorly served.

**3. Timbral variety between keys.** In historical temperaments (meantone, well-temperament), different keys had different interval sizes, giving each key a unique character. In 12-TET, all keys sound identical — a feature for transposition, but a loss of color.

## What 12-TET Gains

**1. Universal transposition.** Any melody, chord, or progression can be shifted to any starting pitch without changing its internal interval structure. This enabled the explosion of modulation and key-change techniques from Bach onward.

**2. Instrument compatibility.** All 12-TET instruments are compatible with each other in any key. An orchestra, a rock band, and a jazz combo can all play together without retuning.

**3. Simplified arithmetic.** Transposition = addition mod 12. Interval = subtraction. No lookup tables or special cases. This is the foundation of the PhizMusic [naming system](naming-system.md).

## Historical Context

Equal temperament was not a Western invention. It was independently discovered by:

- **Zhu Zaiyu** (朱載堉), Chinese prince and scholar, who published the precise mathematical formulation in 1584, computing 2^(1/12) using an 81-column abacus
- **Simon Stevin**, Flemish mathematician, who independently derived the same result around 1585 (though his calculations contained small errors)

Both arrived at the same solution because the mathematical problem is universal — it doesn't depend on cultural musical preferences. The adoption of 12-TET in Europe was gradual, becoming standard only in the 19th-20th centuries. Many cultures continue to use non-equal temperaments that optimize different priorities.

## The Railsback Curve

A revealing real-world complication: **piano tuners do not actually tune pianos to 12-TET.**

The Railsback curve, documented by O.L. Railsback in 1938, shows that professional piano tuners systematically **stretch** octaves — tuning the upper register slightly sharp and the lower register slightly flat relative to mathematical 12-TET.

Why? Piano strings are thick, stiff wires, not ideal mathematical strings. Their stiffness causes **inharmonicity**: the overtones are slightly sharper than perfect integer multiples of the fundamental. The 2nd partial of a bass string might be at 2.003× the fundamental rather than exactly 2×.

To make octaves sound pure on a real piano, tuners match the 2nd partial of the lower note to the fundamental of the upper note — which means tuning the upper note slightly sharp of the mathematical 2:1 ratio. This stretching accumulates across the keyboard.

The Railsback curve is a beautiful demonstration of **Sethares' timbre-tuning coupling** (see [timbre.md](timbre.md)): you don't tune to abstract mathematical ratios — you tune to the actual spectrum of the instrument. The "correct" tuning depends on the instrument's physical properties, not just number theory.

## The 14-Cent Question

Is the ~14-cent error on thirds audible? It depends on context:

- **Melodic intervals** (notes played sequentially): most listeners don't notice — the brain processes sequential pitches categorically
- **Sustained harmonic intervals** (notes held together): trained listeners hear beating, especially on thirds
- **Fast passages**: errors are essentially inaudible
- **Choral/ensemble music**: singers and string players naturally adjust toward just intonation
- **Piano**: the attack transient and rapid decay mask the beating

The perceptual threshold for interval mistuning is roughly 5-10 cents for trained musicians in sustained harmonic contexts. The 2-cent fifth error is essentially imperceptible. The 14-cent third error is above this threshold — barely, and context-dependently.

This is why 12-TET won: the errors are *just small enough* to be tolerable in most musical contexts, while the transposition freedom is indispensable for modern music's harmonic complexity.

## Hear the Difference

Compare just intonation intervals (pure ratios) with their 12-TET approximations. Root = **220.00 Hz** (La3 / octave 3, step 9). The difference is most audible on sustained step-intervals 3 and 4.

<table>
<tr>
  <th>Step-interval</th>
  <th>Just ratio → Hz</th>
  <th>12-TET → Hz</th>
  <th>Error</th>
  <th>Listen Just</th>
  <th>Listen 12-TET</th>
</tr>
<tr>
  <td>7 (the "fifth")</td>
  <td>3:2 → 330.00 Hz</td>
  <td>2^(7/12) → 329.63 Hz</td>
  <td>−2.0 cents</td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="330.00" onclick="playRatio(this)">▶ Just</button></td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="329.63" onclick="playRatio(this)">▶ 12-TET</button></td>
</tr>
<tr>
  <td>5 (the "fourth")</td>
  <td>4:3 → 293.33 Hz</td>
  <td>2^(5/12) → 293.66 Hz</td>
  <td>+2.0 cents</td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="293.33" onclick="playRatio(this)">▶ Just</button></td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="293.66" onclick="playRatio(this)">▶ 12-TET</button></td>
</tr>
<tr>
  <td>4 (the "major third")</td>
  <td>5:4 → 275.00 Hz</td>
  <td>2^(4/12) → 277.18 Hz</td>
  <td>+13.7 cents</td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="275.00" onclick="playRatio(this)">▶ Just</button></td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="277.18" onclick="playRatio(this)">▶ 12-TET</button></td>
</tr>
<tr>
  <td>3 (the "minor third")</td>
  <td>6:5 → 264.00 Hz</td>
  <td>2^(3/12) → 261.63 Hz</td>
  <td>−15.6 cents</td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="264.00" onclick="playRatio(this)">▶ Just</button></td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="261.63" onclick="playRatio(this)">▶ 12-TET</button></td>
</tr>
</table>

<div class="phiz-viz-container">
<div class="phiz-viz-title">Just vs 12-TET Comparison</div>
<div class="phiz-viz-controls" id="jt-presets">
  <button id="jt-preset-major" class="active">{0,4,7}</button>
  <button id="jt-preset-minor">{0,3,7}</button>
  <button id="jt-preset-dom7">{0,4,7,10}</button>
</div>
<div class="phiz-viz-controls">
  <button class="phiz-play-btn" id="jt-play-just">▶ Just Intonation</button>
  <button class="phiz-play-btn" id="jt-play-tet">▶ 12-TET</button>
  <button class="phiz-play-btn" id="jt-play-ab">▶ A/B (Just → TET)</button>
</div>
<div class="phiz-viz-controls" style="align-items:center;">
  <span style="color:rgba(255,255,255,0.7);font-size:0.85rem;">Sustain:</span>
  <input type="range" id="jt-sustain" min="0.5" max="5.0" step="0.1" value="2.0" style="flex:1;max-width:200px;accent-color:#00e5ff;">
  <span id="jt-sustain-val" style="color:#00e5ff;font-family:monospace;font-size:0.85rem;min-width:3em;">2.0 s</span>
</div>
<pre id="jt-info" style="color:rgba(255,255,255,0.7);font-size:0.75rem;margin:8px 0 0;line-height:1.5;background:none;border:none;padding:0;"></pre>
<canvas id="jt-beat-canvas" height="60" style="width:100%;margin-top:8px;"></canvas>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  var ROOT = 220;

  var presets = {
    major:  { label: "{0,4,7}",    steps: [0, 4, 7],     justRatios: [1, 5/4, 3/2],     ratioLabel: "4:5:6" },
    minor:  { label: "{0,3,7}",    steps: [0, 3, 7],     justRatios: [1, 6/5, 3/2],     ratioLabel: "10:12:15" },
    dom7:   { label: "{0,4,7,10}", steps: [0, 4, 7, 10], justRatios: [1, 5/4, 3/2, 7/4], ratioLabel: "4:5:6:7" }
  };

  var currentPreset = "major";

  var presetMajorBtn = document.getElementById("jt-preset-major");
  var presetMinorBtn = document.getElementById("jt-preset-minor");
  var presetDom7Btn  = document.getElementById("jt-preset-dom7");
  var playJustBtn    = document.getElementById("jt-play-just");
  var playTetBtn     = document.getElementById("jt-play-tet");
  var playAbBtn      = document.getElementById("jt-play-ab");
  var sustainSlider  = document.getElementById("jt-sustain");
  var sustainValEl   = document.getElementById("jt-sustain-val");
  var infoEl         = document.getElementById("jt-info");
  var beatCanvas     = document.getElementById("jt-beat-canvas");

  var presetButtons = [presetMajorBtn, presetMinorBtn, presetDom7Btn];
  var presetKeys    = ["major", "minor", "dom7"];
  var playButtons   = [playJustBtn, playTetBtn, playAbBtn];

  function getSustain() {
    return parseFloat(sustainSlider.value);
  }

  function getJustFreqs(key) {
    var p = presets[key];
    var freqs = [];
    for (var i = 0; i < p.justRatios.length; i++) {
      freqs.push(ROOT * p.justRatios[i]);
    }
    return freqs;
  }

  function getTetFreqs(key) {
    var p = presets[key];
    var freqs = [];
    for (var i = 0; i < p.steps.length; i++) {
      freqs.push(ROOT * Math.pow(2, p.steps[i] / 12));
    }
    return freqs;
  }

  function formatFreq(f) {
    return f.toFixed(2);
  }

  function formatDiff(d) {
    if (d >= 0) {
      return "+" + d.toFixed(2);
    }
    return d.toFixed(2);
  }

  function updateInfo() {
    var p = presets[currentPreset];
    var justFreqs = getJustFreqs(currentPreset);
    var tetFreqs  = getTetFreqs(currentPreset);

    var justStrs = [];
    var tetStrs  = [];
    var diffStrs = [];
    for (var i = 0; i < justFreqs.length; i++) {
      justStrs.push(formatFreq(justFreqs[i]));
      tetStrs.push(formatFreq(tetFreqs[i]));
      diffStrs.push(formatDiff(tetFreqs[i] - justFreqs[i]));
    }

    var lines = [];
    lines.push("Just:       " + justStrs.join(", ") + " Hz  (ratios: " + p.ratioLabel + ")");
    lines.push("12-TET:     " + tetStrs.join(", ") + " Hz  (equal temperament)");
    lines.push("Difference: " + diffStrs.join(", ") + " Hz");

    infoEl.textContent = lines.join("\n");
  }

  function drawBeating() {
    var canvas = beatCanvas;
    var ctx = canvas.getContext("2d");
    var w = canvas.width = canvas.offsetWidth;
    var h = canvas.height = 60;

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    var justFreqs = getJustFreqs(currentPreset);
    var tetFreqs  = getTetFreqs(currentPreset);

    var duration = 0.05;
    var samples = w;
    var mid = h / 2;
    var maxAmp = justFreqs.length + tetFreqs.length;

    ctx.beginPath();
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 1.5;

    for (var x = 0; x < samples; x++) {
      var t = (x / samples) * duration;
      var val = 0;
      for (var j = 0; j < justFreqs.length; j++) {
        val += Math.sin(2 * Math.PI * justFreqs[j] * t);
      }
      for (var k = 0; k < tetFreqs.length; k++) {
        val += Math.sin(2 * Math.PI * tetFreqs[k] * t);
      }
      var y = mid - (val / maxAmp) * (mid - 4);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  function selectPreset(key) {
    currentPreset = key;
    for (var i = 0; i < presetButtons.length; i++) {
      if (presetKeys[i] === key) {
        presetButtons[i].className = "active";
      } else {
        presetButtons[i].className = "";
      }
    }
    updateInfo();
    drawBeating();
  }

  function setPlayDisabled(disabled) {
    for (var i = 0; i < playButtons.length; i++) {
      playButtons[i].disabled = disabled;
    }
  }

  function playChord(freqs, duration, callback) {
    Tone.start().then(function() {
      var gain = new Tone.Gain(0.25).toDestination();
      var oscs = [];
      for (var i = 0; i < freqs.length; i++) {
        var osc = new Tone.Oscillator(freqs[i], "sine").connect(gain);
        osc.start();
        oscs.push(osc);
      }
      setTimeout(function() {
        for (var j = 0; j < oscs.length; j++) {
          oscs[j].stop();
          oscs[j].dispose();
        }
        gain.dispose();
        if (callback) callback();
      }, duration * 1000);
    });
  }

  playJustBtn.addEventListener("click", function() {
    setPlayDisabled(true);
    var dur = getSustain();
    playChord(getJustFreqs(currentPreset), dur, function() {
      setPlayDisabled(false);
    });
  });

  playTetBtn.addEventListener("click", function() {
    setPlayDisabled(true);
    var dur = getSustain();
    playChord(getTetFreqs(currentPreset), dur, function() {
      setPlayDisabled(false);
    });
  });

  playAbBtn.addEventListener("click", function() {
    setPlayDisabled(true);
    var dur = getSustain();
    playChord(getJustFreqs(currentPreset), dur, function() {
      setTimeout(function() {
        playChord(getTetFreqs(currentPreset), dur, function() {
          setPlayDisabled(false);
        });
      }, 300);
    });
  });

  for (var p = 0; p < presetButtons.length; p++) {
    presetButtons[p].addEventListener("click", (function(key) {
      return function() { selectPreset(key); };
    })(presetKeys[p]));
  }

  sustainSlider.addEventListener("input", function() {
    sustainValEl.textContent = parseFloat(sustainSlider.value).toFixed(1) + " s";
  });

  selectPreset("major");
})();
});
</script>

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| 12-TET | Equal temperament | Same concept |
| Chromatic step | Half step, semitone | Same interval (100 cents exactly) |
| Pythagorean comma | Pythagorean comma | Same term (~23.46 cents) |
| Step ratio 2^(1/12) | — | PhizMusic makes the math explicit |

## Connections

- [Frequency Ratios](frequency-ratios.md) — just intonation ratios that 12-TET approximates
- [Intervals](intervals.md) — complete table showing just vs. 12-TET for every interval
- [Scales](scales.md) — all scale subsets are drawn from the 12-TET grid
- [Harmonic Series](harmonic-series.md) — the natural ratios that 12-TET approximates
- [Consonance & Dissonance](consonance-dissonance.md) — how temperament errors affect perceptual fusion
- [Instrument Physics](instrument-physics.md) — string inharmonicity and the Railsback curve
- [Timbre](timbre.md) — Sethares' timbre-tuning coupling

### Suggested References

- [Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/) — Interactive demonstration of how 12-TET intervals approximate just ratios, with audible comparison
