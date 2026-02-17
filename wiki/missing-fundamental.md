---
title: Missing Fundamental
aliases: [virtual pitch, residue pitch, phantom fundamental]
tier: 1
category: music
tags: [perception, psychoacoustics, foundation]
prerequisites: [harmonic-series.md, ear-cochlea.md]
related: [harmonic-series.md, ear-cochlea.md, consonance-dissonance.md, timbre.md, auditory-masking.md]
scope-boundary: Missing fundamental phenomenon, harmonic template evidence, real-world examples. No computational pitch perception models (autocorrelation, etc.) — Tier 3.
has_audio: true
---

# Missing Fundamental

The **missing fundamental** (also called virtual pitch or residue pitch) is a phenomenon where the brain perceives a pitch that is not physically present in the sound. When a complex tone contains harmonics of a fundamental frequency but the fundamental itself is absent, you still hear the pitch of the absent fundamental. This demonstrates that **pitch is a neural construct — the brain's best guess — not a direct measurement of the lowest frequency in a sound.**

> 🎯 **Simple version**: If you play 200, 300, 400, and 500 Hz together but leave out 100 Hz, your brain STILL hears 100 Hz as the pitch. Your brain is so used to the harmonic series pattern that it fills in the missing piece. Pitch is what your brain decides, not what's actually vibrating.

## The Phenomenon

Consider a tone with the following frequency components:

```
Present:   200 Hz, 300 Hz, 400 Hz, 500 Hz, 600 Hz
Absent:    100 Hz (the fundamental)
```

These are harmonics 2 through 6 of a 100 Hz fundamental. The 100 Hz component is physically missing — no acoustic energy at that frequency. Yet listeners consistently report hearing a pitch of 100 Hz.

This is not subtle. The perceived pitch is clear and definite. If you play a 100 Hz pure sine wave next to this harmonic complex, they match in pitch. The auditory system has inferred the fundamental from the pattern of upper harmonics.

## Mechanism: Harmonic Template Matching

The cochlea (see [ear-cochlea.md](ear-cochlea.md)) decomposes the incoming sound and reports: "I have energy at 200, 300, 400, 500, 600 Hz." Higher processing in the auditory system then asks: **"What single fundamental frequency would produce this set of harmonics?"**

The answer: these are exact integer multiples of 100 Hz. The brain assigns 100 Hz as the pitch.

```
Observed frequencies:  200   300   400   500   600
                        ↓     ↓     ↓     ↓     ↓
Harmonic number:        2     3     4     5     6
                                    ↓
Inferred fundamental:           100 Hz
```

This process is **harmonic template matching** — the same mechanism used for [auditory scene analysis](harmonic-series.md): the brain constantly searches for harmonic series patterns in the incoming frequency data and groups matching components into unified percepts.

The template matching is robust. Even if some harmonics are missing or slightly mistuned, the system still finds the best-fit fundamental. This robustness is essential — real-world sounds are never perfectly harmonic (room reflections, mechanical imperfections, and noise all perturb the harmonic structure).

## Distinguishing from Combination Tones

The missing fundamental is sometimes confused with **combination tones** (Tartini tones), but they are different phenomena:

| | Missing Fundamental | Combination Tones |
|---|---|---|
| **Mechanism** | Neural pattern matching (brain) | Nonlinear cochlear distortion (ear) |
| **Location** | Central auditory processing | Basilar membrane |
| **Evidence** | Present even with dichotic presentation (different harmonics to each ear) | Requires both tones in the same ear |
| **Physical signal** | No acoustic energy at perceived pitch | Actual vibration on basilar membrane at difference frequency |

The critical test: present harmonics 2, 3, 4 of 100 Hz — but send 200 and 400 Hz to one ear, and 300 Hz to the other. Listeners still hear 100 Hz. Since combination tones require both frequencies in the same cochlea, this pitch must be computed centrally. This proves the missing fundamental is a neural inference, not an acoustic artifact.

## Real-World Examples

### 1. Telephone Audio

Traditional telephone systems transmit only frequencies between approximately 300 Hz and 3400 Hz. The fundamental frequencies of most speaking voices (85-180 Hz for typical adult males, 165-255 Hz for typical adult females) fall **below** this range. Yet you have no trouble hearing the correct pitch of a voice on the phone.

The upper harmonics of the voice (which fall within the telephone band) provide enough information for harmonic template matching to infer the fundamental. You hear the pitch without ever receiving the physical frequency.

### 2. Small Speakers

A laptop speaker, phone speaker, or earbud typically cannot reproduce frequencies below 80-150 Hz. Bass instruments (bass guitar, kick drum, double bass) have fundamentals well below this range. Yet music through small speakers doesn't sound "pitchless" in the bass — you still perceive the bass notes at their correct pitch, even though the speakers physically cannot produce those frequencies.

The upper harmonics of the bass notes (which the speakers can reproduce) trigger the missing fundamental percept. The sound quality is thinner and the *weight* of the bass is reduced, but the *pitch* remains identifiable.

### 3. Organ Resultant Bass

Pipe organ builders have exploited this phenomenon for centuries. A pipe producing 100 Hz requires enormous length (~3.4 meters). Instead, builders play two smaller pipes together — for example at 200 Hz and 300 Hz (harmonics 2 and 3 of 100 Hz). The listener perceives a 100 Hz pitch — the "resultant bass" — at a fraction of the physical cost and space.

This is a deliberate engineering application of the missing fundamental: use the brain's inference machinery to create the perception of a frequency that no pipe actually produces.

## Implications for Music and Audio

The missing fundamental reveals several deep truths about pitch perception:

**1. Pitch ≠ frequency.** Frequency is a physical property of a wave. Pitch is a perceptual category assigned by the brain. They usually correspond, but the missing fundamental proves they can diverge.

**2. The harmonic series is perceptually fundamental.** The brain's pitch inference machinery is built around harmonic series templates. This is strong evidence that the harmonic series is not just a mathematical curiosity — it is the organizing principle of auditory perception, likely because natural sound sources (voices, vibrating strings, resonating cavities) produce harmonic spectra, and our auditory systems evolved to decode them.

**3. Audio reproduction is more forgiving than you'd think.** Because the brain infers fundamentals from harmonics, you don't need perfect bass reproduction for listeners to hear bass *pitch*. You do need it for bass *weight* and *feel*, but pitch perception is robust to missing lower frequencies.

## Hear It

Try these demonstrations. First, hear the complete harmonic series with the fundamental present. Then hear the same series with the fundamental removed — notice how the perceived pitch stays the same.

<p><button class="phiz-play-btn" data-freqs="[100,200,300,400,500,600]" data-nochord="true" onclick="playFreqSet(this)">▶ Complete series (100–600 Hz)</button></p>

<p><button class="phiz-play-btn" data-freqs="[200,300,400,500,600]" data-nochord="true" onclick="playFreqSet(this)">▶ Missing fundamental (200–600 Hz)</button></p>

<p><button class="phiz-play-btn" data-freqs="[100]" data-nochord="true" onclick="playFreqSet(this)">▶ Just the fundamental (100 Hz)</button></p>

<!-- INTERACTIVE: Missing fundamental demo — play a harmonic series with the fundamental present, then remove it and hear how the pitch percept remains. Add a slider to filter out progressively lower harmonics and observe when the pitch percept finally breaks down. -->

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Missing fundamental | Missing fundamental, virtual pitch | Same term used across traditions |
| Harmonic template matching | — | Psychoacoustics term, no Western music theory equivalent |
| Resultant bass | Resultant tone, resultant bass (organ) | Organ-specific term |

## Connections

- [Harmonic Series](harmonic-series.md) — the pattern the brain uses as a template for pitch inference
- [The Ear & Cochlea](ear-cochlea.md) — the peripheral frequency analysis that provides input to the template matcher
- [Consonance & Dissonance](consonance-dissonance.md) — harmonic template matching also drives consonance perception
- [Timbre](timbre.md) — the spectral content that provides the harmonics for pitch inference
- [Auditory Masking](auditory-masking.md) — related perceptual phenomenon where sounds can be rendered inaudible

### Suggested References

- [Overtone Series (muted.io)](https://muted.io/overtone-series/) — Toggle individual harmonics on/off to experience how the brain infers pitch from partial patterns
