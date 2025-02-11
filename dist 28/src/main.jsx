import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import "./index.css";
import { useEffect, useState } from "react";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/movie/:filename" element={<App />} />
        </Routes>
    </BrowserRouter>
);

function App() {
  let filename = useParams().filename;
    let [exists, setExists] = useState(false);
    useEffect(() => {
      if(!filename) return
        fetch(`http://localhost:3000/movie/${filename}`)
            .then((res) => res.ok)
            .then(setExists);
    }, [filename]);
    return (
        <div>
            {exists ? (
                <Plyr
                    source={{
                        type: "video",
                        sources: [
                            {
                                src: `http://localhost:3000/movie/${filename}`,
                            },
                        ],
                    }}
                />
            ) : (
                <h1>Video not found</h1>
            )}
        </div>
    );
}
