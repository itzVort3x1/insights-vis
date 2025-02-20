import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAsteroidsData } from "../store/nasaSlice";
import { RootState, AppDispatch } from "../store/store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const AsteroidTracker: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    // const { asteroids, loading } = useSelector(
    //     (state: RootState) => state.nasa
    // );

    // useEffect(() => {
    //     dispatch(fetchAsteroidsData());
    // }, [dispatch]);

    // const chartData = asteroids.map((asteroid) => ({
    //     name: asteroid.name,
    //     size: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
    // }));

    return (
        <div>
            <h2>Near-Earth Asteroid Tracker</h2>
            {false ? (
                <p>Loading...</p>
            ) : (
                <BarChart width={600} height={300} data={[]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Bar dataKey="size" fill="#8884d8" />
                </BarChart>
            )}
        </div>
    );
};

export default AsteroidTracker;
