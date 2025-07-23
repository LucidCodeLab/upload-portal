// server.js

const express = require("express");
const busboy = require("busboy");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = 5050;
const app = express();
app.use(express.json());

// Adjust this path to your LucidLink-mounted directory
const UPLOAD_DIR = process.env.UPLOAD_DIR;

// Allow your frontend (adjust origin as needed)
app.use(cors());

const STATIC_TOKEN = process.env.UPLOAD_TOKEN;
const USERNAME = process.env.UPLOAD_USERNAME;
const PASSWORD = process.env.UPLOAD_PASSWORD;

// Auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader === `Bearer ${STATIC_TOKEN}`) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    res.json({ token: STATIC_TOKEN });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/upload", authMiddleware, (req, res) => {
  const bb = busboy({ headers: req.headers });
  let saveTo = "";

  req.pipe(bb);

  bb.on("file", (fieldname, file, filename) => {
    const actualFilename =
      typeof filename === "object" && filename.filename
        ? filename.filename
        : String(filename);

    console.log(`Receiving file: ${actualFilename}`);

    saveTo = path.join(UPLOAD_DIR, actualFilename);

    const writeStream = fs.createWriteStream(saveTo);
    file.pipe(writeStream);

    writeStream.on("close", () => {
      console.log(`Upload complete: ${saveTo}`);
    });

    file.on("end", () => {
      console.log(`Finished streaming file: ${actualFilename}`);
    });
  });

  bb.on("finish", () => {
    res.status(200).json({ message: "Upload complete", filePath: saveTo });
  });
});

app.use(express.static(path.join(__dirname, "frontend-dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend-dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
