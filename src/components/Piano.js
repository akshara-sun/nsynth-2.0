import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import * as Tone from "tone";
import PianoControls from "./PianoControls";

const Piano = ({ whiteKeys, blackKeys }) => {
  const [showNoteNames, setShowNoteNames] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const synth = new Tone.Synth().toDestination();

  document.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    const key = e.key;
    const natural = whiteKeys.find((note) => note.key === key);
    const sharp = blackKeys.find((note) => note.key === key);
    if (natural) {
      synth.triggerAttackRelease(natural.name, "8n");
      const activeKey = document.getElementById(natural.id);
      activeKey.style.backgroundColor = "lightgray";
      document.addEventListener("keyup", (e) => {
        activeKey.style.backgroundColor = "white";
      });
    }
    if (sharp) {
      synth.triggerAttackRelease(sharp.name, "8n");
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
            onClick={() => synth.triggerAttackRelease(note.name, "8n")}>
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
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "space-between",
              height: 160,
              px: 1,
              mr: index === 1 && 9,
            }}
            className="black-keys"
            onClick={() => synth.triggerAttackRelease(note.name, "8n")}>
            <Typography
              variant="caption"
              sx={{
                color: "yellow",
                pt: 1,
                visibility: showKeyboardShortcuts ? "visible" : "hidden",
              }}>
              {note.key}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                maxWidth: 24,
                visibility: showNoteNames ? "visible" : "hidden",
              }}>
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
        onToggleKeyboardShortcuts={() =>
          setShowKeyboardShortcuts(!showKeyboardShortcuts)
        }
        onToggleNoteNames={() => setShowNoteNames(!showNoteNames)}
      />
    </Grid>
  );
};

export default Piano;
