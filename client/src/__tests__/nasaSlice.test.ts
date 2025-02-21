import nasaReducer, { fetchApod, fetchMarsPhotos } from "../store/nasaSlice";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from "axios";

jest.mock("axios");

describe("nasaSlice Reducer", () => {
    const initialState = {
        apod: null,
        marsPhotos: [],
        loading: false,
        error: null,
    };

    it("handles fetchApod.fulfilled", () => {
        const newState = nasaReducer(initialState, {
            type: fetchApod.fulfilled.type,
            payload: {
                title: "APOD",
                url: "image.jpg",
                explanation: "Description",
            },
        });

        expect(newState.apod?.title).toBe("APOD");
        expect(newState.loading).toBe(false);
    });

    it("handles fetchMarsPhotos.fulfilled", () => {
        const newState = nasaReducer(initialState, {
            type: fetchMarsPhotos.fulfilled.type,
            payload: [{ id: 1, img_src: "mars.jpg" }],
        });

        expect(newState.marsPhotos.length).toBe(1);
        expect(newState.loading).toBe(false);
    });

    it("handles fetch failure", () => {
        const newState = nasaReducer(initialState, {
            type: fetchApod.rejected.type,
            error: { message: "Failed to fetch" },
        });

        expect(newState.error).toBe("Failed to fetch");
    });
});
