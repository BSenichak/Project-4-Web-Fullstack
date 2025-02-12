import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import House from "./pages/House";
import Charcter from "./pages/Character";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/house/:houseName" element={<House/>} />
      <Route path="/character/:id" element={<Charcter/>} />
    </Routes>
  </BrowserRouter>
);
