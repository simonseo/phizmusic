---
title: Rhythm
aliases: [pulse-fraction system, beat, tempo, meter]
tier: 1
tags: [music, foundation, time]
prerequisites: [naming-system.md]
related: [chord-progressions.md, translation-tables.md]
scope-boundary: Pulse-fraction system definition and basic mappings only. No advanced polyrhythm, groove, or swing (Tier 3).
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
Cycle A (3T): |  ●  .  .  |  ●  .  .  |  ●  .  .  |  ●  .  .  |
Cycle B (4T): |  ●  .  .  .  |  ●  .  .  .  |  ●  .  .  .  |

Combined 3:4 polyrhythm over 12T super-cycle:
|  ●  .  .  ●  .  .  .  ●  .  ●  .  .  |
```

In 3:4 polyrhythm, the two patterns align every 12T (the LCM of 3 and 4). The listener can "hear" either cycle as primary, creating a perceptual ambiguity that many musical traditions exploit.

Cross-cultural examples of polyrhythm — particularly West African drumming ensembles using 3:4, 3:2, and more complex ratios — are rich territory. This is deferred to Tier 3 for detailed treatment; see [ROADMAP](ROADMAP.md).

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

- [Chord Progressions](chord-progressions.md) — how step-set sequences unfold over rhythmic cycles
- [Translation Tables](translation-tables.md) — complete rhythm notation mapping
- [ROADMAP](ROADMAP.md) — advanced polyrhythm and world rhythm systems (Tier 3)
