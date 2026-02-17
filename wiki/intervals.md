---
title: Intervals
aliases: [step-distance, interval, musical intervals]
tier: 1
category: music
tags: [music, foundation, reference]
has_audio: true
prerequisites: [naming-system.md, frequency-ratios.md, harmonic-series.md]
related: [frequency-ratios.md, harmonic-series.md, naming-system.md, scales.md, chords.md, consonance-dissonance.md, twelve-tet.md]
scope-boundary: Interval definition and catalog only. No scale construction, no chord theory.
---

# Intervals

An **interval** is the distance between two pitches, measured as a **step-distance** — the number of chromatic steps separating them. Step-distance is the PhizMusic primary measure: unambiguous, arithmetic-friendly, and independent of any scale or key. Each step-distance corresponds to a frequency ratio that explains its acoustic character.

> 🎯 **Simple version**: The distance between two notes is counted in steps (0 to 12). Each step-distance has a natural frequency ratio. Step-distance 7 (what musicians call a "fifth") is special because it's the 3:2 ratio — the simplest ratio after the octave. Small-number ratios sound smooth; big-number ratios sound rough.

## Dual Description: Step-Distance and Ratio

Every interval has two complementary descriptions:

- **Step-distance** answers: *how many chromatic steps apart?* — practical, exact in 12-TET
- **Frequency ratio** answers: *why does it sound this way?* — physical, explains the acoustics

Neither description alone is complete. The step-distance tells you which keys to press; the ratio tells you why the result sounds consonant, tense, or neutral.

## The Complete Interval Table

All intervals within one octave (0 through 12 steps), with both the just-intonation ratio (from the [harmonic series](harmonic-series.md)) and the 12-TET approximation:

<table>
  <thead>
    <tr>
      <th>Step-distance</th>
      <th>Just ratio</th>
      <th>Just cents</th>
      <th>12-TET cents</th>
      <th>Error</th>
      <th>Character</th>
      <th>Preview</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>1:1</td>
      <td>0.0</td>
      <td>0</td>
      <td>0.0</td>
      <td>Identity — same pitch</td>
      <td><button class="phiz-play-btn" data-steps="[0]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>1</td>
      <td>16:15</td>
      <td>111.7</td>
      <td>100</td>
      <td>-11.7</td>
      <td>Maximum tension, semitone "rub"</td>
      <td><button class="phiz-play-btn" data-steps="[0,1]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>2</td>
      <td>9:8</td>
      <td>203.9</td>
      <td>200</td>
      <td>-3.9</td>
      <td>Mild tension, melodic step</td>
      <td><button class="phiz-play-btn" data-steps="[0,2]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>3</td>
      <td>6:5</td>
      <td>315.6</td>
      <td>300</td>
      <td>-15.6</td>
      <td>Dark, warm fusion</td>
      <td><button class="phiz-play-btn" data-steps="[0,3]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>4</td>
      <td>5:4</td>
      <td>386.3</td>
      <td>400</td>
      <td>+13.7</td>
      <td>Bright, sweet fusion</td>
      <td><button class="phiz-play-btn" data-steps="[0,4]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>5</td>
      <td>4:3</td>
      <td>498.0</td>
      <td>500</td>
      <td>+2.0</td>
      <td>Open, stable</td>
      <td><button class="phiz-play-btn" data-steps="[0,5]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>6</td>
      <td>√2:1</td>
      <td>600.0</td>
      <td>600</td>
      <td>0.0</td>
      <td>Maximum ambiguity, symmetry point</td>
      <td><button class="phiz-play-btn" data-steps="[0,6]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>7</td>
      <td>3:2</td>
      <td>702.0</td>
      <td>700</td>
      <td>-2.0</td>
      <td>Maximum fusion after octave</td>
      <td><button class="phiz-play-btn" data-steps="[0,7]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>8</td>
      <td>8:5</td>
      <td>813.7</td>
      <td>800</td>
      <td>-13.7</td>
      <td>Inversion of step-4</td>
      <td><button class="phiz-play-btn" data-steps="[0,8]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>9</td>
      <td>5:3</td>
      <td>884.4</td>
      <td>900</td>
      <td>+15.6</td>
      <td>Bright, open</td>
      <td><button class="phiz-play-btn" data-steps="[0,9]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>10</td>
      <td>9:5</td>
      <td>1017.6</td>
      <td>1000</td>
      <td>-17.6</td>
      <td>Tense, wants to resolve</td>
      <td><button class="phiz-play-btn" data-steps="[0,10]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>11</td>
      <td>15:8</td>
      <td>1088.3</td>
      <td>1100</td>
      <td>+11.7</td>
      <td>Extreme tension, leading tone</td>
      <td><button class="phiz-play-btn" data-steps="[0,11]" onclick="playStepSet(this)">▶</button></td>
    </tr>
    <tr>
      <td>12</td>
      <td>2:1</td>
      <td>1200.0</td>
      <td>1200</td>
      <td>0.0</td>
      <td>Octave — perceptual "reset"</td>
      <td><button class="phiz-play-btn" data-steps="[0,12]" onclick="playStepSet(this)">▶</button></td>
    </tr>
  </tbody>
</table>

### Reading the Table

- **Just ratio**: the simple-integer ratio that the interval approximates, derived from the harmonic series
- **Just cents**: the exact size of the just ratio in cents (`1200 × log₂(ratio)`)
- **12-TET cents**: the equal-temperament size (step-distance × 100)
- **Error**: how far 12-TET deviates from just (positive = 12-TET is wider, negative = narrower)
- **Character**: a brief perceptual description (not prescriptive — different musical contexts change how an interval "feels")

### Notable Observations

**Step-distance 6** (the tritone) is unique: it exactly bisects the octave. Its ratio in 12-TET is √2:1 — the only irrational ratio that is exactly representable. In just intonation, there's no single "correct" ratio for this interval; it sits at the boundary between two harmonic territories (the 7:5 from below, the 10:7 from above).

**Step-distances 5 and 7** are the best-approximated intervals in 12-TET (within 2 cents of just). This is not coincidence — 12-TET was designed to optimize these critical intervals.

**Step-distances 4 and 3** have the largest errors (~14-16 cents). These are the intervals most affected by the equal-temperament compromise, and the ones where the difference between 12-TET and just intonation is most audible in sustained chords.

## Ear Training

<div class="phiz-viz-container" id="et-game">
<div class="phiz-viz-title">Interval Ear Training</div>
<div id="et-score" style="color:rgba(255,255,255,0.7);font-size:0.85rem;margin-bottom:8px;">Score: 0 / 0 correct</div>
<div id="et-feedback" style="min-height:1.4em;font-size:0.85rem;margin-bottom:8px;">&nbsp;</div>
<div class="phiz-viz-controls" style="margin-bottom:8px;">
  <button id="et-new">New Interval</button>
  <button id="et-replay">Replay</button>
</div>
<div class="phiz-viz-controls" id="et-answers" style="flex-wrap:wrap;"></div>
</div>

<script>
(function() {
  var BASE_FREQ = 220;
  var TONE_DURATION = 0.8;
  var GAP = 0.3;
  var correct = 0;
  var total = 0;
  var currentStep = -1;
  var answered = false;
  var playing = false;
  var answerBtns = [];

  var scoreEl = document.getElementById("et-score");
  var feedbackEl = document.getElementById("et-feedback");
  var newBtn = document.getElementById("et-new");
  var replayBtn = document.getElementById("et-replay");
  var answersContainer = document.getElementById("et-answers");

  // Build 13 answer buttons (0-12)
  for (var i = 0; i <= 12; i++) {
    var btn = document.createElement("button");
    btn.textContent = String(i);
    btn.setAttribute("data-step", String(i));
    btn.addEventListener("click", (function(step) {
      return function() { handleAnswer(step); };
    })(i));
    answersContainer.appendChild(btn);
    answerBtns.push(btn);
  }

  function updateScore() {
    scoreEl.textContent = "Score: " + correct + " / " + total + " correct";
  }

  function clearButtonStyles() {
    for (var j = 0; j < answerBtns.length; j++) {
      answerBtns[j].className = "";
      answerBtns[j].style.background = "";
      answerBtns[j].style.borderColor = "";
      answerBtns[j].style.color = "";
    }
  }

  function flashButton(btn, color) {
    if (color === "green") {
      btn.style.background = "#00c853";
      btn.style.borderColor = "#00c853";
      btn.style.color = "#111";
    } else {
      btn.style.background = "#ff1744";
      btn.style.borderColor = "#ff1744";
      btn.style.color = "#fff";
    }
  }

  function playInterval(step, callback) {
    if (playing) return;
    playing = true;
    var secondFreq = BASE_FREQ * Math.pow(2, step / 12);

    Tone.start().then(function() {
      // First tone
      var gain1 = new Tone.Gain(0.3).toDestination();
      var osc1 = new Tone.Oscillator(BASE_FREQ, "sine").connect(gain1);
      osc1.start();

      setTimeout(function() {
        osc1.stop();
        osc1.dispose();
        gain1.dispose();

        // Gap then second tone
        setTimeout(function() {
          var gain2 = new Tone.Gain(0.3).toDestination();
          var osc2 = new Tone.Oscillator(secondFreq, "sine").connect(gain2);
          osc2.start();

          setTimeout(function() {
            osc2.stop();
            osc2.dispose();
            gain2.dispose();
            playing = false;
            if (callback) callback();
          }, TONE_DURATION * 1000);
        }, GAP * 1000);
      }, TONE_DURATION * 1000);
    });
  }

  function newRound() {
    answered = false;
    clearButtonStyles();
    feedbackEl.innerHTML = "&nbsp;";
    currentStep = Math.floor(Math.random() * 13);
    playInterval(currentStep);
  }

  function handleAnswer(step) {
    if (answered || currentStep < 0 || playing) return;
    answered = true;
    total++;

    if (step === currentStep) {
      correct++;
      flashButton(answerBtns[step], "green");
      feedbackEl.style.color = "#00c853";
      feedbackEl.textContent = "Correct!";
      updateScore();
      setTimeout(function() { newRound(); }, 1000);
    } else {
      flashButton(answerBtns[step], "red");
      flashButton(answerBtns[currentStep], "green");
      feedbackEl.style.color = "#ff1744";
      feedbackEl.textContent = "Correct answer: step-distance " + currentStep;
      updateScore();
    }
  }

  newBtn.addEventListener("click", function() {
    newRound();
  });

  replayBtn.addEventListener("click", function() {
    if (currentStep < 0 || playing) return;
    playInterval(currentStep);
  });

  updateScore();
})();
</script>

## Interval Inversion

Every interval has a **complement** (inversion) that together with it completes an octave:

```
step-distance + inversion = 12
```

| Step-distance | Inversion | Ratio | Inversion ratio |
|---------------|-----------|-------|-----------------|
| 0 | 12 | 1:1 | 2:1 |
| 1 | 11 | 16:15 | 15:8 |
| 2 | 10 | 9:8 | 9:5 |
| 3 | 9 | 6:5 | 5:3 |
| 4 | 8 | 5:4 | 8:5 |
| 5 | 7 | 4:3 | 3:2 |
| 6 | 6 | √2:1 | √2:1 |

Step-6 is its own inversion — it divides the octave exactly in half.

## Why Simple Ratios Sound Fused

When two tones are in a simple frequency ratio, their harmonic overtones align:

**Example: step-distance 7 (ratio 3:2, tones at 200 Hz and 300 Hz)**

```
Lower tone harmonics:  200  400  600  800  1000  1200  1400  1600 ...
Upper tone harmonics:  300  600  900  1200 1500  1800  2100  2400 ...
                            ^^^       ^^^^              
                         Shared frequencies!
```

Every 3rd harmonic of the lower tone matches every 2nd harmonic of the upper tone. These shared frequencies reinforce rather than interfere. The harmonics that don't match are well-separated — outside each other's critical bandwidth — so they don't create roughness.

**Example: step-distance 1 (ratio ~16:15, tones at 200 Hz and 212 Hz)**

```
Lower tone harmonics:  200  400  600  800  1000 ...
Upper tone harmonics:  212  424  636  848  1060 ...
                       ^^^  ^^^  ^^^  ^^^
                    12Hz  24Hz  36Hz  48Hz apart — within critical bandwidth!
```

Nearly every pair of harmonics falls within critical bandwidth, creating roughness (rapid beating). This is the physics of dissonance (see [consonance-dissonance.md](consonance-dissonance.md)).

## Compound Intervals

Intervals larger than 12 steps span more than one octave. They are heard as the basic interval (mod 12) at a wider spacing:

- Step-distance 14 = 12 + 2 = an octave plus step-distance 2
- Step-distance 19 = 12 + 7 = an octave plus step-distance 7

Compound intervals are common in chords and orchestration but maintain the acoustic character of their mod-12 equivalent, colored by the additional spacing.

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Step-distance 0 | Unison | — |
| Step-distance 1 | Minor 2nd / semitone | "Half step" |
| Step-distance 2 | Major 2nd / whole tone | "Whole step" |
| Step-distance 3 | Minor 3rd | — |
| Step-distance 4 | Major 3rd | — |
| Step-distance 5 | Perfect 4th | — |
| Step-distance 6 | Tritone / augmented 4th / diminished 5th | Multiple Western names for one interval |
| Step-distance 7 | Perfect 5th | — |
| Step-distance 8 | Minor 6th | — |
| Step-distance 9 | Major 6th | — |
| Step-distance 10 | Minor 7th | — |
| Step-distance 11 | Major 7th | — |
| Step-distance 12 | Octave | — |

Note: Western names count from 1 (unison = "1st"), count only diatonic steps, and use quality labels (minor, major, perfect, augmented, diminished). PhizMusic counts from 0, counts all chromatic steps, and uses no quality labels — the number IS the description.

## Connections

- [Frequency Ratios](frequency-ratios.md) — the ratio mathematics underlying each step-distance
- [Harmonic Series](harmonic-series.md) — the physical source of the just-intonation ratios
- [Naming System](naming-system.md) — how step-numbers enable interval arithmetic
- [Scales](scales.md) — intervals as the building blocks of scale construction
- [Chords](chords.md) — intervals stacked simultaneously
- [Consonance & Dissonance](consonance-dissonance.md) — the perceptual mechanism behind interval character
- [Twelve-TET](twelve-tet.md) — why the "Error" column exists

### Suggested References

- [Intervals (muted.io)](https://muted.io/intervals/) — Visual piano-based interval explorer with ear training exercises
- [Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/) — Hear and see the dissonance landscape across all intervals from unison to octave
