// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js"; // Import the router file

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
app.options("*", cors());
app.use(cors());

// Parse JSON
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the NASA API Proxy Server");
});

// Use the router for all routes starting at "/"
app.use("/api", router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
