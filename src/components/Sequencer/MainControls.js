import React from "react";
import { IconButton, Grid, Slider, Typography } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircleFilledSharp";
import PauseIcon from "@mui/icons-material/PauseCircleFilledSharp";
import StopIcon from "@mui/icons-material/StopCircleSharp";

const MainControls = ({
  isPlaying,
  onStop,
  onPlay,
  onPause,
  BPM,
  onBPMChange,
}) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        {isPlaying ? (
          <IconButton size="small" onClick={onPause}>
            <PauseIcon />{" "}
          </IconButton>
        ) : (
          <IconButton size="small" onClick={onPlay}>
            <PlayIcon />
          </IconButton>
        )}
        <IconButton size="small" onClick={onStop}>
          <StopIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ pr: 2 }}>
          BPM
        </Typography>
        <Slider
          valueLabelDisplay="auto"
          value={BPM}
          min={60}
          max={240}
          marks={true}
          step={6}
          defaultValue={120}
          onChange={onBPMChange}
        />
      </Grid>
    </Grid>
  );
};

export default MainControls;
