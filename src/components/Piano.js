import React, { useState } from "react";
import {
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import * as Tone from "tone";
import PianoControls from "./PianoControls";

const Piano = ({ whiteKeys, blackKeys, onOctaveUp, onOctaveDown }) => {
  const [synth, setSynth] = useState({});
  const [instrument, setInstrument] = useState("");
  const [showNoteNames, setShowNoteNames] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

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
    setSynth(instrument);
    setInstrument(e.target.value);
  };

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    const natural = whiteKeys.find((note) => note.key === key);
    const sharp = blackKeys.find((note) => note.key === key);
    if (natural) {
      synth.sound.triggerAttackRelease(natural.name, "8n");
      const activeWhiteKey = document.getElementById(natural.id);
      activeWhiteKey.style.backgroundColor = "#80b9b9";
      setTimeout(() => {
        activeWhiteKey.style.backgroundColor = "#ffffff";
      }, 100);
    }
    if (sharp) {
      synth.sound.triggerAttackRelease(sharp.name, "8n");
      const activeBlackKey = document.getElementById(sharp.id);
      activeBlackKey.style.backgroundColor = "#e6ffff";
      setTimeout(() => {
        activeBlackKey.style.backgroundColor = "#000000";
      }, 100);
    }
  });

  return (
    <Grid
      container
      component={Paper}
      elevation={2}
      sx={{ px: 2, pb: 2, pt: 0, backgroundColor: "primary.base" }}
    >
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end", pb: 2 }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <TextField
            select={true}
            variant="standard"
            sx={{ backgroundColor: "primary.highlight", width: 200 }}
            label="Select a sound"
            value={instrument}
            defaultValue="guitar"
            onChange={handleChangeInstrument}
          >
            {soundBank.map((instrument) => (
              <MenuItem key={instrument.value} value={instrument.value}>
                {instrument.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid
        container
        item
        columns={18}
        columnGap={1}
        className="primary.light-keys"
      >
        {whiteKeys.map((note, index) => (
          <Grid
            id={note.id}
            key={note.id}
            component={Paper}
            item
            xs={2}
            sx={{
              "&:hover": {
                boxShadow: 10,
                cursor: "pointer",
              },
              "&:active": {
                boxShadow: 15,
              },
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              height: 220,
            }}
            className="white-keys"
            onClick={() => synth.sound.triggerAttackRelease(note.name, "8n")}
          >
            <Typography
              variant="caption"
              sx={{
                color: "primary.dark",
                pt: 1,
                visibility: showKeyboardShortcuts ? "visible" : "hidden",
              }}
            >
              {note.key}
            </Typography>
            <Typography
              variant="caption"
              sx={{ visibility: showNoteNames ? "visible" : "hidden" }}
            >
              {note.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        item
        className="black-keys"
        columns={12}
        columnGap={4}
        sx={{
          position: "absolute",
          mt: 10,
          pl: 6,
        }}
      >
        {blackKeys.map((note, index) => (
          <Grid
            id={note.id}
            key={note.id}
            component={Paper}
            item
            sx={{
              "&:hover": {
                boxShadow: 10,
                cursor: "pointer",
              },
              "&:active": {
                boxShadow: 15,
              },
              backgroundColor: "primary.main",
              color: "primary.light",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "space-between",
              height: 160,
              px: 1,
              mr: index === 1 && 9,
            }}
            className="black-keys"
            onClick={() => synth.sound.triggerAttackRelease(note.name, "8n")}
          >
            <Typography
              variant="caption"
              sx={{
                color: "primary.dark",
                pt: 1,
                visibility: showKeyboardShortcuts ? "visible" : "hidden",
              }}
            >
              {note.key}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                maxWidth: 24,
                visibility: showNoteNames ? "visible" : "hidden",
              }}
            >
              {note.name}
              {` -- `}
              {note.enharmonic}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <PianoControls
        showKeyboardShortcuts={showKeyboardShortcuts}
        showNoteNames={showNoteNames}
        onOctaveUp={onOctaveUp}
        onOctaveDown={onOctaveDown}
        onToggleKeyboardShortcuts={() =>
          setShowKeyboardShortcuts(!showKeyboardShortcuts)
        }
        onToggleNoteNames={() => setShowNoteNames(!showNoteNames)}
      />
    </Grid>
  );
};

export default Piano;
