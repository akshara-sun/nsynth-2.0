import React from "react";
import { Box, Switch, FormControlLabel } from "@mui/material";

const PianoControls = ({
  showNoteNames,
  onToggleNoteNames,
  showKeyboardShortcuts,
  onToggleKeyboardShortcuts,
}) => {
  return (
    <Box sx={{ pt: 1 }}>
      <FormControlLabel
        control={
          <Switch
            color="success"
            checked={showNoteNames}
            onChange={onToggleNoteNames}
            label="Show Note Names"
          />
        }
        label="Show note names"
      />
      <FormControlLabel
        control={
          <Switch
            checked={showKeyboardShortcuts}
            onChange={onToggleKeyboardShortcuts}
            label="Show Note Names"
          />
        }
        label="Show keyboard shortcuts"
      />
    </Box>
  );
};

export default PianoControls;
