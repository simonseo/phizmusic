---
title: Equal Loudness
aliases: [Fletcher-Munson, ISO 226, phon scale, frequency sensitivity]
tier: 2
tags: [psychoacoustics, loudness, perception]
prerequisites: [sound-waves.md, ear-cochlea.md]
related: [sound-waves.md, ear-cochlea.md, auditory-masking.md, digital-audio.md, instrument-physics.md]
scope-boundary: Conceptual equal-loudness behavior and practical implications only. No full standard derivation or weighting-standard deep dive.
---

# Equal Loudness

Equal-loudness contours show that perceived loudness depends on frequency as well as physical sound pressure level (dB SPL). A spectrum that is physically flat does not sound equally loud across frequencies because the auditory system has frequency-dependent sensitivity.

> 🎯 **Simple version**: Your ears are best at hearing mid frequencies (especially speech range) and less sensitive to very low bass and very high treble, especially at low listening levels. That is why bass seems to disappear when you turn volume down.

## Contours: ISO 226 Framing

The modern standard representation is ISO 226 equal-loudness-level contours (historically called Fletcher-Munson curves). Each contour is the set of `(frequency, SPL)` pairs that sound equally loud.

Conceptual reading:

- Around 2-4 kHz, the ear is most sensitive (lowest SPL needed)
- At low frequencies (for example 50-200 Hz), much higher SPL is required for same perceived loudness
- At higher playback levels, contour shape becomes flatter (sensitivity differences shrink)

## The Phon Scale

`phon` is a loudness level unit anchored at 1 kHz:

- A tone has loudness `N phons` if it sounds as loud as a `N dB SPL` tone at 1 kHz

Example:

- 1 kHz at 40 dB SPL = 40 phon by definition
- 100 Hz often needs roughly ~50 dB SPL to match 40-phon loudness (order-of-magnitude illustration)

So equal-loudness comparison is not raw dB matching across frequency; it is perceptual equivalence matching.

## Why the Ear Peaks Near 2-4 kHz

Part of the sensitivity peak is mechanical: the ear canal behaves like a short tube resonator. A rough quarter-wave estimate with canal length `L ~ 3 cm` gives:

```text
f ~ c / (4L) ~ 343 / (4 * 0.03) ~ 2.9 kHz
```

This resonates in the same region where human speech intelligibility cues are dense. The anatomical-acoustic coupling is a strong evolutionary advantage for communication.

This directly links to [instrument-physics.md](instrument-physics.md) air-column resonance principles.

## Practical Implications

## 1) Loudness compensation controls

The classic "loudness" button boosts bass (and often treble) at low monitoring levels to compensate for contour curvature.

## 2) Mix reference levels

Engineers often monitor near reference SPL regions (commonly around the 80-85 dB SPL neighborhood) where contour curvature is less extreme, reducing frequency-balance bias.

## 3) Perceived bass loss at low volume

Turning playback down uniformly reduces SPL, but perceived low-frequency reduction is disproportionately larger because low-frequency sensitivity falls faster on low-phon contours.

## 4) "Flat response" vs. "sounds flat"

A physically flat playback chain can still sound mid-forward or bass-light depending on listening level and listener hearing profile.

## Psychoacoustics Connection

Equal-loudness contours prove that "volume" is not a single physical scalar in perception. Loudness is frequency-dependent and level-dependent. This is a core reason why engineering metrics (energy, SPL, flat transfer) must always be interpreted through auditory perception models.

<!-- INTERACTIVE: Equal-loudness curve overlay — show how perceived loudness changes with frequency at different SPL levels, let user toggle between curves -->

## Translation Table

| PhizMusic | Western/Engineering | Notes |
|-----------|---------------------|-------|
| Equal-loudness contour | Fletcher-Munson / ISO 226 curve | Historical and standards names |
| Loudness level (phon) | Phon | Same unit |
| Frequency sensitivity peak | Ear canal resonance region | Typically around 2-4 kHz |
| Perceptual loudness compensation | Loudness control | Consumer playback adaptation |

## Connections

- [Sound Waves](sound-waves.md) — defines SPL and amplitude foundations
- [The Ear & Cochlea](ear-cochlea.md) — biological mechanism behind frequency-dependent sensitivity
- [Auditory Masking](auditory-masking.md) — masking thresholds are built on non-flat baseline sensitivity
- [Digital Audio](digital-audio.md) — monitoring and coding decisions depend on loudness perception
- [Instrument Physics](instrument-physics.md) — ear-canal resonance parallels pipe-resonance physics
