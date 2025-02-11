const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();   
})

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});

app.get("/movie/:filename", getMovie);

function getMovie(req, res) {
    let filename = req.params.filename;
    const videoPath = path.resolve(__dirname, "static", "videos", filename);
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

app.get("/movies", (req, res) => {
    const videoDir = path.resolve(__dirname, "static", "videos");
    fs.readdir(videoDir, (err, files) => {
        if (err) {
            res.status(500).send("Error reading video directory.");
            return;
        }
        const videoList = files.filter((file) => file.endsWith(".mp4"));
        let html = "";
        videoList.forEach((file) => {
            html += `<li><a href="/movie/${file}">${file}</a></li>`;
        });
        res.send(`
            <html>
                <head>
                    <title>Video List</title>
                </head>
                <body>
                    <h1>Video List</h1>
                    <ul>${html}</ul>
                </body>
            </html>
        `);
    });
});
