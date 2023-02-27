import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import PianoControls from "./PianoControls";

const Piano = ({
  isPlayable,
  synth,
  whiteKeys,
  blackKeys,
  onOctaveUp,
  onOctaveDown,
}) => {
  // show note and keyboard shortcuts
  const [showNoteNames, setShowNoteNames] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [notePlayed, setNotePlayed] = useState("");

  // play note function
  const handlePlayNote = (note) => {
    synth.sound.triggerAttackRelease(note.name, "8n");
    const activeKey = document.getElementById(note.id);
    activeKey.style.backgroundColor = "#80b9b9";
    setNotePlayed(note.name);
    setTimeout(() => {
      activeKey.style.backgroundColor = "#ffffff";
    }, 100);
    setTimeout(() => {
      setNotePlayed("");
    }, 1000);
  };

  // use keyboard to play notes
  document.addEventListener("keydown", (e) => {
    const key = e.key;
    const natural = whiteKeys.find((note) => note.key === key);
    const sharp = blackKeys.find((note) => note.key === key);
    if (natural) {
      handlePlayNote(natural);
    }
    if (sharp) {
      handlePlayNote(sharp);
    }
  });

  return (
    <Grid
      container
      component={Paper}
      elevation={2}
      sx={{
        px: 2,
        pb: 2,
        pt: 0,
        backgroundColor: "primary.base",
      }}>
      <Grid
        item
        xs={12}
        sx={{
          textAlign: "center",
          py: 2,
          my: 2,
          border: 1,
          borderColor: "primary.flash",
          borderRadius: 1,
        }}>
        <Typography
          variant="body1"
          sx={{
            color: "primary.flash",
          }}>
          {notePlayed ? notePlayed : "Play a note!"}
        </Typography>
      </Grid>
      <Grid
        container
        item
        columns={18}
        columnGap={1}
        className="primary.light-keys"
        sx={{
          flexWrap: "nowrap",
          position: "relative",
        }}>
        {whiteKeys.map((note) => (
          <Grid
            id={note.id}
            key={note.id}
            component={Paper}
            item
            xs={2}
            sx={{
              "&:hover": {
                boxShadow: 10,
                cursor: isPlayable ? "pointer" : "not-allowed",
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
            onClick={() => handlePlayNote(note)}>
            <Typography
              variant="caption"
              sx={{
                color: "primary.dark",
                pt: 1,
                visibility: showKeyboardShortcuts ? "visible" : "hidden",
              }}>
              {note.key}
            </Typography>
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
        columns={8}
        columnGap={4}
        sx={{
          zIndex: 1,
          position: "absolute",
          mt: 11,
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
                cursor: isPlayable ? "pointer" : "not-allowed",
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
            onClick={() => handlePlayNote(note)}>
            <Typography
              variant="caption"
              sx={{
                color: "primary.dark",
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
