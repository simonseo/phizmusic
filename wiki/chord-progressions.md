---
title: Chord Progressions
aliases: [progressions, harmonic motion, voice-leading]
tier: 2
tags: [harmony, time, prediction]
prerequisites: [chords.md, intervals.md, rhythm.md, consonance-dissonance.md]
related: [chords.md, intervals.md, rhythm.md, consonance-dissonance.md, scales.md, notation-layer.md]
scope-boundary: Step-set sequences, movement metrics, and tension-resolution only. No key modulation or full functional-harmony theory.
has_audio: true
---

# Chord Progressions

A chord progression is a **time-ordered sequence of step-sets**. In PhizMusic, the central question is geometric: how far does each voice move from one step-set to the next? Small total movement tends to sound smooth and coherent; larger movement tends to increase contrast and perceived tension.

> 🎯 **Simple version**: A chord progression is a journey from one group of notes to another. Some journeys feel like "going home" (resolution), others feel like "still traveling" (tension). The brain predicts where the music is going; surprise creates emotion.

## Progressions as Step-Set Sequences

Write each simultaneous sonority as a set (or multiset) of chromatic steps relative to a chosen root frame. A progression is then:

```text
S1 -> S2 -> S3 -> ... -> Sn
```

Example sequence:

```text
{0,4,7} -> {0,5,9} -> {2,7,11} -> {0,4,7}
```

This is often labeled with Roman numerals in conventional theory, but PhizMusic keeps the representation literal: actual step content over time.

## Voice-Leading as Distance Minimization

Given two adjacent step-sets `A` and `B`, voice-leading chooses a mapping between notes in `A` and notes in `B` that minimizes total motion. Define circular step distance on the 12-step ring:

```text
d(a,b) = min((b-a) mod 12, (a-b) mod 12)
```

Then total movement for a specific voice assignment is:

```text
D(A,B) = sum d(ai, bi)
```

Lower `D` usually sounds smoother because fewer spectral components move far at once, preserving auditory continuity.

## Stability, Tension, and Resolution

Step-sets that strongly match harmonic-series templates (for example {0,4,7} with 4:5:6 relation) are often perceived as stable endpoints. Moving to sets with weaker fusion or larger voice movement increases tension. Returning to stable sets with reduced movement is heard as resolution.

In this framing:

- **Tension** = departure from high-fusion patterns and/or larger aggregate movement
- **Resolution** = return toward high-fusion patterns and/or smaller aggregate movement

This avoids culturally specific rule language while still capturing the perceptual dynamics.

## Example 1: Closed Loop with Minimal Return Cost

Sequence:

```text
{0,4,7} -> {0,5,9} -> {2,7,11} -> {0,4,7}
```

One low-cost assignment:

| Transition | Voice motions | Total movement |
|-----------|---------------|----------------|
| {0,4,7} -> {0,5,9} | 0->0 (0), 4->5 (1), 7->9 (2) | 3 |
| {0,5,9} -> {2,7,11} | 0->11 (1), 5->7 (2), 9->2 (5) | 8 |
| {2,7,11} -> {0,4,7} | 2->0 (2), 7->7 (0), 11->4 (5) | 7 |

Interpretation: the middle transition has the largest movement and is commonly heard as the point of greatest directional drive. The final return restores the opening spectral template.

## Example 2: Alternating Stable and Ambiguous Sets

Sequence:

```text
{0,4,7} -> {0,4,8} -> {0,4,7}
```

- `{0,4,7}` aligns with 4:5:6 (strong fusion)
- `{0,4,8}` is more symmetric and less harmonic-series aligned

Only one pitch shifts by one step each transition (7 <-> 8), so movement is minimal, but spectral interpretation changes sharply. This is a high-contrast, low-distance tension device.

## Example 3: Stepwise Bass Trajectory

Sequence (root shift by +1 each event, same interval shape):

```text
{0,4,7} -> {1,5,8} -> {2,6,9} -> {3,7,10}
```

Each voice can move by +1 each step, giving constant small motion (`D = 3` per transition). Perceptually, this sounds smooth locally but directionally unstable globally because no high-fusion home set is re-established.

## Psychoacoustics: Prediction Over Time

The auditory system does not evaluate each chord in isolation. It builds short-horizon expectations from recent transition statistics:

- Repeated transition patterns create strong predictions
- Predicted arrivals trigger reward when fulfilled
- Violations create surprise and orienting response

So musical emotion in progression space can be framed as **prediction error over harmonic trajectories**, not mystical harmony rules.

## Hear the Progressions

Click to hear each progression played as a sequence of chords. Listen for the tension-resolution arc described above.

<p><button class="phiz-play-btn" data-chords="[[0,4,7],[7,11,14],[9,12,16],[5,9,12]]" data-octave="4" onclick="playProgression(this)">▶ I – V – vi – IV</button></p>

<p><button class="phiz-play-btn" data-chords="[[0,4,7],[5,9,12],[7,11,14],[0,4,7]]" data-octave="4" onclick="playProgression(this)">▶ I – IV – V – I</button></p>

<p><button class="phiz-play-btn" data-chords="[[2,5,9],[7,11,14],[0,4,7]]" data-octave="4" onclick="playProgression(this)">▶ ii – V – I</button></p>

<!-- INTERACTIVE: Progression path visualizer — show step-sets as points/blocks on a chromatic grid timeline, compute total movement D for each transition, and audition low-vs-high movement mappings -->

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Step-set sequence | Chord progression | Same concept, literalized representation |
| Total movement D | Voice-leading smoothness | Quantitative movement metric |
| Stable high-fusion set | Tonic-like arrival | Function language avoided in core text |
| Tension-resolution arc | Cadential motion | Framed as spectral/predictive dynamics |

## Connections

- [Chords](chords.md) — defines step-sets used as progression states
- [Intervals](intervals.md) — step-distance metric underlying movement cost
- [Consonance & Dissonance](consonance-dissonance.md) — explains fusion and roughness basis of stability
- [Rhythm](rhythm.md) — progression is always embedded in onset timing
- [Scales](scales.md) — progression choices are constrained by selected step-subset
- [Notation Layer](notation-layer.md) — progression trajectories are visualizable as geometric shifts
