import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import * as Tone from "tone";

const Piano = ({ whiteKeys, blackKeys }) => {
  const [showNoteNames, setShowNoteNames] = useState(false);
  const synth = new Tone.Synth().toDestination();

  const handlePlayNote = (note) => {
    synth.triggerAttackRelease(note, "8n");
  };

  document.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    const key = e.key;
    const natural = whiteKeys.find((note) => note.key === key);
    const sharp = blackKeys.find((note) => note.key === key);
    if (natural) {
      handlePlayNote(natural.name);
      const activeKey = document.getElementById(natural.id);
      activeKey.style.backgroundColor = "lightgray";
      document.addEventListener("keyup", (e) => {
        activeKey.style.backgroundColor = "white";
      });
    }
    if (sharp) {
      handlePlayNote(sharp.name);
      const activeKey = document.getElementById(sharp.id);
      activeKey.style.backgroundColor = "gray";
      document.addEventListener("keyup", (e) => {
        activeKey.style.backgroundColor = "black";
      });
    }
  });

  return (
    <Grid
      container
      component={Paper}
      elevation={2}
      sx={{ p: 2, backgroundColor: "gray" }}>
      <Grid container item columns={18} columnGap={1} className="white-keys">
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
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              height: 220,
            }}
            className="white-key"
            onClick={() => handlePlayNote(note.name)}>
            <Typography
              variant="caption"
              sx={{ visibility: showNoteNames ? "visible" : "hidden" }}>
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
          pl: 6,
        }}>
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
              backgroundColor: "black",
              color: "white",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              height: 160,
              px: 1,
              mr: index === 1 && 9,
            }}
            className="black-keys"
            onClick={() => handlePlayNote(note.name)}>
            <Typography
              variant="caption"
              sx={{ visibility: showNoteNames ? "visible" : "hidden" }}>
              {note.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sx={{ pt: 1 }}>
        <FormControlLabel
          control={
            <Switch
              color="success"
              onChange={() => setShowNoteNames(!showNoteNames)}
              label="Show Note Names"
            />
          }
          label="Show note names"
        />
      </Grid>
    </Grid>
  );
};

export default Piano;
