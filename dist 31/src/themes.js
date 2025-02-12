import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#9575cd",
        },
        secondary: {
            main: "#00838f",
        },
        background: {
            default: "#f3e5f5",
            paper: "#f1e4fb",
        },
    },
    typography: {
        fontFamily: "Comfortaa",
    },
});

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#9575cd',
    },
    secondary: {
      main: '#00838f',
    },
    background: {
      default: '#1d092b',
      paper: '#2d1a3d',
    },
    text: {
      primary: '#fffefe',
    },
  },
    typography: {
        fontFamily: "Comfortaa",
    },
});
