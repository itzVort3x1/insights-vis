import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AsteroidTracker from "../components/asteroidTracker";

describe("AsteroidTracker Component", () => {
    it("renders with the default selected date", () => {
        render(<AsteroidTracker />);
        expect(
            screen.getByText(/Currently selected start of the week/i)
        ).toBeInTheDocument();
    });

    it("updates the selected date when a week is clicked", () => {
        render(<AsteroidTracker />);
        fireEvent.click(screen.getByText("Mon, Feb 19"));
        expect(
            screen.getByText(
                /Currently selected start of the week: Mon, Feb 19/i
            )
        ).toBeInTheDocument();
    });
});
