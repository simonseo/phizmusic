---
title: Pitch Reference Table
aliases: [reference table, frequency table, pitch mapping]
tier: structural
tags: [reference]
prerequisites: []
related: [naming-system.md, glossary.md, intervals.md, translation-tables.md]
scope-boundary: Pitch mapping only — no instrument ranges, no microtonal frequencies, no tuning system comparisons
---

# Pitch Reference Table

The canonical mapping between PhizMusic step-numbers, Dodeka syllables, Western note names, MIDI numbers, and frequencies in hertz.

## Reference Frequency Convention

The choice of Do = C and f₀ = 261.63 Hz for octave 4 is arbitrary but conventional. All PhizMusic formulas use a reference frequency variable. 261.63 Hz is the default.

The standard tuning anchor is La4 (A4) = 440 Hz = MIDI note 69.

## Frequency Formula

```
MIDI note number:  n = (octave + 1) × 12 + step
Frequency (Hz):    f = 440 × 2^((n - 69) / 12)
```

Equivalently, from a reference pitch:

```
f = f₀ × 2^(step / 12)
```

where f₀ is the frequency of step-0 (Do) in the given octave.

## Compact Table — One Octave

The 12 chromatic steps within a single octave, showing the ratio from step-0:

| Step | Syllable | Western | Ratio from Step-0 | Cents |
|------|----------|---------|-------------------|-------|
| 0 | Do | C | 1.0000 | 0 |
| 1 | Ka | C♯/D♭ | 1.0595 | 100 |
| 2 | Re | D | 1.1225 | 200 |
| 3 | Xo | D♯/E♭ | 1.1892 | 300 |
| 4 | Mi | E | 1.2599 | 400 |
| 5 | Fa | F | 1.3348 | 500 |
| 6 | Hu | F♯/G♭ | 1.4142 | 600 |
| 7 | So | G | 1.4983 | 700 |
| 8 | Bi | G♯/A♭ | 1.5874 | 800 |
| 9 | La | A | 1.6818 | 900 |
| 10 | Ve | A♯/B♭ | 1.7818 | 1000 |
| 11 | Si | B | 1.8877 | 1100 |

Each ratio = 2^(step/12). Each step adds exactly 100 cents in 12-TET.

## Full Table — All Octaves

Frequencies computed using `f = 440 × 2^((n - 69) / 12)` and rounded to 2 decimal places.

The **commonly used range** for most instruments and music spans roughly octaves 2 through 7 (MIDI 36-107, ~65 Hz to ~3951 Hz).

### Octave 0

| Step.Oct | Syllable | Western | MIDI | Hz |
|----------|----------|---------|------|----|
| 0.0 | Do0 | C0 | 12 | 16.35 |
| 1.0 | Ka0 | C♯0 | 13 | 17.32 |
| 2.0 | Re0 | D0 | 14 | 18.35 |
| 3.0 | Xo0 | D♯0 | 15 | 19.45 |
| 4.0 | Mi0 | E0 | 16 | 20.60 |
| 5.0 | Fa0 | F0 | 17 | 21.83 |
| 6.0 | Hu0 | F♯0 | 18 | 23.12 |
| 7.0 | So0 | G0 | 19 | 24.50 |
| 8.0 | Bi0 | G♯0 | 20 | 25.96 |
| 9.0 | La0 | A0 | 21 | 27.50 |
| 10.0 | Ve0 | A♯0 | 22 | 29.14 |
| 11.0 | Si0 | B0 | 23 | 30.87 |

### Octave 1

| Step.Oct | Syllable | Western | MIDI | Hz |
|----------|----------|---------|------|----|
| 0.1 | Do1 | C1 | 24 | 32.70 |
| 1.1 | Ka1 | C♯1 | 25 | 34.65 |
| 2.1 | Re1 | D1 | 26 | 36.71 |
| 3.1 | Xo1 | D♯1 | 27 | 38.89 |
| 4.1 | Mi1 | E1 | 28 | 41.20 |
| 5.1 | Fa1 | F1 | 29 | 43.65 |
| 6.1 | Hu1 | F♯1 | 30 | 46.25 |
| 7.1 | So1 | G1 | 31 | 49.00 |
| 8.1 | Bi1 | G♯1 | 32 | 51.91 |
| 9.1 | La1 | A1 | 33 | 55.00 |
| 10.1 | Ve1 | A♯1 | 34 | 58.27 |
| 11.1 | Si1 | B1 | 35 | 61.74 |

### Octave 2

| Step.Oct | Syllable | Western | MIDI | Hz |
|----------|----------|---------|------|----|
| 0.2 | Do2 | C2 | 36 | 65.41 |
| 1.2 | Ka2 | C♯2 | 37 | 69.30 |
| 2.2 | Re2 | D2 | 38 | 73.42 |
| 3.2 | Xo2 | D♯2 | 39 | 77.78 |
| 4.2 | Mi2 | E2 | 40 | 82.41 |
| 5.2 | Fa2 | F2 | 41 | 87.31 |
| 6.2 | Hu2 | F♯2 | 42 | 92.50 |
| 7.2 | So2 | G2 | 43 | 98.00 |
| 8.2 | Bi2 | G♯2 | 44 | 103.83 |
| 9.2 | La2 | A2 | 45 | 110.00 |
| 10.2 | Ve2 | A♯2 | 46 | 116.54 |
| 11.2 | Si2 | B2 | 47 | 123.47 |

### Octave 3

| Step.Oct | Syllable | Western | MIDI | Hz |
|----------|----------|---------|------|----|
| 0.3 | Do3 | C3 | 48 | 130.81 |
| 1.3 | Ka3 | C♯3 | 49 | 138.59 |
| 2.3 | Re3 | D3 | 50 | 146.83 |
| 3.3 | Xo3 | D♯3 | 51 | 155.56 |
| 4.3 | Mi3 | E3 | 52 | 164.81 |
| 5.3 | Fa3 | F3 | 53 | 174.61 |
| 6.3 | Hu3 | F♯3 | 54 | 185.00 |
| 7.3 | So3 | G3 | 55 | 196.00 |
| 8.3 | Bi3 | G♯3 | 56 | 207.65 |
| 9.3 | La3 | A3 | 57 | 220.00 |
| 10.3 | Ve3 | A♯3 | 58 | 233.08 |
| 11.3 | Si3 | B3 | 59 | 246.94 |

### Octave 4

| Step.Oct | Syllable | Western | MIDI | Hz |
|----------|----------|---------|------|----|
| 0.4 | Do4 | C4 | 60 | 261.63 |
| 1.4 | Ka4 | C♯4 | 61 | 277.18 |
| 2.4 | Re4 | D4 | 62 | 293.66 |
| 3.4 | Xo4 | D♯4 | 63 | 311.13 |
| 4.4 | Mi4 | E4 | 64 | 329.63 |
| 5.4 | Fa4 | F4 | 65 | 349.23 |
| 6.4 | Hu4 | F♯4 | 66 | 369.99 |
| 7.4 | So4 | G4 | 67 | 392.00 |
| 8.4 | Bi4 | G♯4 | 68 | 415.30 |
| 9.4 | La4 | A4 | 69 | 440.00 |
| 10.4 | Ve4 | A♯4 | 70 | 466.16 |
| 11.4 | Si4 | B4 | 71 | 493.88 |

### Octave 5

| Step.Oct | Syllable | Western | MIDI | Hz |
|----------|----------|---------|------|----|
| 0.5 | Do5 | C5 | 72 | 523.25 |
| 1.5 | Ka5 | C♯5 | 73 | 554.37 |
| 2.5 | Re5 | D5 | 74 | 587.33 |
| 3.5 | Xo5 | D♯5 | 75 | 622.25 |
| 4.5 | Mi5 | E5 | 76 | 659.26 |
| 5.5 | Fa5 | F5 | 77 | 698.46 |
| 6.5 | Hu5 | F♯5 | 78 | 739.99 |
| 7.5 | So5 | G5 | 79 | 783.99 |
| 8.5 | Bi5 | G♯5 | 80 | 830.61 |
| 9.5 | La5 | A5 | 81 | 880.00 |
| 10.5 | Ve5 | A♯5 | 82 | 932.33 |
| 11.5 | Si5 | B5 | 83 | 987.77 |

### Octave 6

| Step.Oct | Syllable | Western | MIDI | Hz |
|----------|----------|---------|------|----|
| 0.6 | Do6 | C6 | 84 | 1046.50 |
| 1.6 | Ka6 | C♯6 | 85 | 1108.73 |
| 2.6 | Re6 | D6 | 86 | 1174.66 |
| 3.6 | Xo6 | D♯6 | 87 | 1244.51 |
| 4.6 | Mi6 | E6 | 88 | 1318.51 |
| 5.6 | Fa6 | F6 | 89 | 1396.91 |
| 6.6 | Hu6 | F♯6 | 90 | 1479.98 |
| 7.6 | So6 | G6 | 91 | 1567.98 |
| 8.6 | Bi6 | G♯6 | 92 | 1661.22 |
| 9.6 | La6 | A6 | 93 | 1760.00 |
| 10.6 | Ve6 | A♯6 | 94 | 1864.66 |
| 11.6 | Si6 | B6 | 95 | 1975.53 |

### Octave 7

| Step.Oct | Syllable | Western | MIDI | Hz |
|----------|----------|---------|------|----|
| 0.7 | Do7 | C7 | 96 | 2093.00 |
| 1.7 | Ka7 | C♯7 | 97 | 2217.46 |
| 2.7 | Re7 | D7 | 98 | 2349.32 |
| 3.7 | Xo7 | D♯7 | 99 | 2489.02 |
| 4.7 | Mi7 | E7 | 100 | 2637.02 |
| 5.7 | Fa7 | F7 | 101 | 2793.83 |
| 6.7 | Hu7 | F♯7 | 102 | 2959.96 |
| 7.7 | So7 | G7 | 103 | 3135.96 |
| 8.7 | Bi7 | G♯7 | 104 | 3322.44 |
| 9.7 | La7 | A7 | 105 | 3520.00 |
| 10.7 | Ve7 | A♯7 | 106 | 3729.31 |
| 11.7 | Si7 | B7 | 107 | 3951.07 |

### Octave 8

| Step.Oct | Syllable | Western | MIDI | Hz |
|----------|----------|---------|------|----|
| 0.8 | Do8 | C8 | 108 | 4186.01 |
| 1.8 | Ka8 | C♯8 | 109 | 4434.92 |
| 2.8 | Re8 | D8 | 110 | 4698.64 |
| 3.8 | Xo8 | D♯8 | 111 | 4978.03 |
| 4.8 | Mi8 | E8 | 112 | 5274.04 |
| 5.8 | Fa8 | F8 | 113 | 5587.65 |
| 6.8 | Hu8 | F♯8 | 114 | 5919.91 |
| 7.8 | So8 | G8 | 115 | 6271.93 |
| 8.8 | Bi8 | G♯8 | 116 | 6644.88 |
| 9.8 | La8 | A8 | 117 | 7040.00 |
| 10.8 | Ve8 | A♯8 | 118 | 7458.62 |
| 11.8 | Si8 | B8 | 119 | 7902.13 |

## Key Reference Points

| Note | Step.Oct | Syllable | Western | MIDI | Hz | Significance |
|------|----------|----------|---------|------|----|-------------|
| — | 9.0 | La0 | A0 | 21 | 27.50 | Lowest piano key |
| — | 0.4 | Do4 | C4 | 60 | 261.63 | "Middle C," reference pitch f₀ |
| — | 9.4 | La4 | A4 | 69 | 440.00 | Standard tuning reference |
| — | 0.8 | Do8 | C8 | 108 | 4186.01 | Highest piano key |

## Connections

- [Naming System](naming-system.md) — detailed explanation of step-number and syllable notation
- [Glossary](glossary.md) — definitions of step-number, syllable, frequency
- [Intervals](intervals.md) — step-distance definitions using this table
- [Translation Tables](translation-tables.md) — bidirectional Western ↔ PhizMusic mapping
