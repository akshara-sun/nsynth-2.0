import React from "react";
import { Box, ToggleButton, Typography } from "@mui/material";

const AppHeader = ({ isOn, onStartSynth }) => {
  return (
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
        onClick={onStartSynth}
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
  );
};

export default AppHeader;
