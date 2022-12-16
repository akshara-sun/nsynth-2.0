import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Piano from "../components/Piano";
import Sequencer from "../components/Sequencer/Sequencer";
import DrumPads from "../components/DrumPads";
import { NATURAL_NOTES, SHARP_NOTES } from "../constants/NOTES";
import { DRUM_SOUNDS } from "../constants/DRUM_SOUNDS";
import AppHeader from "./AppHeader";

import * as Tone from "tone";

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleStartSynth = async () => {
    setIsOn(!isOn);
    if (isOn === false) {
      await Tone.start();
      console.log("audio is ready");
    } else {
      Tone.Transport.stop();
      console.log("audio is off");
    }
  };

  return (
    <Container disableGutters maxWidth="sm">
      <Typography variant="h1" align="center" sx={{ my: 4 }}>
        Nsynth 2.0
      </Typography>
      {isMobile ? (
        <Typography variant="h6" align="center">
          This app is not optimized for mobile devices. Please use a desktop or
          laptop computer.
        </Typography>
      ) : (
        <>
          <AppHeader isOn={isOn} onStartSynth={handleStartSynth} />
          <Box sx={{ visibility: isOn ? "visible" : "hidden" }}>
            <DrumPads sounds={DRUM_SOUNDS} />
            <Piano whiteKeys={NATURAL_NOTES} blackKeys={SHARP_NOTES} />
            <Sequencer />
          </Box>
        </>
      )}
    </Container>
  );
};

export default App;
