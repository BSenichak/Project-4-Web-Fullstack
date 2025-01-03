const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

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

app.get("/movies", (req, res) => {
    let query = "SELECT * FROM movies";
    let queryParams = [];

    // Перевірка та додавання сортування
    if (req.query.sort) {
        if (
            ["id", "title", "release_data", "rating"].includes(req.query.sort)
        ) {
            query += " ORDER BY " + req.query.sort;
        } else {
            return res.status(400).send("Invalid sort field");
        }
    }

    // Перевірка типу сортування
    if (req.query.sortType) {
        const sortType = req.query.sortType.toUpperCase();
        if (["ASC", "DESC"].includes(sortType)) {
            query += " " + sortType;
        } else {
            return res.status(400).send("Invalid sort type");
        }
    }

    // Перевірка та додавання ліміту
    if (req.query.limit) {
        const limit = parseInt(req.query.limit, 10);
        if (!isNaN(limit) && limit > 0) {
            query += " LIMIT ?";
            queryParams.push(limit);
        } else {
            return res.status(400).send("Invalid limit");
        }
    }

    // Перевірка та додавання зсуву
    if (req.query.offset) {
        const offset = parseInt(req.query.offset, 10);
        if (!isNaN(offset) && offset >= 0) {
            query += " OFFSET ?";
            queryParams.push(offset);
        } else {
            return res.status(400).send("Invalid offset");
        }
    }

    // Виконання запиту
    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error("SQL Error:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.json(results);
        }
    });
});

app.get("/search", (req, res) => {
    // Перевірка наявності параметра title
    if (!req.query.title) {
        return res.status(400).send("Title parameter is required");
    }

    // Екранування та обмеження введення
    const title = `%${req.query.title}%`; // Додаємо `%` для часткового пошуку
    const query = "SELECT * FROM movies WHERE title LIKE ? LIMIT 10";

    // Використання параметризованого запиту
    db.query(query, [title], (err, results) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
