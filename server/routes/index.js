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

router.get("/fetchAsteroids", async (req, res) => {
    try {
        // Function to get the current week's start and end date
        const getCurrentWeekDates = () => {
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)

            const endOfWeek = new Date(today);
            endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)

            const formatDate = (date) => date.toISOString().split("T")[0];

            return {
                startDate: formatDate(startOfWeek),
                endDate: formatDate(endOfWeek),
            };
        };

        const { startDate, endDate } = getCurrentWeekDates();

        // NASA API URL with dynamic date values
        const API_KEY = "DEMO_KEY"; // Replace with your actual API key
        const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

        // Fetch data from NASA API
        const response = await fetch(API_URL);
        const externalData = await response.json();

        return res.status(200).json(externalData);
    } catch (error) {
        console.error("Error fetching asteroid data:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while fetching data" });
    }
});

router.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome to the NASA API" });
});

export default router;
