import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircleFilledSharp";
import PauseIcon from "@mui/icons-material/PauseCircleFilledSharp";
import StopIcon from "@mui/icons-material/StopCircleSharp";

const Controls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    console.log("play");
  };

  return (
    <Grid container>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}>
        <IconButton onClick={handlePlay} size="small">
          {isPlaying ? (
            <PauseIcon fontSize="large" color="info" />
          ) : (
            <PlayIcon fontSize="large" color="info" />
          )}
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            setIsPlaying(false);
          }}>
          <StopIcon fontSize="large" color="error" />
        </IconButton>
      </Grid>
      <Grid item xs={4} sx={{ border: 1 }}>
        <Typography variant="h6">note/chord display</Typography>
      </Grid>
      <Grid item xs={4} sx={{ border: 1 }}>
        <Typography variant="h6">volume slider</Typography>
      </Grid>
    </Grid>
  );
};

export default Controls;
