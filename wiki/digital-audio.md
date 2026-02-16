---
title: Digital Audio
aliases: [ADC, sampling, Nyquist, aliasing, bit depth]
tier: 2
tags: [audio engineering, signal processing, recording]
prerequisites: [sound-waves.md, fourier-analysis.md, adsr-envelope.md]
related: [sound-waves.md, fourier-analysis.md, adsr-envelope.md, auditory-masking.md, equal-loudness.md, instrument-physics.md]
scope-boundary: Fundamentals only (ADC, sampling, aliasing, bit depth, clipping, echo, room basics). No codec internals or advanced DSP design.
---

# Digital Audio

Digital audio converts a continuous pressure-wave signal into discrete numerical samples. The conversion quality is constrained by two core design choices: **how often** you sample (sampling rate) and **how finely** you quantize amplitude (bit depth).

> 🎯 **Simple version**: To store sound in a computer, you take very fast snapshots of the waveform. More snapshots per second and finer volume steps make a more accurate recording. Too few snapshots causes false tones (aliasing).

## 1) Analog-to-Digital Conversion (ADC)

The microphone produces a continuous voltage proportional to air pressure. ADC measures that voltage at discrete times:

```text
x[n] = x(n * Ts)
```

where `Ts = 1/Fs`, and `Fs` is the sampling rate in samples/second.

This is sampling a continuous function on a time lattice.

## 2) Sampling Rate and Nyquist

Nyquist-Shannon condition for band-limited reconstruction:

```text
Fs >= 2 * Fmax
```

where `Fmax` is the highest frequency component you want to preserve.

Example:

- Human hearing upper bound is roughly 20 kHz (age dependent)
- CD rate `Fs = 44,100 Hz`
- Nyquist frequency `Fn = Fs/2 = 22,050 Hz`

So 44.1 kHz is chosen to cover the audible range with practical anti-alias filter margins.

## 3) Aliasing

If frequencies above Nyquist enter the converter, they fold into lower frequencies and become false components:

```text
f_alias = |f_in - k * Fs|   (choose integer k that places result in [0, Fs/2])
```

Example: `f_in = 26 kHz`, `Fs = 44.1 kHz` gives an aliased component at `|26 - 44.1| = 18.1 kHz`.

This is why anti-alias filtering before sampling is mandatory.

## 4) Bit Depth, Gain, and Clipping

Bit depth sets amplitude resolution:

- `N` bits -> `2^N` quantization levels
- Ideal dynamic range approximation:

```text
DR ~ 6.02N + 1.76 dB
```

So:

- 16-bit -> 65,536 levels -> ~98 dB theoretical range (commonly cited as ~96 dB practical)
- 24-bit -> 16,777,216 levels -> much larger headroom for production workflows

**Gain staging** keeps signal within range. If sample magnitude exceeds full-scale limit, waveform tops are truncated:

```text
|x[n]| > 1.0  -> clipping
```

Clipping introduces nonlinear distortion and high-frequency artifacts.

## 5) Echo and Delay

Echo is a delayed copy of a signal summed with the original:

```text
y(t) = x(t) + a * x(t - tau)
```

Physics link for one reflection:

```text
tau ~ distance / speed_of_sound
```

At `c ~ 343 m/s`, a 34.3 m round-trip path gives about 100 ms delay.

Short delays blend as coloration; longer delays are heard as discrete echoes.

## 6) Room Acoustics Basics

A room is a 3D resonator with standing-wave modes (analogous to [instrument-physics.md](instrument-physics.md), but in 3 dimensions).

Two key ideas:

- **Room modes**: frequency-specific peaks/nulls from geometry
- **Reverberation time (RT60)**: time for sound level to drop 60 dB after source stops

Sabine approximation:

```text
RT60 = 0.161 * V / A
```

where `V` is room volume (m^3) and `A` is total absorption (sabins).

This links physical space to recorded/perceived tone and motivates digital reverb models.

## Psychoacoustics Connection

Engineering targets are chosen relative to human perception:

- 44.1 kHz is tied to hearing bandwidth limits
- Bit-depth choices trade quantization noise against practical noise floors
- Perceptual coders (MP3/AAC) remove components that are masked (see [auditory-masking.md](auditory-masking.md))

So "accurate audio" is not only mathematical reconstruction; it is reconstruction sufficient for human hearing constraints.

<!-- INTERACTIVE: Sampling and aliasing simulator — choose source frequency, sampling rate, and anti-alias filter cutoff; show waveform snapshots, reconstructed signal, and spectral fold-back -->

## Translation Table

| PhizMusic | Western/Engineering | Notes |
|-----------|---------------------|-------|
| Discrete pressure samples | PCM audio | Same concept |
| Sampling rate Fs | Sample rate | Samples per second |
| Nyquist limit Fs/2 | Nyquist frequency | Highest representable frequency without aliasing |
| Quantization levels 2^N | Bit depth resolution | Amplitude step count |
| Saturation clipping | Digital clipping | Full-scale overflow/truncation |
| Delayed replica mixing | Echo/delay effect | One of the simplest time-domain effects |
| RT60 = 0.161 * V / A | Sabine reverberation formula | First-order room decay model |

## Connections

- [Sound Waves](sound-waves.md) — continuous pressure signal being sampled
- [Fourier Analysis](fourier-analysis.md) — spectral view needed to reason about aliasing
- [ADSR Envelope](adsr-envelope.md) — time-domain envelope represented in sampled data
- [Auditory Masking](auditory-masking.md) — perceptual basis of lossy compression
- [Equal Loudness](equal-loudness.md) — frequency-dependent hearing sensitivity for monitoring decisions
- [Instrument Physics](instrument-physics.md) — source spectra entering the capture chain
