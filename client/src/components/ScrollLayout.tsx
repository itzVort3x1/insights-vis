"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { ParallaxScroll } from "./ui/layout-grid";

export function ParallaxScrollDemo() {
    const [images, setImages] = useState(initialImages);
    const [isFetching, setIsFetching] = useState(false);
    const gridRef = useRef<HTMLDivElement | null>(null);

    /**
     * Fetch more images: add 6 new random images from Unsplash.
     * We use a unique `timestamp` query param to ensure fresh URLs.
     */
    const fetchMoreImages = useCallback(async () => {
        if (isFetching) return; // Prevent double-fetch

        setIsFetching(true);
        console.log("Fetching more images...");

        try {
            const newImages = await Promise.all(
                Array.from({ length: 6 }).map(async () => {
                    const timestamp = new Date().getTime(); // Force fresh image
                    const response = await fetch(
                        `https://source.unsplash.com/random/800x600?${timestamp}`
                    );
                    return response.url;
                })
            );

            setImages((prevImages) => [...prevImages, ...newImages]);
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setIsFetching(false);
        }
    }, [isFetching]);

    /**
     * Handle scroll event:
     * - If near the bottom (<= 100px from the end),
     *   then fetch more images.
     */
    const handleScroll = useCallback(() => {
        if (!gridRef.current) return;

        const { scrollTop, clientHeight, scrollHeight } = gridRef.current;
        console.log("Scrolling...", { scrollTop, clientHeight, scrollHeight });

        // Are we near bottom?
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            console.log("Near bottom, fetching more...");
            fetchMoreImages();
        }
    }, [fetchMoreImages]);

    /**
     * Attach the scroll listener when the component mounts.
     */
    useEffect(() => {
        const element = gridRef.current;
        if (!element) return;

        element.addEventListener("scroll", handleScroll);
        console.log("Added scroll event listener");
        return () => {
            element.removeEventListener("scroll", handleScroll);
            console.log("Removed scroll event listener");
        };
    }, [handleScroll]);

    return (
        <div className="relative">
            {/* Scroll container: 40rem tall, overflow-y-auto */}
            <div
                className="h-[40rem] w-full overflow-y-auto
                   scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
                   hover:scrollbar-thumb-gray-600 scroll-smooth"
                ref={gridRef}
            >
                {/* Renders the images in your custom layout-grid component */}
                <ParallaxScroll images={images} />

                {/* Loading spinner at the bottom */}
                {isFetching && (
                    <div className="sticky bottom-0 w-full bg-white/80 py-4">
                        <div className="flex justify-center items-center">
                            <div className="animate-spin h-8 w-8 border-4 border-gray-500 rounded-full border-t-transparent"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const initialImages = [
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=3540&q=80",
];
