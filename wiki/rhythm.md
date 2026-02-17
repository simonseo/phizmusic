---
title: Rhythm
aliases: [pulse-fraction system, beat, tempo, meter]
tier: 1
category: music
tags: [music, foundation, time]
prerequisites: [naming-system.md]
related: [chord-progressions.md, translation-tables.md]
scope-boundary: Pulse-fraction system definition and basic mappings only. No advanced polyrhythm, groove, or swing (Tier 3).
has_audio: true
---

# Rhythm

Rhythm is the organization of sound events in time. PhizMusic describes it with the **pulse-fraction system** — four quantities that specify everything about temporal placement:

- **T** — the pulse period (seconds between beats)
- **Onset** — when a sound starts, as a position within a cycle
- **Duration** — how long a sound lasts, as a fraction or multiple of T
- **Cycle** — a repeating time pattern of length N × T

No special symbols. No ambiguous note shapes. Just fractions and multiples of a single reference unit.

> 🎯 **Simple version**: Rhythm is a pattern of when sounds happen. The basic unit is the beat (pulse). Everything else is measured as fractions or multiples of that beat. Two beats = 2T. Half a beat = 0.5T. Simple.

## Pulse: The Temporal Anchor

The **pulse** is a regular, periodic temporal reference — the "heartbeat" of a piece of music. It is defined by:

```
T = pulse period (seconds between consecutive beats)
Rate = 1/T (pulses per second, in Hz)
BPM = 60/T (beats per minute — the conventional tempo unit)
```

Examples:

| BPM | T (seconds) | Rate (Hz) | Feel |
|-----|-------------|-----------|------|
| 60 | 1.000 | 1.00 | Slow, solemn |
| 90 | 0.667 | 1.50 | Walking pace |
| 120 | 0.500 | 2.00 | Standard moderate tempo |
| 140 | 0.429 | 2.33 | Energetic |
| 180 | 0.333 | 3.00 | Fast, driving |

The pulse is **a reference**, not necessarily an audible event. In much music the pulse is implied rather than sounded on every beat. Your brain infers and maintains the pulse even when the actual rhythm deviates from it (syncopation).

## Duration: How Long a Sound Lasts

A sound event's length is expressed as a fraction or multiple of T:

| Duration | Meaning | Western equivalent |
|----------|---------|-------------------|
| 0.25T | Quarter of a pulse | Sixteenth note |
| 0.5T | Half a pulse | Eighth note |
| 0.75T | Three-quarters of a pulse | Dotted eighth note |
| 1T | One full pulse | Quarter note (at standard 4/4 reference) |
| 1.5T | One and a half pulses | Dotted quarter note |
| 2T | Two pulses | Half note |
| 3T | Three pulses | Dotted half note |
| 4T | Four pulses | Whole note |

**Any** rational fraction works: 0.333T (a triplet division), 0.667T (two-thirds of a beat), 1.25T. The system doesn't limit you to powers of 2.

## Onset: When a Sound Starts

The **onset** is the time position of a sound event within a cycle, measured from the cycle's beginning. If a cycle is 4T long, onsets can be placed at any position from 0 to 4T:

```
Cycle of 4T:
|    T₁    |    T₂    |    T₃    |    T₄    |
0         1T        2T        3T        4T

A rhythm:
onset=0,    duration=1T   → hit on beat 1
onset=1T,   duration=0.5T → hit on beat 2, short
onset=2T,   duration=1T   → hit on beat 3
onset=3.5T, duration=0.5T → hit halfway through beat 4 (syncopation)
```

Onset positions need not fall on integer multiples of T. An onset at 0.5T is "between beat 1 and beat 2" — the equivalent of an upbeat or off-beat in conventional terminology. An onset at 1.333T places a note on the second triplet division of beat 2.

## Cycle: The Repeating Pattern

A **cycle** is a repeating temporal unit of defined length, measured in multiples of T. Most music uses cycles of 3T, 4T, or 6T, but any length is valid.

```
Cycle length = N × T
```

A cycle is the temporal equivalent of what Western music calls a "measure" or "bar."

| Cycle length | Western time signature equivalent | Feel |
|-------------|----------------------------------|------|
| 2T | 2/4 | March, polka |
| 3T | 3/4 | Waltz |
| 4T | 4/4 | Most pop, rock, hip-hop |
| 6T | 6/8 (if subdivided in 3s) | Compound duple |
| 5T | 5/4 | Asymmetric, used in Balkan and progressive music |
| 7T | 7/8 | Asymmetric, common in Turkish/Bulgarian music |

### Sub-grouping Within a Cycle

A 4T cycle might be internally grouped as:

- **2+2**: equal halves (strong-weak-strong-weak)
- **3+1**: uneven grouping
- **1+1+1+1**: uniform, mechanical

These groupings create the **metric feel** — the internal accentuation pattern — without changing the cycle length. Western notation encodes this with time signatures (4/4 vs. 2/2 for the same cycle length); PhizMusic specifies it as an accent pattern on the onsets.

## Putting It All Together: A Rhythm Notation Example

Consider a simple pattern at 120 BPM (T = 0.5 seconds), cycle of 4T:

```
Beat:     |  1  |  2  |  3  |  4  |
Onset:     0    1T   2T   3T
          |-----|-----|-----|-----|

Event 1:  onset=0,     duration=1T    (on beat 1, full beat)
Event 2:  onset=1T,    duration=0.5T  (on beat 2, half beat)
Event 3:  onset=1.5T,  duration=0.5T  (between beats 2-3, half beat)
Event 4:  onset=2T,    duration=2T    (on beat 3, sustained through beat 4)
```

This is equivalent to: quarter note, eighth note, eighth note, half note — but described entirely in terms of pulse fractions, with no specialized symbol vocabulary.

## Neural Entrainment: Why Rhythm Feels Good

The pulse is not just a mathematical abstraction — it has a neural basis. When you hear a regular pulse:

1. **Delta and beta oscillations** in the brain (0.5-4 Hz for delta, matching typical musical pulse rates of 60-240 BPM) synchronize with the beat
2. The **motor cortex** activates even during passive listening — this is why you tap your foot involuntarily (Cannon & Patel, 2020)
3. The brain generates **temporal predictions**: once synchronized, it expects the next beat at time T after the last

This prediction mechanism is what makes rhythm *feel* like something. When an event arrives exactly on the predicted beat, it feels satisfying (confirmation). When it arrives early, late, or between beats, it creates tension or surprise. Syncopation exploits this: placing onsets where the brain doesn't predict them generates a distinctive "pushing" energy.

The optimal range for beat perception is approximately **1-4 Hz** (60-240 BPM). Below 1 Hz, the brain loses the sense of regular pulse. Above 4 Hz, beats become too fast to track individually and merge into a buzzing or fluttering sensation — analogous to how frequency components merge in the auditory domain.

## Polyrhythm: Simultaneous Cycles

When two or more cycles of different lengths operate simultaneously, the result is **polyrhythm**:

```
3:4 polyrhythm over 12T super-cycle (LCM of 3 and 4):

Beat positions:  0  1  2  3  4  5  6  7  8  9  10  11
Cycle A (3T):    ●  .  .  ●  .  .  ●  .  .  ●  .   .     (4 hits: every 3T)
Cycle B (4T):    ●  .  .  .  ●  .  .  .  ●  .  .   .     (3 hits: every 4T)
Combined:        ●  .  .  ●  ●  .  ●  .  ●  ●  .   .     (6 unique hits)
```

In 3:4 polyrhythm, the two patterns align every 12T (the LCM of 3 and 4). The listener can "hear" either cycle as primary, creating a perceptual ambiguity that many musical traditions exploit.

Cross-cultural examples of polyrhythm — particularly West African drumming ensembles using 3:4, 3:2, and more complex ratios — are rich territory. This is deferred to Tier 3 for detailed treatment; see [ROADMAP](ROADMAP.md).

### Hear a Polyrhythm

Select a ratio and press Play. Two click layers run at different subdivisions of the same super-cycle (whose length is the LCM of the two numbers). The outer ring shows Cycle A beats; the inner ring shows Cycle B beats. A sweeping playhead marks the current position.

<div class="phiz-viz-container" id="pr-explorer">
  <div class="phiz-viz-title">Polyrhythm Explorer</div>
  <canvas id="pr-canvas" width="400" height="400" style="width:100%;max-width:400px;display:block;margin:0 auto;"></canvas>
  <div class="phiz-viz-controls" style="display:grid; grid-template-columns:1fr; gap:10px; margin-top:10px;">
    <div>
      <span style="color:rgba(255,255,255,0.7);font-size:0.85rem;">Ratio:</span>
      <button class="pr-ratio-btn" data-a="2" data-b="3">2:3</button>
      <button class="pr-ratio-btn" data-a="3" data-b="4">3:4</button>
      <button class="pr-ratio-btn" data-a="3" data-b="5">3:5</button>
      <button class="pr-ratio-btn" data-a="4" data-b="5">4:5</button>
    </div>
    <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
      <label for="pr-bpm" style="color:rgba(255,255,255,0.7);font-size:0.85rem;">BPM: <span id="pr-bpm-value">120</span></label>
      <input id="pr-bpm" type="range" min="60" max="200" step="1" value="120" style="flex:1;" />
    </div>
    <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
      <button id="pr-play-btn">▶ Play</button>
      <div id="pr-info" style="font-family:monospace; color:#b8f7ff; font-size:0.85rem;"></div>
    </div>
  </div>
</div>

<script>
window.addEventListener("load", function () {
  /* ── state ─────────────────────────────────────── */
  var cycleA = 3;
  var cycleB = 4;
  var bpm = 120;
  var isPlaying = false;
  var animId = null;
  var schedulerId = null;
  var beatIndexA = -1;
  var beatIndexB = -1;
  var playheadAngle = -Math.PI / 2;
  var startTime = 0;
  var gain = null;

  /* ── DOM refs ──────────────────────────────────── */
  var canvas = document.getElementById("pr-canvas");
  var ctx = canvas.getContext("2d");
  var playBtn = document.getElementById("pr-play-btn");
  var bpmSlider = document.getElementById("pr-bpm");
  var bpmValue = document.getElementById("pr-bpm-value");
  var infoEl = document.getElementById("pr-info");
  var ratioBtns = document.querySelectorAll
    ? document.querySelectorAll(".pr-ratio-btn")
    : document.getElementsByClassName("pr-ratio-btn");

  /* ── math helpers ──────────────────────────────── */
  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) { var t = b; b = a % b; a = t; }
    return a;
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  function superCycleLength() {
    return lcm(cycleA, cycleB);
  }

  function superCycleDuration() {
    /* one "unit beat" = 60/bpm seconds; super-cycle = lcm beats */
    return superCycleLength() * (60 / bpm);
  }

  /* ── info display ──────────────────────────────── */
  function updateInfo() {
    var sc = superCycleLength();
    infoEl.textContent = "Ratio " + cycleA + ":" + cycleB +
      " | BPM " + bpm +
      " | Super-cycle " + sc + " beats (" + superCycleDuration().toFixed(2) + " s)";
  }

  /* ── drawing ───────────────────────────────────── */
  function drawStatic() {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    var w = rect.width;
    var h = rect.width; /* square */
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var cx = w / 2;
    var cy = h / 2;
    var rOuter = w * 0.38;
    var rInner = w * 0.24;

    /* background */
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    /* outer ring track */
    ctx.beginPath();
    ctx.arc(cx, cy, rOuter, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(0,229,255,0.15)";
    ctx.lineWidth = 2;
    ctx.stroke();

    /* inner ring track */
    ctx.beginPath();
    ctx.arc(cx, cy, rInner, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255,96,144,0.15)";
    ctx.lineWidth = 2;
    ctx.stroke();

    /* outer ring dots (Cycle A) */
    var sc = superCycleLength();
    var hitsA = sc / cycleA; /* number of hits for A in one super-cycle */
    var hitsB = sc / cycleB;
    var i, angle, x, y, isActive;

    for (i = 0; i < hitsA; i++) {
      angle = -Math.PI / 2 + (2 * Math.PI * i) / hitsA;
      x = cx + rOuter * Math.cos(angle);
      y = cy + rOuter * Math.sin(angle);
      isActive = (i === beatIndexA);

      ctx.beginPath();
      ctx.arc(x, y, isActive ? 8 : 5, 0, 2 * Math.PI);
      ctx.fillStyle = isActive ? "#00e5ff" : "rgba(0,229,255,0.5)";
      ctx.fill();

      if (isActive) {
        ctx.beginPath();
        ctx.arc(x, y, 13, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(0,229,255,0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    /* inner ring dots (Cycle B) */
    for (i = 0; i < hitsB; i++) {
      angle = -Math.PI / 2 + (2 * Math.PI * i) / hitsB;
      x = cx + rInner * Math.cos(angle);
      y = cy + rInner * Math.sin(angle);
      isActive = (i === beatIndexB);

      ctx.beginPath();
      ctx.arc(x, y, isActive ? 8 : 5, 0, 2 * Math.PI);
      ctx.fillStyle = isActive ? "#ff6090" : "rgba(255,96,144,0.5)";
      ctx.fill();

      if (isActive) {
        ctx.beginPath();
        ctx.arc(x, y, 13, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(255,96,144,0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    /* playhead line */
    if (isPlaying) {
      var px = cx + (rOuter + 12) * Math.cos(playheadAngle);
      var py = cy + (rOuter + 12) * Math.sin(playheadAngle);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    /* center label */
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "bold " + Math.round(w * 0.07) + "px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(cycleA + ":" + cycleB, cx, cy);
  }

  /* ── audio ─────────────────────────────────────── */
  var audioStartTime = 0; /* Tone.js audio-clock time when playback started */
  var scheduledEvents = []; /* Tone.Transport event IDs for cleanup */

  function clickSound(freq, time) {
    if (typeof Tone === "undefined") return;
    if (!gain) {
      gain = new Tone.Gain(0.35);
      gain.toDestination();
    }
    var osc = new Tone.Oscillator(freq, "sine");
    var env = new Tone.AmplitudeEnvelope({
      attack: 0.001,
      decay: 0.06,
      sustain: 0,
      release: 0.02
    });
    osc.connect(env);
    env.connect(gain);
    osc.start(time);
    env.triggerAttackRelease(0.05, time);
    /* auto-cleanup after envelope completes */
    setTimeout(function () {
      osc.stop();
      osc.dispose();
      env.dispose();
    }, ((time - Tone.now()) * 1000) + 300);
  }

  function scheduleAllClicks() {
    /* Pre-schedule all clicks for a repeating super-cycle using Tone.js clock */
    var scDurSec = superCycleDuration();
    var sc = superCycleLength();
    var hitsA = sc / cycleA;
    var hitsB = sc / cycleB;
    var intervalA = scDurSec / hitsA;
    var intervalB = scDurSec / hitsB;
    var i, evtId;

    /* Schedule Cycle A clicks — repeat every super-cycle */
    for (i = 0; i < hitsA; i++) {
      (function (idx, offset) {
        evtId = Tone.Transport.scheduleRepeat(function (time) {
          clickSound(800, time);
          beatIndexA = idx;
        }, scDurSec, offset);
        scheduledEvents.push(evtId);
      })(i, i * intervalA);
    }

    /* Schedule Cycle B clicks — repeat every super-cycle */
    for (i = 0; i < hitsB; i++) {
      (function (idx, offset) {
        evtId = Tone.Transport.scheduleRepeat(function (time) {
          clickSound(400, time);
          beatIndexB = idx;
        }, scDurSec, offset);
        scheduledEvents.push(evtId);
      })(i, i * intervalB);
    }
  }

  function clearScheduledEvents() {
    for (var i = 0; i < scheduledEvents.length; i++) {
      Tone.Transport.clear(scheduledEvents[i]);
    }
    scheduledEvents = [];
  }

  /* ── visual animation loop (rAF only — no audio here) ── */
  function animationLoop() {
    if (!isPlaying) return;

    var scDurSec = superCycleDuration();
    /* Derive visual state from Tone.Transport position */
    var transportSec = Tone.Transport.seconds;
    var elapsed = transportSec % scDurSec;
    var fraction = elapsed / scDurSec;
    playheadAngle = -Math.PI / 2 + fraction * 2 * Math.PI;

    drawStatic();
    animId = requestAnimationFrame(animationLoop);
  }

  /* ── playback loop ─────────────────────────────── */
  function startPlayback() {
    if (typeof Tone === "undefined") return;
    Tone.start().then(function () {
      isPlaying = true;
      playBtn.textContent = "\u25A0 Stop";
      playBtn.classList.add("active");
      beatIndexA = -1;
      beatIndexB = -1;

      /* Reset transport and schedule clicks */
      Tone.Transport.stop();
      Tone.Transport.cancel();
      Tone.Transport.position = 0;
      clearScheduledEvents();
      scheduleAllClicks();
      Tone.Transport.start();

      /* Start visual loop */
      animId = requestAnimationFrame(animationLoop);
    });
  }

  function stopPlayback() {
    isPlaying = false;
    Tone.Transport.stop();
    Tone.Transport.cancel();
    clearScheduledEvents();
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    beatIndexA = -1;
    beatIndexB = -1;
    playBtn.textContent = "\u25B6 Play";
    playBtn.classList.remove("active");
    drawStatic();
  }

  /* ── ratio buttons ─────────────────────────────── */
  function selectRatio(a, b, btnEl) {
    cycleA = a;
    cycleB = b;
    for (var i = 0; i < ratioBtns.length; i++) {
      ratioBtns[i].className = "pr-ratio-btn";
    }
    btnEl.className = "pr-ratio-btn active";
    updateInfo();
    if (isPlaying) {
      stopPlayback();
      startPlayback();
    } else {
      drawStatic();
    }
  }

  for (var r = 0; r < ratioBtns.length; r++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        var a = parseInt(btn.getAttribute("data-a"), 10);
        var b = parseInt(btn.getAttribute("data-b"), 10);
        selectRatio(a, b, btn);
      });
    })(ratioBtns[r]);
  }

  /* ── play/stop ─────────────────────────────────── */
  playBtn.addEventListener("click", function () {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  });

  /* ── BPM slider ────────────────────────────────── */
  bpmSlider.addEventListener("input", function () {
    bpm = parseInt(bpmSlider.value, 10);
    bpmValue.textContent = String(bpm);
    updateInfo();
    if (isPlaying) {
      stopPlayback();
      startPlayback();
    }
  });

  /* ── resize handling ───────────────────────────── */
  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { drawStatic(); }, 100);
  });

  /* ── cleanup ───────────────────────────────────── */
  window.addEventListener("beforeunload", function () {
    stopPlayback();
    if (gain) { gain.dispose(); gain = null; }
  });

  /* Stop transport if user navigates away (SPA-like) */
  window.addEventListener("pagehide", function () {
    stopPlayback();
  });

  /* ── initial state: 3:4 selected, static draw ─── */
  ratioBtns[1].className = "pr-ratio-btn active"; /* 3:4 is second button */
  updateInfo();
  drawStatic();
});
</script>

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Pulse (period T) | Beat | Same concept — PhizMusic adds the explicit period variable |
| BPM = 60/T | Tempo (BPM) | Same |
| Duration = 1T | Quarter note (in 4/4) | Western note values are context-dependent; 1T is absolute |
| Duration = 0.5T | Eighth note (in 4/4) | — |
| Duration = 2T | Half note (in 4/4) | — |
| Duration = 4T | Whole note (in 4/4) | — |
| Duration = 0.333T | Triplet eighth (in 4/4) | — |
| Onset position | Beat position | Same concept |
| Cycle (N × T) | Measure / bar | — |
| Cycle length 4T | 4/4 time | Western time signatures encode cycle length + subdivision |
| Cycle length 3T | 3/4 time | — |
| Polyrhythm (3:4) | Cross-rhythm, polyrhythm | Same concept |

## Connections

- [Chord Progressions](chord-progressions.md) — how step-combo sequences unfold over rhythmic cycles
- [Translation Tables](translation-tables.md) — complete rhythm notation mapping
- [ROADMAP](ROADMAP.md) — advanced polyrhythm and world rhythm systems (Tier 3)
