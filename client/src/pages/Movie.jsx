import React from "react";
import { useParams } from "react-router";
import Plyr from "plyr-react";
import 'plyr-react/plyr.css';

export default function Movie() {
    const { id } = useParams();
    return (
        <div style={{ width: "800px", margin: "0 auto" }}>
            <Plyr 
                source={{
                    type: "video",
                    sources: [
                        {
                            src: `http://localhost:3000/movies/` + id,
                        },
                    ],
                }}
                options={{
                    controls: ["play", "progress", "current-time", "mute", "volume", "settings", "fullscreen"],
                }}
                
            />
        </div>
    );
}
