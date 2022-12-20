import React from "react";
import { Button, Grid, ButtonGroup } from "@mui/material";

const DrumPads = ({ sounds }) => {
  return (
    <Grid
      container
      sx={{ display: "flex", justifyContent: "center", borderRadius: 8 }}>
      {sounds.map((sound) => (
        <Grid
          key={sound.id}
          item
          xs={3}
          sx={{ backgroundColor: "primary.main" }}>
          <ButtonGroup size="large">
            <Button
              fullWidth={true}
              value={sound.name}
              sx={{
                height: 100,
                width: 100,
                p: 4,
                m: 2,
                color: "primary.light",
                borderColor: "primary.light",
                "&:hover": {
                  backgroundColor: "primary.highlight",
                  color: "primary.dark",
                  borderColor: "primary.light",
                },
              }}
              onClick={() => {
                const audio = new Audio(sound.url);
                audio.play();
              }}>
              {sound.name}
            </Button>
          </ButtonGroup>
        </Grid>
      ))}
    </Grid>
  );
};

export default DrumPads;
