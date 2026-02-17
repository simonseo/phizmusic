---
title: Fourier Analysis
aliases: [Fourier transform, spectral decomposition, frequency decomposition]
tier: 1
category: physics
tags: [physics, math, foundation]
prerequisites: [sound-waves.md]
related: [sound-waves.md, ear-cochlea.md, timbre.md, digital-audio.md, harmonic-series.md]
scope-boundary: Conceptual understanding of Fourier decomposition only. No FFT algorithms, no windowing, no DSP implementation details.
has_audio: true
---

# Fourier Analysis

Fourier analysis is the mathematical principle that **any complex waveform can be decomposed into a sum of simple sine waves**, each with its own frequency, amplitude, and phase. It is the formal connection between the two representations of sound introduced in [Sound Waves](sound-waves.md): the **waveform** (pressure vs. time) and the **spectrum** (energy vs. frequency). These are not two different things — they are two views of the same physical reality, connected by the Fourier transform.

> 🎯 **Simple version**: Any sound, no matter how complex, is actually a bunch of simple pure tones added together. Fourier analysis is the math that finds those hidden pure tones. Your ear does this naturally — the cochlea physically separates a complex sound into its component frequencies.

## The Core Insight

In 1807, Joseph Fourier proposed a startling claim: any periodic function can be expressed as a sum of sine and cosine functions. The mathematical statement:

```
f(t) = A₀ + A₁ sin(2π f₁ t + φ₁) + A₂ sin(2π f₂ t + φ₂) + A₃ sin(2π f₃ t + φ₃) + ...
```

Or more compactly:

```
f(t) = A₀ + Σ Aₙ sin(2π fₙ t + φₙ)    for n = 1, 2, 3, ...
```

Each term in this sum is a **sinusoidal component** defined by three numbers:
- **fₙ** — its frequency (Hz): how fast it oscillates
- **Aₙ** — its amplitude: how strong it is
- **φₙ** — its phase: where in the cycle it starts

The claim is extraordinary: a jagged sawtooth wave, a clipped square wave, a vocal "ah" sound, a cymbal crash — all are sums of smooth sine waves. Strip the complexity away and you always find sine waves underneath.

## Waveform ↔ Spectrum: The Same Information, Two Views

The **Fourier transform** is the mathematical operation that converts between these two representations:

```
Waveform (time domain)  ←→  Spectrum (frequency domain)
pressure vs. time            amplitude vs. frequency
         ↕
    Fourier Transform
```

This is a lossless, reversible transformation. No information is created or destroyed — the waveform and the spectrum contain **exactly the same information** arranged differently:

| Waveform shows you... | Spectrum shows you... |
|------------------------|----------------------|
| Pressure at each instant | Energy at each frequency |
| Overall shape of the sound | Which sine components are present |
| Timing information directly | Frequency content directly |
| Hard to see component frequencies | Hard to see timing |

Neither view is more "real" than the other. They are related like a map and its legend — different ways of encoding the same territory.

## Building Complex Sounds from Sine Waves

The reverse process — **additive synthesis** — makes the concept tangible. Start with silence and add sine waves one at a time:

### Example: Building a sawtooth wave

A sawtooth wave at fundamental frequency f₁ is the sum:

```
sawtooth(t) = A sin(2π f₁ t)
            + A/2 sin(2π 2f₁ t)
            + A/3 sin(2π 3f₁ t)
            + A/4 sin(2π 4f₁ t)
            + ...
```

Adding each harmonic progressively transforms the shape:

```
1 harmonic:    ~  (pure sine — smooth, flute-like)
2 harmonics:   ~  (slightly richer)
5 harmonics:   ~  (recognizably buzzy)
20 harmonics:  /| (clearly sawtooth-shaped, bright and buzzy)
```

The pattern: the nth harmonic has frequency n × f₁ and amplitude A/n. The spectrum is a descending staircase of peaks at integer multiples of f₁.

### Example: Building a square wave

```
square(t) = A sin(2π f₁ t)
          + A/3 sin(2π 3f₁ t)
          + A/5 sin(2π 5f₁ t)
          + ...
```

Only **odd** harmonics appear (1st, 3rd, 5th, 7th...). This is why a square wave sounds "hollow" compared to a sawtooth — the even harmonics are missing from its recipe.

### Example: A pure sine wave

```
Spectrum: a single peak at f₁, nothing else.
```

A sine wave is the simplest possible sound — one frequency, one amplitude. It is the atom from which all complex sounds are built. A pure sine wave sounds thin, electronic, and "plain" because there is no spectral richness. No acoustic instrument produces a pure sine wave; all have overtones that shape their characteristic [timbre](timbre.md).

## Hear Additive Synthesis

Build complex timbres from sine waves. Each button adds harmonics at integer multiples of 220 Hz (La3), with amplitudes as described in the examples above.

<p><button class="phiz-play-btn" data-fundamental="220" data-harmonics="[1]" onclick="playAdditive(this)">▶ Pure sine (1 harmonic)</button></p>

<p><button class="phiz-play-btn" data-fundamental="220" data-harmonics="[1,0.5,0.33,0.25,0.2,0.167]" onclick="playAdditive(this)">▶ Sawtooth-like (6 harmonics: 1/n amplitudes)</button></p>

<p><button class="phiz-play-btn" data-fundamental="220" data-harmonics="[1,0,0.33,0,0.2,0,0.143]" onclick="playAdditive(this)">▶ Square-like (odd harmonics only)</button></p>

<p><button class="phiz-play-btn" data-fundamental="220" data-harmonics="[1,0.5,0.33,0.25,0.2,0.167,0.143,0.125,0.111,0.1,0.091,0.083,0.077,0.071,0.067,0.063]" onclick="playAdditive(this)">▶ Rich tone (16 harmonics)</button></p>

<!-- INTERACTIVE: Additive synthesis — combine sine waves to build complex waveforms, show both waveform and spectrum updating in real time. Sliders for amplitude of harmonics 1-16. -->

## The Cochlea Does This Physically

The mathematical Fourier transform has a biological analog: the **cochlea** (see [The Ear & Cochlea](ear-cochlea.md)).

When a complex sound enters your ear, the basilar membrane doesn't wait for a computer to run the math. Its varying stiffness and width cause different positions to resonate at different frequencies. A complex sound containing frequencies at 200 Hz, 400 Hz, and 600 Hz will excite three distinct regions of the membrane simultaneously — the sound is physically decomposed into its spectral components.

This is not a metaphor. The cochlea performs a genuine frequency decomposition through mechanical resonance. The brain receives the output: an array of ~3,500 frequency channels reporting "how much energy at my frequency right now."

However, the cochlea's frequency resolution is limited by **critical bandwidth** — the physical width of each resonant region on the basilar membrane. Two frequencies closer together than the critical bandwidth (~10-20% of center frequency at musically relevant pitches) excite overlapping regions and cannot be fully separated. They are heard as a single fused tone, possibly with roughness or beating, rather than as two distinct pitches.

This limit means the ear's Fourier analysis is "blurry" compared to a mathematical FFT — it has excellent but not infinite frequency resolution. The blurriness has real musical consequences: it defines the boundary between consonance and dissonance, determines when two notes fuse versus clash, and sets the minimum frequency spacing that sounds "clean" (see [consonance-dissonance.md](consonance-dissonance.md)).

## What the Spectrum Tells You About a Sound

Reading a spectrum gives you direct insight into a sound's character:

| Spectral feature | Perceptual result |
|-----------------|-------------------|
| Single peak | Pure tone (sine wave) — thin, electronic |
| Peaks at f, 2f, 3f, 4f... (integer multiples) | Harmonic tone — clear pitched sound (voice, strings, brass) |
| Peaks at non-integer ratios | Inharmonic tone — metallic or bell-like (see [instrument-physics.md](instrument-physics.md)) |
| Many closely spaced peaks or continuous energy | Noise-like — hiss, wind, cymbal wash |
| Strong low harmonics, weak high ones | Mellow, dark timbre (flute, covered tone) |
| Strong high harmonics | Bright, sharp timbre (trumpet, "nasal" voice) |

The spectrum is the "fingerprint" of a sound's [timbre](timbre.md). Two instruments playing the same pitch at the same loudness sound different because their spectra differ — they have the same fundamental frequency but different harmonic amplitudes.

## Periodic vs. Non-Periodic Sounds

Fourier's original theorem applies to **periodic** signals — sounds that repeat exactly. For periodic sounds, the spectrum consists of discrete peaks (a line spectrum) at the fundamental and its integer harmonics.

Real-world sounds are rarely perfectly periodic. A plucked guitar string decays. A vowel shifts. A drum hit is a brief transient. For such **non-periodic** and **transient** sounds, a generalized version of the Fourier transform produces a **continuous spectrum** — energy spread across a continuous range of frequencies rather than concentrated at discrete peaks.

The conceptual insight remains the same: any sound, periodic or not, can be described as a combination of sine waves at various frequencies, amplitudes, and phases. The mathematics gets more involved (continuous integrals instead of discrete sums), but the principle is identical.

For the purposes of understanding music, the periodic case — discrete harmonics at integer multiples of a fundamental — is the most important, because it describes the sounds of pitched instruments and voices. That harmonic structure is explored in [Harmonic Series](harmonic-series.md).

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Spectrum | Harmonic content, tone color | Western theory acknowledges "tone color" informally; spectrum is the physics |
| Waveform | — | No standard Western theory equivalent |
| Fourier analysis | — | Not part of traditional music theory; used in acoustics and audio engineering |
| Harmonic | Partial, overtone | "Partial" is any component; "harmonic" specifically = integer multiple; "overtone" = any component above the fundamental |
| Additive synthesis | — | Electronic music / synthesis term, not classical theory |

## Connections

- [Sound Waves](sound-waves.md) — introduces the waveform and spectrum representations that Fourier analysis formally connects
- [The Ear & Cochlea](ear-cochlea.md) — the biological frequency analyzer that physically performs Fourier decomposition
- [Harmonic Series](harmonic-series.md) — the specific pattern of frequencies produced by vibrating strings and air columns, analyzed via Fourier
- [Timbre](timbre.md) — how spectral content determines the perceptual "color" of a sound
- [Digital Audio](digital-audio.md) — how computers perform Fourier analysis (sampling, FFT algorithms, practical DSP)
