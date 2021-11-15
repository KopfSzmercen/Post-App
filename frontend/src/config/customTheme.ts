import { createTheme } from "@mui/material/styles";
import { purple, indigo } from "@mui/material/colors";
declare module "@mui/material/styles" {
  interface Palette {
    purple: Palette["primary"];
    green: Palette["primary"];
    indigo: Palette["primary"];
  }
  interface PaletteOptions {
    purple: Palette["primary"];
    green: Palette["primary"];
    indigo: Palette["primary"];
  }
}

const customTheme = createTheme({
  palette: {
    purple: {
      main: purple[500],
      dark: purple[700],
      light: purple[400],
      contrastText: "#FAFAF2"
    },
    green: {
      main: "#41B619",
      dark: "#008736",
      light: "#5BFF62",
      contrastText: "#E6E7E8"
    },
    indigo: {
      main: indigo[500],
      dark: indigo[700],
      light: indigo[400],
      contrastText: "#F1F2F2"
    }
  }
});

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    purple: true;
    indigo: true;
    green: true;
  }
}

declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    purple: true;
  }
}

export default customTheme;
