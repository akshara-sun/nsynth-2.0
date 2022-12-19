import React, { useState } from "react";
import { Box, Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import * as Tone from "tone";
import MainControls from "./MainControls";

const availableSounds = [
  {
    id: 1,
    notes: ["C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3"],
  },
  {
    id: 2,
    notes: ["D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4"],
  },
  {
    id: 3,
    notes: ["B0", "C1", "D1", "E1", "F1", "G1", "A1", "B1"],
  },
  {
    id: 4,
    notes: ["E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"],
  },
];

const Sequencer = () => {
  // keeps track of user selection
  const [sounds, setSounds] = useState(() => []);
  // playing state  of sequencer
  const [isPlaying, setIsPlaying] = useState(false);
  // tempo of sequencer
  const [tempo, setTempo] = useState(120);
  // keeps track of which sounds are selected per beat
  const [selectedSoundsPerBeat, setSelectedSoundsPerBeat] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const beats = [0, 1, 2, 3, 4, 5, 6, 7];

  const handleSoundSelection = (e, newSounds) => {
    setSounds(newSounds);
    newSounds.forEach((note) => {
      availableSounds.forEach((sound) => {
        if (sound.notes.includes(note)) {
          const noteIndex = sound.notes.indexOf(note);
          const newSelectedSoundsPerBeat = [...selectedSoundsPerBeat];
          if (!newSelectedSoundsPerBeat[noteIndex].includes(note)) {
            newSelectedSoundsPerBeat[noteIndex].push(note);
          } else {
            newSelectedSoundsPerBeat[noteIndex] = newSelectedSoundsPerBeat[
              noteIndex
            ].filter((sound) => sound !== note);
          }
          setSelectedSoundsPerBeat(newSelectedSoundsPerBeat);
        }
      });
    });
  };

  const handlePlaySequence = () => {
    setIsPlaying(true);
    Tone.Transport.bpm.value = tempo;
    const sequence = new Tone.Sequence(
      (time, beat) => {
        selectedSoundsPerBeat[beat].forEach((sound) => {
          const synth = new Tone.PolySynth().toDestination();
          synth.set({ detune: -1200 });
          synth.triggerAttackRelease(sound, "8n", time);
        });
      },
      beats,
      "8n"
    );
    sequence.start();
    Tone.Transport.start();
  };

  const handleClearSequenceSelection = () => {
    setSounds([]);
    setSelectedSoundsPerBeat([[], [], [], [], [], [], [], []]);
  };

  const handlePauseSequence = () => {
    setIsPlaying(false);
    Tone.Transport.pause();
  };

  const handleStopSequence = () => {
    setIsPlaying(false);
    Tone.Transport.stop();
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <MainControls
          BPM={tempo}
          isPlaying={isPlaying}
          onClear={handleClearSequenceSelection}
          onPlay={handlePlaySequence}
          onPause={handlePauseSequence}
          onStop={handleStopSequence}
          onBPMChange={(e, newTempo) => setTempo(newTempo)}
        />
      </Grid>
      <Grid item xs={12}>
        {
          // each ToggleButtonGroup is a row of notes
          // rIndex is the row index
          availableSounds.map((sound, rIndex) => (
            <Box key={rIndex}>
              <ToggleButtonGroup value={sounds} onChange={handleSoundSelection}>
                {
                  // each button represents a note
                  // cIndex is the column index
                  sound.notes.map((note, cIndex) => (
                    <ToggleButton
                      disableRipple={true}
                      key={cIndex}
                      value={note}
                      sx={{
                        height: 65,
                        width: 65,
                        "&.Mui-selected": {
                          backgroundColor: "primary.dark",
                          borderColor: "primary.light",
                        },
                      }}
                    />
                  ))
                }
              </ToggleButtonGroup>
            </Box>
          ))
        }
      </Grid>
    </Grid>
  );
};

export default Sequencer;
