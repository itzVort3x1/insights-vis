import request from "supertest";
import app from "../index.js"; // Import your Express app

describe("NASA API Routes", () => {
    it("GET /api/apod - should return Astronomy Picture of the Day", async () => {
        const res = await request(app).get("/api/apod");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("title");
        expect(res.body).toHaveProperty("url");
        expect(res.body).toHaveProperty("explanation");
    });

    it("GET /api/fetchMarsPhotos - should return Mars photos", async () => {
        const res = await request(app).get("/api/fetchMarsPhotos");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("photos");
        expect(Array.isArray(res.body.photos)).toBe(true);
    });

    it("GET /api/fetchAsteroids - should return asteroid data", async () => {
        const res = await request(app).get("/api/fetchAsteroids");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("near_earth_objects");
    });

    it("GET /api/unknownRoute - should return 404 error", async () => {
        const res = await request(app).get("/api/unknownRoute");
        expect(res.statusCode).toBe(404);
    });
});
