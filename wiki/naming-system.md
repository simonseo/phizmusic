---
title: Naming System
aliases: [step numbers, Dodeka syllables, note names, pitch notation]
tier: 1
category: reference
sidebar_order: 1
tags: [notation, foundation, reference]
prerequisites: []
related: [glossary.md, reference-table.md, intervals.md, scales.md, translation-tables.md]
scope-boundary: Naming convention only. No interval, scale, or chord application.
has_audio: true
---

# Naming System

PhizMusic uses a dual naming system for pitches: **step-numbers** for precision and arithmetic, **Dodeka syllables** for speaking and singing. Both name all 12 chromatic steps equally — no pitch is treated as an alteration of another. There are no sharps, no flats, no enharmonic confusion.

> 🎯 **Simple version**: Instead of 7 note names with sharps and flats (confusing), we use 12 names — one for each key on the piano, no exceptions. **Do, Ka, Re, Xo, Mi, Fa, Hu, So, Bi, La, Ve, Si.** For math and precision, we use numbers 0-11 plus an octave number: `4.7` means "octave 4, step 7."

## Design Principles

The PhizMusic naming system solves three problems with conventional Western note names:

**1. Asymmetric treatment of pitches.** Western names treat 7 pitches as "natural" (C D E F G A B) and 5 as "altered" (C♯/D♭, D♯/E♭, etc.). In 12-TET, all 12 chromatic steps are physically equal — the distinction is a historical artifact of the diatonic scale, not physics. PhizMusic gives every step equal status.

**2. Enharmonic confusion.** In Western notation, C♯ and D♭ are the same frequency in 12-TET but have different names, different staff positions, and different theoretical implications. This doubles the vocabulary without adding information. PhizMusic: one step = one name, period.

**3. Opaque arithmetic.** In Western names, "a major third above C" requires knowing that C + major third = E (not intuitive). In PhizMusic: step 0 + the 4-step-interval = step 4. Transposition is addition. Inversion is subtraction from 12. The naming system makes the math visible.

## Step-Numbers: Formal Notation

A pitch is identified by two numbers:

```
octave.step
```

- **Octave** (0-8): which octave register (matching the standard scientific octave numbering)
- **Step** (0-11): position within the chromatic octave

Examples:
- `4.0` = octave 4, step 0 = "middle C" area = 261.63 Hz
- `4.7` = octave 4, step 7 = 392.00 Hz
- `4.9` = octave 4, step 9 = 440.00 Hz (the standard tuning reference)
- `5.0` = octave 5, step 0 = 523.25 Hz (one octave above 4.0)

### Arithmetic Properties

Step-numbers make musical operations trivial:

| Operation | Formula | Example |
|-----------|---------|---------|
| Transpose up by n steps | step + n (mod 12) | `4.0` up 7 = `4.7` |
| Transpose down by n steps | step - n (mod 12) | `4.3` down 5 = `3.10` |
| Interval between two pitches | higher - lower (mod 12) | `4.7` to `5.0` = 5 steps |
| Inversion | 12 - step-interval | Inversion of 7 = 5 |
| Octave shift | change octave number | `4.7` → `5.7` (up one octave) |

No lookup tables. No special cases. Just integer arithmetic modulo 12.

### Frequency from Step-Number

Any pitch's frequency can be computed from its step-number and octave:

```
MIDI number:  n = (octave + 1) × 12 + step
Frequency:    f = 440 × 2^((n - 69) / 12)
```

See [Reference Table](reference-table.md) for the complete mapping.

## Dodeka Syllables: Casual Notation

For speaking, singing, and informal reference, each step has a unique syllable adapted from the [Dodeka Music](https://dodekamusic.com/) system by Jacques-Daniel Rochat:

Click any row to hear the pitch for that step in octave 4.

<table>
  <thead>
    <tr>
      <th>Step</th>
      <th>Syllable</th>
      <th>Pronunciation hint</th>
      <th>Listen</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td><strong>Do</strong></td>
      <td>"doh"</td>
      <td><button class="phiz-play-btn" data-freq="261.63" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>1</td>
      <td><strong>Ka</strong></td>
      <td>"kah"</td>
      <td><button class="phiz-play-btn" data-freq="277.18" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>2</td>
      <td><strong>Re</strong></td>
      <td>"ray"</td>
      <td><button class="phiz-play-btn" data-freq="293.66" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>3</td>
      <td><strong>Xo</strong></td>
      <td>"zoh"</td>
      <td><button class="phiz-play-btn" data-freq="311.13" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>4</td>
      <td><strong>Mi</strong></td>
      <td>"mee"</td>
      <td><button class="phiz-play-btn" data-freq="329.63" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>5</td>
      <td><strong>Fa</strong></td>
      <td>"fah"</td>
      <td><button class="phiz-play-btn" data-freq="349.23" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>6</td>
      <td><strong>Hu</strong></td>
      <td>"hoo"</td>
      <td><button class="phiz-play-btn" data-freq="369.99" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>7</td>
      <td><strong>So</strong></td>
      <td>"soh"</td>
      <td><button class="phiz-play-btn" data-freq="392.00" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>8</td>
      <td><strong>Bi</strong></td>
      <td>"bee"</td>
      <td><button class="phiz-play-btn" data-freq="415.30" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>9</td>
      <td><strong>La</strong></td>
      <td>"lah"</td>
      <td><button class="phiz-play-btn" data-freq="440.00" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>10</td>
      <td><strong>Ve</strong></td>
      <td>"vay"</td>
      <td><button class="phiz-play-btn" data-freq="466.16" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>11</td>
      <td><strong>Si</strong></td>
      <td>"see"</td>
      <td><button class="phiz-play-btn" data-freq="493.88" onclick="playFreq(this)">▶ Play</button></td>
    </tr>
  </tbody>
</table>

In casual use, a syllable plus octave number identifies a pitch: **So4** = step 7, octave 4 = G4 in Western notation.

**Key differences from Western solfège** (Do Re Mi Fa Sol La Ti):
- Western solfège has **7** syllables for a 12-note system — the 5 "in-between" pitches get no dedicated name
- Dodeka syllables give **12** unique names — every chromatic pitch has an equally simple name
- The 12th syllable is **Si** (not "Ti" as in Western solfège)

## When to Use Which

| Context | Use | Example |
|---------|-----|---------|
| Computation, transposition, analysis | Step-numbers | "Transpose {0,4,7} up 5 → {5,9,0}" |
| Speaking, singing, quick reference | Syllables | "Sing Do-Mi-So" |
| Written notation | Either or both | "So4 (4.7) = 392.00 Hz" |
| Cross-cultural communication | Step-numbers + Translation Table | "Step 7 = G in Western = Sol in solfège" |

## Anchoring Convention: Do = C

The assignment of step 0 (Do) to the Western pitch C is **arbitrary but conventional**. We adopt it for pragmatic compatibility:
- Do4 (4.0) = C4 = 261.63 Hz
- La4 (4.9) = A4 = 440.00 Hz (the universal tuning standard)

Nothing in the PhizMusic system depends on this choice. If you wanted to anchor Do to A (step 0 = 440 Hz), every formula and relationship would still hold — only the absolute frequencies in the [Reference Table](reference-table.md) would shift. The anchoring is a convention for interoperability, not a property of the system.

## Categorical Perception

The brain does not perceive pitch as a smooth continuum. Trained listeners — and even untrained ones to some extent — perceive pitch **categorically**: continuous frequency changes are heard as discrete steps, with sharp boundaries between categories. This is the same phenomenon that makes you hear phonemes in speech rather than a smooth acoustic stream.

The PhizMusic naming system aligns with this perceptual reality: 12 equal categories, each with a unique label, matching the 12-TET chromatic grid. The Western system's 7+5 asymmetry (7 "natural" notes, 5 "accidentals") conflicts with the actual perceptual symmetry of 12-TET, where all 12 categories have equal status.

## Complete Mapping

| Step | Syllable | Western | Alternative Western |
|------|----------|---------|---------------------|
| 0 | Do | C | — |
| 1 | Ka | C♯ | D♭ |
| 2 | Re | D | — |
| 3 | Xo | D♯ | E♭ |
| 4 | Mi | E | — |
| 5 | Fa | F | — |
| 6 | Hu | F♯ | G♭ |
| 7 | So | G | — |
| 8 | Bi | G♯ | A♭ |
| 9 | La | A | — |
| 10 | Ve | A♯ | B♭ |
| 11 | Si | B | — |

Note that Western notation has **17** names for 12 pitches (C, C♯, D♭, D, D♯, E♭, E, F, F♯, G♭, G, G♯, A♭, A, A♯, B♭, B). PhizMusic has exactly **12** names for 12 pitches. The redundancy is gone.

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Step-number (0-11) | Note letter (C, D, E...) + accidental (♯, ♭) | PhizMusic is numeric; Western is alphabetic with modifiers |
| Syllable (Do, Ka, Re...) | Solfège (Do, Re, Mi...) | PhizMusic has 12 unique syllables; Western solfège has 7 |
| Octave.Step (e.g., 4.7) | Scientific pitch (e.g., G4) | Both include octave; PhizMusic is numeric |
| Octave number | Octave number | Same numbering convention (Do4 = C4 = middle C area) |

## Connections

- [Glossary](glossary.md) — definitions of step-number and syllable
- [Reference Table](reference-table.md) — complete octave × step → frequency mapping
- [Intervals](intervals.md) — step-intervals between pitches
- [Scales](scales.md) — step-subsets using the naming system
- [Translation Tables](translation-tables.md) — comprehensive cross-system lookup
