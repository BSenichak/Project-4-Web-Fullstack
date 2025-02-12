import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "./themes.js";
import { useState } from "react";

function Wrapper() {
    let [themeName, setThemeName] = useState("light");
    return (
        <ThemeProvider theme={themeName === "light" ? lightTheme : darkTheme}>
            <App theme={themeName} setTheme={setThemeName} />
        </ThemeProvider>
    );
}

createRoot(document.getElementById("root")).render(<Wrapper />);
