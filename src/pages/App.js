import React, { useState } from "react";
import { Box, Container, ToggleButton, Typography } from "@mui/material";
import Piano from "../components/Piano";
import DrumPads from "../components/DrumPads";
import { NATURAL_NOTES, SHARP_NOTES } from "../constants/NOTES";
import { DRUM_SOUNDS } from "../constants/DRUM_SOUNDS";
import * as Tone from "tone";

const App = () => {
  const [isOn, setIsOn] = useState(false);

  const handleStartSynth = async () => {
    await Tone.start();
    setIsOn(!isOn);
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
          <Typography variant="h6" align="center" sx={{ my: 4 }}>
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
            backgroundColor: isOn ? "black" : "grey",
            "&:hover": {
              backgroundColor: "beige",
            },
            color: isOn ? "green" : "black",
          }}>
          {isOn ? "On" : "Off"}
        </ToggleButton>
      </Box>
      <Box sx={{ visibility: isOn ? "visible" : "hidden" }}>
        <DrumPads sounds={DRUM_SOUNDS} isOn={isOn} />
        <Piano whiteKeys={NATURAL_NOTES} blackKeys={SHARP_NOTES} isOn={isOn} />
      </Box>
    </Container>
  );
};

export default App;
