---
title: ROADMAP (Phase 2+ Vision)
aliases: [future, phase 2, interactive roadmap]
tier: 2
tags: [roadmap, vision, interactive, future]
prerequisites: [README.md]
related: [notation-layer.md, chord-progressions.md, timbre.md, digital-audio.md, auditory-masking.md, equal-loudness.md]
scope-boundary: Vision and exploration only. Not a committed architecture, delivery plan, or timeline.
---

# ROADMAP (Phase 2+ Vision)

This document captures forward-looking possibilities for PhizMusic interactive tooling while the context is fresh. It is intentionally exploratory: directions, trade-offs, and unknowns. It is **not** a commitment to any one implementation path.

> 🎯 **Simple version**: This is an ideas page for what we might build next (interactive visualizers, composition tools, plugins). Nothing here is a promise yet.

## Why Phase 2 Exists

Phase 1 proved the conceptual layer in markdown. Phase 2 explores how to make those concepts playable, visual, and learn-by-doing while preserving physics-literal language.

Primary goals:

- Make abstract concepts audible and manipulable
- Keep notation centered on chromatic grid logic
- Bridge learning pages and creative workflows

## Direction A: Chapter-Linked Web Visualizer/Player

## User experience

Each concept page gets a lightweight interactive companion (embedded or linked): spectrum demos, interval listeners, progression path explorers, and masking/loudness simulators.

## Feasibility sketch

- Rendering/UI: HTML Canvas or SVG
- Audio engine: Web Audio API, optionally Tone.js wrapper
- Data model: JSON descriptions of step-combos, ratio-sets, and envelope curves

## Integration model

- Start as links from wiki pages
- Later embed if wiki hosting supports script bundling safely

## Open questions

- Should interactivity live in this repo or a separate app repo?
- What is the minimal runtime footprint for low-end devices?
- How do we version interactive behavior alongside wiki text?

## Rough effort

Weekend-to-few-weeks per demo family, depending on polish and testing.

## Direction B: Web-Based Composition Tool (PhizMusic Notation Native)

## User experience

A browser-based editor using chromatic grid notation directly: create notes, audition instantly, inspect step-combo and ratio-set interpretation, export MIDI/audio.

## Feasibility sketch

- Sequencer grid: custom canvas timeline
- Playback: Web Audio API + scheduling layer
- File interchange: MIDI export/import, JSON project format

## Integration model

- Separate app with deep links from wiki examples
- Optional "Open this example in editor" button on concept pages

## Open questions

- How much DAW behavior is necessary before tool complexity explodes?
- Should tuning overlay (cent offsets) be v1 or v2?
- How should collaborative/sharing workflows work?

## Rough effort

Multi-month for a robust composer (core editing, playback, persistence, export).

## Direction C: MIDI/DAW Plugin (VST/AU/CLAP Companion)

## User experience

Inside existing DAWs, users see PhizMusic-native labels and analysis overlays: step-number lanes, ratio-set chord readouts, pulse-fraction rhythm display, progression movement metrics.

## Feasibility sketch

- Plugin framework: JUCE or equivalent cross-format toolchain
- Data interfaces: MIDI note streams + host tempo/transport API
- Display layer: host UI with configurable overlays

## Integration model

- Independent plugin product
- Wiki examples map to plugin presets/analysis templates

## Open questions

- Which host DAWs to support first?
- Is read-only analysis enough for first release?
- How do we keep vocabulary synchronization with wiki updates?

## Rough effort

Multi-month to long-term, especially for cross-platform QA and host compatibility.

## Direction D: Standalone PhizMusic Environment

## User experience

Single environment combining notation, playback, analysis, and guided learning in one interface, fully native to PhizMusic terminology.

## Feasibility sketch

- Desktop app (Electron/Tauri/native) or full web platform
- Shared engine for synthesis, analysis, and tutorial interactions

## Integration model

- Could become the central experience and consume wiki content as structured modules

## Open questions

- Should this be built only after lightweight tools validate demand?
- What is the smallest lovable product boundary?

## Rough effort

Long-term program, likely staged releases.

## Direction E: Hybrid Incremental Path

Recommended exploration order without committing architecture:

1. Build 2-4 chapter-linked interactives first
2. Reuse core data model across demos
3. If usage validates, evolve into editor or plugin pathways

This gives high learning value early with lower platform risk.

## Minimum Interactive Feature Inventory

Collected from `<!-- INTERACTIVE: ... -->` placeholders in current wiki pages:

1. `wiki/sound-waves.md` — Oscilloscope with frequency/amplitude controls
2. `wiki/sound-waves.md` — Spectrum analyzer for complex tone decomposition
3. `wiki/ear-cochlea.md` — Basilar membrane frequency-decomposition animation
4. `wiki/fourier-analysis.md` — Additive synthesis with harmonics 1-16 sliders
5. `wiki/harmonic-series.md` — Harmonic series visualizer with partial toggles
6. `wiki/chords.md` — Chord explorer (grid select, hear, ratio-set display)
7. `wiki/twelve-tet.md` — Just intonation vs 12-TET comparison player
8. `wiki/consonance-dissonance.md` — Dissonance curve explorer with spectrum cues
9. `wiki/missing-fundamental.md` — Missing-fundamental demo with harmonic removal slider
10. `wiki/notation-layer.md` — Notation view toggle (staff/Dodeka/piano-roll) with transposition slider
11. `wiki/chord-progressions.md` — Progression trajectory visualizer with movement metric
12. `wiki/timbre.md` — Timbre lab (envelope + attack morph)
13. `wiki/instrument-physics.md` — Source archetype spectrum explorer
14. `wiki/adsr-envelope.md` — ADSR sketchpad with source models
15. `wiki/digital-audio.md` — Sampling/aliasing simulator
16. `wiki/auditory-masking.md` — Frequency masking audibility demo
17. `wiki/equal-loudness.md` — Equal-loudness contour overlay explorer

## Candidate Tooling Stack (Feasibility Notes)

- **Web Audio API**: direct browser audio graph and timing primitives
- **Tone.js**: higher-level scheduling/synthesis convenience layer
- **WebMIDI API**: browser MIDI I/O for controller integration
- **VexFlow**: optional rendering bridge if conventional notation views are needed
- **Custom grid renderer**: likely required for PhizMusic-native chromatic layout
- **Dodeka reference**: conceptual alignment and terminology inspiration, not proprietary asset reuse

## Repository Strategy Question

Two viable options:

- **Monorepo extension**: keep wiki + interactives together for shared versioning
- **Separate app repo**: isolate build complexity and deployment pipelines

No commitment yet. Decision should follow first prototype constraints (bundle size, hosting, deployment, contributor workflow).

## Deferred Content Pages (Category C Candidates)

Potential future pages beyond current Tier 1/2 scope:

- `polyrhythm-world.md`
- `throat-singing-harmonics.md`
- `maqam.md`
- `raga.md`
- `gamelan.md`
- `digital-filtering.md`
- `dynamic-compression.md`
- `convolution-reverb.md`
- `fm-synthesis.md`
- `dithering.md`
- `stereo-imaging.md`
- `voice-leading.md`
- `metric-modulation.md`
- `groove-swing.md`

These remain explicitly deferred so Phase 1 stays focused.

## Translation Table

| PhizMusic phrasing | Conventional product phrasing | Notes |
|--------------------|-------------------------------|-------|
| Chapter-linked interactive companion | Embedded educational widget | Lightweight, page-scoped |
| Chromatic grid composition environment | Piano-roll editor | PhizMusic-native labeling and logic |
| Step/ratio analysis overlay | Harmony assistant plugin | Readability-first, not prescriptive |
| Pulse-fraction timeline | Beat/grid sequencer | Same timing core with different vocabulary |

## Connections

- [README](README.md) — project principles and learner framing that Phase 2 must preserve
- [Notation Layer](notation-layer.md) — core visual language for future tools
- [Chord Progressions](chord-progressions.md) — progression metrics ideal for interactive analysis
- [Timbre](timbre.md) — perceptual/source coupling demos are high-value interactives
- [Digital Audio](digital-audio.md) — technical base for playback/recording features
- [Auditory Masking](auditory-masking.md) — direct psychoacoustic demo opportunity
- [Equal Loudness](equal-loudness.md) — high-impact perception visualization candidate
