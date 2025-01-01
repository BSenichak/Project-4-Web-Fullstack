const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getMovie(req, res) {
    const videoPath = path.resolve(__dirname, "movies", req.filename);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize) {
            res.status(416).send("Requested range not satisfiable");
            return;
        }
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
}

app.get(
    "/movies/:id",
    (req, res, next) => {
        const id = req.params.id;
        db.query("SELECT * FROM movies WHERE id = ?", [id], (err, results) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            } else {
                if (results.length === 0) {
                    res.status(404).send("Movie not found");
                } else {
                    req.filename = results[0].filename;
                    next();
                }
            }
        });
    },
    getMovie
);

app.get("/", (req, res) => {
    res.end("Welcome to the movie server");
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
