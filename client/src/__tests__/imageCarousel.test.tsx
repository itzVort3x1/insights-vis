import React from "react";
import { render, screen } from "@testing-library/react";
import { CarouselDemo } from "../components/imageCarousel";

describe("CarouselDemo Component", () => {
    it("renders Mars photos correctly", () => {
        const marsPhotos = [
            { id: 1, img_src: "https://example.com/mars1.jpg" },
        ];
        render(<CarouselDemo marsPhotos={marsPhotos} />);

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", "https://example.com/mars1.jpg");
    });

    it("displays a placeholder message if no photos are available", () => {
        render(<CarouselDemo marsPhotos={[]} />);
        expect(
            screen.getByText(/No Mars photos available/i)
        ).toBeInTheDocument();
    });
});
