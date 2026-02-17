---
title: Translation Tables
aliases: [translation, Western equivalents, cross-system mapping]
tier: 2
tags: [reference, cross-system]
prerequisites: [naming-system.md, intervals.md, scales.md, chords.md, rhythm.md]
related: [glossary.md, reference-table.md, naming-system.md, intervals.md, scales.md, chords.md, rhythm.md]
scope-boundary: Lookup tables only. No extended explanations — see linked concept pages for depth.
---

# Translation Tables

The comprehensive bidirectional mapping between PhizMusic terminology and Western music theory (and other systems where applicable). Use this page when you need to communicate with musicians trained in conventional terminology, or when translating conventional material into PhizMusic.

> 🎯 **Simple version**: This page is a dictionary between PhizMusic and traditional music languages. Look up any PhizMusic term to find its Western equivalent, or any Western term to find the PhizMusic way to say it.

## 1. Note Names

| Step | Syllable | Western | Western alt. | German | Romance solfège | Chinese |
|------|----------|---------|-------------|--------|----------------|---------|
| 0 | Do | C | — | C | Do | 宫 (gōng) |
| 1 | Ka | C♯ | D♭ | Cis/Des | Do♯/Ré♭ | — |
| 2 | Re | D | — | D | Ré | 商 (shāng) |
| 3 | Xo | D♯ | E♭ | Dis/Es | Ré♯/Mi♭ | — |
| 4 | Mi | E | — | E | Mi | 角 (jué) |
| 5 | Fa | F | — | F | Fa | — |
| 6 | Hu | F♯ | G♭ | Fis/Ges | Fa♯/Sol♭ | — |
| 7 | So | G | — | G | Sol | 徵 (zhǐ) |
| 8 | Bi | G♯ | A♭ | Gis/As | Sol♯/La♭ | — |
| 9 | La | A | — | A | La | 羽 (yǔ) |
| 10 | Ve | A♯ | B♭ | Ais/B | La♯/Si♭ | — |
| 11 | Si | B | — | H | Si | — |

**Notes**:
- German system uses B for B♭ and H for B♮ — a historical naming divergence
- Chinese names apply only to the pentatonic subset {0, 2, 4, 7, 9}
- Indian svara: Sa Re Ga Ma Pa Dha Ni — 7 names for a 7-note system. Sa ≈ Do, Pa ≈ So, others vary by raga

## 2. Intervals

| Step-interval | Just ratio | Western name | Western abbreviation | Character |
|--------------|-----------|-------------|---------------------|-----------|
| 0 | 1:1 | Unison | P1 | Identity |
| 1 | 16:15 | Minor second | m2 | Maximum tension |
| 2 | 9:8 | Major second | M2 | Mild tension |
| 3 | 6:5 | Minor third | m3 | Dark, warm |
| 4 | 5:4 | Major third | M3 | Bright, sweet |
| 5 | 4:3 | Perfect fourth | P4 | Open, stable |
| 6 | √2:1 | Tritone / aug. 4th / dim. 5th | A4/d5 | Maximum ambiguity |
| 7 | 3:2 | Perfect fifth | P5 | Maximum fusion |
| 8 | 8:5 | Minor sixth | m6 | Dark, wide |
| 9 | 5:3 | Major sixth | M6 | Bright, open |
| 10 | 9:5 | Minor seventh | m7 | Tense, wants resolution |
| 11 | 15:8 | Major seventh | M7 | Extreme tension |
| 12 | 2:1 | Octave | P8 | Perceptual reset |

**How Western naming works** (for PhizMusic users decoding Western text):
- "Perfect" (P): step-intervals 0, 5, 7, 12 — considered maximally consonant in Western theory
- "Major" (M): the larger version of each interval pair (steps 2, 4, 9, 11)
- "Minor" (m): the smaller version (steps 1, 3, 8, 10)
- "Augmented" (A): one chromatic step larger than perfect/major
- "Diminished" (d): one chromatic step smaller than perfect/minor
- Western counts from 1 (unison = "1st"); PhizMusic counts from 0

## 3. Common Chords

| Step-combo | Ratio-set | Western name | Western symbol | Voicing notes (from Do) |
|----------|-----------|-------------|----------------|------------------------|
| {0, 4, 7} | 4:5:6 | Major triad | C, Cmaj | Do-Mi-So |
| {0, 3, 7} | 10:12:15 | Minor triad | Cm, Cmin | Do-Xo-So |
| {0, 3, 6} | ~25:30:36 | Diminished triad | Cdim, C° | Do-Xo-Hu |
| {0, 4, 8} | ~16:20:25 | Augmented triad | Caug, C+ | Do-Mi-Bi |
| {0, 4, 7, 10} | 4:5:6:7 | Dominant seventh | C7 | Do-Mi-So-Ve |
| {0, 4, 7, 11} | 8:10:12:15 | Major seventh | Cmaj7, CΔ7 | Do-Mi-So-Si |
| {0, 3, 7, 10} | 10:12:15:18 | Minor seventh | Cm7, Cmin7 | Do-Xo-So-Ve |
| {0, 3, 6, 9} | — | Diminished seventh | Cdim7, C°7 | Do-Xo-Hu-La |
| {0, 3, 6, 10} | — | Half-diminished | Cø7 | Do-Xo-Hu-Ve |
| {0, 4, 7, 11, 14} | — | Major ninth | Cmaj9 | Do-Mi-So-Si-Re |
| {0, 4, 7, 10, 14} | — | Dominant ninth | C9 | Do-Mi-So-Ve-Re |

**Notes**:
- Western chord symbols assume a root note (C in these examples). PhizMusic step-combos are root-agnostic.
- All step-combos shown are relative to the root (step 0). To build the chord from any other root, add the root's step-number mod 12.

## 4. Scales

| Step-subset | Gap pattern | Western name | Mode |
|-------------|------------|-------------|------|
| {0, 2, 4, 5, 7, 9, 11} | 2-2-1-2-2-2-1 | Major (Ionian) | 1st mode |
| {0, 2, 3, 5, 7, 9, 10} | 2-1-2-2-2-1-2 | Dorian | 2nd mode |
| {0, 1, 3, 5, 7, 8, 10} | 1-2-2-2-1-2-2 | Phrygian | 3rd mode |
| {0, 2, 4, 6, 7, 9, 11} | 2-2-2-1-2-2-1 | Lydian | 4th mode |
| {0, 2, 4, 5, 7, 9, 10} | 2-2-1-2-2-1-2 | Mixolydian | 5th mode |
| {0, 2, 3, 5, 7, 8, 10} | 2-1-2-2-1-2-2 | Natural minor (Aeolian) | 6th mode |
| {0, 1, 3, 5, 6, 8, 10} | 1-2-2-1-2-2-2 | Locrian | 7th mode |
| {0, 2, 4, 7, 9} | 2-2-3-2-3 | Major pentatonic | — |
| {0, 3, 5, 7, 10} | 3-2-2-3-2 | Minor pentatonic | — |
| {0, 2, 4, 6, 8, 10} | 2-2-2-2-2-2 | Whole-tone | — |
| {0, 2, 3, 5, 6, 8, 9, 11} | 2-1-2-1-2-1-2-1 | Diminished (octatonic) | — |
| {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11} | 1-1-1-1-1-1-1-1-1-1-1-1 | Chromatic | — |

**Notes**:
- All modes of the major scale are rotations of the same 7-member subset
- Western mode names come from ancient Greek geographic names — they carry no inherent meaning
- "Harmonic minor" {0,2,3,5,7,8,11} and "melodic minor" {0,2,3,5,7,9,11} are common variants not shown above

## 5. Rhythm

| Pulse-fraction | Western note value | Western rest | Symbol |
|---------------|-------------------|-------------|--------|
| 4T | Whole note | Whole rest | 𝅝 |
| 3T | Dotted half note | — | 𝅗𝅥. |
| 2T | Half note | Half rest | 𝅗𝅥 |
| 1.5T | Dotted quarter note | — | 𝅘𝅥. |
| 1T | Quarter note | Quarter rest | 𝅘𝅥 |
| 0.75T | Dotted eighth note | — | 𝅘𝅥𝅮. |
| 0.5T | Eighth note | Eighth rest | 𝅘𝅥𝅮 |
| 0.333T | Triplet eighth | — | 𝅘𝅥𝅮³ |
| 0.25T | Sixteenth note | Sixteenth rest | 𝅘𝅥𝅯 |
| 0.125T | Thirty-second note | Thirty-second rest | 𝅘𝅥𝅰 |

| Cycle length | Western time signature | Common genres |
|-------------|----------------------|--------------|
| 2T | 2/4 | March, polka |
| 3T | 3/4 | Waltz |
| 4T | 4/4 (common time) | Pop, rock, hip-hop |
| 6T (grouped 3+3) | 6/8 | Compound duple |
| 5T | 5/4 | Progressive, Balkan |
| 7T | 7/8 | Turkish, Bulgarian |

**Notes**:
- Western note values are relative to time signature context. A "quarter note" = 1 beat in 4/4 but 1/3 of a measure in 3/4. Pulse-fractions are absolute: 1T always = one pulse period.
- BPM = 60/T. A tempo of 120 BPM → T = 0.5 seconds.

## 6. Dynamics (Volume)

| dB SPL range | Western marking | Italian term | Meaning |
|-------------|----------------|-------------|---------|
| ~40-50 | pp | Pianissimo | Very quiet |
| ~50-60 | p | Piano | Quiet |
| ~60-70 | mp | Mezzo piano | Moderately quiet |
| ~70-80 | mf | Mezzo forte | Moderately loud |
| ~80-90 | f | Forte | Loud |
| ~90-100 | ff | Fortissimo | Very loud |

**Notes**: These mappings are approximate. Western dynamic markings are subjective and context-dependent (pp in a solo piano piece ≠ pp in an orchestra). PhizMusic prefers dB SPL for precision where measurement is available.

## How to Use These Tables

**PhizMusic → Western** (talking to a conventional musician):
1. Find your PhizMusic term in the left column
2. Use the Western equivalent
3. Example: "The step-combo {0, 4, 7} starting from La" → "An A major triad"

**Western → PhizMusic** (reading conventional material):
1. Find the Western term
2. Use the PhizMusic equivalent
3. Example: "G major seventh chord" → "Step-combo {0, 4, 7, 11} rooted at step 7 (So)"

## Connections

- [Glossary](glossary.md) — canonical PhizMusic term definitions
- [Reference Table](reference-table.md) — complete pitch × octave → Hz mapping
- [Naming System](naming-system.md) — how step-numbers and syllables work
- [Intervals](intervals.md) — physics behind the interval table
- [Scales](scales.md) — physics behind the scale table
- [Chords](chords.md) — physics behind the chord table
- [Rhythm](rhythm.md) — physics behind the rhythm table
