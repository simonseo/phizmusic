---
title: Instrument Physics
aliases: [acoustic sources, strings pipes membranes, source archetypes]
tier: 2
tags: [acoustics, instruments, spectra]
prerequisites: [sound-waves.md, harmonic-series.md, timbre.md]
related: [sound-waves.md, harmonic-series.md, timbre.md, consonance-dissonance.md, digital-audio.md]
scope-boundary: Three acoustic archetypes only (string, air column, membrane). No detailed instrument catalog and no synthesis design.
has_audio: true
---

# Instrument Physics

Most acoustic instruments fall into three source archetypes with different vibration equations and different spectral outcomes. The crucial consequence is not just "different sound" but different **harmonic structure**, which changes interval fusion behavior and even preferred tuning strategies.

> 🎯 **Simple version**: A guitar string vibrates in whole-number patterns, so it makes clean harmonics. A pipe can make all harmonics or only odd ones. A drum skin vibrates in more complicated patterns that are not whole-number multiples, so its overtones are inharmonic. Different physics -> different musical roles.

## Archetype 1: Strings

For an ideal string of length `L`, tension `T`, and linear mass density `mu`:

```text
f_n = n * (1 / 2L) * sqrt(T / mu),  n = 1,2,3,...
```

Properties:

- Integer-spaced modes (`n = 1,2,3...`) -> harmonic spectrum
- Strong support for pitch salience and harmonic-template matching
- Good alignment with ratio-based interval systems

Excitation controls harmonic amplitudes (timbre), not mode frequencies:

- **Plucked**: strong attack transient, position-dependent harmonic weighting
- **Bowed**: sustained energy injection, richer controllable steady-state partial balance

So strings are a classic harmonic source family used for melody and harmony.

## Archetype 2: Air Columns (Pipes)

Air columns follow boundary-condition physics.

### Open-open pipe (both ends pressure nodes)

```text
f_n = n * v / (2L),  n = 1,2,3,...
```

All integer harmonics are available.

### Closed-open pipe (one end pressure antinode)

```text
f_n = (2n - 1) * v / (4L),  n = 1,2,3,...
```

Only odd harmonics appear ideally (`1,3,5,...`).

Perceptual effect:

- Missing even harmonics shifts spectral envelope
- Result is often described as hollow or woody in many contexts

This odd-harmonic constraint is the core physical reason closed-pipe families (for example clarinet-like bores in their low register approximation) differ from open-pipe families.

## Archetype 3: Membranes

Circular membranes (drum heads) are 2D systems governed by Bessel-function mode families. Modal frequencies are proportional to Bessel zeros rather than integer multiples.

A normalized low-order sequence is approximately:

```text
1.00, 1.59, 2.14, 2.30, 2.65, ...
```

These are **inharmonic** partials. Consequences:

- Weak or ambiguous single pitch center (unless shell/tuning tricks emphasize certain modes)
- Strong rhythmic and textural role
- Different consonance behavior from harmonic instruments

Membrane physics explains why many drum sounds are perceived more by attack profile and spectral centroid than by stable scale degree.

## Harmonic vs. Inharmonic Spectra and Tuning Fit

This is the bridge to [timbre.md](timbre.md): interval systems are not independent of source spectra.

- Harmonic sources (strings, many pipes, voice) pair naturally with harmonic-series-oriented interval lattices
- Inharmonic sources (many membranes, bells, metallophones) can favor alternative spacing strategies

This is Sethares' coupling principle in physical form: "best" tuning depends on what kind of spectrum your instrument family actually produces.

## Psychoacoustics Connection

Harmonic-template matching in [consonance-dissonance.md](consonance-dissonance.md) works best when source spectra themselves are harmonic. With inharmonic spectra, fusion cues shift, and cultures often optimize for different interval compromises and beating textures.

So instrument construction is not downstream of theory; it co-defines theory.

<!-- INTERACTIVE: Source Archetype Explorer -->

<div class="phiz-viz-container">
<div class="phiz-viz-title">Source Archetype Explorer</div>
<canvas id="ipe-spectrum" height="180" style="width:100%;"></canvas>
<div id="ipe-info" style="color:rgba(255,255,255,0.6);font-size:0.8rem;margin:6px 0 4px;">Archetype: Ideal String — all integer harmonics</div>
<div class="phiz-viz-controls">
  <button id="ipe-string" class="active">String</button>
  <button id="ipe-open">Open Pipe</button>
  <button id="ipe-closed">Closed Pipe</button>
  <button id="ipe-membrane">Membrane</button>
</div>
<div class="phiz-viz-controls" style="margin-top:8px;">
  <button class="phiz-play-btn" id="ipe-play-single">▶ Play Root (110 Hz)</button>
  <button class="phiz-play-btn" id="ipe-play-interval">▶ Play The 7-step-interval (110 + 165 Hz)</button>
  <button class="phiz-play-btn" id="ipe-play-chord">▶ Play {0,4,7} (110 + 138.6 + 165 Hz)</button>
</div>
<div id="ipe-desc" style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-top:6px;line-height:1.5;">
Switch archetypes and listen: the same step-interval sounds smoother or rougher depending on the source spectrum.
</div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  "use strict";

  var FUNDAMENTAL = 110;
  var NUM_PARTIALS = 12;

  // --- Archetype partial generators ---
  // Each returns { freqRatios: [...], amplitudes: [...], label, desc }
  var archetypes = {
    string: {
      label: "Ideal String",
      desc: "All integer harmonics (1f, 2f, 3f...) with 1/n amplitude roll-off. Strongly harmonic — excellent pitch salience and interval fusion.",
      generate: function() {
        var ratios = [], amps = [];
        for (var n = 1; n <= NUM_PARTIALS; n++) {
          ratios.push(n);
          amps.push(1 / n);
        }
        return { freqRatios: ratios, amplitudes: amps };
      }
    },
    open: {
      label: "Open Pipe",
      desc: "All integer harmonics (like string) but with faster roll-off at high partials. Flute-like: bright fundamental, gentle upper partials.",
      generate: function() {
        var ratios = [], amps = [];
        for (var n = 1; n <= NUM_PARTIALS; n++) {
          ratios.push(n);
          amps.push(1 / (n * n) * 2);
        }
        return { freqRatios: ratios, amplitudes: amps };
      }
    },
    closed: {
      label: "Closed Pipe",
      desc: "Odd harmonics only (1f, 3f, 5f...) with 1/n roll-off. Clarinet-like: hollow, woody character. Missing even harmonics change interval fusion behavior.",
      generate: function() {
        var ratios = [], amps = [];
        for (var n = 1; n <= NUM_PARTIALS; n++) {
          var harmonic = 2 * n - 1;
          ratios.push(harmonic);
          amps.push(1 / harmonic);
        }
        return { freqRatios: ratios, amplitudes: amps };
      }
    },
    membrane: {
      label: "Membrane (Drum)",
      desc: "Inharmonic partials at Bessel-function zeros (1.00, 1.59, 2.14, 2.30, 2.65...). No clean harmonic alignment — weak pitch, strong attack/texture perception.",
      generate: function() {
        var besselRatios = [1.00, 1.59, 2.14, 2.30, 2.65, 2.92, 3.16, 3.50, 3.60, 3.89, 4.06, 4.24];
        var amps = [];
        for (var i = 0; i < besselRatios.length; i++) {
          amps.push(1 / (1 + i * 0.4));
        }
        return { freqRatios: besselRatios, amplitudes: amps };
      }
    }
  };

  var currentArchetype = "string";

  // --- DOM references ---
  var canvas = document.getElementById("ipe-spectrum");
  var infoEl = document.getElementById("ipe-info");
  var descEl = document.getElementById("ipe-desc");
  var btns = {
    string:  document.getElementById("ipe-string"),
    open:    document.getElementById("ipe-open"),
    closed:  document.getElementById("ipe-closed"),
    membrane: document.getElementById("ipe-membrane")
  };
  var playSingleBtn   = document.getElementById("ipe-play-single");
  var playIntervalBtn = document.getElementById("ipe-play-interval");
  var playChordBtn    = document.getElementById("ipe-play-chord");

  // --- Draw spectrum ---
  function drawSpectrum() {
    var arch = archetypes[currentArchetype];
    var data = arch.generate();

    // For display, normalize to show bars at correct relative heights
    // Label with actual frequency ratios
    if (typeof PhizViz !== "undefined" && PhizViz.fitCanvas) {
      var info = PhizViz.fitCanvas(canvas);
      var ctx = info.ctx;
      var w = info.w;
      var h = info.h;
      var pad = { top: 10, right: 10, bottom: 30, left: 10 };
      var gw = w - pad.left - pad.right;
      var gh = h - pad.top - pad.bottom;

      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, w, h);

      var n = data.amplitudes.length;
      var barW = gw / n;
      var maxAmp = 0;
      for (var i = 0; i < n; i++) {
        if (data.amplitudes[i] > maxAmp) maxAmp = data.amplitudes[i];
      }
      if (maxAmp === 0) maxAmp = 1;

      for (var j = 0; j < n; j++) {
        var val = data.amplitudes[j] / maxAmp;
        var barH = val * gh;
        ctx.fillStyle = currentArchetype === "membrane" ? "#ff6e40" : "#00e5ff";
        ctx.fillRect(
          pad.left + j * barW + 1,
          pad.top + gh - barH,
          Math.max(barW - 2, 2),
          barH
        );
      }

      // Frequency ratio labels
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "9px PT Sans, sans-serif";
      ctx.textAlign = "center";
      for (var k = 0; k < n; k++) {
        var label = data.freqRatios[k];
        var labelStr = (label === Math.floor(label)) ? String(label) + "f" : label.toFixed(2) + "f";
        if (n <= 12 || k % 2 === 0) {
          ctx.fillText(
            labelStr,
            pad.left + k * barW + barW / 2,
            pad.top + gh + 14
          );
        }
      }
    }

    infoEl.textContent = "Archetype: " + arch.label;
    descEl.textContent = arch.desc;
  }

  // --- Audio playback ---
  function playTone(freqRatios, amplitudes, baseFreq, duration, callback) {
    Tone.start().then(function() {
      var gain = new Tone.Gain(0.2).toDestination();
      var oscs = [];
      for (var i = 0; i < freqRatios.length; i++) {
        if (amplitudes[i] < 0.01) continue;
        var osc = new Tone.Oscillator(baseFreq * freqRatios[i], "sine");
        var partialGain = new Tone.Gain(amplitudes[i]).connect(gain);
        osc.connect(partialGain);
        osc.start();
        oscs.push({ osc: osc, gain: partialGain });
      }
      setTimeout(function() {
        for (var j = 0; j < oscs.length; j++) {
          oscs[j].osc.stop();
          oscs[j].osc.dispose();
          oscs[j].gain.dispose();
        }
        gain.dispose();
        if (callback) callback();
      }, duration);
    });
  }

  function setPlayDisabled(disabled) {
    playSingleBtn.disabled = disabled;
    playIntervalBtn.disabled = disabled;
    playChordBtn.disabled = disabled;
  }

  function playArchetypeSound(baseFreqs) {
    var arch = archetypes[currentArchetype];
    var data = arch.generate();
    setPlayDisabled(true);

    var completed = 0;
    var total = baseFreqs.length;

    for (var i = 0; i < baseFreqs.length; i++) {
      playTone(data.freqRatios, data.amplitudes, baseFreqs[i], 2000, function() {
        completed++;
        if (completed >= total) {
          setPlayDisabled(false);
        }
      });
    }
  }

  // --- Event listeners ---
  var archetypeKeys = ["string", "open", "closed", "membrane"];

  function selectArchetype(key) {
    currentArchetype = key;
    for (var i = 0; i < archetypeKeys.length; i++) {
      btns[archetypeKeys[i]].className = (archetypeKeys[i] === key) ? "active" : "";
    }
    drawSpectrum();
  }

  for (var a = 0; a < archetypeKeys.length; a++) {
    btns[archetypeKeys[a]].addEventListener("click", (function(key) {
      return function() { selectArchetype(key); };
    })(archetypeKeys[a]));
  }

  playSingleBtn.addEventListener("click", function() {
    playArchetypeSound([FUNDAMENTAL]);
  });

  playIntervalBtn.addEventListener("click", function() {
    // The 7-step-interval: ratio 3:2
    playArchetypeSound([FUNDAMENTAL, FUNDAMENTAL * 1.5]);
  });

  playChordBtn.addEventListener("click", function() {
    // {0,4,7}: root + the 4-step-interval (5:4) + the 7-step-interval (3:2) in just intonation
    playArchetypeSound([FUNDAMENTAL, FUNDAMENTAL * 1.25, FUNDAMENTAL * 1.5]);
  });

  // Initial draw
  selectArchetype("string");
})();
});
</script>

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| String harmonic series source | String family acoustics | Same physical model |
| Open-open pipe all-harmonic model | Open pipe resonance | Flute-like idealization |
| Closed-open odd-harmonic model | Closed pipe resonance | Clarinet-like low-register idealization |
| Inharmonic membrane mode set | Drumhead modes | Bessel-zero governed, non-integer partials |

## Connections

- [Sound Waves](sound-waves.md) — the underlying pressure-wave dynamics for all sources
- [Harmonic Series](harmonic-series.md) — strings and open pipes approximate this structure
- [Timbre](timbre.md) — source physics determines spectral signature and envelope
- [Consonance & Dissonance](consonance-dissonance.md) — harmonicity controls fusion behavior
- [Digital Audio](digital-audio.md) — recording and analysis pipeline for these spectra

### Suggested References

- [Overtone Series (muted.io)](https://muted.io/overtone-series/) — Vibrating string animation showing standing wave patterns that produce the harmonic series
