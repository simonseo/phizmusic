/*
 * PhizMusic audio playback helpers for converting step-numbers to frequencies
 * and playing arpeggio-then-chord sequences with Tone.js.
 */
(function () {
  var DEFAULT_OCTAVE = 4;
  var ARPEGGIO_NOTE_DURATION = 0.4;
  var ARPEGGIO_NOTE_SPACING = 0.5;
  var CHORD_DELAY_AFTER_ARPEGGIO = 0.5;
  var CHORD_DURATION = 1.5;
  var PLAY_BUTTON_SELECTOR = ".phiz-play-btn";

  function stepToFreq(step, octave) {
    var targetOctave = octave === undefined ? DEFAULT_OCTAVE : octave;
    var midi = (targetOctave + 1) * 12 + step;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function stepsToFreqs(steps, octave) {
    var targetOctave = octave === undefined ? DEFAULT_OCTAVE : octave;
    return steps.map(function (step) {
      return stepToFreq(step, targetOctave);
    });
  }

  function setPlayButtonsDisabled(disabled) {
    var buttons = document.querySelectorAll(PLAY_BUTTON_SELECTOR);
    buttons.forEach(function (playButton) {
      playButton.disabled = disabled;
    });
  }

  async function playStepSet(button) {
    var synth;
    var cleanupTimeout;

    setPlayButtonsDisabled(true);

    try {
      var steps = JSON.parse(button.dataset.steps || "[]");
      if (!Array.isArray(steps) || steps.length === 0) {
        throw new Error("Invalid or empty step set");
      }

      var freqs = stepsToFreqs(steps, DEFAULT_OCTAVE);

      await Tone.start();

      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
      }).toDestination();

      var startTime = Tone.now();

      freqs.forEach(function (freq, index) {
        synth.triggerAttackRelease(
          freq,
          ARPEGGIO_NOTE_DURATION,
          startTime + index * ARPEGGIO_NOTE_SPACING
        );
      });

      var arpeggioEndTime =
        (freqs.length - 1) * ARPEGGIO_NOTE_SPACING + ARPEGGIO_NOTE_DURATION;
      var chordStartTime =
        startTime + arpeggioEndTime + CHORD_DELAY_AFTER_ARPEGGIO;

      freqs.forEach(function (freq) {
        synth.triggerAttackRelease(freq, CHORD_DURATION, chordStartTime);
      });

      var totalPlaybackSeconds =
        arpeggioEndTime + CHORD_DELAY_AFTER_ARPEGGIO + CHORD_DURATION;

      cleanupTimeout = setTimeout(function () {
        setPlayButtonsDisabled(false);
        if (synth) {
          synth.dispose();
          synth = null;
        }
      }, Math.ceil(totalPlaybackSeconds * 1000) + 100);
    } catch (error) {
      if (cleanupTimeout) {
        clearTimeout(cleanupTimeout);
      }
      if (synth) {
        synth.dispose();
      }
      setPlayButtonsDisabled(false);
      console.warn("PhizMusic playback failed:", error);
    }
  }

  /* ---------- Scale playback (sequential ascending, no chord) ---------- */

  var SCALE_NOTE_DURATION = 0.35;
  var SCALE_NOTE_SPACING = 0.38;

  async function playScale(button) {
    var synth;
    var cleanupTimeout;

    setPlayButtonsDisabled(true);

    try {
      var steps = JSON.parse(button.dataset.steps || "[]");
      if (!Array.isArray(steps) || steps.length === 0) {
        throw new Error("Invalid or empty step set");
      }

      var octave =
        button.dataset.octave !== undefined
          ? parseInt(button.dataset.octave, 10)
          : DEFAULT_OCTAVE;
      var freqs = stepsToFreqs(steps, octave);

      await Tone.start();

      synth = new Tone.Synth({
        oscillator: { type: "sine" },
      }).toDestination();

      var startTime = Tone.now();

      freqs.forEach(function (freq, index) {
        synth.triggerAttackRelease(
          freq,
          SCALE_NOTE_DURATION,
          startTime + index * SCALE_NOTE_SPACING
        );
      });

      var totalPlaybackSeconds =
        (freqs.length - 1) * SCALE_NOTE_SPACING + SCALE_NOTE_DURATION;

      cleanupTimeout = setTimeout(function () {
        setPlayButtonsDisabled(false);
        if (synth) {
          synth.dispose();
          synth = null;
        }
      }, Math.ceil(totalPlaybackSeconds * 1000) + 100);
    } catch (error) {
      if (cleanupTimeout) {
        clearTimeout(cleanupTimeout);
      }
      if (synth) {
        synth.dispose();
      }
      setPlayButtonsDisabled(false);
      console.warn("PhizMusic scale playback failed:", error);
    }
  }

  /* ---------- Harmonic series playback (frequency-based) ---------- */

  var HARMONIC_NOTE_DURATION = 0.5;
  var HARMONIC_NOTE_SPACING = 0.55;

  async function playHarmonic(button) {
    var synth;
    var cleanupTimeout;

    setPlayButtonsDisabled(true);

    try {
      var fundamental = parseFloat(button.dataset.fundamental || "100");
      var harmonicNumber = parseInt(button.dataset.harmonic || "1", 10);
      if (isNaN(fundamental) || isNaN(harmonicNumber) || harmonicNumber < 1) {
        throw new Error("Invalid harmonic parameters");
      }

      var freqFundamental = fundamental;
      var freqHarmonic = fundamental * harmonicNumber;

      await Tone.start();

      synth = new Tone.Synth({
        oscillator: { type: "sine" },
      }).toDestination();

      var startTime = Tone.now();

      synth.triggerAttackRelease(
        freqFundamental,
        HARMONIC_NOTE_DURATION,
        startTime
      );
      synth.triggerAttackRelease(
        freqHarmonic,
        HARMONIC_NOTE_DURATION,
        startTime + HARMONIC_NOTE_SPACING
      );

      var totalPlaybackSeconds = HARMONIC_NOTE_SPACING + HARMONIC_NOTE_DURATION;

      cleanupTimeout = setTimeout(function () {
        setPlayButtonsDisabled(false);
        if (synth) {
          synth.dispose();
          synth = null;
        }
      }, Math.ceil(totalPlaybackSeconds * 1000) + 100);
    } catch (error) {
      if (cleanupTimeout) {
        clearTimeout(cleanupTimeout);
      }
      if (synth) {
        synth.dispose();
      }
      setPlayButtonsDisabled(false);
      console.warn("PhizMusic harmonic playback failed:", error);
    }
  }

  window.playStepSet = playStepSet;
  window.playScale = playScale;
  window.playHarmonic = playHarmonic;
})();
