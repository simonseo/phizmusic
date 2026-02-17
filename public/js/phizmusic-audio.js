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

  /* ---------- Single frequency playback ---------- */

  var FREQ_NOTE_DURATION = 1.0;

  async function playFreq(button) {
    var synth;
    var cleanupTimeout;

    setPlayButtonsDisabled(true);

    try {
      var freq = parseFloat(button.dataset.freq || "440");
      if (isNaN(freq) || freq <= 0) {
        throw new Error("Invalid frequency");
      }

      var duration =
        button.dataset.duration !== undefined
          ? parseFloat(button.dataset.duration)
          : FREQ_NOTE_DURATION;

      await Tone.start();

      synth = new Tone.Synth({
        oscillator: { type: "sine" },
      }).toDestination();

      var startTime = Tone.now();
      synth.triggerAttackRelease(freq, duration, startTime);

      cleanupTimeout = setTimeout(function () {
        setPlayButtonsDisabled(false);
        if (synth) {
          synth.dispose();
          synth = null;
        }
      }, Math.ceil(duration * 1000) + 200);
    } catch (error) {
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      if (synth) synth.dispose();
      setPlayButtonsDisabled(false);
      console.warn("PhizMusic freq playback failed:", error);
    }
  }

  /* ---------- Ratio playback (two tones simultaneously) ---------- */

  var RATIO_NOTE_DURATION = 1.2;
  var RATIO_GAP = 0.6;

  async function playRatio(button) {
    var synth;
    var cleanupTimeout;

    setPlayButtonsDisabled(true);

    try {
      var freq1 = parseFloat(button.dataset.freq1 || "0");
      var freq2 = parseFloat(button.dataset.freq2 || "0");
      if (isNaN(freq1) || isNaN(freq2) || freq1 <= 0 || freq2 <= 0) {
        throw new Error("Invalid ratio frequencies");
      }

      await Tone.start();

      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
      }).toDestination();

      var startTime = Tone.now();

      /* Play first tone alone */
      synth.triggerAttackRelease(freq1, RATIO_NOTE_DURATION, startTime);

      /* Play second tone alone */
      synth.triggerAttackRelease(
        freq2,
        RATIO_NOTE_DURATION,
        startTime + RATIO_NOTE_DURATION + RATIO_GAP
      );

      /* Play both together */
      var dyadStart = startTime + 2 * (RATIO_NOTE_DURATION + RATIO_GAP);
      synth.triggerAttackRelease(freq1, RATIO_NOTE_DURATION, dyadStart);
      synth.triggerAttackRelease(freq2, RATIO_NOTE_DURATION, dyadStart);

      var totalPlaybackSeconds =
        3 * RATIO_NOTE_DURATION + 2 * RATIO_GAP;

      cleanupTimeout = setTimeout(function () {
        setPlayButtonsDisabled(false);
        if (synth) {
          synth.dispose();
          synth = null;
        }
      }, Math.ceil(totalPlaybackSeconds * 1000) + 200);
    } catch (error) {
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      if (synth) synth.dispose();
      setPlayButtonsDisabled(false);
      console.warn("PhizMusic ratio playback failed:", error);
    }
  }

  /* ---------- Frequency set playback (multiple arbitrary Hz) ---------- */

  var FREQSET_NOTE_DURATION = 0.4;
  var FREQSET_NOTE_SPACING = 0.45;
  var FREQSET_CHORD_DELAY = 0.5;
  var FREQSET_CHORD_DURATION = 1.5;

  async function playFreqSet(button) {
    var synth;
    var cleanupTimeout;

    setPlayButtonsDisabled(true);

    try {
      var freqs = JSON.parse(button.dataset.freqs || "[]");
      if (!Array.isArray(freqs) || freqs.length === 0) {
        throw new Error("Invalid or empty frequency set");
      }

      var noChord = button.dataset.nochord === "true";

      await Tone.start();

      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
      }).toDestination();

      var startTime = Tone.now();
      var totalPlaybackSeconds;

      if (noChord) {
        /* Play all frequencies simultaneously (chord only, no arpeggio) */
        freqs.forEach(function (freq) {
          synth.triggerAttackRelease(freq, FREQSET_CHORD_DURATION, startTime);
        });
        totalPlaybackSeconds = FREQSET_CHORD_DURATION;
      } else {
        /* Play each frequency sequentially (arpeggio) */
        freqs.forEach(function (freq, index) {
          synth.triggerAttackRelease(
            freq,
            FREQSET_NOTE_DURATION,
            startTime + index * FREQSET_NOTE_SPACING
          );
        });

        var arpeggioEnd =
          (freqs.length - 1) * FREQSET_NOTE_SPACING + FREQSET_NOTE_DURATION;
        totalPlaybackSeconds = arpeggioEnd;

        if (freqs.length > 1) {
          var chordStart = startTime + arpeggioEnd + FREQSET_CHORD_DELAY;
          freqs.forEach(function (freq) {
            synth.triggerAttackRelease(freq, FREQSET_CHORD_DURATION, chordStart);
          });
          totalPlaybackSeconds =
            arpeggioEnd + FREQSET_CHORD_DELAY + FREQSET_CHORD_DURATION;
        }
      }

      cleanupTimeout = setTimeout(function () {
        setPlayButtonsDisabled(false);
        if (synth) {
          synth.dispose();
          synth = null;
        }
      }, Math.ceil(totalPlaybackSeconds * 1000) + 200);
    } catch (error) {
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      if (synth) synth.dispose();
      setPlayButtonsDisabled(false);
      console.warn("PhizMusic freqset playback failed:", error);
    }
  }

  /* ---------- Waveform playback (configurable oscillator type) ---------- */

  var WAVEFORM_NOTE_DURATION = 1.5;

  async function playWaveform(button) {
    var synth;
    var cleanupTimeout;

    setPlayButtonsDisabled(true);

    try {
      var freq = parseFloat(button.dataset.freq || "261.63");
      var waveform = button.dataset.waveform || "sine";
      var validWaveforms = ["sine", "sawtooth", "square", "triangle"];
      if (validWaveforms.indexOf(waveform) === -1) {
        throw new Error("Invalid waveform type: " + waveform);
      }

      await Tone.start();

      synth = new Tone.Synth({
        oscillator: { type: waveform },
        volume: waveform === "sawtooth" || waveform === "square" ? -8 : -4,
      }).toDestination();

      var startTime = Tone.now();
      synth.triggerAttackRelease(freq, WAVEFORM_NOTE_DURATION, startTime);

      cleanupTimeout = setTimeout(function () {
        setPlayButtonsDisabled(false);
        if (synth) {
          synth.dispose();
          synth = null;
        }
      }, Math.ceil(WAVEFORM_NOTE_DURATION * 1000) + 200);
    } catch (error) {
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      if (synth) synth.dispose();
      setPlayButtonsDisabled(false);
      console.warn("PhizMusic waveform playback failed:", error);
    }
  }

  /* ---------- Envelope playback (configurable ADSR) ---------- */

  var ENVELOPE_FREQ = 261.63;

  async function playEnvelope(button) {
    var synth;
    var cleanupTimeout;

    setPlayButtonsDisabled(true);

    try {
      var freq = parseFloat(button.dataset.freq || ENVELOPE_FREQ);
      var envelope = JSON.parse(
        button.dataset.envelope ||
          '{"attack":0.01,"decay":0.2,"sustain":0.5,"release":0.5}'
      );
      var holdTime = parseFloat(button.dataset.hold || "1.0");

      await Tone.start();

      synth = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: {
          attack: envelope.attack || 0.01,
          decay: envelope.decay || 0.2,
          sustain: envelope.sustain || 0.5,
          release: envelope.release || 0.5,
        },
      }).toDestination();

      var startTime = Tone.now();
      synth.triggerAttack(freq, startTime);
      synth.triggerRelease(startTime + holdTime);

      var totalDuration =
        holdTime + (envelope.release || 0.5);

      cleanupTimeout = setTimeout(function () {
        setPlayButtonsDisabled(false);
        if (synth) {
          synth.dispose();
          synth = null;
        }
      }, Math.ceil(totalDuration * 1000) + 300);
    } catch (error) {
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      if (synth) synth.dispose();
      setPlayButtonsDisabled(false);
      console.warn("PhizMusic envelope playback failed:", error);
    }
  }

  /* ---------- Chord progression playback ---------- */

  var PROGRESSION_CHORD_DURATION = 1.2;
  var PROGRESSION_CHORD_SPACING = 1.4;

  async function playProgression(button) {
    var synth;
    var cleanupTimeout;

    setPlayButtonsDisabled(true);

    try {
      var chords = JSON.parse(button.dataset.chords || "[]");
      if (!Array.isArray(chords) || chords.length === 0) {
        throw new Error("Invalid or empty chord progression");
      }

      var octave =
        button.dataset.octave !== undefined
          ? parseInt(button.dataset.octave, 10)
          : DEFAULT_OCTAVE;

      await Tone.start();

      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
      }).toDestination();

      var startTime = Tone.now();

      chords.forEach(function (chord, chordIndex) {
        var chordStart = startTime + chordIndex * PROGRESSION_CHORD_SPACING;
        var freqs = stepsToFreqs(chord, octave);
        freqs.forEach(function (freq) {
          synth.triggerAttackRelease(
            freq,
            PROGRESSION_CHORD_DURATION,
            chordStart
          );
        });
      });

      var totalPlaybackSeconds =
        (chords.length - 1) * PROGRESSION_CHORD_SPACING +
        PROGRESSION_CHORD_DURATION;

      cleanupTimeout = setTimeout(function () {
        setPlayButtonsDisabled(false);
        if (synth) {
          synth.dispose();
          synth = null;
        }
      }, Math.ceil(totalPlaybackSeconds * 1000) + 200);
    } catch (error) {
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      if (synth) synth.dispose();
      setPlayButtonsDisabled(false);
      console.warn("PhizMusic progression playback failed:", error);
    }
  }

  /* ---------- Additive synthesis playback ---------- */

  var ADDITIVE_DURATION = 2.0;

  async function playAdditive(button) {
    var oscillators = [];
    var gainNodes = [];
    var cleanupTimeout;

    setPlayButtonsDisabled(true);

    try {
      var fundamental = parseFloat(button.dataset.fundamental || "220");
      var harmonics = JSON.parse(button.dataset.harmonics || "[1]");
      if (
        !Array.isArray(harmonics) ||
        harmonics.length === 0 ||
        isNaN(fundamental)
      ) {
        throw new Error("Invalid additive synthesis parameters");
      }

      var duration = parseFloat(
        button.dataset.duration || ADDITIVE_DURATION
      );

      await Tone.start();

      /* Build additive synthesis: each harmonic is a separate oscillator */
      harmonics.forEach(function (amplitude, index) {
        if (amplitude <= 0) return;
        var harmNumber = index + 1;
        var freq = fundamental * harmNumber;

        var gain = new Tone.Gain(amplitude * 0.3).toDestination();
        var osc = new Tone.Oscillator(freq, "sine").connect(gain);
        osc.start();
        oscillators.push(osc);
        gainNodes.push(gain);
      });

      cleanupTimeout = setTimeout(function () {
        oscillators.forEach(function (osc) {
          osc.stop();
          osc.dispose();
        });
        gainNodes.forEach(function (g) {
          g.dispose();
        });
        oscillators = [];
        gainNodes = [];
        setPlayButtonsDisabled(false);
      }, Math.ceil(duration * 1000) + 200);
    } catch (error) {
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      oscillators.forEach(function (osc) {
        osc.stop();
        osc.dispose();
      });
      gainNodes.forEach(function (g) {
        g.dispose();
      });
      setPlayButtonsDisabled(false);
      console.warn("PhizMusic additive playback failed:", error);
    }
  }

  window.playStepSet = playStepSet;
  window.playScale = playScale;
  window.playHarmonic = playHarmonic;
  window.playFreq = playFreq;
  window.playRatio = playRatio;
  window.playFreqSet = playFreqSet;
  window.playWaveform = playWaveform;
  window.playEnvelope = playEnvelope;
  window.playProgression = playProgression;
  window.playAdditive = playAdditive;
})();
