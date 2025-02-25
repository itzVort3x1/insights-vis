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

            <BarChart width={600} height={300} data={asteroidData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Bar dataKey="size" fill="#8884d8" />
            </BarChart>
        </div>
    );
}
