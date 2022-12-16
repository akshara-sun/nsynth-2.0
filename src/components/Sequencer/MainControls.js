import React from "react";
import { IconButton, Grid, Slider, Typography, Button } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircleFilledSharp";
import PauseIcon from "@mui/icons-material/PauseCircleFilledSharp";
import StopIcon from "@mui/icons-material/StopCircleSharp";

const MainControls = ({
  isPlaying,
  onClear,
  onStop,
  onPlay,
  onPause,
  BPM,
  onBPMChange,
}) => {
  return (
    <Grid container>
      <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-start" }}>
        {isPlaying ? (
          <IconButton size="small" onClick={onPause} sx={{ color: "black" }}>
            <PauseIcon />{" "}
          </IconButton>
        ) : (
          <IconButton size="small" onClick={onPlay} sx={{ color: "black" }}>
            <PlayIcon />
          </IconButton>
        )}
        <IconButton size="small" onClick={onStop} color="error">
          <StopIcon />
        </IconButton>
        {!isPlaying && (
          <Button variant="text" size="small" color="error" onClick={onClear}>
            Clear
          </Button>
        )}
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography variant="caption" sx={{ pr: 2 }}>
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
          sx={{ color: "black" }}
        />
      </Grid>
    </Grid>
  );
};

export default MainControls;
