import React, { useState } from "react";
import { Box, Container, ToggleButton, Typography } from "@mui/material";
import Piano from "../components/Piano";
import Sequencer from "../components/Sequencer/Sequencer";
import DrumPads from "../components/DrumPads";
import { NATURAL_NOTES, SHARP_NOTES } from "../constants/NOTES";
import { DRUM_SOUNDS } from "../constants/DRUM_SOUNDS";
import * as Tone from "tone";

const App = () => {
  const [isOn, setIsOn] = useState(false);

  const handleStartSynth = async () => {
    setIsOn(!isOn);
    if (isOn === false) {
      await Tone.start();
      console.log("audio is ready");
    } else {
      await Tone.Transport.stop();
      console.log("audio is off");
    }
  };

  return (
    <Container disableGutters maxWidth="sm">
      <Typography variant="h1" align="center" sx={{ my: 4 }}>
        Nsynth 2.0
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: isOn ? "flex-end" : "space-between",
          alignItems: "center",
        }}>
        {!isOn && (
          <Typography variant="h6" align="center">
            Click the button to turn on the synthesizer
          </Typography>
        )}
        <ToggleButton
          value="check"
          onClick={handleStartSynth}
          sx={{
            width: 50,
            height: 50,
            m: 1,
            backgroundColor: isOn ? "grey" : "black",
            "&:hover": {
              backgroundColor: "beige",
            },
            color: isOn ? "black" : "green",
          }}>
          {isOn ? "Off" : "On"}
        </ToggleButton>
      </Box>
      <Box sx={{ visibility: isOn ? "visible" : "hidden" }}>
        <DrumPads sounds={DRUM_SOUNDS} />
        <Piano whiteKeys={NATURAL_NOTES} blackKeys={SHARP_NOTES} />
        <Sequencer />
      </Box>
    </Container>
  );
};

export default App;
