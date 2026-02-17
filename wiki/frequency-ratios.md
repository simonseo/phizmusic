---
title: Frequency Ratios
aliases: [pitch ratios, interval ratios, cent system, cents]
tier: 1
category: music
tags: [physics, math, foundation]
prerequisites: [sound-waves.md, harmonic-series.md]
related: [harmonic-series.md, intervals.md, scales.md, twelve-tet.md, consonance-dissonance.md]
scope-boundary: Ratio concept and cent system only. No specific interval catalog (see intervals.md), no scale construction.
has_audio: true
---

# Frequency Ratios

A **frequency ratio** is the comparison of two frequencies by division: f₂/f₁. It is the natural way to measure the relationship between two pitches, because the human auditory system perceives pitch in terms of ratios, not differences (see [Sound Waves — Logarithmic Perception](sound-waves.md#logarithmic-perception-hearing-in-ratios)).

> 🎯 **Simple version**: To compare two pitches, divide one frequency by the other. A ratio of 2:1 is an octave — the biggest musical "step." A ratio of 3:2 is the next most natural step. Simple ratios (small numbers) sound smooth together. Complex ratios (big numbers) sound rough. The **cent** is a ruler for measuring these ratios: 1200 cents = 1 octave, 100 cents = 1 chromatic step.

## Why Ratios, Not Differences

Two demonstrations:

| Comparison | Frequency difference | Frequency ratio | Musical distance |
|-----------|---------------------|-----------------|------------------|
| 100 Hz → 200 Hz | +100 Hz | 2:1 | Octave (large) |
| 1000 Hz → 1100 Hz | +100 Hz | 1.1:1 | Less than 2 steps (small) |
| 1000 Hz → 2000 Hz | +1000 Hz | 2:1 | Octave (large) |

Same Hz difference (100 Hz) → completely different musical intervals. Same ratio (2:1) → same musical interval regardless of starting frequency.

This ratio-based perception is a consequence of the cochlea's logarithmic frequency mapping (see [ear-cochlea.md](ear-cochlea.md)). Equal distances along the basilar membrane correspond to equal frequency ratios, not equal Hz differences. Music is built on multiplication, not addition.

## Simple Ratios and the Harmonic Series

The simplest frequency ratios emerge directly from the [harmonic series](harmonic-series.md):

<table>
  <thead>
    <tr>
      <th>Ratio</th>
      <th>Decimal</th>
      <th>Source harmonics</th>
      <th>Character</th>
      <th>Listen</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1:1</td>
      <td>1.000</td>
      <td>1st : 1st</td>
      <td>Unison — same frequency</td>
      <td><button class="phiz-play-btn" data-freq1="220" data-freq2="220" onclick="playRatio(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>2:1</td>
      <td>2.000</td>
      <td>2nd : 1st</td>
      <td>Octave — perceptual "sameness" at different height</td>
      <td><button class="phiz-play-btn" data-freq1="220" data-freq2="440" onclick="playRatio(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>3:2</td>
      <td>1.500</td>
      <td>3rd : 2nd</td>
      <td>The most consonant interval after octave</td>
      <td><button class="phiz-play-btn" data-freq1="220" data-freq2="330" onclick="playRatio(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>4:3</td>
      <td>1.333</td>
      <td>4th : 3rd</td>
      <td>Nearly as consonant as 3:2</td>
      <td><button class="phiz-play-btn" data-freq1="220" data-freq2="293.33" onclick="playRatio(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>5:4</td>
      <td>1.250</td>
      <td>5th : 4th</td>
      <td>Warm, fused, sweet</td>
      <td><button class="phiz-play-btn" data-freq1="220" data-freq2="275" onclick="playRatio(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>6:5</td>
      <td>1.200</td>
      <td>6th : 5th</td>
      <td>Darker, slightly more tense</td>
      <td><button class="phiz-play-btn" data-freq1="220" data-freq2="264" onclick="playRatio(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>5:3</td>
      <td>1.667</td>
      <td>5th : 3rd</td>
      <td>Bright, open</td>
      <td><button class="phiz-play-btn" data-freq1="220" data-freq2="366.67" onclick="playRatio(this)">▶ Play</button></td>
    </tr>
    <tr>
      <td>7:4</td>
      <td>1.750</td>
      <td>7th : 4th</td>
      <td>The "natural seventh" — bluesy, outside 12-TET grid</td>
      <td><button class="phiz-play-btn" data-freq1="220" data-freq2="385" onclick="playRatio(this)">▶ Play</button></td>
    </tr>
  </tbody>
</table>

**Pattern**: ratios with smaller integers produce greater perceptual fusion. This is not subjective — it is a measurable consequence of harmonic overlap. When two tones have a 3:2 ratio, every 3rd harmonic of the lower tone aligns with every 2nd harmonic of the upper tone, producing reinforcement instead of roughness within critical bandwidth (see [consonance-dissonance.md](consonance-dissonance.md)).

## Perceptual Fusion vs. Aesthetic Preference

A critical distinction, established by McDermott et al.'s studies with the Tsimané people of Bolivia (who have minimal exposure to Western music):

- **Perceptual fusion** — the tendency for tones in simple ratios to be heard as a single blended sound — is **universal biology**. It arises from harmonic template matching in the auditory system.
- **Aesthetic preference** — whether people *like* consonant intervals more than dissonant ones — is **culturally learned**.

The Tsimané can hear the difference between consonant and dissonant intervals, but they don't rate consonant ones as more pleasant. Western listeners strongly prefer consonance, but this is learned, not innate. PhizMusic describes the physics of fusion without prescribing aesthetic judgments.

## The Cent System

Ratios are powerful for understanding physics, but awkward for arithmetic. Is 5:4 plus 6:5 equal to 3:2? (It is, but proving it requires multiplication, not addition.) The **cent** system solves this by converting ratios to a logarithmic scale where intervals add:

```
Cents = 1200 × log₂(f₂ / f₁)
```

By definition:
- **1 octave** (2:1) = 1200 cents
- **1 chromatic step** in 12-TET = exactly 100 cents
- **1 cent** = the ratio 2^(1/1200) ≈ 1.000578

The cent scale is logarithmic, so:

| Operation | In ratios | In cents |
|-----------|-----------|----------|
| Stack two intervals | Multiply ratios | Add cents |
| Invert an interval | Take reciprocal | Negate |
| Compare intervals | Complex fraction comparison | Simple subtraction |

### Examples

| Ratio | Cents | Meaning |
|-------|-------|---------|
| 2:1 | 1200.0 | Octave |
| 3:2 | 702.0 | Slightly more than 7 chromatic steps |
| 5:4 | 386.3 | Slightly less than 4 chromatic steps |
| 6:5 | 315.6 | Slightly more than 3 chromatic steps |
| 7:4 | 968.8 | Almost 10 chromatic steps (but 31 cents flat) |
| 9:8 | 203.9 | Slightly more than 2 chromatic steps |

Verify: 3:2 = 5:4 × 6:5. In cents: 702.0 ≈ 386.3 + 315.6 = 701.9 (rounding).

## Just Ratios vs. Equal Temperament

The simple ratios above are called **just intonation** — intervals tuned to exact harmonic-series ratios. In 12-TET (see [twelve-tet.md](twelve-tet.md)), every chromatic step is an equal ratio of 2^(1/12), producing intervals that are close to but never exactly match just ratios (except the octave):

| Just ratio | Just cents | 12-TET cents | Error |
|-----------|-----------|-------------|-------|
| 3:2 | 702.0 | 700 | -2.0 cents |
| 5:4 | 386.3 | 400 | +13.7 cents |
| 6:5 | 315.6 | 300 | -15.6 cents |
| 4:3 | 498.0 | 500 | +2.0 cents |

The 3:2 and 4:3 ratios are approximated very well by 12-TET (within 2 cents). The 5:4 and 6:5 ratios have larger errors (~14-16 cents) — perceptible to trained ears, especially in sustained chords. This is the central trade-off of 12-TET: universal transposability at the cost of tuning purity.

## Prime-Limit Classification

Different cultures' tuning systems can be classified by the largest prime factor appearing in their frequency ratios:

| Prime limit | Ratios used | Cultural examples |
|-------------|-------------|-------------------|
| **3-limit** | Ratios with only factors 2 and 3 (e.g., 3:2, 9:8, 4:3) | Chinese pentatonic, Pythagorean tuning |
| **5-limit** | Adds factor 5 (e.g., 5:4, 6:5, 5:3) | Indian classical, Western just intonation |
| **7-limit** | Adds factor 7 (e.g., 7:4, 7:6) | Barbershop singing, blues "blue notes" |
| **11-limit** | Adds factor 11 (e.g., 11:8) | Arabic maqam (neutral thirds/seconds) |
| **Non-ratio** | Based on inharmonic spectra, not integer ratios | Javanese/Balinese gamelan (Sethares coupling) |

This classification reveals that different tuning systems are **different engineering solutions to the same mathematical constraints** — not progressive stages of development. 3-limit tuning isn't "primitive" — it optimizes for maximal consonance of fifths. 5-limit adds sweeter thirds at the cost of complexity. Each choice reflects different aesthetic priorities.

The mathematical constraint underlying all ratio-based tuning: **log₂(3) is irrational**. You cannot stack any number of perfect fifths (3:2) and arrive at an exact octave (2:1). This impossibility forces every culture to choose how to distribute the inevitable error. 12-TET distributes it equally across all steps.

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Frequency ratio | Interval ratio | Same concept; PhizMusic uses it as the primary descriptor |
| Cent | Cent | Universal term in musicology/acoustics |
| Just intonation | Just intonation, pure tuning | Same concept |
| Prime limit | — | Tuning theory term, not in standard Western practice vocabulary |
| Perceptual fusion | Consonance | Western "consonance" blends physics and aesthetics; PhizMusic separates them |

## Connections

- [Harmonic Series](harmonic-series.md) — the physical source of simple integer ratios
- [Intervals](intervals.md) — how ratios map to step-distances in the chromatic system
- [Scales](scales.md) — how ratio-based reasoning explains different scale choices across cultures
- [Twelve-TET](twelve-tet.md) — the equal-temperament compromise that approximates just ratios
- [Consonance & Dissonance](consonance-dissonance.md) — why simple ratios produce perceptual fusion
- [Sound Waves](sound-waves.md) — logarithmic perception as the basis for ratio-based hearing
