---
title: ADSR Envelope
aliases: [envelope, attack decay sustain release, amplitude shape]
tier: 2
tags: [time-domain, timbre, dynamics]
prerequisites: [sound-waves.md, timbre.md, rhythm.md]
related: [sound-waves.md, timbre.md, rhythm.md, digital-audio.md, instrument-physics.md]
scope-boundary: Envelope concept and instrument profiles only. No synthesizer patch design or dynamic processor tutorials.
---

# ADSR Envelope

ADSR is the time-profile of amplitude for a note event: **Attack, Decay, Sustain, Release**. While pitch tells you where a sound sits on the frequency axis, ADSR tells you how energy evolves over time, which is equally important for source identity.

> 🎯 **Simple version**: Every note has a shape over time: how fast it starts (attack), how it settles (decay), how long it holds (sustain), and how it fades (release). This shape helps your brain recognize the instrument.

## The Four Phases

## Attack

Time from note onset to peak amplitude.

- Short attack: percussive, sharp onset
- Long attack: soft onset, gradual emergence

## Decay

Time from peak amplitude down to the sustain level.

- Large decay drop: strong transient followed by softer body
- Small decay drop: near-flat continuation after onset

## Sustain

The quasi-steady amplitude while energy input continues (or while the note is held in a controlled source).

- For self-decaying sources, sustain may be effectively absent
- For continuously driven sources, sustain can be long and stable

## Release

Time from note-off (or energy cutoff) back to near-silence.

- Short release: abrupt stop
- Long release: trailing tail, space impression

## Visual Model

```text
Amplitude
  ^
  |        /\
  |       /  \____
  |      /         \________
  +---------------------------------> Time
        A   D    S        R
```

This is an abstraction, but it captures the dominant envelope control points used in instrument analysis and synthesis.

## Instrument Examples

## Piano (struck string)

- Attack: very fast
- Decay: immediate and significant
- Sustain: no true driven sustain (amplitude keeps decaying after hammer strike)
- Release: depends on damping pedal and string resonance

Perceptual result: strong onset identity, then rapid energy loss.

## Organ (airflow maintained)

- Attack: near-instant (can vary with stop design)
- Decay: minimal
- Sustain: effectively indefinite while key and airflow remain active
- Release: often quick, sometimes with room tail

Perceptual result: stable plateau tone.

## Bowed violin (continuously driven string)

- Attack: controllable, often slower than piano
- Decay: small if bow force is sustained
- Sustain: long as long as bow input continues
- Release: variable with bow lift and room response

Perceptual result: highly expressive onset and continuous dynamic shaping.

## Snare drum (membrane impact)

- Attack: extremely fast
- Decay: fast burst with noisy tail
- Sustain: none
- Release: natural shell/rattle decay only

Perceptual result: transient-dominant event used for timing salience.

## Why Attack Matters Disproportionately

Psychoacoustic studies and common listening tests show that removing onset transients severely reduces instrument identifiability. The auditory system uses early-time cues (first tens of milliseconds) for rapid source classification.

So timbre recognition is not only spectral; it is spectro-temporal.

## Engineering Bridge

ADSR is a foundational control in audio tools:

- Synthesizers expose envelope generators for amplitude and filter control
- Sample instruments shape attack/release to emulate source classes
- Mixing decisions often target envelope regions (for example preserving attack while controlling sustain)

This is where source physics and production practice meet.

<!-- INTERACTIVE: Envelope sketchpad — adjust A, D, S, R sliders and audition one fixed pitch through multiple source models (piano-like, organ-like, bowed-string-like, drum-like) -->

## Translation Table

| PhizMusic | Western | Notes |
|-----------|---------|-------|
| Attack phase | Attack | Same term |
| Decay phase | Decay | Same term |
| Sustain level | Sustain | Same term |
| Release phase | Release | Same term |
| Amplitude envelope | Envelope contour | Audio engineering equivalent |

## Connections

- [Sound Waves](sound-waves.md) — amplitude as the quantity being shaped over time
- [Timbre](timbre.md) — envelope is a major component of timbre identity
- [Rhythm](rhythm.md) — envelope determines how events articulate within pulse structure
- [Instrument Physics](instrument-physics.md) — source mechanism constrains typical envelope forms
- [Digital Audio](digital-audio.md) — envelope representation and manipulation in DAW workflows
