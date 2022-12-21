import React, { useState } from "react";
import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Piano from "./components/Piano";
import Sequencer from "./components/Sequencer/Sequencer";
import DrumPads from "./components/DrumPads";
import { NATURAL_NOTES, SHARP_NOTES } from "./constants/NOTES";
import { DRUM_SOUNDS } from "./constants/DRUM_SOUNDS";
import AppHeader from "./components/AppHeader";
import Theme from "./theme";
import * as Tone from "tone";

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [naturals, setNaturals] = useState(NATURAL_NOTES);
  const [sharps, setSharps] = useState(SHARP_NOTES);
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

  const handleOctaveUp = () => {
    setNaturals((prev) => {
      return prev.map((note) => {
        return {
          ...note,
          name: note.name.replace(/\d/, (n) => Number(n) + 1),
        };
      });
    });
    setSharps((prev) => {
      return prev.map((note) => {
        return {
          ...note,
          name: note.name.replace(/\d/, (n) => Number(n) + 1),
          enharmonic: note.enharmonic.replace(/\d/, (n) => Number(n) + 1),
        };
      });
    });
  };

  const handleOctaveDown = () => {
    setNaturals((prev) => {
      return prev.map((note) => {
        return {
          ...note,
          name: note.name.replace(/\d/, (n) => Number(n) - 1),
        };
      });
    });
    setSharps((prev) => {
      return prev.map((note) => {
        return {
          ...note,
          name: note.name.replace(/\d/, (n) => Number(n) - 1),
          enharmonic: note.enharmonic.replace(/\d/, (n) => Number(n) - 1),
        };
      });
    });
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container disableGutters>
        <Typography variant="h2" align="center">
          NSynth 2.0
        </Typography>
        {isMobile ? (
          <Typography variant="h6" align="center">
            This app is not optimized for mobile devices. Please use a desktop
            or laptop computer.
          </Typography>
        ) : (
          <Grid container columnGap={6}>
            <Grid item xs={12}>
              <AppHeader isOn={isOn} onStartSynth={handleStartSynth} />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ visibility: isOn ? "visible" : "hidden" }}>
                <DrumPads sounds={DRUM_SOUNDS} />
                <Piano
                  whiteKeys={naturals}
                  blackKeys={sharps}
                  onOctaveUp={handleOctaveUp}
                  onOctaveDown={handleOctaveDown}
                />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box
                sx={{
                  visibility: isOn ? "visible" : "hidden",
                }}
              >
                <Sequencer />
                <Stack
                  sx={{
                    position: "absolute",
                    bottom: 100,
                    width: 500,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2">
                    NSynth 2.0 is a web app that allows you to create music
                    using your computer keyboard. Built using React, Tone.js,
                    and Material-UI.
                  </Typography>
                  <Typography
                    variant="caption"
                    component={Link}
                    sx={{ color: "primary.dark" }}
                    href="https://github.com/akshara-sun"
                  >
                    Built by Akshara.
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
