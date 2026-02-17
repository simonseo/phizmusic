---
title: Equal Loudness
aliases: [Fletcher-Munson, ISO 226, phon scale, frequency sensitivity]
tier: 2
category: perception
sidebar_order: 4
tags: [psychoacoustics, loudness, perception]
prerequisites: [sound-waves.md, ear-cochlea.md]
related: [sound-waves.md, ear-cochlea.md, auditory-masking.md, digital-audio.md, instrument-physics.md]
scope-boundary: Conceptual equal-loudness behavior and practical implications only. No full standard derivation or weighting-standard deep dive.
has_audio: true
---

# Equal Loudness

Equal-loudness contours show that perceived loudness depends on frequency as well as physical sound pressure level (dB SPL). A spectrum that is physically flat does not sound equally loud across frequencies because the auditory system has frequency-dependent sensitivity.

> 🎯 **Simple version**: Your ears are best at hearing mid frequencies (especially speech range) and less sensitive to very low bass and very high treble, especially at low listening levels. That is why bass seems to disappear when you turn volume down.

## Contours: ISO 226 Framing

The modern standard representation is ISO 226 equal-loudness-level contours (historically called Fletcher-Munson curves). Each contour is the set of `(frequency, SPL)` pairs that sound equally loud.

Conceptual reading:

- Around 2-4 kHz, the ear is most sensitive (lowest SPL needed)
- At low frequencies (for example 50-200 Hz), much higher SPL is required for same perceived loudness
- At higher playback levels, contour shape becomes flatter (sensitivity differences shrink)

## The Phon Scale

`phon` is a loudness level unit anchored at 1 kHz:

- A tone has loudness `N phons` if it sounds as loud as a `N dB SPL` tone at 1 kHz

Example:

- 1 kHz at 40 dB SPL = 40 phon by definition
- 100 Hz often needs roughly ~50 dB SPL to match 40-phon loudness (order-of-magnitude illustration)

So equal-loudness comparison is not raw dB matching across frequency; it is perceptual equivalence matching.

## Why the Ear Peaks Near 2-4 kHz

Part of the sensitivity peak is mechanical: the ear canal behaves like a short tube resonator. A rough quarter-wave estimate with canal length `L ~ 3 cm` gives:

```text
f ~ c / (4L) ~ 343 / (4 * 0.03) ~ 2.9 kHz
```

This resonates in the same region where human speech intelligibility cues are dense. The anatomical-acoustic coupling is a strong evolutionary advantage for communication.

This directly links to [instrument-physics.md](instrument-physics.md) air-column resonance principles.

## Practical Implications

## 1) Loudness compensation controls

The classic "loudness" button boosts bass (and often treble) at low monitoring levels to compensate for contour curvature.

## 2) Mix reference levels

Engineers often monitor near reference SPL regions (commonly around the 80-85 dB SPL neighborhood) where contour curvature is less extreme, reducing frequency-balance bias.

## 3) Perceived bass loss at low volume

Turning playback down uniformly reduces SPL, but perceived low-frequency reduction is disproportionately larger because low-frequency sensitivity falls faster on low-phon contours.

## 4) "Flat response" vs. "sounds flat"

A physically flat playback chain can still sound mid-forward or bass-light depending on listening level and listener hearing profile.

## Psychoacoustics Connection

Equal-loudness contours prove that "volume" is not a single physical scalar in perception. Loudness is frequency-dependent and level-dependent. This is a core reason why engineering metrics (energy, SPL, flat transfer) must always be interpreted through auditory perception models.

<div class="phiz-viz-container">
<div class="phiz-viz-title">Equal-Loudness Contours (ISO 226 approximate)</div>
<canvas id="el-curves-canvas" height="280" style="width:100%;"></canvas>
<div class="phiz-viz-controls" style="margin-top:8px;" id="el-phon-toggles"></div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  "use strict";

  var canvas = document.getElementById("el-curves-canvas");
  var toggleContainer = document.getElementById("el-phon-toggles");

  // Approximate equal-loudness contour data (ISO 226-like)
  // Each curve: array of [freq, SPL_dB] pairs
  // Frequencies: 20, 50, 100, 200, 500, 1000, 2000, 3000, 4000, 6000, 8000, 10000, 15000, 20000

  var CURVE_FREQS = [20, 50, 100, 200, 500, 1000, 2000, 3000, 4000, 6000, 8000, 10000, 15000, 20000];

  var CURVES = {
    20: [78, 53, 40, 32, 24, 20, 14, 8, 6, 12, 16, 22, 56, 80],
    40: [96, 70, 56, 47, 42, 40, 36, 30, 28, 34, 38, 44, 68, 94],
    60: [110, 85, 72, 64, 62, 60, 56, 52, 50, 54, 58, 64, 82, 106],
    80: [120, 98, 88, 82, 80, 80, 77, 74, 73, 76, 78, 84, 96, 116],
    100: [130, 112, 104, 100, 100, 100, 98, 96, 96, 98, 100, 104, 112, 126]
  };

  var PHON_LEVELS = [20, 40, 60, 80, 100];
  var PHON_COLORS = ["#69f0ae", "#40c4ff", "#ffab40", "#ff6090", "#ce93d8"];
  var phonVisible = {};
  var toggleButtons = [];

  // Initialize all visible
  for (var i = 0; i < PHON_LEVELS.length; i++) {
    phonVisible[PHON_LEVELS[i]] = true;
  }

  // Build toggle buttons
  for (var p = 0; p < PHON_LEVELS.length; p++) {
    var btn = document.createElement("button");
    btn.textContent = PHON_LEVELS[p] + " phon";
    btn.className = "active";
    btn.style.borderColor = PHON_COLORS[p];
    btn.style.color = PHON_COLORS[p];
    btn.setAttribute("data-phon", String(PHON_LEVELS[p]));
    btn.addEventListener("click", (function(level, idx) {
      return function() {
        phonVisible[level] = !phonVisible[level];
        if (phonVisible[level]) {
          toggleButtons[idx].className = "active";
        } else {
          toggleButtons[idx].className = "";
        }
        draw();
      };
    })(PHON_LEVELS[p], p));
    toggleContainer.appendChild(btn);
    toggleButtons.push(btn);
  }

  // Axis helpers
  var FREQ_MIN = 20;
  var FREQ_MAX = 20000;
  var DB_MIN = 0;
  var DB_MAX = 130;

  function freqToX(freq, plotX, plotW) {
    var logMin = Math.log(FREQ_MIN) / Math.LN10;
    var logMax = Math.log(FREQ_MAX) / Math.LN10;
    var logF = Math.log(freq) / Math.LN10;
    return plotX + ((logF - logMin) / (logMax - logMin)) * plotW;
  }

  function dBToY(db, plotY, plotH) {
    // Higher dB = lower Y (top of canvas)
    return plotY + plotH - ((db - DB_MIN) / (DB_MAX - DB_MIN)) * plotH;
  }

  function draw() {
    if (typeof PhizViz === "undefined") return;
    var fit = PhizViz.fitCanvas(canvas);
    var w = fit.w;
    var h = fit.h;
    var ctx = fit.ctx;

    // Background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    var padL = 42;
    var padR = 15;
    var padT = 15;
    var padB = 28;
    var plotX = padL;
    var plotY = padT;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;

    // Highlight 2-4 kHz region (most sensitive)
    var x2k = freqToX(2000, plotX, plotW);
    var x4k = freqToX(4000, plotX, plotW);
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(x2k, plotY, x4k - x2k, plotH);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.font = "9px PT Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("2\u20134 kHz (most sensitive)", (x2k + x4k) / 2, plotY + 2);

    // Grid lines — frequency
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 0.5;
    var gridFreqs = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
    for (var gf = 0; gf < gridFreqs.length; gf++) {
      var gx = freqToX(gridFreqs[gf], plotX, plotW);
      ctx.beginPath();
      ctx.moveTo(gx, plotY);
      ctx.lineTo(gx, plotY + plotH);
      ctx.stroke();
    }

    // Grid lines — dB
    var gridDBs = [0, 20, 40, 60, 80, 100, 120];
    for (var gd = 0; gd < gridDBs.length; gd++) {
      var gy = dBToY(gridDBs[gd], plotY, plotH);
      ctx.beginPath();
      ctx.moveTo(plotX, gy);
      ctx.lineTo(plotX + plotW, gy);
      ctx.stroke();
    }

    // Axis labels — frequency
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "9px PT Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    var labelFreqs = [20, 50, 100, 200, 500, "1k", "2k", "5k", "10k", "20k"];
    var labelFreqVals = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
    for (var lf = 0; lf < labelFreqs.length; lf++) {
      var lx = freqToX(labelFreqVals[lf], plotX, plotW);
      ctx.fillText(String(labelFreqs[lf]), lx, plotY + plotH + 4);
    }
    ctx.fillText("Frequency (Hz)", plotX + plotW / 2, plotY + plotH + 16);

    // Axis labels — dB
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (var ld = 0; ld < gridDBs.length; ld++) {
      var ly = dBToY(gridDBs[ld], plotY, plotH);
      ctx.fillText(gridDBs[ld] + "", plotX - 4, ly);
    }
    ctx.save();
    ctx.translate(10, plotY + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SPL (dB)", 0, 0);
    ctx.restore();

    // Draw curves
    for (var ci = 0; ci < PHON_LEVELS.length; ci++) {
      var phon = PHON_LEVELS[ci];
      if (!phonVisible[phon]) continue;

      var data = CURVES[phon];
      ctx.beginPath();
      ctx.strokeStyle = PHON_COLORS[ci];
      ctx.lineWidth = 2;

      // Smooth curve through data points using quadratic bezier
      for (var di = 0; di < CURVE_FREQS.length; di++) {
        var cx2 = freqToX(CURVE_FREQS[di], plotX, plotW);
        var cy2 = dBToY(data[di], plotY, plotH);
        if (di === 0) {
          ctx.moveTo(cx2, cy2);
        } else {
          // Use midpoint smoothing
          var prevX = freqToX(CURVE_FREQS[di - 1], plotX, plotW);
          var prevY = dBToY(data[di - 1], plotY, plotH);
          var midX = (prevX + cx2) / 2;
          var midY = (prevY + cy2) / 2;
          ctx.quadraticCurveTo(prevX, prevY, midX, midY);
          if (di === CURVE_FREQS.length - 1) {
            ctx.lineTo(cx2, cy2);
          }
        }
      }
      ctx.stroke();

      // Label at 1 kHz position
      var labelX = freqToX(1000, plotX, plotW);
      var labelYVal = dBToY(data[5], plotY, plotH); // index 5 = 1000 Hz
      ctx.fillStyle = PHON_COLORS[ci];
      ctx.font = "bold 9px PT Sans, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillText(phon + " phon", labelX + 4, labelYVal - 3);
    }

    // Border
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.strokeRect(plotX, plotY, plotW, plotH);
  }

  // Initial draw
  draw();

  // Redraw on resize
  var resizeTimer = null;
  window.addEventListener("resize", function() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(draw, 150);
  });
})();
});
</script>

## Translation Table

| PhizMusic | Western/Engineering | Notes |
|-----------|---------------------|-------|
| Equal-loudness contour | Fletcher-Munson / ISO 226 curve | Historical and standards names |
| Loudness level (phon) | Phon | Same unit |
| Frequency sensitivity peak | Ear canal resonance region | Typically around 2-4 kHz |
| Perceptual loudness compensation | Loudness control | Consumer playback adaptation |

## Connections

- [Sound Waves](sound-waves.md) — defines SPL and amplitude foundations
- [The Ear & Cochlea](ear-cochlea.md) — biological mechanism behind frequency-dependent sensitivity
- [Auditory Masking](auditory-masking.md) — masking thresholds are built on non-flat baseline sensitivity
- [Digital Audio](digital-audio.md) — monitoring and coding decisions depend on loudness perception
- [Instrument Physics](instrument-physics.md) — ear-canal resonance parallels pipe-resonance physics
