import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import * as Tone from "tone";
import PianoControls from "./PianoControls";

const Piano = ({ whiteKeys, blackKeys, onOctaveUp, onOctaveDown }) => {
  const [showNoteNames, setShowNoteNames] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const synth = new Tone.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
  }).toDestination();

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    const natural = whiteKeys.find((note) => note.key === key);
    const sharp = blackKeys.find((note) => note.key === key);
    if (natural) {
      synth.triggerAttackRelease(natural.name, "8n");
      const activeWhiteKey = document.getElementById(natural.id);
      // change color of active key to indicate it is being played
      activeWhiteKey.style.backgroundColor = "#80b9b9";
      // change color back to original after 100ms
      setTimeout(() => {
        activeWhiteKey.style.backgroundColor = "#ffffff";
      }, 100);
    }
    if (sharp) {
      synth.triggerAttackRelease(sharp.name, "8n");
      const activeBlackKey = document.getElementById(sharp.id);
      // change color of active key to indicate it is being played
      activeBlackKey.style.backgroundColor = "#e6ffff";
      // change color back to original after 100ms
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
      sx={{ p: 2, backgroundColor: "primary.base" }}
    >
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
            onClick={() => synth.triggerAttackRelease(note.name, "8n")}
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
            onClick={() => synth.triggerAttackRelease(note.name, "8n")}
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
