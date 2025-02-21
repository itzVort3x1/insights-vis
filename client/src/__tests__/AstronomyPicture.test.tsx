import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import AstronomyPicture from "../components/AstronomyPicture";

const middlewares: any = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../store/nasaSlice", () => ({
    fetchApod: jest.fn(),
    fetchMarsPhotos: jest.fn(),
}));

describe("AstronomyPicture Component", () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            nasa: {
                apod: {
                    title: "Astronomy Picture",
                    url: "https://example.com/apod.jpg",
                    explanation: "APOD Description",
                },
                marsPhotos: [
                    { id: 1, img_src: "https://example.com/mars.jpg" },
                ],
                loading: false,
                error: null,
            },
        });
    });

    it("renders the APOD title and explanation", () => {
        render(
            <Provider store={store}>
                <AstronomyPicture />
            </Provider>
        );

        expect(screen.getByText(/Astronomy Picture/i)).toBeInTheDocument();
        expect(screen.getByText(/APOD Description/i)).toBeInTheDocument();
    });

    it("shows loading state", () => {
        store = mockStore({ nasa: { loading: true } });
        render(
            <Provider store={store}>
                <AstronomyPicture />
            </Provider>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it("shows error message", () => {
        store = mockStore({ nasa: { error: "Failed to fetch" } });
        render(
            <Provider store={store}>
                <AstronomyPicture />
            </Provider>
        );

        expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
    });
});
