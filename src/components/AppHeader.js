import React from "react";
import { Box, ToggleButton, Typography } from "@mui/material";

const AppHeader = ({ isOn, onStartSynth }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isOn ? "flex-end" : "center",
        alignItems: "center",
      }}
    >
      {!isOn && (
        <Typography variant="h6" sx={{ pr: 2 }}>
          Click to turn on the synth.
        </Typography>
      )}
      <ToggleButton
        value="check"
        onClick={onStartSynth}
        sx={{
          m: 1,
          backgroundColor: isOn ? "primary.error" : "primary.success",
          "&:hover": {
            backgroundColor: "primary.buttonHover",
          },
          color: "primary.main",
        }}
      >
        {isOn ? "Off" : "On"}
      </ToggleButton>
    </Box>
  );
};

export default AppHeader;
