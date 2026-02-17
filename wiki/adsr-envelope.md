---
title: ADSR Envelope
aliases: [envelope, attack decay sustain release, amplitude shape]
tier: 2
category: sound
sidebar_order: 3
tags: [time-domain, timbre, dynamics]
prerequisites: [sound-waves.md, timbre.md, rhythm.md]
related: [sound-waves.md, timbre.md, rhythm.md, digital-audio.md, instrument-physics.md]
scope-boundary: Envelope concept and instrument profiles only. No synthesizer patch design or dynamic processor tutorials.
has_audio: true
---

# ADSR Envelope

ADSR is the time-profile of amplitude for a note event: **Attack, Decay, Sustain, Release**. While pitch tells you where a sound sits on the frequency axis, ADSR tells you how energy evolves over time, which is equally important for source identity.

> 🎯 **Simple version**: Every note has a shape over time: how fast it starts (attack), how it settles (decay), how long it holds (sustain), and how it fades (release). This shape helps your brain recognize the instrument.

## The Four Phases

## Attack

Time from note onset to peak amplitude.

- Short attack: percussive, sharp onset
- Long attack: soft onset, gradual emergence

## Decay

Time from peak amplitude down to the sustain level.

- Large decay drop: strong transient followed by softer body
- Small decay drop: near-flat continuation after onset

## Sustain

The quasi-steady amplitude while energy input continues (or while the note is held in a controlled source).

- For self-decaying sources, sustain may be effectively absent
- For continuously driven sources, sustain can be long and stable

## Release

Time from note-off (or energy cutoff) back to near-silence.

- Short release: abrupt stop
- Long release: trailing tail, space impression

## Visual Model

```text
Amplitude
  ^
  |        /\
  |       /  \____
  |      /         \________
  +---------------------------------> Time
        A   D    S        R
```

This is an abstraction, but it captures the dominant envelope control points used in instrument analysis and synthesis.

## Instrument Examples

## Piano (struck string)

- Attack: very fast
- Decay: immediate and significant
- Sustain: no true driven sustain (amplitude keeps decaying after hammer strike)
- Release: depends on damping pedal and string resonance

Perceptual result: strong onset identity, then rapid energy loss.

## Organ (airflow maintained)

- Attack: near-instant (can vary with stop design)
- Decay: minimal
- Sustain: effectively indefinite while key and airflow remain active
- Release: often quick, sometimes with room tail

Perceptual result: stable plateau tone.

## Bowed violin (continuously driven string)

- Attack: controllable, often slower than piano
- Decay: small if bow force is sustained
- Sustain: long as long as bow input continues
- Release: variable with bow lift and room response

Perceptual result: highly expressive onset and continuous dynamic shaping.

## Snare drum (membrane impact)

- Attack: extremely fast
- Decay: fast burst with noisy tail
- Sustain: none
- Release: natural shell/rattle decay only

Perceptual result: transient-dominant event used for timing salience.

## Why Attack Matters Disproportionately

Psychoacoustic studies and common listening tests show that removing onset transients severely reduces instrument identifiability. The auditory system uses early-time cues (first tens of milliseconds) for rapid source classification.

So timbre recognition is not only spectral; it is spectro-temporal.

## Engineering Bridge

ADSR is a foundational control in audio tools:

- Synthesizers expose envelope generators for amplitude and filter control
- Sample instruments shape attack/release to emulate source classes
- Mixing decisions often target envelope regions (for example preserving attack while controlling sustain)

This is where source physics and production practice meet.

## Hear Different Envelopes

All four examples play the same pitch (Do4 = 261.63 Hz) with different ADSR envelopes. Listen for how the time-profile changes the character of the sound.

<p><button class="phiz-play-btn" data-freq="261.63" data-envelope='{"attack":0.001,"decay":0.2,"sustain":0.0,"release":0.1}' data-hold="0.3" onclick="playEnvelope(this)">▶ Percussive (fast attack, no sustain)</button></p>

<p><button class="phiz-play-btn" data-freq="261.63" data-envelope='{"attack":0.01,"decay":0.1,"sustain":0.8,"release":0.3}' data-hold="1.5" onclick="playEnvelope(this)">▶ Organ-like (instant attack, long sustain)</button></p>

<p><button class="phiz-play-btn" data-freq="261.63" data-envelope='{"attack":0.8,"decay":0.3,"sustain":0.6,"release":1.0}' data-hold="1.5" onclick="playEnvelope(this)">▶ Slow strings (gradual attack, long release)</button></p>

<p><button class="phiz-play-btn" data-freq="261.63" data-envelope='{"attack":0.001,"decay":0.5,"sustain":0.1,"release":0.3}' data-hold="0.8" onclick="playEnvelope(this)">▶ Plucked (sharp attack, fast decay)</button></p>

<div class="phiz-viz-container" id="adsr-sketchpad">
<div class="phiz-viz-title">ADSR Envelope Sketchpad</div>
<canvas id="adsr-canvas" height="200" style="width:100%;"></canvas>
<div class="phiz-viz-controls" style="flex-wrap:wrap;">
<label>A: <input type="range" id="adsr-a" min="0" max="200" step="1" value="1"> <span class="slider-value" id="adsr-a-val">0.01</span>s</label>
<label>D: <input type="range" id="adsr-d" min="0" max="200" step="1" value="20"> <span class="slider-value" id="adsr-d-val">0.20</span>s</label>
<label>S: <input type="range" id="adsr-s" min="0" max="100" step="1" value="70"> <span class="slider-value" id="adsr-s-val">0.70</span></label>
<label>R: <input type="range" id="adsr-r" min="0" max="300" step="1" value="30"> <span class="slider-value" id="adsr-r-val">0.30</span>s</label>
<label>Hold: <input type="range" id="adsr-hold" min="0" max="30" step="1" value="10"> <span class="slider-value" id="adsr-hold-val">1.0</span>s</label>
</div>
<div class="phiz-viz-controls">
<button class="adsr-preset" data-a="1" data-d="50" data-s="10" data-r="80">Piano</button>
<button class="adsr-preset" data-a="1" data-d="10" data-s="80" data-r="30">Organ</button>
<button class="adsr-preset" data-a="80" data-d="30" data-s="60" data-r="100">Strings</button>
<button class="adsr-preset" data-a="1" data-d="30" data-s="0" data-r="20">Plucked</button>
<button class="adsr-preset" data-a="150" data-d="50" data-s="70" data-r="200">Pad</button>
<button id="adsr-play">▶ Play</button>
</div>
<div id="adsr-info" style="color:#aaa; font-size:0.85rem; padding:4px 8px;">A: 0.01s | D: 0.20s | S: 0.70 | R: 0.30s | Hold: 1.0s</div>
</div>

<script>
window.addEventListener('load', function() {
(function() {
  "use strict";
  var canvas = document.getElementById("adsr-canvas");
  var sliderA = document.getElementById("adsr-a");
  var sliderD = document.getElementById("adsr-d");
  var sliderS = document.getElementById("adsr-s");
  var sliderR = document.getElementById("adsr-r");
  var sliderH = document.getElementById("adsr-hold");
  var info = document.getElementById("adsr-info");

  function getVals() {
    return {
      attack: sliderA.value / 100,
      decay: sliderD.value / 100,
      sustain: sliderS.value / 100,
      release: sliderR.value / 100,
      hold: sliderH.value / 10
    };
  }

  function redraw() {
    var v = getVals();
    document.getElementById("adsr-a-val").textContent = v.attack.toFixed(2);
    document.getElementById("adsr-d-val").textContent = v.decay.toFixed(2);
    document.getElementById("adsr-s-val").textContent = v.sustain.toFixed(2);
    document.getElementById("adsr-r-val").textContent = v.release.toFixed(2);
    document.getElementById("adsr-hold-val").textContent = v.hold.toFixed(1);
    info.textContent = "A: " + v.attack.toFixed(2) + "s | D: " + v.decay.toFixed(2) + "s | S: " + v.sustain.toFixed(2) + " | R: " + v.release.toFixed(2) + "s | Hold: " + v.hold.toFixed(1) + "s";
    if (typeof PhizViz !== "undefined" && PhizViz.drawADSR) {
      PhizViz.drawADSR(canvas, {attack: v.attack, decay: v.decay, sustain: v.sustain, release: v.release}, {color: "#00e5ff", bg: "#111", hold: v.hold});
    }
  }

  sliderA.addEventListener("input", redraw);
  sliderD.addEventListener("input", redraw);
  sliderS.addEventListener("input", redraw);
  sliderR.addEventListener("input", redraw);
  sliderH.addEventListener("input", redraw);

  var presets = document.querySelectorAll(".adsr-preset");
  for (var i = 0; i < presets.length; i++) {
    presets[i].addEventListener("click", function() {
      sliderA.value = this.dataset.a;
      sliderD.value = this.dataset.d;
      sliderS.value = this.dataset.s;
      sliderR.value = this.dataset.r;
      redraw();
    });
  }

  document.getElementById("adsr-play").addEventListener("click", function() {
    var v = getVals();
    Tone.start().then(function() {
      var synth = new Tone.Synth({
        oscillator: {type: "sine"},
        envelope: {attack: v.attack, decay: v.decay, sustain: v.sustain, release: v.release}
      }).toDestination();
      synth.triggerAttack(261.63);
      var holdMs = Math.round(v.hold * 1000) + Math.round(v.attack * 1000) + Math.round(v.decay * 1000);
      setTimeout(function() {
        synth.triggerRelease();
        setTimeout(function() { synth.dispose(); }, Math.round(v.release * 1000) + 200);
      }, holdMs);
    });
  });

  redraw();
})();
});
</script>

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Attack phase | Attack | Same term |
| Decay phase | Decay | Same term |
| Sustain level | Sustain | Same term |
| Release phase | Release | Same term |
| Amplitude envelope | Envelope contour | Audio engineering equivalent |

## Connections

- [Sound Waves](sound-waves.md) — amplitude as the quantity being shaped over time
- [Timbre](timbre.md) — envelope is a major component of timbre identity
- [Rhythm](rhythm.md) — envelope determines how events articulate within pulse structure
- [Instrument Physics](instrument-physics.md) — source mechanism constrains typical envelope forms
- [Digital Audio](digital-audio.md) — envelope representation and manipulation in DAW workflows
