// routes/index.js
import express from "express";
import fetch from "node-fetch"; // or axios if you prefer axios

const router = express.Router();

router.get("/apod", async (req, res) => {
    try {
        // Replace `API_URL` with your actual API endpoint when you're ready.
        const API_URL =
            "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date"; // <--- Placeholder for your API endpoint

        // Make an external API call only if API_URL is not empty
        let externalData = null;
        if (API_URL) {
            const response = await fetch(API_URL);
            externalData = await response.json();
        }

        // Return response (or just a message if no external call is made)
        return res.status(200).json({
            ...externalData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred" });
    }
});

router.get("/fetchMarsPhotos", async (req, res) => {
    try {
        // Replace `API_URL` with your actual API endpoint when you're ready.
        const API_URL =
            "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=25&page=1&api_key=DEMO_KEY"; // <--- Placeholder for your API endpoint

        // Make an external API call only if API_URL is not empty
        let externalData = null;
        if (API_URL) {
            const response = await fetch(API_URL);
            externalData = await response.json();
        }

        // Return response (or just a message if no external call is made)
        return res.status(200).json({
            ...externalData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred" });
    }
});

router.get("/fetchAstroids", async (req, res) => {
    try {
        // Replace `API_URL` with your actual API endpoint when you're ready.
        const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2025-02-14&end_date=2025-02-20&api_key=DEMO_KEY`; // <--- Placeholder for your API endpoint

        // Make an external API call only if API_URL is not empty
        let externalData = null;
        if (API_URL) {
            const response = await fetch(API_URL);
            externalData = await response.json();
        }

        // Return response (or just a message if no external call is made)
        return res.status(200).json({
            ...externalData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred" });
    }
});

export default router;
