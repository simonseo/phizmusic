---
title: Intervals
aliases: [step-distance, interval, musical intervals]
tier: 1
tags: [music, foundation, reference]
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

| Step-distance | Just ratio | Just cents | 12-TET cents | Error | Character |
|---------------|-----------|-----------|-------------|-------|-----------|
| 0 | 1:1 | 0.0 | 0 | 0.0 | Identity — same pitch |
| 1 | 16:15 | 111.7 | 100 | -11.7 | Maximum tension, semitone "rub" |
| 2 | 9:8 | 203.9 | 200 | -3.9 | Mild tension, melodic step |
| 3 | 6:5 | 315.6 | 300 | -15.6 | Dark, warm fusion |
| 4 | 5:4 | 386.3 | 400 | +13.7 | Bright, sweet fusion |
| 5 | 4:3 | 498.0 | 500 | +2.0 | Open, stable |
| 6 | √2:1 | 600.0 | 600 | 0.0 | Maximum ambiguity, symmetry point |
| 7 | 3:2 | 702.0 | 700 | -2.0 | Maximum fusion after octave |
| 8 | 8:5 | 813.7 | 800 | -13.7 | Inversion of step-4 |
| 9 | 5:3 | 884.4 | 900 | +15.6 | Bright, open |
| 10 | 9:5 | 1017.6 | 1000 | -17.6 | Tense, wants to resolve |
| 11 | 15:8 | 1088.3 | 1100 | +11.7 | Extreme tension, leading tone |
| 12 | 2:1 | 1200.0 | 1200 | 0.0 | Octave — perceptual "reset" |

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
