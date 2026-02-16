---
title: Auditory Masking
aliases: [masking, frequency masking, temporal masking, psychoacoustic masking]
tier: 2
tags: [psychoacoustics, perception, compression]
prerequisites: [ear-cochlea.md, sound-waves.md, missing-fundamental.md, digital-audio.md]
related: [ear-cochlea.md, sound-waves.md, missing-fundamental.md, digital-audio.md, equal-loudness.md, consonance-dissonance.md]
scope-boundary: Perceptual masking phenomena and applications only. No MPEG model internals or codec implementation details.
---

# Auditory Masking

Auditory masking is the phenomenon where one sound makes another sound inaudible or harder to detect. Human hearing is not a complete capture of acoustic reality; it is a selective system with limited resolution in frequency and time.

> 🎯 **Simple version**: A loud sound can hide a quieter sound so you cannot hear it, even if both are physically present. This is why MP3 files can remove some audio details with little perceived loss.

## 1) Simultaneous Masking (Frequency Masking)

When a strong tone/noise component is present, nearby frequencies require higher level to be audible. On the basilar membrane, overlapping excitation reduces detectability of weaker neighbors.

Key properties:

- Strongest masking occurs within the same or nearby **critical band** (see [ear-cochlea.md](ear-cochlea.md))
- Masking spreads asymmetrically: low-frequency maskers usually mask higher frequencies more strongly than the reverse (upward spread)
- Higher masker level broadens masking influence

Conceptual threshold relation:

```text
audible if target_level > hearing_threshold(f) + masking_shift(f | masker)
```

The masking shift depends on frequency distance from the masker and masker intensity.

## 2) Temporal Masking

Masking is also time-dependent.

- **Forward masking**: a loud event raises threshold for events arriving after it (typically strongest over ~50-200 ms)
- **Backward masking**: a loud event can reduce detectability of events occurring shortly before it (~5-20 ms window)

Forward masking often dominates practical listening and coding applications because onset transients leave a short-lived neural suppression tail.

## 3) Masking Curves and Critical Bands

A masking curve describes raised threshold around a masker frequency.

```text
Threshold
  ^
  |            /
  |           /  \____
  |__________/         \__________
  +---------------------------------> Frequency
             masker
```

At higher masker levels:

- Peak threshold rises
- Effective width increases
- Asymmetry becomes more salient

This is one reason dense mixes can feel crowded even when no single source is extremely loud.

## 4) Engineering Applications

## Perceptual Compression (MP3/AAC)

Lossy codecs estimate masking thresholds and spend fewer bits on components predicted to be inaudible because they are masked by stronger nearby components or recent transients. This enables large data reduction (often around 10:1) while preserving perceived quality for many listening contexts.

## Mix Engineering

In arrangement and EQ decisions, overlapping sources can mask each other:

- Bass guitar can mask kick-drum low components
- Dense midrange instruments can mask vocal intelligibility

Practical fixes include spectral separation, dynamic control, and arrangement spacing.

## Acoustic Design

Ambient and mechanical noise can mask useful sound cues in halls, classrooms, and public spaces, affecting clarity and intelligibility requirements.

## Psychoacoustics Connection

Masking shows that perception is a reconstructed model, not an exhaustive measurement. The auditory system prioritizes salient structure under finite neural bandwidth. What we "hear" is therefore a filtered interpretation of the physical wavefield.

<!-- INTERACTIVE: Masking demo — play a loud tone at one frequency, then add a quiet tone nearby and show how it becomes inaudible; adjust frequency separation to hear it emerge -->

## Translation Table

| PhizMusic | Western/Engineering | Notes |
|-----------|---------------------|-------|
| Simultaneous masking | Frequency masking | Same phenomenon |
| Forward masking | Post-masking | Target after masker |
| Backward masking | Pre-masking | Target before masker |
| Critical-band masking | Auditory filter overlap | Cochlear filter-bank framing |
| Perceptual bit allocation | Psychoacoustic coding | Basis of MP3/AAC efficiency |

## Connections

- [The Ear & Cochlea](ear-cochlea.md) — critical bandwidth and cochlear filtering explain local masking
- [Sound Waves](sound-waves.md) — physical signal components that compete for audibility
- [Missing Fundamental](missing-fundamental.md) — another case where perception diverges from raw spectrum
- [Digital Audio](digital-audio.md) — lossy compression depends on masking limits
- [Equal Loudness](equal-loudness.md) — base hearing thresholds vary with frequency
- [Consonance & Dissonance](consonance-dissonance.md) — roughness and masking interact in dense spectra
