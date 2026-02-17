---
title: Standing Waves
aliases: [resonance modes, vibrational modes, harmonics on a string]
tier: 1
category: deep-physics
sidebar_order: 3
tags: [acoustics, vibration, waves]
prerequisites: [sound-waves.md]
related: [harmonic-series.md, instrument-physics.md, fourier-analysis.md]
scope-boundary: Physics of standing waves and modes. Instrument-specific details in instrument-physics.md.
has_audio: true
---

# Standing Waves

A standing wave is a vibration pattern that forms when two identical waves travel in opposite directions through the same medium and interfere with each other. Unlike a traveling wave that moves from one place to another, a standing wave oscillates in place — some points vibrate with maximum amplitude while others remain permanently still.

> 🎯 **Simple version**: Pluck a guitar string. The wave bounces back and forth between the two ends. The bouncing waves add up and create a pattern that *stands still* — some spots vibrate a lot, others don't move at all. The simplest pattern has one big hump. The next has two humps. Each pattern vibrates faster than the last.

## How Standing Waves Form

When a wave hits a fixed boundary — the nut or bridge of a guitar string, the closed end of a pipe — it reflects back. The reflected wave has the same frequency, wavelength, and amplitude as the original, but travels in the opposite direction.

Mathematically, the incident and reflected waves are:

```
y₁ = A × sin(kx - ωt)      (traveling right)
y₂ = A × sin(kx + ωt)      (traveling left, after reflection)
```

Their superposition (sum) gives:

```
y = y₁ + y₂ = 2A × sin(kx) × cos(ωt)
```

This is the key result. The spatial part `sin(kx)` and the temporal part `cos(ωt)` are *separated* — the shape of the wave doesn't travel. Every point on the string oscillates up and down in place, with an amplitude determined by its position.

## Modes and Nodes

A standing wave on a string of length L (fixed at both ends) can only exist at specific wavelengths — those where the boundary conditions are satisfied (zero displacement at both ends). The allowed wavelengths are:

```
λₙ = 2L / n        for n = 1, 2, 3, ...
```

Each value of **n** is called a **mode**:

| Mode | Wavelength | Frequency | Pattern |
|------|-----------|-----------|---------|
| n = 1 (fundamental) | 2L | f₁ = v / 2L | One half-wave: one antinode |
| n = 2 | L | 2f₁ | Two half-waves: two antinodes |
| n = 3 | 2L/3 | 3f₁ | Three half-waves: three antinodes |
| n = N | 2L/N | Nf₁ | N half-waves: N antinodes |

**Nodes** are points of zero displacement — they never move. A mode-N standing wave has N + 1 nodes (including the two fixed endpoints). **Antinodes** are the points of maximum displacement, located halfway between adjacent nodes.

## The Connection to Harmonics

The frequency of mode N is exactly N times the fundamental frequency:

```
fₙ = n × f₁ = n × v / 2L
```

This is the same integer-multiple relationship that defines the [harmonic series](harmonic-series.md). When a string vibrates, it doesn't vibrate in just one mode — it vibrates in many modes simultaneously. The relative amplitudes of the modes determine the sound's [timbre](timbre.md). The fundamental (mode 1) determines the perceived pitch; the higher modes are the overtones that give the sound its character.

This is not a coincidence. The harmonic series *is* the set of standing wave modes. The physics of bounded vibrating systems produces integer-frequency-multiple patterns automatically.

## Standing Wave Modes

<div class="phiz-viz-container" id="stw-standing-wave">
  <div class="phiz-viz-title">Standing Wave Modes</div>
  <canvas id="stw-wave-canvas" height="250" style="width:100%;"></canvas>
  <div class="phiz-viz-controls" id="stw-controls" style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:8px;">
    <span id="stw-mode-buttons" style="display:inline-flex; gap:4px;">
      <button id="stw-mode-1" class="active">Mode 1</button>
      <button id="stw-mode-2">Mode 2</button>
      <button id="stw-mode-3">Mode 3</button>
      <button id="stw-mode-4">Mode 4</button>
      <button id="stw-mode-5">Mode 5</button>
    </span>
    <label style="color:rgba(255,255,255,0.7); font-size:0.8rem; font-family:monospace;">Amplitude
      <input type="range" id="stw-amplitude" min="10" max="200" value="100" style="width:100px; accent-color:#00e5ff;">
    </label>
    <label style="color:rgba(255,255,255,0.7); font-size:0.8rem; font-family:monospace;">Speed
      <input type="range" id="stw-speed" min="50" max="300" value="100" style="width:100px; accent-color:#00e5ff;">
    </label>
    <button id="stw-play-sound">&#9654; Play Sound</button>
  </div>
  <div id="stw-info" style="color:rgba(255,255,255,0.5); font-size:0.75rem; font-family:monospace; margin-top:6px;">
    Active modes: 1 | Frequencies: 110 Hz
  </div>
</div>

<script>
window.addEventListener('load', function() {
(function () {
  "use strict";

  var BASE_FREQ = 110;
  var canvas = document.getElementById("stw-wave-canvas");
  var infoEl = document.getElementById("stw-info");
  var ampSlider = document.getElementById("stw-amplitude");
  var speedSlider = document.getElementById("stw-speed");
  var playBtn = document.getElementById("stw-play-sound");

  var modeButtons = {
    1: document.getElementById("stw-mode-1"),
    2: document.getElementById("stw-mode-2"),
    3: document.getElementById("stw-mode-3"),
    4: document.getElementById("stw-mode-4"),
    5: document.getElementById("stw-mode-5")
  };

  var activeModes = [1];
  var viz = null;
  var playing = false;
  var oscillators = [];
  var gains = [];
  var masterGain = null;

  function getAmplitude() { return parseInt(ampSlider.value, 10) / 100; }
  function getSpeed() { return parseInt(speedSlider.value, 10) / 100; }

  function updateInfo() {
    var freqs = [];
    for (var i = 0; i < activeModes.length; i++) {
      freqs.push(BASE_FREQ * activeModes[i] + " Hz");
    }
    infoEl.textContent = "Active modes: " + activeModes.join(", ") +
      " | Frequencies: " + freqs.join(", ");
  }

  function rebuildViz() {
    if (viz) { viz.dispose(); viz = null; }
    viz = PhizViz.standingWave(canvas, {
      modes: activeModes.slice(),
      amplitude: getAmplitude() * 0.35,
      speed: getSpeed()
    });
    viz.start();
    updateInfo();
  }

  function toggleMode(n) {
    var idx = activeModes.indexOf(n);
    if (idx === -1) {
      activeModes.push(n);
      activeModes.sort(function (a, b) { return a - b; });
    } else {
      if (activeModes.length > 1) {
        activeModes.splice(idx, 1);
      }
    }
    updateModeButtonStyles();
    rebuildViz();
    if (playing) { rebuildAudio(); }
  }

  function updateModeButtonStyles() {
    for (var m = 1; m <= 5; m++) {
      if (activeModes.indexOf(m) !== -1) {
        modeButtons[m].classList.add("active");
      } else {
        modeButtons[m].classList.remove("active");
      }
    }
  }

  // --- Mode button listeners ---
  function makeModeHandler(n) {
    return function () { toggleMode(n); };
  }
  for (var m = 1; m <= 5; m++) {
    modeButtons[m].addEventListener("click", makeModeHandler(m));
  }

  // --- Slider listeners ---
  ampSlider.addEventListener("input", function () { rebuildViz(); });
  speedSlider.addEventListener("input", function () { rebuildViz(); });

  // --- Audio ---
  function disposeAudio() {
    for (var i = 0; i < oscillators.length; i++) {
      oscillators[i].stop();
      oscillators[i].dispose();
    }
    for (var j = 0; j < gains.length; j++) {
      gains[j].dispose();
    }
    oscillators = [];
    gains = [];
    if (masterGain) { masterGain.dispose(); masterGain = null; }
  }

  function rebuildAudio() {
    disposeAudio();
    masterGain = new Tone.Gain(0.3).toDestination();
    for (var i = 0; i < activeModes.length; i++) {
      var freq = BASE_FREQ * activeModes[i];
      var g = new Tone.Gain(1 / activeModes.length).connect(masterGain);
      var osc = new Tone.Oscillator(freq, "sine");
      osc.connect(g);
      osc.start();
      oscillators.push(osc);
      gains.push(g);
    }
  }

  function startAudio() {
    Tone.start().then(function () {
      rebuildAudio();
      playing = true;
      playBtn.textContent = "\u25A0 Stop Sound";
      playBtn.classList.add("active");
    });
  }

  function stopAudio() {
    disposeAudio();
    playing = false;
    playBtn.textContent = "\u25B6 Play Sound";
    playBtn.classList.remove("active");
  }

  playBtn.addEventListener("click", function () {
    if (playing) { stopAudio(); } else { startAudio(); }
  });

  // --- Init ---
  rebuildViz();
})();
});
</script>

## Boundary Conditions

The standing wave patterns above assume **fixed ends** — both endpoints are forced to remain at zero displacement. This is the case for:

- **Strings** (guitar, piano, violin): the string is held rigid at the nut and bridge.
- **Closed pipe ends**: the air pressure is forced to match the closed boundary.

But not all boundaries are fixed. An **open end** (like the open end of a flute or organ pipe) creates an antinode instead of a node — the air is free to vibrate with maximum displacement there. This changes which modes are allowed:

| Boundary type | Allowed modes | Examples |
|---------------|---------------|----------|
| Both ends fixed | All integer modes: 1, 2, 3, 4, ... | Strings, closed-closed pipes |
| One open, one closed | Odd modes only: 1, 3, 5, 7, ... | Clarinet, closed organ pipe |
| Both ends open | All integer modes: 1, 2, 3, 4, ... | Flute, open organ pipe |

The "one open, one closed" case is particularly interesting — only odd-numbered harmonics are present. This gives instruments like the clarinet their characteristic hollow timbre (missing even harmonics). Details of how pipe geometry shapes instrument sound are in [instrument-physics.md](instrument-physics.md).

## Translation Table

| PhizMusic | Western | Other Systems |
|-----------|---------|---------------|
| Mode N | Nth harmonic / Nth partial | Eigenmode, normal mode (physics) |
| Node | Node | Knotenpunkt (German acoustics) |
| Antinode | Antinode, belly | Schwingungsbauch (German acoustics) |
| Fundamental (mode 1) | Fundamental, first harmonic | Grundton (German), 基音 (Chinese: jīyīn) |
| Standing wave | Standing wave, stationary wave | Stehende Welle (German), 定常波 (Japanese: teijōha) |
| Boundary condition | Boundary condition | Randbedingung (German) |

## Connections

- [Sound Waves](sound-waves.md) — the traveling waves that combine to form standing waves
- [Harmonic Series](harmonic-series.md) — the integer-frequency-multiple pattern that standing wave modes produce
- [Fourier Analysis](fourier-analysis.md) — decomposing a vibrating string's motion into its component modes is a spatial Fourier transform
- [Instrument Physics](instrument-physics.md) — how strings, pipes, and membranes set up standing waves with different boundary conditions
- [Timbre](timbre.md) — the mix of standing wave mode amplitudes determines a sound's spectral character
