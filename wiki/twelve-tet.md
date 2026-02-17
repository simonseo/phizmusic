---
title: Twelve-Tone Equal Temperament (12-TET)
aliases: [12-TET, equal temperament, ET, twelve-tone equal temperament]
tier: 2
tags: [tuning, system, compromise]
prerequisites: [frequency-ratios.md, intervals.md, scales.md]
related: [frequency-ratios.md, intervals.md, scales.md, harmonic-series.md, consonance-dissonance.md, instrument-physics.md]
scope-boundary: 12-TET only. No meantone, well-temperament, or microtonal systems in depth.
has_audio: true
---

# Twelve-Tone Equal Temperament (12-TET)

12-TET is an **engineering compromise**: divide the octave into 12 exactly equal steps, each with a frequency ratio of 2^(1/12) ≈ 1.05946. No interval except the octave is acoustically pure. Every interval is slightly "wrong" — but equally wrong everywhere. This uniformity is the point: it buys **unlimited transposition** at the cost of tuning purity.

> 🎯 **Simple version**: 12-TET is a deal: you make every note slightly imperfect so that you can play in any key equally well. It's like rounding every fraction to a decimal — close enough, and much easier to calculate with.

## The Problem 12-TET Solves

The fundamental mathematical impossibility underlying all tuning systems:

**You cannot simultaneously have pure octaves (2:1), pure fifths (3:2), and a closed circle of fifths.**

The proof: stack twelve 3:2 ratios:

```
(3/2)^12 = 129.7463...
```

Seven octaves:

```
2^7 = 128
```

The difference — the **Pythagorean comma** — is:

```
(3/2)^12 / 2^7 = 531441/524288 ≈ 1.01364
```

In cents: approximately **23.46 cents** — roughly a quarter of a chromatic step.

This means: if you tune 12 perfect fifths in a row, the 12th "fifth" overshoots where it should close the circle by 23.46 cents. The circle doesn't close. You can't have it all.

Every tuning system in history is a different strategy for distributing this inevitable error. 12-TET distributes it **equally** across all 12 steps.

## The 12-TET Solution

12-TET defines every chromatic step as exactly:

```
Ratio per step = 2^(1/12) ≈ 1.059463
Cents per step = exactly 100
```

This means:
- Every step-distance 7 (the "fifth") = 700 cents, vs. just 702.0 cents → error of -2.0 cents
- Every step-distance 5 (the "fourth") = 500 cents, vs. just 498.0 cents → error of +2.0 cents
- Every step-distance 4 (the "major third") = 400 cents, vs. just 386.3 cents → error of +13.7 cents
- Every step-distance 3 (the "minor third") = 300 cents, vs. just 315.6 cents → error of -15.6 cents

The fifths and fourths are excellent approximations (2 cents off — barely perceptible). The thirds are noticeably compromised (14-16 cents off — clearly audible in sustained chords to trained listeners). This is the central trade-off.

See the complete comparison in the [Intervals](intervals.md) table.

## What 12-TET Sacrifices

**1. Pure thirds.** The 5:4 ratio (386.3 cents) is approximated by 400 cents — 13.7 cents sharp. In a sustained {0,4,7} chord on a piano, the step-4 interval beats at a rate determined by the 13.7-cent mistuning. This is why barbershop quartets and a cappella groups naturally drift toward just intonation on sustained chords — the singers' ears pull them toward the pure ratios.

**2. Harmonic series alignment.** The 7th harmonic (ratio 7:4 = 968.8 cents) falls 31.2 cents below the 12-TET step-10 (1000 cents). The 11th harmonic is 48.7 cents off the nearest step. 12-TET is optimized for 3-limit and 5-limit intervals; higher-prime harmonics are poorly served.

**3. Timbral variety between keys.** In historical temperaments (meantone, well-temperament), different keys had different interval sizes, giving each key a unique character. In 12-TET, all keys sound identical — a feature for transposition, but a loss of color.

## What 12-TET Gains

**1. Universal transposition.** Any melody, chord, or progression can be shifted to any starting pitch without changing its internal interval structure. This enabled the explosion of modulation and key-change techniques from Bach onward.

**2. Instrument compatibility.** All 12-TET instruments are compatible with each other in any key. An orchestra, a rock band, and a jazz combo can all play together without retuning.

**3. Simplified arithmetic.** Transposition = addition mod 12. Interval = subtraction. No lookup tables or special cases. This is the foundation of the PhizMusic [naming system](naming-system.md).

## Historical Context

Equal temperament was not a Western invention. It was independently discovered by:

- **Zhu Zaiyu** (朱載堉), Chinese prince and scholar, who published the precise mathematical formulation in 1584, computing 2^(1/12) using an 81-column abacus
- **Simon Stevin**, Flemish mathematician, who independently derived the same result around 1585 (though his calculations contained small errors)

Both arrived at the same solution because the mathematical problem is universal — it doesn't depend on cultural musical preferences. The adoption of 12-TET in Europe was gradual, becoming standard only in the 19th-20th centuries. Many cultures continue to use non-equal temperaments that optimize different priorities.

## The Railsback Curve

A revealing real-world complication: **piano tuners do not actually tune pianos to 12-TET.**

The Railsback curve, documented by O.L. Railsback in 1938, shows that professional piano tuners systematically **stretch** octaves — tuning the upper register slightly sharp and the lower register slightly flat relative to mathematical 12-TET.

Why? Piano strings are thick, stiff wires, not ideal mathematical strings. Their stiffness causes **inharmonicity**: the overtones are slightly sharper than perfect integer multiples of the fundamental. The 2nd partial of a bass string might be at 2.003× the fundamental rather than exactly 2×.

To make octaves sound pure on a real piano, tuners match the 2nd partial of the lower note to the fundamental of the upper note — which means tuning the upper note slightly sharp of the mathematical 2:1 ratio. This stretching accumulates across the keyboard.

The Railsback curve is a beautiful demonstration of **Sethares' timbre-tuning coupling** (see [timbre.md](timbre.md)): you don't tune to abstract mathematical ratios — you tune to the actual spectrum of the instrument. The "correct" tuning depends on the instrument's physical properties, not just number theory.

## The 14-Cent Question

Is the ~14-cent error on thirds audible? It depends on context:

- **Melodic intervals** (notes played sequentially): most listeners don't notice — the brain processes sequential pitches categorically
- **Sustained harmonic intervals** (notes held together): trained listeners hear beating, especially on thirds
- **Fast passages**: errors are essentially inaudible
- **Choral/ensemble music**: singers and string players naturally adjust toward just intonation
- **Piano**: the attack transient and rapid decay mask the beating

The perceptual threshold for interval mistuning is roughly 5-10 cents for trained musicians in sustained harmonic contexts. The 2-cent fifth error is essentially imperceptible. The 14-cent third error is above this threshold — barely, and context-dependently.

This is why 12-TET won: the errors are *just small enough* to be tolerable in most musical contexts, while the transposition freedom is indispensable for modern music's harmonic complexity.

## Hear the Difference

Compare just intonation intervals (pure ratios) with their 12-TET approximations. The difference is most audible on sustained thirds.

<table>
<tr>
  <th>Interval</th>
  <th>Just (ratio)</th>
  <th>12-TET</th>
  <th>Error</th>
  <th>Listen Just</th>
  <th>Listen 12-TET</th>
</tr>
<tr>
  <td>Perfect fifth</td>
  <td>3:2 → 330.00 Hz</td>
  <td>2^(7/12) → 329.63 Hz</td>
  <td>−2.0 cents</td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="330.00" onclick="playRatio(this)">▶ Just</button></td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="329.63" onclick="playRatio(this)">▶ 12-TET</button></td>
</tr>
<tr>
  <td>Major third</td>
  <td>5:4 → 275.00 Hz</td>
  <td>2^(4/12) → 277.18 Hz</td>
  <td>+13.7 cents</td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="275.00" onclick="playRatio(this)">▶ Just</button></td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="277.18" onclick="playRatio(this)">▶ 12-TET</button></td>
</tr>
<tr>
  <td>Minor third</td>
  <td>6:5 → 264.00 Hz</td>
  <td>2^(3/12) → 261.63 Hz</td>
  <td>−15.6 cents</td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="264.00" onclick="playRatio(this)">▶ Just</button></td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="261.63" onclick="playRatio(this)">▶ 12-TET</button></td>
</tr>
<tr>
  <td>Perfect fourth</td>
  <td>4:3 → 293.33 Hz</td>
  <td>2^(5/12) → 293.66 Hz</td>
  <td>+2.0 cents</td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="293.33" onclick="playRatio(this)">▶ Just</button></td>
  <td><button class="phiz-play-btn" data-freq1="220" data-freq2="293.66" onclick="playRatio(this)">▶ 12-TET</button></td>
</tr>
</table>

<!-- INTERACTIVE: Comparison player — hear the same chord in just intonation vs. 12-TET, with adjustable sustain time to make the difference more or less apparent -->

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| 12-TET | Equal temperament | Same concept |
| Chromatic step | Half step, semitone | Same interval (100 cents exactly) |
| Pythagorean comma | Pythagorean comma | Same term (~23.46 cents) |
| Step ratio 2^(1/12) | — | PhizMusic makes the math explicit |

## Connections

- [Frequency Ratios](frequency-ratios.md) — just intonation ratios that 12-TET approximates
- [Intervals](intervals.md) — complete table showing just vs. 12-TET for every interval
- [Scales](scales.md) — all scale subsets are drawn from the 12-TET grid
- [Harmonic Series](harmonic-series.md) — the natural ratios that 12-TET approximates
- [Consonance & Dissonance](consonance-dissonance.md) — how temperament errors affect perceptual fusion
- [Instrument Physics](instrument-physics.md) — string inharmonicity and the Railsback curve
- [Timbre](timbre.md) — Sethares' timbre-tuning coupling

### Suggested References

- [Sethares Dissonance Curves (aatishb.com)](https://aatishb.com/dissonance/) — Interactive demonstration of how 12-TET intervals approximate just ratios, with audible comparison
