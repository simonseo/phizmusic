---
title: Timbre
aliases: [tone color, spectral signature, auditory scene analysis]
tier: 2
tags: [spectrum, perception, instrumentation]
prerequisites: [fourier-analysis.md, harmonic-series.md, ear-cochlea.md, consonance-dissonance.md]
related: [fourier-analysis.md, harmonic-series.md, ear-cochlea.md, consonance-dissonance.md, instrument-physics.md, twelve-tet.md]
scope-boundary: Timbre definition, spectral envelope, timbre-tuning coupling, and auditory grouping only. No synthesis programming catalog.
has_audio: true
---

# Timbre

Timbre is the **spectral signature** of a sound: which frequency components are present and how strong each component is over time. Two sounds can share the same fundamental frequency and loudness but still be perceived as different sources because their spectral and temporal structures differ.

> 🎯 **Simple version**: Timbre is the "color" of a sound. It comes from which overtones are in the mix and how strong each one is. Same note, different overtone recipe = different instrument identity.

## Timbre as Fourier Content

From [fourier-analysis.md](fourier-analysis.md): any periodic sound can be written as a sum of sine components. Timbre is therefore not an extra property on top of Fourier analysis; timbre **is** the Fourier distribution plus its time evolution.

For a pitched tone:

```text
x(t) = sum A_n * sin(2*pi*f_n*t + phi_n)
```

where the set `{A_n}` (and how it changes during attack/decay) dominates timbre perception.

If two instruments play the same fundamental `f0`:

- Piano might emphasize stronger high partials at onset, then decay quickly
- Violin might show smoother sustained upper harmonics under bow energy

Same `f0`, different `{A_n(t)}` -> different timbre.

## Spectral Envelope

A practical way to describe timbre is the **spectral envelope**: a smooth curve through harmonic amplitudes.

- Bright timbre: slower high-frequency roll-off
- Dark timbre: faster high-frequency roll-off
- Hollow timbre: reduced even or odd harmonic families depending on source physics
- Noisy timbre: significant non-harmonic broadband components

This envelope changes with performance parameters (strike position, bow pressure, embouchure, articulation), so timbre is dynamic, not static.

## Why Piano and Violin Sound Different at the Same Pitch

Both can play (for example) Do4, but they excite different physical systems:

- Piano: impulsive hammer-string interaction, strong onset transient, non-constant energy input
- Violin: continuous bow-string stick-slip interaction, sustained energy input

The resulting spectra differ in both harmonic amplitude ratios and temporal evolution. The auditory system uses both cues.

## Sethares: Timbre-Tuning Coupling

A major insight for cross-cultural music theory:

**Consonance depends on the match between tuning system and instrument timbre.**

- Instruments with near-harmonic spectra (many strings, voice-like sources) align well with harmonic-series-derived ratios
- Instruments with inharmonic spectra (bells, some metallophones, certain percussion) can favor different interval grids

So there is no single universal "best" tuning independent of instrument physics. Tuning is a co-design problem between interval lattice and spectral structure.

This helps explain why gamelan tunings and 12-TET can each be internally coherent in their own instrument ecosystems.

## Auditory Scene Analysis (Bregman)

Timbre perception is part of a larger grouping problem: deciding what belongs to one sound source.

Primary grouping cues include:

- **Harmonicity**: components fitting one harmonic template fuse
- **Common onset/offset**: components starting and stopping together fuse
- **Spatial coherence**: similar location cues fuse
- **Timbre continuity over time**: similar spectral shape across events links into one stream

### Simultaneous Grouping (Fusion)

When multiple components meet these cues at once, they are heard as one source (for example, "one clarinet tone") instead of many separate partials.

### Sequential Grouping (Auditory Streaming)

Across time, the brain links events into streams using pitch proximity, timing regularity, and timbre continuity. This enables "cocktail-party" listening: following one voice in dense mixtures.

Large pitch leaps or strong timbre discontinuities can split one line into separate perceptual streams. This is part of how single-line writing can imply multiple simultaneous voices.

## Psychoacoustics Connection

Timbre is not just a physical spectrum; it is a perceptual decision process. The ear-brain system infers source structure from incomplete acoustic evidence. Harmonicity is the strongest grouping cue, but onset timing and spectral continuity strongly modulate the result.

That is why equal-frequency sounds with different attacks can be instantly identifiable as different instruments, and why rearranging component timing can change perceived source count without changing average spectrum.

## Hear Different Timbres

All four buttons play the same pitch (Do4 = 261.63 Hz) with different oscillator waveforms. Notice how the spectral content changes the perceived "color" of the sound.

| Waveform | Spectral Content | Listen |
|----------|------------------|--------|
| Sine | Pure tone — single frequency, no overtones | <button class="phiz-play-btn" data-freq="261.63" data-waveform="sine" onclick="playWaveform(this)">▶ Sine</button> |
| Triangle | Odd harmonics only, amplitudes fall as 1/n² — soft, mellow | <button class="phiz-play-btn" data-freq="261.63" data-waveform="triangle" onclick="playWaveform(this)">▶ Triangle</button> |
| Square | Odd harmonics only, amplitudes fall as 1/n — hollow, woody | <button class="phiz-play-btn" data-freq="261.63" data-waveform="square" onclick="playWaveform(this)">▶ Square</button> |
| Sawtooth | All harmonics, amplitudes fall as 1/n — bright, buzzy | <button class="phiz-play-btn" data-freq="261.63" data-waveform="sawtooth" onclick="playWaveform(this)">▶ Sawtooth</button> |

<!-- INTERACTIVE: Timbre lab — lock fundamental frequency, then vary harmonic amplitude envelope and attack profile to morph between "flute-like," "violin-like," and "bell-like" percepts while showing spectrum and stream-grouping cues -->

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Spectral signature | Timbre, tone color | Same concept with explicit physics framing |
| Harmonic amplitude envelope | Spectral envelope | Audio engineering term |
| Timbre-tuning coupling | Instrument-dependent temperament preference | Sethares framework |
| Sequential stream segregation | Auditory streaming | Psychoacoustics term, rarely explicit in theory texts |

## Connections

- [Fourier Analysis](fourier-analysis.md) — timbre is Fourier component structure over time
- [Harmonic Series](harmonic-series.md) — defines harmonic templates used in grouping
- [The Ear & Cochlea](ear-cochlea.md) — biological analyzer implementing frequency decomposition
- [Consonance & Dissonance](consonance-dissonance.md) — timbre modulates interval roughness and fusion
- [Instrument Physics](instrument-physics.md) — physical source class determines spectral signature
- [Twelve-TET](twelve-tet.md) — temperament fit depends on source spectrum

### Suggested References

- [Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/) — Demonstrates Sethares' timbre-tuning coupling: how spectral content determines which intervals are consonant
- [Overtone Series (muted.io)](https://muted.io/overtone-series/) — Mix individual harmonics to hear how spectral recipe shapes timbre
