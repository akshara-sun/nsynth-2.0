import React, { useState } from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
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
    <Container disableGutters>
      <Typography variant="h1" align="center" sx={{ my: 4 }}>
        Nsynth 2.0
      </Typography>
      {isMobile ? (
        <Typography variant="h6" align="center">
          This app is not optimized for mobile devices. Please use a desktop or
          laptop computer.
        </Typography>
      ) : (
        <Grid container columns={16} columnGap={6}>
          <Grid item xs={16}>
            <AppHeader isOn={isOn} onStartSynth={handleStartSynth} />
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ visibility: isOn ? "visible" : "hidden" }}>
              <DrumPads sounds={DRUM_SOUNDS} />
              <Piano whiteKeys={NATURAL_NOTES} blackKeys={SHARP_NOTES} />
            </Box>
          </Grid>
          <Grid
            item
            xs={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <Box sx={{ visibility: isOn ? "visible" : "hidden" }}>
              <Sequencer />
            </Box>
            <Typography variant="body2">
              NSynth 2.0 is a web-based synthesizer and sequencer that uses the
              Tone.js library.
            </Typography>
            <Typography
              variant="caption"
              component={Link}
              href="https://github.com/akshara-sun">
              Built by Akshara.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default App;
