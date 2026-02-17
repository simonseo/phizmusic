---
title: Chords
aliases: [step-sets, ratio-sets, triads, chord]
tier: 1
category: music
tags: [music, foundation, harmony]
prerequisites: [intervals.md, harmonic-series.md, frequency-ratios.md, naming-system.md]
related: [intervals.md, harmonic-series.md, frequency-ratios.md, chord-progressions.md, consonance-dissonance.md, scales.md]
scope-boundary: Chord definition, step-set/ratio-set notation, common chord catalog only. No chord progressions, no inversions or voicing in depth.
---

# Chords

A **chord** is two or more pitches sounding simultaneously. PhizMusic describes every chord in two complementary ways:

- **Ratio-set** — the frequency ratios between the notes, explaining *why* the chord sounds the way it does (physics)
- **Step-set** — the chromatic step positions relative to the lowest note, specifying *which* notes to play (practical)

Ratio first, then step-set. The physics explains the perception; the step-set makes it playable.

> 🎯 **Simple version**: A chord is multiple notes at once. Some combinations sound smooth because they match the natural pattern of vibrating objects (the harmonic series). The chord {0, 4, 7} matches harmonics 4, 5, 6 — that's why it sounds natural. PhizMusic describes chords by their frequency ratio (why it sounds good) AND their step positions (which keys to press).

## Why Ratios First

The conventional approach teaches chord shapes — "stack a third then another third." This tells you *what* to play but not *why* it works.

The physics-first approach starts from the [harmonic series](harmonic-series.md):

```
Harmonics:     1f    2f    3f    4f    5f    6f    7f    8f ...
```

Any subset of consecutive harmonics produces a naturally fused chord because:
1. The components are exact integer multiples of a shared fundamental
2. Their overlapping overtones reinforce rather than clash
3. The auditory system's harmonic template matching (see [ear-cochlea.md](ear-cochlea.md)) recognizes the pattern and groups it as "one sound"

The most important example: **harmonics 4, 5, and 6**.

## The 4:5:6 Chord

Take harmonics 4, 5, and 6 of any fundamental:

```
4f : 5f : 6f
```

Simplify by factoring out f:

```
Ratio-set: 4:5:6
```

What are the intervals?
- Between 4f and 5f: ratio 5/4 = 386 cents ≈ step-distance 4
- Between 5f and 6f: ratio 6/5 = 316 cents ≈ step-distance 3
- Between 4f and 6f: ratio 6/4 = 3/2 = 702 cents ≈ step-distance 7

So the step-set is: **{0, 4, 7}**

This chord is maximally fused because every component is a harmonic of the implied fundamental (the frequency at 1f, two octaves below the lowest note). The auditory system hears this as a single, rich, stable sound.

Western theory calls this a "major triad." PhizMusic calls it what it is: the 4:5:6 harmonic selection, played as step-set {0, 4, 7}.

## Common Chords

### Triads (3 notes)

| Step-set | Ratio-set | Harmonic origin | Character |
|----------|-----------|-----------------|-----------|
| {0, 4, 7} | 4:5:6 | Harmonics 4, 5, 6 | Maximum fusion — bright, stable, resolved |
| {0, 3, 7} | 10:12:15 | No simple harmonic group | Dark, warm — the 6:5 ratio on bottom gives a minor quality |
| {0, 3, 6} | ~25:30:36 | No clean harmonic origin | Tense, unstable — both intervals are imperfect |
| {0, 4, 8} | ~16:20:25 | No clean harmonic origin | Symmetrical (equal step-4 intervals), ambiguous, floating |

**Why {0, 3, 7} sounds different from {0, 4, 7}**: The ratio 10:12:15 involves larger numbers than 4:5:6. Larger ratio numbers = more complex relationship = less harmonic overlap = less perceptual fusion. The chord still sounds "good" (the outer step-distance 7 is the solid 3:2 ratio), but the internal structure is less aligned with the harmonic series, giving it a darker, more complex quality.

**Why {0, 3, 6} sounds tense**: Neither internal interval (step-3 and step-3) matches the strong 3:2 or 4:3 ratios. The outer interval (step-6, the tritone) sits at the point of maximum harmonic ambiguity. There is no implied fundamental that neatly generates this combination.

### Tetrads (4 notes)

| Step-set | Ratio-set | Harmonic origin | Character |
|----------|-----------|-----------------|-----------|
| {0, 4, 7, 10} | 4:5:6:7 | Harmonics 4, 5, 6, 7 | The "natural tetrad" — all four notes from the harmonic series. Bluesy, wants to resolve. |
| {0, 4, 7, 11} | 8:10:12:15 | — | Lush, jazz-inflected, complex but not harsh |
| {0, 3, 7, 10} | 10:12:15:18 | — | Dark + tension — foundation of blues and minor keys |
| {0, 4, 7, 10, 14} | ~4:5:6:7:9 | Harmonics 4-7 + 9 | Extended "natural" chord — all harmonic series |

**The {0, 4, 7, 10} tetrad** deserves special attention. Its ratio-set 4:5:6:7 means it literally IS harmonics 4 through 7 of a fundamental. The 7th harmonic (ratio 7:4 = 969 cents) falls 31 cents below the 12-TET step-10 (1000 cents). This means the "natural" version of this chord doesn't quite match the 12-TET approximation. Barbershop quartets and blues singers instinctively tune the top note lower than 12-TET to hit the 7:4 sweet spot. Western theory calls this chord "dominant seventh" and explains it as functional harmony. Physics simply says: "It's harmonics 4-5-6-7."

## Building Chords from Step-Sets

Any combination of step-numbers is a valid chord. But some step-sets produce more perceptual fusion than others. A rough hierarchy:

1. **Step-sets that map to small-integer ratio-sets** (e.g., {0,4,7} → 4:5:6): maximum fusion
2. **Step-sets with a strong 3:2 backbone** (e.g., {0,3,7} — the outer 7 is solid): moderate fusion
3. **Step-sets without any strong ratio anchors** (e.g., {0,1,2}): minimal fusion, maximum roughness

This hierarchy is a description of physics, not a prescription of taste. Composers deliberately use all levels of fusion and roughness for expressive purposes. Tension and resolution are two sides of the same phenomenon (see [chord-progressions.md](chord-progressions.md)).

## Transposition

Because chords are step-sets, transposition is addition:

```
Original:      {0, 4, 7}
Transpose +5:  {5, 9, 0}  (mod 12)
Transpose +7:  {7, 11, 2} (mod 12)
```

The internal intervals — and therefore the ratios, the fusion quality, and the character — are invariant under transposition. In 12-TET, every transposition sounds identical. This is the payoff of equal temperament (see [twelve-tet.md](twelve-tet.md)).

## Voicing and Registration

The step-set {0, 4, 7} specifies pitch *classes* — which of the 12 chromatic steps to include. It doesn't specify:
- Which octave each note is in (registration)
- How the notes are spaced across octaves (voicing)
- How many times each note appears (doubling)

These choices affect the sound significantly — a closely spaced {0, 4, 7} in one octave sounds different from a widely spaced version across three octaves — but the harmonic identity (4:5:6 ratio relationship) is preserved. Voicing is an expressive dimension beyond the step-set itself.

<!-- INTERACTIVE: Chord explorer — select step-numbers on a chromatic grid, hear the result, see the ratio-set and harmonic-series alignment displayed -->

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Step-set {0, 4, 7} | Major triad (C-E-G if rooted on Do) | PhizMusic specifies intervals; Western names require a root |
| Step-set {0, 3, 7} | Minor triad | — |
| Step-set {0, 3, 6} | Diminished triad | — |
| Step-set {0, 4, 8} | Augmented triad | — |
| Step-set {0, 4, 7, 10} | Dominant 7th | Physics: "natural tetrad" (harmonics 4-5-6-7) |
| Step-set {0, 4, 7, 11} | Major 7th | — |
| Step-set {0, 3, 7, 10} | Minor 7th | — |
| Ratio-set 4:5:6 | — | No standard Western term for ratio-based chord description |
| Step-set | Chord type/quality | PhizMusic is root-agnostic; Western requires stating the root note |

## Connections

- [Intervals](intervals.md) — the step-distances that make up a chord's internal structure
- [Harmonic Series](harmonic-series.md) — the physical source of the ratio-sets
- [Frequency Ratios](frequency-ratios.md) — why simple ratios produce fusion
- [Chord Progressions](chord-progressions.md) — how chords connect in sequences over time
- [Consonance & Dissonance](consonance-dissonance.md) — the perceptual mechanism behind chord "stability" and "tension"
- [Scales](scales.md) — chords as simultaneous selections from a step-subset
