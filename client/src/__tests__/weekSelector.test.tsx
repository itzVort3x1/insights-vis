import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeekSelector from "../components/weekSelector";
import { getWeekStartDates } from "../utilities/weekSelector";

jest.mock("../utilities/weekSelector", () => ({
    getWeekStartDates: jest.fn(() => [
        new Date("2024-02-12"),
        new Date("2024-02-19"),
        new Date("2024-02-26"),
    ]),
}));

describe("WeekSelector Component", () => {
    it("renders week start dates", () => {
        const mockOnWeekSelect = jest.fn();
        render(
            <WeekSelector onWeekSelect={mockOnWeekSelect} selectedDate={null} />
        );

        expect(screen.getByText("Mon, Feb 12")).toBeInTheDocument();
        expect(screen.getByText("Mon, Feb 19")).toBeInTheDocument();
        expect(screen.getByText("Mon, Feb 26")).toBeInTheDocument();
    });

    it("calls onWeekSelect when a week is clicked", () => {
        const mockOnWeekSelect = jest.fn();
        render(
            <WeekSelector onWeekSelect={mockOnWeekSelect} selectedDate={null} />
        );

        fireEvent.click(screen.getByText("Mon, Feb 19"));
        expect(mockOnWeekSelect).toHaveBeenCalledWith(new Date("2024-02-19"));
    });
});
