import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      light: "#FFFFFF",
      flash: "#b3ecec", //turquoise
      highlight: "#e6ffff", //light turquoise
      dark: "#80b9b9", //dark turquoise
      buttonHover: "#FFD700", //gold
      base: "#808080", //gray
      error: "#FF0000", //red
      success: "#00FF00", //green
    },
  },
});

export default Theme;
