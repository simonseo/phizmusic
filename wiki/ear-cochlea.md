---
title: The Ear & Cochlea
aliases: [ear, cochlea, basilar membrane, auditory system]
tier: 1
category: physics
tags: [biology, physics, perception]
prerequisites: [sound-waves.md]
related: [sound-waves.md, fourier-analysis.md, consonance-dissonance.md, auditory-masking.md, equal-loudness.md, missing-fundamental.md]
scope-boundary: Peripheral auditory system only (outer ear to cochlear nerve). No higher auditory cortex processing, no musical interval theory, no consonance models.
---

# The Ear & Cochlea

The ear is a biological transducer that converts pressure waves in air into electrochemical neural signals. Its most remarkable component — the **cochlea** — is a biological frequency analyzer that physically decomposes complex sounds into their component frequencies, performing in tissue what the Fourier transform performs in mathematics.

> 🎯 **Simple version**: Your inner ear is shaped like a snail shell. Different spots along it vibrate for different pitches — high pitches at the entrance, low pitches deep inside. It's like a piano keyboard made of flesh.

## From Pressure Wave to Neural Signal

Sound processing passes through three stages in the ear:

### 1. Outer Ear: Collection and Funneling

The pinna (visible ear) and ear canal collect pressure waves and channel them to the eardrum (tympanic membrane). The ear canal acts as a resonant tube that amplifies frequencies around 2-4 kHz — the frequency range most critical for speech intelligibility. This is a physical resonance, not a choice: the canal is roughly 2.5 cm long, and a quarter-wavelength resonance at that length peaks near 3.4 kHz.

### 2. Middle Ear: Impedance Matching

The eardrum vibrates in response to pressure waves. Three tiny bones (the ossicles — malleus, incus, stapes) mechanically link the eardrum to the oval window of the cochlea. Their purpose: **impedance matching**. The cochlea is filled with fluid, which has much higher acoustic impedance than air. Without the middle ear's lever action and area-ratio amplification, approximately 99.9% of sound energy would reflect off the fluid boundary. The ossicle chain provides roughly 25-30 dB of gain, making efficient air-to-fluid energy transfer possible.

### 3. Inner Ear (Cochlea): Frequency Analysis

This is where the transformation that matters for music happens.

## The Cochlea as Frequency Analyzer

The cochlea is a fluid-filled, coiled tube roughly 35 mm long when unrolled. Running along its length is the **basilar membrane** — a ribbon of tissue that varies in width and stiffness from one end to the other:

```
Cochlea (unrolled):

   Base (oval window)                              Apex
   ┌──────────────────────────────────────────────────┐
   │  narrow, stiff                   wide, flexible  │
   │  → high frequencies              → low frequencies│
   │                                                  │
   │  20,000 Hz ─────────────────────────────── 20 Hz │
   └──────────────────────────────────────────────────┘
                    Basilar Membrane

   Position maps to frequency (tonotopic organization)
```

When a pressure wave enters the cochlea at the oval window, it creates a traveling wave along the basilar membrane. This wave grows in amplitude as it reaches the region whose local resonant frequency matches the input frequency, then dies off sharply beyond that point.

**Each frequency excites a specific location.** This is **tonotopic organization** — frequency maps to position, just as a piano's keys map to pitch. The mapping is **logarithmic**: equal distances along the basilar membrane correspond to equal frequency *ratios*, not equal Hz differences. This logarithmic mapping is the biological basis for why we hear pitch in ratios (see [sound-waves.md](sound-waves.md) — "Logarithmic Perception").

When a complex sound arrives — one containing many frequencies simultaneously — each frequency component excites its own region of the basilar membrane. The membrane physically separates the mixture into its constituent frequencies, just as a prism separates white light into colors. This is a **biological Fourier transform** performed by mechanical resonance, not computation.

<!-- INTERACTIVE: Animated basilar membrane showing frequency decomposition of a complex tone — input a chord, see separate peaks form at positions corresponding to each frequency component -->

## Hair Cells: Converting Motion to Nerve Signals

Sitting on the basilar membrane are approximately 3,500 **inner hair cells** arranged in a single row. When the membrane vibrates at a given location, the hair cells there bend, opening ion channels, generating electrical signals that propagate via the auditory nerve to the brain.

The pattern of which hair cells fire, and how rapidly, encodes:
- **Which frequencies** are present (place coding — which location along the membrane is active)
- **How loud** each component is (rate coding — faster firing = louder)
- **Temporal fine structure** (phase locking — for frequencies below ~4 kHz, hair cells fire in sync with the waveform cycle, providing timing information)

Phase locking is significant: below roughly 4 kHz, the brain receives both *where* on the membrane is vibrating (place code) and *when* the vibrations occur relative to the wave cycle (temporal code). This dual encoding gives pitch perception its high precision in the musically important frequency range.

## The Cochlear Amplifier

The cochlea is not a passive filter. A second set of cells — roughly 12,000 **outer hair cells** arranged in three rows — act as a **cochlear amplifier**. These cells are motile: they physically change length in response to basilar membrane vibration, pumping energy back into the traveling wave.

This active amplification:
- Boosts sensitivity by **40-60 dB** (the difference between barely audible and easily heard)
- Sharpens frequency selectivity (narrows the excited region on the membrane)
- Creates **nonlinear** behavior — the amplifier saturates at high levels, providing built-in dynamic range compression

The nonlinearity of the cochlear amplifier has a musically important side effect: it generates **combination tones**. When two frequencies f₁ and f₂ enter the cochlea simultaneously, the nonlinear outer hair cells produce distortion products at frequencies like 2f₁ - f₂ and f₂ - f₁. These are physically real vibrations on the basilar membrane — your ear literally creates frequencies that were not in the original sound. The most audible is the **difference tone** (f₂ - f₁), sometimes called a **Tartini tone** after the violinist who first documented it in 1714. Combination tones play a role in consonance perception (see [consonance-dissonance.md](consonance-dissonance.md)).

## Critical Bandwidth

**Critical bandwidth** is the frequency range around a given center frequency within which two simultaneous tones interact — producing beating, roughness, or perceptual fusion rather than being heard as two distinct pitches.

Critical bandwidth is a direct consequence of the basilar membrane's physical properties. Each point on the membrane responds not to a single exact frequency but to a *range* of nearby frequencies. Two tones whose excitation patterns overlap on the membrane fall within the same critical band.

The critical bandwidth varies with frequency:

| Center frequency | Approximate critical bandwidth | As percentage |
|-----------------|-------------------------------|---------------|
| 100 Hz | ~90 Hz | ~90% |
| 500 Hz | ~100 Hz | ~20% |
| 1,000 Hz | ~130 Hz | ~13% |
| 4,000 Hz | ~500 Hz | ~12.5% |

At musically relevant frequencies (200 Hz – 4 kHz), critical bandwidth is roughly **10-20% of center frequency**, or approximately **one-third of an octave** (~3-4 chromatic steps).

Critical bandwidth matters enormously for music:
- Two tones within a critical band create **roughness** — the buzzy, clashing quality of dissonance
- Two tones separated by more than a critical band are heard as **distinct, smooth** pitches
- The harmonic spacing of musical intervals interacts with critical bandwidth to produce the consonance-dissonance spectrum (see [consonance-dissonance.md](consonance-dissonance.md))
- Audio engineers use critical-band models to decide which frequencies can be removed without audible loss (see [auditory-masking.md](auditory-masking.md))

## Summary: The Ear's Signal Chain

```
Sound wave (air pressure)
    ↓
Outer ear: collect + resonant amplify (~2-4 kHz boost)
    ↓
Middle ear: impedance match air → fluid (~25-30 dB gain)
    ↓
Cochlea: frequency decomposition via basilar membrane
    ↓ (place coding)          ↓ (temporal coding)
Inner hair cells fire at     Hair cells phase-lock to
specific membrane locations  waveform cycles (<4 kHz)
    ↓
Auditory nerve → brain
```

The cochlea's output is not a single signal — it is an array of ~3,500 channels, each reporting activity at a different frequency. The brain receives a real-time spectrogram, decomposed by physics.

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Critical bandwidth | — | No standard Western theory term; used in psychoacoustics and audio engineering |
| Tonotopic mapping | — | No Western music theory equivalent; from auditory neuroscience |
| Combination tone / Tartini tone | Difference tone | Western tradition names it after Tartini (1714) |
| Cochlear amplifier | — | Biology term, not used in music theory |

## Connections

- [Sound Waves](sound-waves.md) — the physical pressure waves that the ear receives as input
- [Fourier Analysis](fourier-analysis.md) — the mathematical framework for the frequency decomposition the cochlea performs physically
- [Consonance & Dissonance](consonance-dissonance.md) — how critical bandwidth and combination tones shape the perception of tonal fusion and clash
- [Auditory Masking](auditory-masking.md) — how the cochlea's frequency resolution limits determine which sounds mask others
- [Equal Loudness](equal-loudness.md) — frequency-dependent sensitivity arising from outer/middle ear resonances and cochlear mechanics
- [Missing Fundamental](missing-fundamental.md) — pitch perception when the fundamental frequency is absent, requiring pattern matching beyond the cochlea

### Suggested References

- [Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/) — Visualizes critical bandwidth effects on consonance perception, directly related to cochlear frequency analysis
