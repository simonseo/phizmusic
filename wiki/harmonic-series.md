---
title: Harmonic Series
aliases: [overtone series, harmonics, partials]
tier: 1
category: music
tags: [physics, foundation, acoustics]
prerequisites: [sound-waves.md, fourier-analysis.md]
related: [frequency-ratios.md, fourier-analysis.md, chords.md, intervals.md, timbre.md, instrument-physics.md, consonance-dissonance.md, missing-fundamental.md]
scope-boundary: The mathematical/physical pattern only. No instrument-specific spectra, no interval naming, no scale construction.
---

# Harmonic Series

The harmonic series is the sequence of frequencies that naturally emerges when a physical object vibrates: **f, 2f, 3f, 4f, 5f, ...** — all integer multiples of a fundamental frequency f. It is not a human invention. It is a consequence of physics: the boundary conditions of a vibrating string or air column permit only wavelengths that divide evenly into the object's length.

> 🎯 **Simple version**: When a guitar string vibrates, it doesn't just vibrate as a whole — it also vibrates in halves, thirds, quarters, and so on, all at the same time. Each of these patterns makes a different frequency. Together they form the harmonic series: 1×, 2×, 3×, 4×, 5× the lowest frequency. This pattern is the foundation of almost all music.

## Why Integer Multiples?

A string fixed at both ends (like a guitar string) can only sustain vibration patterns — **standing waves** — whose wavelengths fit an integer number of half-wavelengths into the string's length L:

```
λₙ = 2L / n    for n = 1, 2, 3, 4, ...
```

Since frequency = speed / wavelength:

```
fₙ = n × (v / 2L) = n × f₁
```

The **1st harmonic** (n=1) is the **fundamental** — the lowest frequency, determined by the string's length, tension, and mass. Every subsequent harmonic is an exact integer multiple of the fundamental. This is not an approximation — it is an exact mathematical consequence of the wave equation with fixed boundary conditions.

The same principle applies to air columns in pipes (see [instrument-physics.md](instrument-physics.md)), though closed pipes produce only odd-numbered harmonics.

## The First 16 Harmonics

For a fundamental of 100 Hz (chosen for easy arithmetic — the pattern scales to any frequency):

| Harmonic | Frequency | Ratio to fundamental | Nearest step-distance | Cents from step | Notes |
|----------|-----------|---------------------|-----------------------|-----------------|-------|
| 1 | 100 Hz | 1:1 | 0 | 0 | Fundamental |
| 2 | 200 Hz | 2:1 | 12 (octave up) | 0 | Octave |
| 3 | 300 Hz | 3:1 | 19 (~7 above oct) | +2.0 | Step-7 above octave |
| 4 | 400 Hz | 4:1 | 24 (2 octaves) | 0 | 2nd octave |
| 5 | 500 Hz | 5:1 | 28 (~4 above 2 oct) | -13.7 | Step-4 above 2nd octave |
| 6 | 600 Hz | 6:1 | 31 (~7 above 2 oct) | +2.0 | Step-7 above 2nd octave |
| 7 | 700 Hz | 7:1 | 34 (~10 above 2 oct) | -31.2 | Between step-9 and step-10 |
| 8 | 800 Hz | 8:1 | 36 (3 octaves) | 0 | 3rd octave |
| 9 | 900 Hz | 9:1 | 38 (~2 above 3 oct) | +3.9 | Step-2 above 3rd octave |
| 10 | 1000 Hz | 10:1 | 40 (~4 above 3 oct) | -13.7 | Step-4 above 3rd octave |
| 11 | 1100 Hz | 11:1 | 42 (~6 above 3 oct) | -48.7 | Between step-5 and step-6 |
| 12 | 1200 Hz | 12:1 | 43 (~7 above 3 oct) | +2.0 | Step-7 above 3rd octave |
| 13 | 1300 Hz | 13:1 | 44 (~8 above 3 oct) | +40.5 | Between step-8 and step-9 |
| 14 | 1400 Hz | 14:1 | 46 (~10 above 3 oct) | -31.2 | Between step-9 and step-10 |
| 15 | 1500 Hz | 15:1 | 47 (~11 above 3 oct) | -11.7 | Step-11 above 3rd octave |
| 16 | 1600 Hz | 16:1 | 48 (4 octaves) | 0 | 4th octave |

Key observations:
- **Harmonics 1, 2, 4, 8, 16** are exact octaves (powers of 2) — they land perfectly on 12-TET grid points
- **Harmonics 3, 6, 12** approximate step-distance 7 (the 3:2 ratio) with only +2 cents error
- **Harmonics 5, 10** approximate step-distance 4 (the 5:4 ratio) with -13.7 cents error — this is the major-third compromise of 12-TET
- **Harmonic 7** falls ~31 cents below any 12-TET step — it is the "blue seventh," audible in blues and barbershop singing but absent from standard 12-TET
- **Harmonics 11 and 13** fall far from any 12-TET step — these are the primes beyond 5-limit tuning

## Harmonics 4:5:6 — The Natural Triad

Harmonics 4, 5, and 6 of any fundamental form the frequency pattern:

```
4f : 5f : 6f    →    simplified ratio 4:5:6
```

In step-distances from the 4th harmonic: {0, 4, 7} — exactly the step-set that Western theory calls a "major triad." This chord is not a cultural invention; it is a direct selection from the harmonic series. Cultures worldwide arrived at this combination independently because it falls out of physics (see [chords.md](chords.md)).

The ratio 4:5:6 means the three frequencies share many aligned harmonics, producing maximal perceptual fusion and minimal roughness within critical bandwidth.

## Harmonic Template Matching

The auditory system exploits the harmonic series as a perceptual framework. When multiple frequency components arrive at the cochlea (see [ear-cochlea.md](ear-cochlea.md)), the brain searches for the best-fit fundamental frequency whose harmonic series would produce the observed set of components. This process is called **harmonic template matching** and serves two critical functions:

**1. Auditory scene analysis** (Bregman, 1990): In a room full of sounds, the brain must decide which frequency components belong to the same source. Components that fit a single harmonic series template are grouped as "one sound." Components that don't fit are assigned to different sources. This is how you hear "one clarinet" instead of "12 separate sine waves" — and how you can follow a single voice in a crowd.

**2. Pitch perception**: The matched fundamental determines the perceived pitch, even if the fundamental frequency itself is physically absent from the signal. This is the **missing fundamental** phenomenon (see [missing-fundamental.md](missing-fundamental.md)) — direct evidence that pitch is a neural inference, not a direct frequency measurement.

## Shepard Tones: Pitch Circularity

The harmonic series reveals that pitch has two dimensions: **height** (which octave) and **chroma** (which step within the octave). The psychoacoustic demonstration of this is the **Shepard tone** — an auditory illusion created by distributing energy across multiple octaves with a bell-shaped spectral envelope.

As the component frequencies all shift upward by one chromatic step, the spectral envelope stays fixed. The result: the listener perceives endlessly rising pitch, even though the sound cycles back to its starting point every 12 steps. This is the auditory equivalent of Escher's impossible staircase.

Shepard tones demonstrate that chroma (step position 0-11) and height (octave number) are separable perceptual dimensions — a fact that underlies both the naming system (see [naming-system.md](naming-system.md)) and the octave equivalence that most tuning systems assume.

<!-- INTERACTIVE: Harmonic series visualizer — show partials of a tone on a spectrum display, click to hear individual harmonics vs. full tone. Toggle harmonics on/off to hear how timbre changes. -->

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Harmonic series | Overtone series | "Overtone series" sometimes excludes the fundamental; harmonic series always includes it |
| Fundamental (1st harmonic) | Root, fundamental | Same concept |
| Harmonic n | nth partial | "Partial" is more general (includes inharmonic); "harmonic" implies integer multiple |
| Harmonic template matching | — | Psychoacoustics term, no Western theory equivalent |

## Connections

- [Frequency Ratios](frequency-ratios.md) — the ratio language for describing relationships between harmonics
- [Fourier Analysis](fourier-analysis.md) — the mathematical framework that decomposes sounds into their harmonic components
- [Intervals](intervals.md) — how harmonic ratios map to step-distances
- [Chords](chords.md) — how selecting harmonics (e.g., 4:5:6) produces chords
- [Timbre](timbre.md) — how the relative strength of harmonics determines a sound's character
- [Instrument Physics](instrument-physics.md) — why strings produce all harmonics but closed pipes produce only odd ones
- [Consonance & Dissonance](consonance-dissonance.md) — how harmonic alignment explains tonal fusion
- [Missing Fundamental](missing-fundamental.md) — what happens when the brain infers a fundamental from its harmonics
