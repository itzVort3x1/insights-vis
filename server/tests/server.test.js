import app from "../index.js";
import request from "supertest";

describe("Server Setup", () => {
    it("Server should start and respond", async () => {
        const res = await request(app).get("/api/apod");
        expect(res.statusCode).toBe(200);
    });

    it("Should handle JSON parsing errors gracefully", async () => {
        const res = await request(app).post("/api/apod").send("invalid json");
        expect(res.statusCode).toBe(400);
    });
});
