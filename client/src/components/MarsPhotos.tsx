import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarsPhotos } from "../store/nasaSlice";
import { AppDispatch, RootState } from "../store/store";
import TabsDemo from "./tab";
import { MacbookScrollDemo } from "./macbookScroll";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

// Define the component
const MarsPhotos: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { marsPhotos, loading, error } = useSelector(
        (state: RootState) => state.nasa
    );

    useEffect(() => {
        dispatch(fetchMarsPhotos());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <MacbookScrollDemo />
            <TabsDemo />
            {/* <div>
                <h2 className="text-blue-600">Mars Rover Photos</h2>
                {marsPhotos?.length ? (
                    marsPhotos
                        .slice(0, 10)
                        .map((photo) => (
                            <img
                                key={photo.id}
                                src={photo.img_src}
                                alt="Mars Rover"
                                width="200px"
                            />
                        ))
                ) : (
                    <p>No photos available</p>
                )}
            </div> */}
            <div>
                <h2>Mars Rover Photos</h2>
                <LineChart width={600} height={300} data={marsPhotos}>
                    <XAxis dataKey="index" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="sol" stroke="#8884d8" />
                </LineChart>
            </div>
        </>
    );
};

export default MarsPhotos;
