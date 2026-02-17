---
title: Scales
aliases: [step-subsets, scale, modes]
tier: 1
category: music
sidebar_order: 2
tags: [music, foundation]
has_audio: true
prerequisites: [naming-system.md, intervals.md, frequency-ratios.md]
related: [intervals.md, naming-system.md, chords.md, frequency-ratios.md, pentatonic-cross-cultural.md, twelve-tet.md, consonance-dissonance.md]
scope-boundary: Step-subset definition, prime-limit concept, major scale families only. No raga, maqam, or gamelan detail (Tier 3). No key signatures or extended modal theory.
---

# Scales

A **scale** is a **step-subset** — a selection of step-numbers from the full set {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}. You have 12 pitches available per octave; a scale chooses which ones to use. Different selections produce different melodic characters — different "flavors" — optimized for different musical purposes.

> 🎯 **Simple version**: A scale is a menu — you pick some notes from the 12 available. Different menus give different flavors. The 5-note menu (pentatonic) shows up everywhere because it tastes good to almost every human ear. The 7-note menu (major/minor) adds variety at the cost of including some tense intervals.

## Scales as Step-Subsets

A scale doesn't need a name to exist. It IS its step-subset:

```
{0, 2, 4, 5, 7, 9, 11}    ← a 7-element subset
{0, 2, 4, 7, 9}            ← a 5-element subset
{0, 2, 4, 6, 8, 10}        ← a 6-element subset
```

Each subset has properties you can analyze without any cultural context:
- **Size**: how many pitches (5-of-12, 7-of-12, etc.)
- **Gap pattern**: the step-intervals between consecutive members
- **Interval content**: which step-intervals are available between any two members
- **Symmetry**: does the subset map onto itself under transposition or inversion?

## Common Step-Subsets

### Pentatonic Major: {0, 2, 4, 7, 9}

<button class="phiz-play-btn" data-steps="[0,2,4,7,9,12]" onclick="playScale(this)">▶ Play</button>

**Gap pattern**: 2-2-3-2-3 (five gaps, all either 2 or 3 steps)

```
Steps:  0  1  2  3  4  5  6  7  8  9  10  11
        ●     ●     ●        ●     ●
```

This subset appears in Chinese (宫调 gōng diào), Japanese (Yo scale), Scottish, West African, Andean, and many other traditions independently. Why? It **maximizes step-7 and step-5 relationships**: every note has at least one partner at the 5-step-interval or 7 — the most consonant intervals after the octave. It also **completely avoids** step-intervals 1 and 2 between any two members — the intervals of maximum roughness.

See [Pentatonic & Cross-Cultural](pentatonic-cross-cultural.md) for the full story.

### Major Scale: {0, 2, 4, 5, 7, 9, 11}

<button class="phiz-play-btn" data-steps="[0,2,4,5,7,9,11,12]" onclick="playScale(this)">▶ Play</button>

**Gap pattern**: 2-2-1-2-2-2-1 (seven gaps)

```
Steps:  0  1  2  3  4  5  6  7  8  9  10  11
        ●     ●     ●  ●     ●     ●      ●
```

This is the 7-of-12 subset that can be derived by stacking six step-7 intervals: start at any step, go up 7 repeatedly, and collect the results (mod 12). Starting from step 5: 5 → 0 → 7 → 2 → 9 → 4 → 11. Sort: {0, 2, 4, 5, 7, 9, 11}.

The major scale includes all the consonant intervals of the pentatonic plus adds step-intervals 1 and 11 (the "leading tone" — the step one chromatic step below the octave), which create tension and resolution — the engine of harmonic motion in many traditions.

### Natural Minor: {0, 2, 3, 5, 7, 8, 10}

<button class="phiz-play-btn" data-steps="[0,2,3,5,7,8,10,12]" onclick="playScale(this)">▶ Play</button>

**Gap pattern**: 2-1-2-2-1-2-2

```
Steps:  0  1  2  3  4  5  6  7  8  9  10  11
        ●     ●  ●     ●     ●  ●     ●
```

Contains the same intervals as the major scale (it is a **rotation** — see Modes below) but reorders them, starting from a different point. The different ordering places the 3-step-interval (6:5 ratio) prominently above the starting point instead of the 4-step-interval (5:4 ratio), producing a "darker" character.

### Whole-Tone: {0, 2, 4, 6, 8, 10}

<button class="phiz-play-btn" data-steps="[0,2,4,6,8,10,12]" onclick="playScale(this)">▶ Play</button>

**Gap pattern**: 2-2-2-2-2-2 (perfectly uniform)

```
Steps:  0  1  2  3  4  5  6  7  8  9  10  11
        ●     ●     ●     ●     ●      ●
```

The most symmetrical 6-of-12 subset — every gap is identical. This means it has no "home" note (every starting point sounds equivalent). Used for dreamlike, floating passages because the uniform spacing removes the tension-resolution relationships that anchor tonality.

### Chromatic: {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}

<button class="phiz-play-btn" data-steps="[0,1,2,3,4,5,6,7,8,9,10,11,12]" onclick="playScale(this)">▶ Play</button>

**Gap pattern**: 1-1-1-1-1-1-1-1-1-1-1-1

The complete set. Not really a "scale" in the selective sense — it's the full palette from which all subsets are drawn. Used in passages that deliberately avoid any tonal center.

## Modes: Rotation of a Subset

A **mode** is what you get when you treat a different member of the same step-subset as the starting point. The subset {0, 2, 4, 5, 7, 9, 11} generates 7 modes, one starting from each member:

| Starting step | Resulting gap pattern | Mode name (Western) |
|---------------|----------------------|---------------------|
| 0 | 2-2-1-2-2-2-1 | Ionian (major) |
| 2 | 2-1-2-2-2-1-2 | Dorian |
| 4 | 1-2-2-2-1-2-2 | Phrygian |
| 5 | 2-2-2-1-2-2-1 | Lydian |
| 7 | 2-2-1-2-2-1-2 | Mixolydian |
| 9 | 2-1-2-2-1-2-2 | Aeolian (natural minor) |
| 11 | 1-2-2-1-2-2-2 | Locrian |

In PhizMusic terms: these are the same subset, rotated. The "natural minor" (Aeolian) is not a separate scale — it's the major scale heard from step-9's perspective. To convert: take the gap pattern and rotate it.

## Why Different Cultures Choose Different Subsets

The [prime-limit classification](frequency-ratios.md) provides a framework for understanding cross-cultural scale choices:

| Subset size | Optimization target | Cultural examples |
|-------------|-------------------|-------------------|
| **5-of-12** (pentatonic) | Maximize 3:2 and 4:3 relationships, avoid roughness | Chinese, Japanese, African, Celtic, Andean |
| **7-of-12** (diatonic) | Add 5:4 and 6:5 thirds for richer harmony, accept some tension | Western European, Indian (7-note raga bases) |
| **12-of-12** (chromatic) | All intervals available, maximum freedom | 20th-century Western, some contemporary traditions |
| **Non-12** | Optimize for inharmonic timbres or different prime limits | Gamelan (slendro/pelog), Arabic maqam |

**No subset is "better" than another.** Each represents a different engineering trade-off:
- Fewer notes → stronger consonance, less melodic variety
- More notes → more melodic possibilities, more potential for roughness
- Non-12 systems → optimized for their specific instruments' spectra (Sethares' timbre-tuning coupling)

These are different engineering solutions to the same mathematical constraints — the irrationality of log₂(3), the critical bandwidth of the cochlea, and the harmonic series of the instruments in use.

## Scale as Filter

A useful mental model: the 12 chromatic steps are the complete frequency palette. A scale is a **filter** that selects a working subset. Melody moves through this filtered space. Different filters produce different melodic "landscapes":

- Pentatonic filter: wide, open landscape — big steps, no tight corners
- Major filter: varied terrain — some wide valleys (steps of 2), some narrow passes (steps of 1)
- Whole-tone filter: flat plain — perfectly even, no landmarks
- Chromatic (no filter): dense jungle — every path available, no guidance

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Step-subset {0,2,4,5,7,9,11} | C major scale | PhizMusic describes structure; Western names a specific transposition |
| Step-subset {0,2,3,5,7,8,10} | Natural minor scale | Same subset as major, different rotation |
| Step-subset {0,2,4,7,9} | Major pentatonic | — |
| Step-subset {0,2,4,6,8,10} | Whole-tone scale | — |
| Mode (rotation of subset) | Mode (Dorian, Phrygian, etc.) | Same concept, different vocabulary |
| Gap pattern | Interval pattern | PhizMusic uses step-counts; Western uses quality names |

## Connections

- [Intervals](intervals.md) — the step-intervals that define the gaps between scale members
- [Naming System](naming-system.md) — how step-numbers label the members of a subset
- [Chords](chords.md) — chords arise from selecting simultaneous members of a scale
- [Frequency Ratios](frequency-ratios.md) — prime-limit classification of tuning systems
- [Pentatonic & Cross-Cultural](pentatonic-cross-cultural.md) — deep dive into the universal 5-note subset
- [Twelve-TET](twelve-tet.md) — why all these subsets are drawn from exactly 12 steps
- [Consonance & Dissonance](consonance-dissonance.md) — why some subsets avoid small step-intervals

### Suggested References

- [Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/) — Shows how scale intervals emerge as dissonance minima for harmonic spectra
