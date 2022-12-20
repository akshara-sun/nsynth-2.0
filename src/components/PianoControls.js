import React from "react";
import {
  Box,
  IconButton,
  Switch,
  Tooltip,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const PianoControls = ({
  showNoteNames,
  showKeyboardShortcuts,
  onOctaveUp,
  onOctaveDown,
  onToggleNoteNames,
  onToggleKeyboardShortcuts,
}) => {
  return (
    <Box sx={{ pt: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: 560,
        }}
      >
        <Tooltip title="Decrease octave" placement="left">
          <IconButton
            size="small"
            sx={{
              backgroundColor: "primary.flash",
              "&:hover": { backgroundColor: "primary.buttonHover" },
            }}
            onClick={onOctaveDown}
          >
            <RemoveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Increase octave" placement="right">
          <IconButton
            size="small"
            sx={{
              backgroundColor: "primary.flash",
              "&:hover": { backgroundColor: "primary.buttonHover" },
            }}
            onClick={onOctaveUp}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <FormControlLabel
        control={
          <Switch checked={showNoteNames} onChange={onToggleNoteNames} />
        }
        label="Show note names"
        sx={{
          ".MuiFormControlLabel-label": {
            fontSize: "0.8rem",
            color: "primary.light",
          },
        }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={showKeyboardShortcuts}
            onChange={onToggleKeyboardShortcuts}
          />
        }
        label="Show keyboard shortcuts"
        sx={{
          ".MuiFormControlLabel-label": {
            fontSize: "0.8rem",
            color: "primary.light",
          },
        }}
      />
    </Box>
  );
};

export default PianoControls;
