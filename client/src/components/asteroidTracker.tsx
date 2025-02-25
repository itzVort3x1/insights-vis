import React, { useEffect, useState, useRef } from "react";
import WeekSelector from "./weekSelector";
import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from "recharts";
import { getCurrentMonday } from "../utilities/weekSelector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchAstroidData } from "../store/nasaSlice";

export default function AsteroidTracker() {
    const dispatch: AppDispatch = useDispatch();
    const hasFetched = useRef(false); // Track first render

    const [selectedDate, setSelectedDate] = useState<Date | null>(
        getCurrentMonday()
    );

    const { asteroidData, loading, error } = useSelector(
        (state: RootState) => state.nasa
    );

    const handleWeekSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const orderDates = (dates: any[]) => {
        return dates.sort(
            (a: string, b: string) =>
                new Date(a).getTime() - new Date(b).getTime()
        );
    };

    const orderedDates = orderDates(
        Object.keys(asteroidData.near_earth_objects)
    );

    console.log("Asteroid Data: ", asteroidData);

    // useEffect(() => {
    //     if (!hasFetched.current) {
    //         dispatch(fetchAstroidData(selectedDate));
    //         hasFetched.current = true; // Set to true after the first call
    //     }
    // }, []); // Empty dependency array ensures it runs only once

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="py-10">
            <div className="flex justify-center">
                <h2 className="text-2xl font-bold">
                    Near-Earth Asteroid Tracker
                </h2>
            </div>

            <WeekSelector
                onWeekSelect={handleWeekSelect}
                selectedDate={selectedDate}
            />

            {selectedDate && (
                <p>
                    Currently selected start of the week:{" "}
                    {selectedDate.toDateString()}
                </p>
            )}

            <div className="p-4 bg-white-900 text-dark min-h-screen">
                <h1 className="text-3xl font-bold mb-4">Near Earth Objects</h1>
                {orderedDates.map((date) => (
                    <div
                        key={date}
                        className="mb-6 p-4 bg-gray-300 rounded-lg shadow-lg"
                    >
                        <h2 className="text-xl font-semibold text-blue-400">
                            {date}
                        </h2>
                        <ul className="mt-2">
                            {asteroidData?.near_earth_objects[date].map(
                                (neo: any) => (
                                    <li
                                        key={neo.id}
                                        className="border-b border-gray-700 py-2"
                                    >
                                        <h3 className="text-lg font-medium text-yellow-400">
                                            {neo.name}
                                        </h3>
                                        <p>
                                            Estimated Diameter:{" "}
                                            {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                                                2
                                            )}{" "}
                                            -{" "}
                                            {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                                                2
                                            )}{" "}
                                            km
                                        </p>
                                        <p>
                                            Velocity:{" "}
                                            {parseFloat(
                                                neo.close_approach_data[0]
                                                    .relative_velocity
                                                    .kilometers_per_hour
                                            ).toFixed(2)}{" "}
                                            km/h
                                        </p>
                                        <p>
                                            Miss Distance:{" "}
                                            {parseFloat(
                                                neo.close_approach_data[0]
                                                    .miss_distance.kilometers
                                            ).toFixed(2)}{" "}
                                            km
                                        </p>
                                        <p
                                            className={
                                                neo.is_potentially_hazardous_asteroid
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                            }
                                        >
                                            {neo.is_potentially_hazardous_asteroid
                                                ? "Potentially Hazardous"
                                                : "Not Hazardous"}
                                        </p>
                                        <a
                                            href={neo.nasa_jpl_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-300 underline"
                                        >
                                            More Info
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
