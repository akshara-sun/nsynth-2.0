import React, { useState } from "react";
import { Box, Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import * as Tone from "tone";
import MainControls from "./MainControls";

const Sequencer = () => {
  const [selectedSounds, setSelectedSounds] = useState(() => []);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);

  const sequencerSounds = [
    {
      id: 1,
      name: "Duo",
      synth: new Tone.DuoSynth().toDestination(),
      notes: ["C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3"],
    },
    {
      id: 2,
      name: "Mono",
      synth: new Tone.MonoSynth().toDestination(),
      notes: ["D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4"],
    },
    {
      id: 3,
      name: "Membrane",
      synth: new Tone.MembraneSynth().toDestination(),
      notes: ["B0", "C1", "D1", "E1", "F1", "G1", "A1", "B1"],
    },
    {
      id: 4,
      name: "FMSynth",
      synth: new Tone.FMSynth().toDestination(),
      notes: ["E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"],
    },
  ];

  const handleSoundSelection = (event, newSounds) => {
    setSelectedSounds(newSounds);
  };

  const handlePlaySequence = () => {
    Tone.Transport.bpm.value = tempo;
    setIsPlaying(true);
    sequencerSounds.forEach((sound) => {
      const sequence = new Tone.Sequence((time, note) => {
        if (sound.notes.includes(note)) {
          sound.synth.triggerAttackRelease(note, "8n", time);
        }
      }, selectedSounds).start(0);
      sequence.loop = true;
    });
    Tone.Transport.start();
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
          onPlay={handlePlaySequence}
          onPause={handlePauseSequence}
          onStop={handleStopSequence}
          onBPMChange={(e, newTempo) => setTempo(newTempo)}
        />
      </Grid>
      <Grid item xs={12}>
        {sequencerSounds.map((sound) => (
          <Box key={sound.id}>
            <ToggleButtonGroup
              size="large"
              value={selectedSounds}
              onChange={handleSoundSelection}>
              {sound.notes.map((note) => (
                <ToggleButton
                  disableRipple={true}
                  key={note}
                  value={note}
                  sx={{
                    height: 75,
                    width: 75,
                  }}
                />
              ))}
            </ToggleButtonGroup>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default Sequencer;
