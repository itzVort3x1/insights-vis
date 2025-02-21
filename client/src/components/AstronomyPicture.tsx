import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApod } from "../store/nasaSlice";
import { AppDispatch, RootState } from "../store/store";
import { MacbookScrollDemo } from "./macbookScroll";
import { ParallaxScrollDemo } from "./ScrollLayout";
import AsteroidTracker from "./asteroidTracker";
import { CarouselDemo } from "./imageCarousel";

const AstronomyPicture: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { apod, loading, error } = useSelector(
        (state: RootState) => state.nasa
    );

    useEffect(() => {
        dispatch(fetchApod());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return apod ? (
        <div className="">
            <MacbookScrollDemo apod={apod} />
            <div className="p-10 m-10 bg-white dark:bg-gray-900 rounded-xl max-w-full shadow-2xl relative transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0px_15px_30px_rgba(0,0,0,0.3)]">
                <p className="text-gray-800 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-medium bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
                    {apod.explanation}
                </p>
            </div>
            {/* <ParallaxScrollDemo /> */}
            <CarouselDemo />
            <AsteroidTracker />
        </div>
    ) : null;
};

export default AstronomyPicture;
