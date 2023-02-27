import React, { useState } from "react";
import { Box, FormControl, MenuItem, TextField } from "@mui/material";
import * as Tone from "tone";

const InstrumentBank = ({ onSynthSelect, onPlay }) => {
  const [instrument, setInstrument] = useState("");

  const soundBank = [
    {
      value: "synth",
      name: "Synth",
      sound: new Tone.Synth().toDestination(),
    },
    {
      value: "piano",
      name: "Piano",
      sound: new Tone.Sampler({
        urls: {
          A1: "A1.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/salamander/",
      }).toDestination(),
    },
    {
      value: "bell",
      name: "Bell",
      sound: new Tone.Sampler({
        urls: {
          A1: "A1.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/casio/",
      }).toDestination(),
    },
  ];

  const handleChangeInstrument = (e) => {
    const instrument = soundBank.find(
      (instrument) => instrument.value === e.target.value
    );
    onSynthSelect(instrument);
    setInstrument(e.target.value);
    onPlay(true);
  };

  return (
    <Box>
      <FormControl
        sx={{
          p: 2,
        }}
        size="small">
        <TextField
          select={true}
          variant="standard"
          sx={{
            flexWrap: "wrap",
            width: 200,
          }}
          label="Select a piano sound"
          value={instrument}
          defaultValue="guitar"
          onChange={handleChangeInstrument}>
          {soundBank.map((sound) => (
            <MenuItem key={sound.value} value={sound.value}>
              {sound.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  );
};

export default InstrumentBank;
