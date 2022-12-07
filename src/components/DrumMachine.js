import React, { useState } from "react";
import { ToggleButton, Grid, ToggleButtonGroup } from "@mui/material";

const DrumMachine = ({ sounds }) => {
  const [selectedSounds, setSelectedSounds] = useState([]);

  const handleSelectSound = (e, sound) => {
    setSelectedSounds(sound);
  };

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      {sounds.map((sound) => (
        <Grid key={sound.id} item xs={3} sx={{ backgroundColor: "black" }}>
          <ToggleButtonGroup
            size="large"
            value={selectedSounds}
            onChange={handleSelectSound}>
            <ToggleButton
              fullWidth={true}
              value={sound.name}
              sx={{
                height: 100,
                width: 100,
                p: 4,
                m: 2,
                color: "white",
                border: "1px solid white",
                "&.Mui-selected": {
                  backgroundColor: "white",
                  color: "black",
                },
                "&:hover": {
                  backgroundColor: "gray",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "gray",
                },
              }}
              onClick={() => {
                const audio = new Audio(sound.url);
                audio.play();
              }}>
              {sound.name}
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      ))}
    </Grid>
  );
};

export default DrumMachine;
