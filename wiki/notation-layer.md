---
title: Notation Layer
aliases: [notation, chromatic grid, piano roll, Dodeka]
tier: 2
tags: [notation, visualization, mapping]
prerequisites: [naming-system.md, scales.md, twelve-tet.md]
related: [naming-system.md, scales.md, intervals.md, twelve-tet.md, digital-audio.md, translation-tables.md]
scope-boundary: Describes existing notation systems (Dodeka and piano roll) plus a continuous log-frequency overlay concept. No new symbols or software implementation.
---

# Notation Layer

PhizMusic uses an existing notation family: the **chromatic grid** used by Dodeka and DAW piano roll editors. The vertical axis is pitch (12 equal rows per octave), the horizontal axis is time. This representation is isomorphic: the same interval always has the same visual distance, and transposition is a geometric shift instead of a spelling problem.

> 🎯 **Simple version**: Instead of the confusing 5-line staff with sharps and flats, we use a grid: 12 rows (one per note), time going left to right. Like a piano keyboard unrolled. Any pattern looks the same no matter where you start.

## Core Representation: Chromatic Grid

The notation layer has two axes:

- **Vertical (pitch)**: one row per chromatic step, repeating every octave
- **Horizontal (time)**: onset and duration drawn proportionally (like a timeline)

For one octave, the rows are:

| Step | Syllable | Row meaning |
|------|----------|-------------|
| 0 | Do | Base row of cycle |
| 1 | Ka | +1 step |
| 2 | Re | +2 steps |
| 3 | Xo | +3 steps |
| 4 | Mi | +4 steps |
| 5 | Fa | +5 steps |
| 6 | Hu | +6 steps |
| 7 | So | +7 steps |
| 8 | Bi | +8 steps |
| 9 | La | +9 steps |
| 10 | Ve | +10 steps |
| 11 | Si | +11 steps |

Octave index gives absolute position (for example, Do4, Ka4, ... Si4, then Do5).

## Why This Is Better for Pattern Reasoning

Traditional 5-line staff notation is tied to a 7-letter spelling system (A-B-C-D-E-F-G) with accidentals and enharmonic aliases. The chromatic grid removes that indirection.

Key consequences:

1. **Transposition is translation**: add a constant step to every note, and the shape stays identical.
2. **Intervals are visual invariants**: step-distance 7 always looks like 7 rows, everywhere.
3. **Rhythm is explicit geometry**: duration is literal horizontal length.
4. **No enharmonic ambiguity**: each step has one canonical identity.

This directly matches PhizMusic arithmetic from [naming-system.md](naming-system.md), [intervals.md](intervals.md), and [scales.md](scales.md).

## Dodeka and Piano Roll: Two Faces of the Same Geometry

## Dodeka

Dodeka (Jacques-Daniel Rochat) is a chromatic notation system that assigns one unique syllable to each chromatic step and uses a compact 4-line staff layout with alternating note positions. It keeps interval geometry consistent while staying readable for score-like notation.

PhizMusic uses Dodeka's naming and chromatic-equality philosophy, with explicit attribution to the original system: [https://dodekamusic.com/](https://dodekamusic.com/).

## Piano Roll

Piano roll notation originates from mechanical player-piano media and became the dominant representation in modern DAWs. It has three formal properties that align with PhizMusic:

- **Chromatic completeness**: all 12 steps are represented uniformly
- **Isomorphic layout**: interval shapes are invariant under transposition
- **Time proportionality**: note length and spacing are directly visible

Because of these properties, piano roll is the de facto analysis and production view in electronic music, film scoring workflows, and MIDI editing.

## Continuous Log-Frequency Overlay

The chromatic grid is the discrete base layer. For tuning systems that are not locked to 12-TET (just intonation, microtonal inflection, blue-note bends), PhizMusic adds a conceptual overlay:

- Keep the 12-step grid as reference coordinates
- Superimpose a **continuous log-frequency axis**
- Allow note events to sit between nominal grid rows

This preserves two goals at once:

1. **Discrete compositional structure** (step-sets, scales, progressions)
2. **Continuous intonation detail** (real performance frequencies)

In equation form:

```text
pitch position = discrete_step + cent_offset/100
```

where `cent_offset` can be positive or negative relative to the 12-TET row.

## Psychoacoustics Connection

Human pitch perception is approximately logarithmic: equal ratios feel like equal steps. A chromatic grid with equal vertical spacing per step better matches this perceptual structure than diatonic staff spacing, where visual distances depend on notation spelling conventions.

So the notation layer is not just simpler; it is also closer to how the auditory system organizes pitch categories.

<!-- INTERACTIVE: Notation toggle — show the same melody/chord progression in (1) 5-line staff, (2) Dodeka-style chromatic layout, and (3) piano roll, with a transposition slider to demonstrate geometric invariance -->

## Translation Table

| PhizMusic | Western | Other Systems |
|-----------|---------|---------------|
| Chromatic grid notation | Piano roll (closest equivalent) | Dodeka chromatic staff |
| Step row | Semitone row | MIDI note lane |
| Shape-preserving transposition | Transpose up/down by interval | Pattern shift in sequencer |
| Continuous log-frequency overlay | Microtonal pitch bend layer | Cents deviation display |

## Connections

- [Naming System](naming-system.md) — defines the step and syllable identities placed on the grid
- [Scales](scales.md) — scales are row subsets on this grid
- [Intervals](intervals.md) — each interval is a fixed row-distance
- [Twelve-TET](twelve-tet.md) — defines the default row spacing in frequency ratio terms
- [Chord Progressions](chord-progressions.md) — progression shapes become visual trajectories
- [Digital Audio](digital-audio.md) — MIDI and DAW workflows use this representation directly
- [Translation Tables](translation-tables.md) — maps notation vocabulary to conventional terms
