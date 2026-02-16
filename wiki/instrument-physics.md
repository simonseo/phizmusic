---
title: Instrument Physics
aliases: [acoustic sources, strings pipes membranes, source archetypes]
tier: 2
tags: [acoustics, instruments, spectra]
prerequisites: [sound-waves.md, harmonic-series.md, timbre.md]
related: [sound-waves.md, harmonic-series.md, timbre.md, consonance-dissonance.md, digital-audio.md]
scope-boundary: Three acoustic archetypes only (string, air column, membrane). No detailed instrument catalog and no synthesis design.
---

# Instrument Physics

Most acoustic instruments fall into three source archetypes with different vibration equations and different spectral outcomes. The crucial consequence is not just "different sound" but different **harmonic structure**, which changes interval fusion behavior and even preferred tuning strategies.

> 🎯 **Simple version**: A guitar string vibrates in whole-number patterns, so it makes clean harmonics. A pipe can make all harmonics or only odd ones. A drum skin vibrates in more complicated patterns that are not whole-number multiples, so its overtones are inharmonic. Different physics -> different musical roles.

## Archetype 1: Strings

For an ideal string of length `L`, tension `T`, and linear mass density `mu`:

```text
f_n = n * (1 / 2L) * sqrt(T / mu),  n = 1,2,3,...
```

Properties:

- Integer-spaced modes (`n = 1,2,3...`) -> harmonic spectrum
- Strong support for pitch salience and harmonic-template matching
- Good alignment with ratio-based interval systems

Excitation controls harmonic amplitudes (timbre), not mode frequencies:

- **Plucked**: strong attack transient, position-dependent harmonic weighting
- **Bowed**: sustained energy injection, richer controllable steady-state partial balance

So strings are a classic harmonic source family used for melody and harmony.

## Archetype 2: Air Columns (Pipes)

Air columns follow boundary-condition physics.

### Open-open pipe (both ends pressure nodes)

```text
f_n = n * v / (2L),  n = 1,2,3,...
```

All integer harmonics are available.

### Closed-open pipe (one end pressure antinode)

```text
f_n = (2n - 1) * v / (4L),  n = 1,2,3,...
```

Only odd harmonics appear ideally (`1,3,5,...`).

Perceptual effect:

- Missing even harmonics shifts spectral envelope
- Result is often described as hollow or woody in many contexts

This odd-harmonic constraint is the core physical reason closed-pipe families (for example clarinet-like bores in their low register approximation) differ from open-pipe families.

## Archetype 3: Membranes

Circular membranes (drum heads) are 2D systems governed by Bessel-function mode families. Modal frequencies are proportional to Bessel zeros rather than integer multiples.

A normalized low-order sequence is approximately:

```text
1.00, 1.59, 2.14, 2.30, 2.65, ...
```

These are **inharmonic** partials. Consequences:

- Weak or ambiguous single pitch center (unless shell/tuning tricks emphasize certain modes)
- Strong rhythmic and textural role
- Different consonance behavior from harmonic instruments

Membrane physics explains why many drum sounds are perceived more by attack profile and spectral centroid than by stable scale degree.

## Harmonic vs. Inharmonic Spectra and Tuning Fit

This is the bridge to [timbre.md](timbre.md): interval systems are not independent of source spectra.

- Harmonic sources (strings, many pipes, voice) pair naturally with harmonic-series-oriented interval lattices
- Inharmonic sources (many membranes, bells, metallophones) can favor alternative spacing strategies

This is Sethares' coupling principle in physical form: "best" tuning depends on what kind of spectrum your instrument family actually produces.

## Psychoacoustics Connection

Harmonic-template matching in [consonance-dissonance.md](consonance-dissonance.md) works best when source spectra themselves are harmonic. With inharmonic spectra, fusion cues shift, and cultures often optimize for different interval compromises and beating textures.

So instrument construction is not downstream of theory; it co-defines theory.

<!-- INTERACTIVE: Source archetype explorer — switch between ideal string, open pipe, closed pipe, and membrane modal spectra; audition a fixed interval set and compare fusion/roughness changes -->

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| String harmonic series source | String family acoustics | Same physical model |
| Open-open pipe all-harmonic model | Open pipe resonance | Flute-like idealization |
| Closed-open odd-harmonic model | Closed pipe resonance | Clarinet-like low-register idealization |
| Inharmonic membrane mode set | Drumhead modes | Bessel-zero governed, non-integer partials |

## Connections

- [Sound Waves](sound-waves.md) — the underlying pressure-wave dynamics for all sources
- [Harmonic Series](harmonic-series.md) — strings and open pipes approximate this structure
- [Timbre](timbre.md) — source physics determines spectral signature and envelope
- [Consonance & Dissonance](consonance-dissonance.md) — harmonicity controls fusion behavior
- [Digital Audio](digital-audio.md) — recording and analysis pipeline for these spectra
