---
title: Auditory Masking
aliases: [masking, frequency masking, temporal masking, psychoacoustic masking]
tier: 2
tags: [psychoacoustics, perception, compression]
prerequisites: [ear-cochlea.md, sound-waves.md, missing-fundamental.md, digital-audio.md]
related: [ear-cochlea.md, sound-waves.md, missing-fundamental.md, digital-audio.md, equal-loudness.md, consonance-dissonance.md]
scope-boundary: Perceptual masking phenomena and applications only. No MPEG model internals or codec implementation details.
has_audio: true
---

# Auditory Masking

Auditory masking is the phenomenon where one sound makes another sound inaudible or harder to detect. Human hearing is not a complete capture of acoustic reality; it is a selective system with limited resolution in frequency and time.

> 🎯 **Simple version**: A loud sound can hide a quieter sound so you cannot hear it, even if both are physically present. This is why MP3 files can remove some audio details with little perceived loss.

## 1) Simultaneous Masking (Frequency Masking)

When a strong tone/noise component is present, nearby frequencies require higher level to be audible. On the basilar membrane, overlapping excitation reduces detectability of weaker neighbors.

Key properties:

- Strongest masking occurs within the same or nearby **critical band** (see [ear-cochlea.md](ear-cochlea.md))
- Masking spreads asymmetrically: low-frequency maskers usually mask higher frequencies more strongly than the reverse (upward spread)
- Higher masker level broadens masking influence

Conceptual threshold relation:

```text
audible if target_level > hearing_threshold(f) + masking_shift(f | masker)
```

The masking shift depends on frequency distance from the masker and masker intensity.

## 2) Temporal Masking

Masking is also time-dependent.

- **Forward masking**: a loud event raises threshold for events arriving after it (typically strongest over ~50-200 ms)
- **Backward masking**: a loud event can reduce detectability of events occurring shortly before it (~5-20 ms window)

Forward masking often dominates practical listening and coding applications because onset transients leave a short-lived neural suppression tail.

## 3) Masking Curves and Critical Bands

A masking curve describes raised threshold around a masker frequency.

```text
Threshold
  ^
  |            /
  |           /  \____
  |__________/         \__________
  +---------------------------------> Frequency
             masker
```

At higher masker levels:

- Peak threshold rises
- Effective width increases
- Asymmetry becomes more salient

This is one reason dense mixes can feel crowded even when no single source is extremely loud.

## 4) Engineering Applications

## Perceptual Compression (MP3/AAC)

Lossy codecs estimate masking thresholds and spend fewer bits on components predicted to be inaudible because they are masked by stronger nearby components or recent transients. This enables large data reduction (often around 10:1) while preserving perceived quality for many listening contexts.

## Mix Engineering

In arrangement and EQ decisions, overlapping sources can mask each other:

- Bass guitar can mask kick-drum low components
- Dense midrange instruments can mask vocal intelligibility

Practical fixes include spectral separation, dynamic control, and arrangement spacing.

## Acoustic Design

Ambient and mechanical noise can mask useful sound cues in halls, classrooms, and public spaces, affecting clarity and intelligibility requirements.

## Psychoacoustics Connection

Masking shows that perception is a reconstructed model, not an exhaustive measurement. The auditory system prioritizes salient structure under finite neural bandwidth. What we "hear" is therefore a filtered interpretation of the physical wavefield.

<div class="phiz-viz-container" id="am-masking-demo">
<div class="phiz-viz-title">Auditory Masking Demo</div>
<canvas id="am-freq-canvas" height="200" style="width:100%;"></canvas>
<div class="phiz-viz-controls" style="flex-wrap:wrap;">
<label>Masker: <input type="range" id="am-mfreq" min="100" max="2000" step="1" value="500"> <span class="slider-value" id="am-mfreq-val">500</span> Hz</label>
<label>Level: <input type="range" id="am-mlevel" min="10" max="100" step="1" value="70"> <span class="slider-value" id="am-mlevel-val">0.70</span></label>
<label>Probe: <input type="range" id="am-pfreq" min="100" max="2000" step="1" value="600"> <span class="slider-value" id="am-pfreq-val">600</span> Hz</label>
<label>Level: <input type="range" id="am-plevel" min="1" max="30" step="1" value="10"> <span class="slider-value" id="am-plevel-val">0.10</span></label>
</div>
<div class="phiz-viz-controls">
<button id="am-play-masker">▶ Masker</button>
<button id="am-play-probe">▶ Probe</button>
<button id="am-play-both">▶ Both</button>
<button id="am-stop">■ Stop</button>
</div>
<div id="am-info" style="color:#aaa; font-size:0.85rem; padding:4px 8px;"></div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  "use strict";
  var canvas = document.getElementById("am-freq-canvas");
  var info = document.getElementById("am-info");
  var oscM = null, oscP = null, gainM = null, gainP = null;

  function freqToX(freq, w, pad) {
    var logMin = Math.log(80);
    var logMax = Math.log(2200);
    return pad + ((Math.log(freq) - logMin) / (logMax - logMin)) * (w - 2 * pad);
  }

  function getVals() {
    var mf = parseInt(document.getElementById("am-mfreq").value);
    var ml = parseInt(document.getElementById("am-mlevel").value) / 100;
    var pf = parseInt(document.getElementById("am-pfreq").value);
    var pl = parseInt(document.getElementById("am-plevel").value) / 100;
    document.getElementById("am-mfreq-val").textContent = mf;
    document.getElementById("am-mlevel-val").textContent = ml.toFixed(2);
    document.getElementById("am-pfreq-val").textContent = pf;
    document.getElementById("am-plevel-val").textContent = pl.toFixed(2);
    return {mf: mf, ml: ml, pf: pf, pl: pl};
  }

  function drawViz() {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    var w = rect.width;
    var h = rect.height;
    var pad = 30;

    var v = getVals();

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    var freqTicks = [100, 200, 500, 1000, 2000];
    ctx.fillStyle = "#666";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    for (var t = 0; t < freqTicks.length; t++) {
      var tx = freqToX(freqTicks[t], w, pad);
      ctx.fillText(freqTicks[t] + "", tx, h - pad + 14);
      ctx.beginPath();
      ctx.moveTo(tx, h - pad);
      ctx.lineTo(tx, h - pad + 4);
      ctx.stroke();
    }

    var mx = freqToX(v.mf, w, pad);
    var maskW = 0.15 * v.mf;
    var mlx = freqToX(v.mf - maskW, w, pad);
    var mrx = freqToX(v.mf + maskW, w, pad);
    var barH = v.ml * (h - 2 * pad);

    ctx.fillStyle = "rgba(255,96,144,0.15)";
    ctx.beginPath();
    ctx.moveTo(mlx, h - pad);
    ctx.lineTo(mx, h - pad - barH);
    ctx.lineTo(mrx, h - pad);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255,96,144,0.8)";
    ctx.fillRect(mx - 3, h - pad - barH, 6, barH);

    ctx.fillStyle = "#ff6090";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Masker " + v.mf + " Hz", mx, h - pad - barH - 6);

    var px = freqToX(v.pf, w, pad);
    var pbarH = v.pl * (h - 2 * pad);
    var sep = Math.abs(v.pf - v.mf);
    var isMasked = sep < maskW && v.pl < v.ml * 0.3;

    ctx.globalAlpha = isMasked ? 0.3 : 1;
    ctx.fillStyle = "#00e5ff";
    ctx.fillRect(px - 3, h - pad - pbarH, 6, pbarH);
    ctx.font = "11px sans-serif";
    ctx.fillText("Probe " + v.pf + " Hz", px, h - pad - pbarH - 6);
    ctx.globalAlpha = 1;

    var status = isMasked ? "Likely Masked" : "Audible";
    var statusColor = isMasked ? "#ff6090" : "#66ff66";
    info.innerHTML = "Masker: " + v.mf + " Hz @ " + v.ml.toFixed(2) + " | Probe: " + v.pf + " Hz @ " + v.pl.toFixed(2) + " | Separation: " + sep + " Hz | Status: <span style='color:" + statusColor + "'>" + status + "</span>";
  }

  function stopAll() {
    if (oscM) { oscM.stop(); oscM.dispose(); oscM = null; }
    if (oscP) { oscP.stop(); oscP.dispose(); oscP = null; }
    if (gainM) { gainM.dispose(); gainM = null; }
    if (gainP) { gainP.dispose(); gainP = null; }
  }

  function playMasker() {
    var v = getVals();
    if (oscM) { oscM.stop(); oscM.dispose(); }
    if (gainM) gainM.dispose();
    gainM = new Tone.Gain(v.ml * 0.3).toDestination();
    oscM = new Tone.Oscillator(v.mf, "sine").connect(gainM);
    oscM.start();
  }

  function playProbe() {
    var v = getVals();
    if (oscP) { oscP.stop(); oscP.dispose(); }
    if (gainP) gainP.dispose();
    gainP = new Tone.Gain(v.pl * 0.3).toDestination();
    oscP = new Tone.Oscillator(v.pf, "sine").connect(gainP);
    oscP.start();
  }

  var sliders = ["am-mfreq", "am-mlevel", "am-pfreq", "am-plevel"];
  for (var i = 0; i < sliders.length; i++) {
    document.getElementById(sliders[i]).addEventListener("input", drawViz);
  }

  document.getElementById("am-play-masker").addEventListener("click", function() {
    Tone.start().then(function() { stopAll(); playMasker(); });
  });
  document.getElementById("am-play-probe").addEventListener("click", function() {
    Tone.start().then(function() { stopAll(); playProbe(); });
  });
  document.getElementById("am-play-both").addEventListener("click", function() {
    Tone.start().then(function() { stopAll(); playMasker(); playProbe(); });
  });
  document.getElementById("am-stop").addEventListener("click", stopAll);

  drawViz();
})();
});
</script>

## Translation Table

| PhizMusic | Western/Engineering | Notes |
|-----------|---------------------|-------|
| Simultaneous masking | Frequency masking | Same phenomenon |
| Forward masking | Post-masking | Target after masker |
| Backward masking | Pre-masking | Target before masker |
| Critical-band masking | Auditory filter overlap | Cochlear filter-bank framing |
| Perceptual bit allocation | Psychoacoustic coding | Basis of MP3/AAC efficiency |

## Connections

- [The Ear & Cochlea](ear-cochlea.md) — critical bandwidth and cochlear filtering explain local masking
- [Sound Waves](sound-waves.md) — physical signal components that compete for audibility
- [Missing Fundamental](missing-fundamental.md) — another case where perception diverges from raw spectrum
- [Digital Audio](digital-audio.md) — lossy compression depends on masking limits
- [Equal Loudness](equal-loudness.md) — base hearing thresholds vary with frequency
- [Consonance & Dissonance](consonance-dissonance.md) — roughness and masking interact in dense spectra
