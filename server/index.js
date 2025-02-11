import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 4000;

app.options("*", cors());
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello World" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
