---
title: Dissonance Curves
aliases: [Sethares dissonance, timbre-specific dissonance]
tier: 2
category: perception
tags: [psychoacoustics, perception, timbre]
prerequisites: [consonance-dissonance.md, timbre.md, harmonic-series.md]
related: [consonance-dissonance.md, timbre.md, twelve-tet.md, harmonic-series.md]
scope-boundary: Sethares model only. Cultural preferences covered in consonance-dissonance.md.
has_audio: true
---

# Dissonance Curves

A dissonance curve plots total sensory dissonance as a function of frequency ratio for a given spectrum. The critical insight, formalized by William Sethares in 1993: **the intervals that minimize dissonance depend on the timbre of the tones being played.** There is no universal set of "consonant intervals" — only intervals that are consonant *for a particular spectral content*.

> 🎯 **Simple version**: Different instruments have different overtone recipes. When you calculate which note-combinations sound smoothest for each recipe, different instruments prefer different intervals. A xylophone's "sweet spots" aren't the same as a violin's.

## Sethares' Key Insight: Timbre Determines Tuning

In *Tuning, Timbre, Spectrum, Scale* (1993), William Sethares demonstrated a revolutionary connection: the intervals a listener perceives as "consonant" are not fixed by nature but emerge from the interaction between a tone's spectral content and the Plomp-Levelt dissonance model (see [consonance-dissonance.md](consonance-dissonance.md) for the model itself).

The logic chain:

1. **Plomp-Levelt** showed that two pure sine tones produce maximum roughness when separated by about 25% of a critical bandwidth, and negligible roughness beyond one critical bandwidth (see [ear-cochlea.md](ear-cochlea.md))
2. **Complex tones** contain multiple frequency components — a spectrum of partials (see [timbre.md](timbre.md))
3. When two complex tones sound together, **every pair of partials** (one from each tone) contributes roughness according to the Plomp-Levelt curve
4. The total dissonance is the sum of all these pairwise contributions
5. Therefore, the **shape of the dissonance curve depends entirely on which partials are present** — that is, on the timbre

For harmonic timbres (integer-multiple partials: 1f, 2f, 3f, 4f...), the dissonance minima fall at ratios like 2:1, 3:2, 4:3, 5:4 — exactly the familiar step-intervals. For inharmonic timbres (non-integer partials), the minima shift to entirely different ratios. This means **tuning and timbre are coupled parameters**, not independent choices.

> 🎯 **Simple version**: Sethares proved that the reason the 7-step-interval (the "perfect fifth") sounds good on a violin is because of violin overtones — not because 3:2 is inherently magical. Change the overtones, and the 7-step-interval might sound terrible while some completely different ratio sounds great.

## How Dissonance Curves Are Computed

The algorithm sweeps a frequency ratio from unison (1:1) to just past the octave (2:1) and computes total sensory dissonance at each point.

**Setup:**
- Fix a reference tone with spectrum: frequencies `{f₁, f₂, ..., fₙ}` and amplitudes `{a₁, a₂, ..., aₙ}`
- Create a second tone at ratio `α`: its frequencies become `{α·f₁, α·f₂, ..., α·fₙ}` with the same amplitude profile

**For each ratio α:**

```
D_total(α) = Σᵢ Σⱼ d_PL(fᵢ, α·fⱼ, lᵢ, lⱼ)
```

where `d_PL` is the Plomp-Levelt dissonance function for a single pair of pure tones, and `lᵢ` and `lⱼ` are loudness values derived from the amplitudes.

**Key details:**
- The Plomp-Levelt function weights each pair by `min(l₁, l₂)` — so a pair contributes significant dissonance only when **both** components are reasonably loud
- This means high harmonics with low amplitude contribute less roughness than low harmonics with high amplitude
- The self-dissonance of each tone (its own partials beating against each other) is also included — this creates the baseline dissonance that the curve rises from at unison
- The curve is normalized so the maximum dissonance equals 1.0

**The sweep** produces a curve with peaks (maximum roughness — many partial pairs within critical bandwidth) and valleys (minimum roughness — partial pairs either aligned or well-separated). The valleys indicate the least-dissonant intervals for that spectrum.

## Harmonic Spectra → Familiar Step-Intervals

For a tone with harmonic partials (1f, 2f, 3f, 4f, 5f, 6f, 7f, 8f) and natural amplitude roll-off (1/n), the dissonance curve shows clear valleys at:

```
Ratio    Step-interval    (Western name)
1.000    0.00             (unison)
1.200    ~3               (minor third)
1.250    ~4               (major third)
1.333    5.00             (perfect fourth)
1.500    7.02             (perfect fifth)
1.667    ~9               (major sixth)
2.000    12.00            (octave)
```

These minima land near the step-intervals that [12-TET](twelve-tet.md) approximates: 0, 3, 4, 5, 7, 9, 12. This is not coincidence — it is the **reason 12-TET works**. The 12-tone equal-temperament system was designed (over centuries of empirical refinement) to serve instruments with harmonic spectra: strings, voices, brass, woodwinds. The dissonance curve for harmonic timbres has its valleys at almost exactly the positions 12-TET places its steps.

> 🎯 **Simple version**: If you plot "clashiness vs. interval" for violin-like sounds, the smooth spots land right where piano keys are. That's not luck — pianos were designed for violin-like sounds.

## Inharmonic Spectra → Different Intervals

When partials are **not** integer multiples of the fundamental, the dissonance minima shift — sometimes dramatically.

### Stretched Partials (Metallophones, Bells)

Many percussion instruments have partials at frequencies like 1f, 2.1f, 3.15f, 4.2f... — slightly "stretched" from the harmonic series due to the stiffness of bars and plates (see [instrument-physics.md](instrument-physics.md)). For these spectra:

- The dissonance minima move away from simple integer ratios
- The valleys no longer align with 12-TET step-intervals
- A different tuning grid would better serve these instruments

This directly explains **gamelan tuning**. The Indonesian gamelan ensemble uses metallophones and gongs with distinctly inharmonic spectra. The traditional slendro (5-note) and pelog (7-note) tuning systems are **not** "out-of-tune 12-TET" — they are tuning systems optimized for their instruments' spectral content. Sethares computed dissonance curves for measured gamelan spectra and found that the traditional tunings closely match the predicted minima.

### Pure Sine (Single Partial)

A pure sine tone has only one partial (the fundamental). The dissonance curve reduces to the raw Plomp-Levelt curve for a single pair: one broad hump of dissonance near unison, then smooth consonance everywhere beyond about one critical bandwidth. There are **no** special minima at step-intervals 5, 7, or 12 — those emerge only when multiple harmonics interact.

### Square Wave (Odd Harmonics Only)

A square wave contains only odd harmonics (1f, 3f, 5f, 7f...). Its dissonance curve has fewer valleys than a full harmonic spectrum because fewer partial pairs are present. The 7-step-interval minimum weakens (since the 2nd harmonic, crucial for the 3:2 interaction, is absent), while other minima shift subtly.

## The Explorer

Use the explorer below to see how different spectra produce different dissonance curves. Select a preset or adjust individual harmonic amplitudes, then use the ratio slider to hear any interval with that timbre.

> **Attribution**: The interactive dissonance curve visualization below is heavily inspired by and based on Aatish Bhatia's excellent [Dissonance Curve Explorer](https://aatishb.com/dissonance/). The underlying algorithm follows William Sethares' model from *Tuning, Timbre, Spectrum, Scale*. We gratefully acknowledge Bhatia's work in making this concept accessible and interactive — much of the visualization approach, including the spectral editing concept and curve rendering, was adapted from that project.

<div class="phiz-viz-container">
<div class="phiz-viz-title">Sethares Dissonance Curve Explorer</div>
<canvas id="dc-curve-canvas" height="280" style="width:100%;"></canvas>
<div id="dc-info" style="color:rgba(255,255,255,0.6);font-size:0.85rem;margin:6px 0 4px;text-align:center;font-family:monospace;">Ratio: 1.500 | Step-interval: 7.02 | Dissonance: 0.00</div>
<div class="phiz-viz-controls">
<button id="dc-preset-harmonic" class="active">Harmonic (1/n)</button>
<button id="dc-preset-square">Square Wave</button>
<button id="dc-preset-equal">Equal</button>
<button id="dc-preset-stretched">Inharmonic (stretched)</button>
<button id="dc-preset-sine">Pure Sine</button>
</div>
<div id="dc-sliders" style="display:grid;grid-template-columns:auto 1fr auto;gap:2px 8px;align-items:center;margin:10px 0;padding:0 8px;"></div>
<div class="phiz-viz-controls" style="margin-top:8px;">
<label style="color:rgba(255,255,255,0.7);font-size:0.85rem;">Ratio: <input type="range" id="dc-ratio-slider" min="1000" max="2000" step="1" value="1500" style="width:200px;vertical-align:middle;"></label>
<span id="dc-ratio-display" style="color:#00e5ff;font-family:monospace;min-width:3em;display:inline-block;">1.500</span>
<button id="dc-play-btn">&#9654; Play at Ratio</button>
</div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  var NUM_HARMONICS = 8;
  var REF_FREQ = 220;
  var PLAY_DURATION = 1500;

  var canvas = document.getElementById("dc-curve-canvas");
  var infoEl = document.getElementById("dc-info");
  var sliderContainer = document.getElementById("dc-sliders");
  var ratioSlider = document.getElementById("dc-ratio-slider");
  var ratioDisplay = document.getElementById("dc-ratio-display");
  var playBtn = document.getElementById("dc-play-btn");

  var presetHarmonicBtn = document.getElementById("dc-preset-harmonic");
  var presetSquareBtn = document.getElementById("dc-preset-square");
  var presetEqualBtn = document.getElementById("dc-preset-equal");
  var presetStretchedBtn = document.getElementById("dc-preset-stretched");
  var presetSineBtn = document.getElementById("dc-preset-sine");

  var freqMultipliers = [1, 2, 3, 4, 5, 6, 7, 8];
  var amplitudes = [100, 50, 33, 25, 20, 17, 14, 12];
  var isInharmonic = false;
  var currentCurveData = null;
  var audioInitialized = false;

  var sliderInputs = [];
  var sliderValueEls = [];

  // Build slider rows
  for (var i = 0; i < NUM_HARMONICS; i++) {
    var label = document.createElement("span");
    label.style.cssText = "color:rgba(255,255,255,0.7);font-size:0.8rem;text-align:right;";
    label.textContent = "H" + (i + 1);

    var slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";
    slider.value = String(amplitudes[i]);
    slider.style.cssText = "width:100%;";
    slider.setAttribute("data-index", String(i));

    var val = document.createElement("span");
    val.style.cssText = "color:rgba(255,255,255,0.5);font-size:0.75rem;min-width:2.2em;text-align:right;font-family:monospace;";
    val.textContent = String(amplitudes[i]);

    (function(idx, sl, vl) {
      sl.addEventListener("input", function() {
        amplitudes[idx] = parseInt(sl.value, 10);
        vl.textContent = String(amplitudes[idx]);
        computeAndDraw();
      });
    })(i, slider, val);

    sliderContainer.appendChild(label);
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(val);
    sliderInputs.push(slider);
    sliderValueEls.push(val);
  }

  function updateSliderUI() {
    for (var i = 0; i < NUM_HARMONICS; i++) {
      sliderInputs[i].value = String(amplitudes[i]);
      sliderValueEls[i].textContent = String(amplitudes[i]);
    }
  }

  function clearPresetHighlight() {
    presetHarmonicBtn.className = "";
    presetSquareBtn.className = "";
    presetEqualBtn.className = "";
    presetStretchedBtn.className = "";
    presetSineBtn.className = "";
  }

  function setPreset(name) {
    clearPresetHighlight();
    isInharmonic = false;
    freqMultipliers = [1, 2, 3, 4, 5, 6, 7, 8];

    if (name === "harmonic") {
      amplitudes = [100, 50, 33, 25, 20, 17, 14, 12];
      presetHarmonicBtn.className = "active";
    } else if (name === "square") {
      amplitudes = [100, 0, 33, 0, 20, 0, 14, 0];
      presetSquareBtn.className = "active";
    } else if (name === "equal") {
      amplitudes = [100, 100, 100, 100, 100, 100, 100, 100];
      presetEqualBtn.className = "active";
    } else if (name === "stretched") {
      freqMultipliers = [1, 2.1, 3.15, 4.2, 5.3, 6.4, 7.5, 8.6];
      amplitudes = [100, 50, 33, 25, 20, 17, 14, 12];
      isInharmonic = true;
      presetStretchedBtn.className = "active";
    } else if (name === "sine") {
      amplitudes = [100, 0, 0, 0, 0, 0, 0, 0];
      presetSineBtn.className = "active";
    }

    updateSliderUI();
    computeAndDraw();
  }

  presetHarmonicBtn.addEventListener("click", function() { setPreset("harmonic"); });
  presetSquareBtn.addEventListener("click", function() { setPreset("square"); });
  presetEqualBtn.addEventListener("click", function() { setPreset("equal"); });
  presetStretchedBtn.addEventListener("click", function() { setPreset("stretched"); });
  presetSineBtn.addEventListener("click", function() { setPreset("sine"); });

  function computeAndDraw() {
    var spectrum = { freq: [], amp: [] };
    for (var i = 0; i < NUM_HARMONICS; i++) {
      if (amplitudes[i] > 0) {
        spectrum.freq.push(freqMultipliers[i]);
        spectrum.amp.push(amplitudes[i] / 100);
      }
    }
    if (spectrum.freq.length === 0) {
      spectrum.freq.push(1);
      spectrum.amp.push(1);
    }
    currentCurveData = PhizViz.computeDissonanceCurve(spectrum, REF_FREQ, 2.05, 500);
    PhizViz.drawDissonanceCurve(canvas, currentCurveData, { showIntervals: true, color: "#ff6090", bg: "#111" });
    updateInfo();
  }

  function updateInfo() {
    if (!currentCurveData) return;
    var ratio = parseInt(ratioSlider.value, 10) / 1000;
    ratioDisplay.textContent = ratio.toFixed(3);

    var stepDist = 1200 * Math.log(ratio) / Math.log(2) / 100;

    // Find closest point in curve data
    var closestIdx = 0;
    var closestDiff = Math.abs(currentCurveData.ratios[0] - ratio);
    for (var i = 1; i < currentCurveData.ratios.length; i++) {
      var diff = Math.abs(currentCurveData.ratios[i] - ratio);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIdx = i;
      }
    }
    var dissValue = currentCurveData.dissonance[closestIdx];

    infoEl.textContent = "Ratio: " + ratio.toFixed(3) + " | Step-interval: " + stepDist.toFixed(2) + " | Dissonance: " + dissValue.toFixed(2);
  }

  ratioSlider.addEventListener("input", function() {
    updateInfo();
  });

  // Audio playback
  function doPlayHarmonic(ratio, partials) {
    var synth1 = new Tone.Synth({
      oscillator: { type: "custom", partials: partials },
      volume: -8
    }).toDestination();
    var synth2 = new Tone.Synth({
      oscillator: { type: "custom", partials: partials },
      volume: -8
    }).toDestination();

    var now = Tone.now();
    synth1.triggerAttackRelease(REF_FREQ, 1.5, now);
    synth2.triggerAttackRelease(REF_FREQ * ratio, 1.5, now);

    setTimeout(function() {
      synth1.dispose();
      synth2.dispose();
    }, PLAY_DURATION + 500);
  }

  function doPlayInharmonic(ratio, freqMults, amps) {
    var oscs1 = [];
    var oscs2 = [];
    for (var i = 0; i < NUM_HARMONICS; i++) {
      if (amps[i] <= 0) continue;
      var amp = amps[i] * 0.15;

      var g1 = new Tone.Gain(amp).toDestination();
      var o1 = new Tone.Oscillator(REF_FREQ * freqMults[i], "sine").connect(g1);
      o1.start();
      oscs1.push({ osc: o1, gain: g1 });

      var g2 = new Tone.Gain(amp).toDestination();
      var o2 = new Tone.Oscillator(REF_FREQ * ratio * freqMults[i], "sine").connect(g2);
      o2.start();
      oscs2.push({ osc: o2, gain: g2 });
    }

    setTimeout(function() {
      for (var j = 0; j < oscs1.length; j++) {
        oscs1[j].osc.stop();
        oscs1[j].osc.dispose();
        oscs1[j].gain.dispose();
        oscs2[j].osc.stop();
        oscs2[j].osc.dispose();
        oscs2[j].gain.dispose();
      }
    }, PLAY_DURATION + 500);
  }

  function playAtRatio() {
    var ratio = parseInt(ratioSlider.value, 10) / 1000;
    var partials = [];
    var normalizedAmps = [];
    for (var i = 0; i < NUM_HARMONICS; i++) {
      partials.push(amplitudes[i] / 100);
      normalizedAmps.push(amplitudes[i] / 100);
    }

    function doPlay() {
      if (isInharmonic) {
        doPlayInharmonic(ratio, freqMultipliers, normalizedAmps);
      } else {
        doPlayHarmonic(ratio, partials);
      }
    }

    if (!audioInitialized) {
      Tone.start().then(function() {
        audioInitialized = true;
        doPlay();
      });
    } else {
      doPlay();
    }
  }

  playBtn.addEventListener("click", playAtRatio);

  // Initial draw
  computeAndDraw();
})();
});
</script>

## Implications for Music

### Tuning and Timbre Are Coupled

Sethares' work reveals that tuning system and instrument timbre are not independent design choices — they are **co-dependent parameters**. Selecting a tuning system implicitly assumes something about the spectral content of the instruments that will play in it. Selecting an instrument implicitly constrains which tuning systems will sound smooth.

This coupling has always existed in practice. Western music theory evolved around instruments with (mostly) harmonic spectra — bowed strings, blown pipes, the human voice. The resulting tuning systems (Pythagorean, meantone, and eventually [12-TET](twelve-tet.md)) all target the dissonance minima of harmonic timbres. But this historical path was not recognized as a choice until Sethares made the timbre dependence explicit.

### 12-TET Is Optimal — For Harmonic Timbres

Twelve-tone equal temperament is not "the natural tuning" or "the best tuning." It is the tuning system that **minimizes dissonance for instruments with harmonic spectra** while also providing equal transposability across all step-numbers. For a gamelan metallophone, 12-TET is a poor fit — the dissonance minima of its stretched partials fall between 12-TET steps, not on them.

### Cross-Cultural Tuning Systems Are Rational

The Sethares model validates what ethnomusicologists have long argued: non-Western tuning systems are not "primitive approximations" of 12-TET. They are independent engineering solutions optimized for their own instruments' spectra. Javanese gamelan tunings, Thai 7-TET, and other systems are each locally optimal for their respective timbres — just as 12-TET is locally optimal for its own.

### PhizMusic Connection

This is precisely why the PhizMusic framework insists on physics-first vocabulary. When we say "the 7-step-interval is consonant," we must qualify: consonant **for harmonic spectra**. The dissonance curve makes this qualification unavoidable and explicit, grounding music theory in measurable spectral properties rather than cultural assumption.

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Dissonance curve | Sensory dissonance curve | Same concept |
| Spectral content | Timbre, tone color | PhizMusic is explicit about the spectrum |
| Step-interval of minimum | Consonant interval | Western term conflates sensory and cultural consonance |
| Timbre-tuning coupling | — | No standard Western theory term |
| Inharmonic spectrum | Inharmonic partials | Same concept |
| Stretched partials | Inharmonicity | Audio engineering term |

## Connections

- [Consonance & Dissonance](consonance-dissonance.md) — the Plomp-Levelt model that underlies dissonance curve computation
- [Timbre](timbre.md) — spectral content determines the shape of the dissonance curve
- [Harmonic Series](harmonic-series.md) — harmonic spectra produce the familiar 12-TET-aligned minima
- [Twelve-TET](twelve-tet.md) — the tuning system that works because most Western instruments have harmonic spectra

### Suggested References

- **[Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/)** — The interactive dissonance curve explorer by Aatish Bhatia that inspired this page's visualization. Features editable spectra, click-to-hear intervals, and 3D triad dissonance surfaces. Much of our visualization approach was adapted from this work.
- Sethares, W. A. (1993). *Tuning, Timbre, Spectrum, Scale*. Springer-Verlag. — The foundational text on timbre-dependent dissonance.
