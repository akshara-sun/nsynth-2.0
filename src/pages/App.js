import React from "react";
import { Container, Typography } from "@mui/material";
import Piano from "../components/Piano";
import DrumMachine from "../components/DrumMachine";
import Controls from "../components/Controls";
import { NATURAL_NOTES, SHARP_NOTES } from "../constants/NOTES";
import { DRUM_SOUNDS } from "../constants/DRUM_SOUNDS";

const App = () => {
  return (
    <Container disableGutters maxWidth="sm">
      <Typography variant="h1" align="center" sx={{ my: 4 }}>
        Nsynth 2.0
      </Typography>
      <Controls />
      <DrumMachine sounds={DRUM_SOUNDS} />
      <Piano whiteKeys={NATURAL_NOTES} blackKeys={SHARP_NOTES} />
    </Container>
  );
};

export default App;
