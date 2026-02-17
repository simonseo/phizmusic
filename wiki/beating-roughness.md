---
title: Beating & Roughness
aliases: [beat frequency, interference beating, sensory roughness]
tier: 2
category: perception
tags: [psychoacoustics, perception, interference]
prerequisites: [sound-waves.md, consonance-dissonance.md]
related: [consonance-dissonance.md, dissonance-curves.md, ear-cochlea.md]
scope-boundary: Physical beating and perceived roughness. Cultural preferences in consonance-dissonance.md.
has_audio: true
---

# Beating & Roughness

Beating is a physical interference pattern: two nearby frequencies sum into a fast oscillation whose loudness rises and falls. Roughness is the perceptual consequence when those fluctuations become too fast to hear as separate pulses and are instead heard as a harsh, buzzing texture.

> 🎯 **Simple version**: If two tones are very close in pitch, they make a "wah-wah" pulse. As that pulse speeds up, it stops sounding like separate beats and starts sounding rough.

## Physical Beating

For two pure tones at `f1` and `f2`, the summed waveform is:

`cos(2πf₁t) + cos(2πf₂t) = 2cos(2π·(f₁-f₂)/2·t)·cos(2π·(f₁+f₂)/2·t)`

- The fast factor (`(f₁+f₂)/2`) is the carrier: the average pitch region.
- The slow factor (`(f₁-f₂)/2`) is the envelope term.
- Envelope peaks repeat at `|f1 - f2|` per second, so beat rate is `|f1 - f2|` Hz.

## From Beating to Roughness

At very small separations, the envelope is slow and you hear distinct beats. Around `~15-20 Hz`, the auditory system stops tracking each pulse as a separate event. The sensation shifts from rhythmic fluctuation to roughness: a continuous rasping quality.

For pure tones, peak roughness appears near `~25%` of the critical bandwidth (Plomp-Levelt region). As separation approaches and then exceeds the full critical bandwidth, roughness drops because the cochlea resolves the tones into separate channels. Past that point, you hear two tones rather than one rough fused event.

## The Critical Bandwidth Connection

Critical bandwidth is the cochlear filter width for a local frequency region (see [ear-cochlea.md](ear-cochlea.md)). A useful rule in this register is `~10-20%` of center frequency:

- Center frequency: `fc = (f1 + f2) / 2`
- Approximate critical bandwidth: `CB ≈ 0.15 × fc`

Because CB scales with frequency, the same Hz separation can be rough in one register and cleanly separated in another. This is why interval color depends on register, not just interval name.

## The Interactive

Use the explorer to move from slow beating to roughness and then to two separate tones.

<div class="phiz-viz-container" id="br-explorer">
  <div class="phiz-viz-title">Beating & Roughness Explorer</div>
  <canvas id="br-osc-canvas" height="180" style="width:100%;"></canvas>
  <div class="phiz-viz-controls" style="display:grid; grid-template-columns:1fr; gap:10px; margin-top:10px;">
    <label for="br-f1">Frequency 1: <span id="br-f1-value">400</span> Hz</label>
    <input id="br-f1" type="range" min="200" max="600" step="1" value="400" />
    <label for="br-f2">Frequency 2: <span id="br-f2-value">404</span> Hz</label>
    <input id="br-f2" type="range" min="200" max="600" step="1" value="404" />
    <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
      <button id="br-play-toggle">▶ Play</button>
      <div id="br-info" style="font-family:monospace; color:#b8f7ff; font-size:0.9rem;">f₁: 400 Hz | f₂: 404 Hz | Δf: 4 Hz | Beat rate: 4 Hz | Status: Slow beating</div>
    </div>
  </div>
</div>

<script>
window.addEventListener('load', function() {
(function () {
  "use strict";

  var f1Slider = document.getElementById("br-f1");
  var f2Slider = document.getElementById("br-f2");
  var f1Value = document.getElementById("br-f1-value");
  var f2Value = document.getElementById("br-f2-value");
  var info = document.getElementById("br-info");
  var playBtn = document.getElementById("br-play-toggle");
  var canvas = document.getElementById("br-osc-canvas");

  var gain = null;
  var osc1 = null;
  var osc2 = null;
  var viz = null;
  var isPlaying = false;

  function approxCB(f1, f2) {
    var fc = (f1 + f2) / 2;
    return 0.15 * fc;
  }

  function statusFromDelta(delta, cb) {
    if (delta < 15) {
      return "Slow beating";
    }
    if (delta < 30) {
      return "Fast beating \u2192 roughness";
    }
    if (delta <= cb) {
      return "Roughness";
    }
    return "Two separate tones";
  }

  function updateInfo() {
    var f1 = parseFloat(f1Slider.value);
    var f2 = parseFloat(f2Slider.value);
    var delta = Math.abs(f2 - f1);
    var cb = approxCB(f1, f2);
    var status = statusFromDelta(delta, cb);

    f1Value.textContent = String(Math.round(f1));
    f2Value.textContent = String(Math.round(f2));

    info.textContent = "f\u2081: " + Math.round(f1) + " Hz | f\u2082: " + Math.round(f2) + " Hz | \u0394f: " + Math.round(delta) + " Hz | Beat rate: " + Math.round(delta) + " Hz | Status: " + status + " | CB\u2248 " + cb.toFixed(1) + " Hz";

    if (osc1) {
      osc1.frequency.value = f1;
    }
    if (osc2) {
      osc2.frequency.value = f2;
    }
  }

  function startAudio() {
    if (typeof Tone === "undefined") {
      return;
    }

    Tone.start().then(function () {
      if (!gain) {
        gain = new Tone.Gain(0.2);
        gain.toDestination();
      }

      var f1 = parseFloat(f1Slider.value);
      var f2 = parseFloat(f2Slider.value);

      osc1 = new Tone.Oscillator(f1, "sine");
      osc2 = new Tone.Oscillator(f2, "sine");
      osc1.connect(gain);
      osc2.connect(gain);
      osc1.start();
      osc2.start();

      if (typeof PhizViz !== "undefined" && !viz) {
        viz = PhizViz.oscilloscope(canvas, { color: "#00e5ff", bg: "#111" });
      }
      if (viz) {
        viz.connect(gain);
        viz.start();
      }

      isPlaying = true;
      playBtn.textContent = "■ Stop";
      playBtn.classList.add("active");
      updateInfo();
    });
  }

  function stopAudio() {
    if (osc1) {
      osc1.stop();
      osc1.dispose();
      osc1 = null;
    }
    if (osc2) {
      osc2.stop();
      osc2.dispose();
      osc2 = null;
    }
    if (viz) {
      viz.stop();
    }
    isPlaying = false;
    playBtn.textContent = "▶ Play";
    playBtn.classList.remove("active");
  }

  f1Slider.addEventListener("input", updateInfo);
  f2Slider.addEventListener("input", updateInfo);

  playBtn.addEventListener("click", function () {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  });

  window.addEventListener("beforeunload", function () {
    stopAudio();
    if (viz) {
      viz.dispose();
      viz = null;
    }
    if (gain) {
      gain.dispose();
      gain = null;
    }
  });

  updateInfo();
})();
});
</script>

## Implications

- Close intervals can sound rough not because of abstract interval labels, but because many component pairs land inside the same cochlear filter.
- Register matters: lower tones have narrower relative spacing demands, so nearby components interact more strongly.
- Timbre matters: bright spectra add more nearby partial pairs, which can increase roughness at the same pitch interval.
- Beating is physical and measurable; whether a listener treats the result as desirable texture or unwanted harshness is a separate aesthetic layer.

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Beating | Beats | Physical amplitude fluctuation at `|f1-f2|` |
| Roughness | Sensory dissonance (subset) | Perceptual harshness from unresolved fast beating |
| Critical bandwidth overlap | — | Cochlear filter interaction, no single standard classroom term |
| Two-tone separation beyond CB | Interval clarity | Heard as two distinct tones rather than one rough fused object |

## Connections

- [Consonance & Dissonance](consonance-dissonance.md) — places roughness inside a broader multi-factor perception model
- [The Ear & Cochlea](ear-cochlea.md) — source of critical bandwidth and frequency-channel limits
- [Fourier Analysis](fourier-analysis.md) — explains why harmonic component spacing predicts roughness behavior
- [Timbre](timbre.md) — shows how harmonic density changes roughness at fixed pitch spacing
