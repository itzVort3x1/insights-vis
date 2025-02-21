import React, { useState } from "react";
import WeekSelector from "./weekSelector";
import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from "recharts";
import { getCurrentMonday } from "../utilities/weekSelector";

export default function AsteroidTracker() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        getCurrentMonday()
    );

    const handleWeekSelect = (date: Date) => {
        setSelectedDate(date);
    };

    console.log("selectedDate", selectedDate);

    return (
        <div className="py-10">
            <div className="flex justify-center">
                <h2 className="text-2xl font-bold">
                    Near-Earth Asteroid Tracker
                </h2>
            </div>

            {/* Pass callback down to get the selected date from the child */}
            <WeekSelector
                onWeekSelect={handleWeekSelect}
                selectedDate={selectedDate}
            />

            {/* Use the selectedWeek state for display/debug, or in data fetching */}
            {selectedDate && (
                <p>
                    Currently selected start of the week:{" "}
                    {selectedDate.toDateString()}
                </p>
            )}

            {/* Example BarChart - update data based on selectedWeek as needed */}
            <BarChart width={600} height={300} data={[]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Bar dataKey="size" fill="#8884d8" />
            </BarChart>
        </div>
    );
}
