// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
app.options("*", cors());
app.use(cors());

// Parse JSON
app.use(express.json());

// Use the router for all routes starting at "/"
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
