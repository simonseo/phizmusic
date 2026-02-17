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

  window.playStepSet = playStepSet;
})();
