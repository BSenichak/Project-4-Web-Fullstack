import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

let theme = createTheme({
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
})

createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);


