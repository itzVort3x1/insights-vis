import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApod } from "../store/nasaSlice.ts";
import { AppDispatch, RootState } from "../store/store.ts";

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
        <div>
            <h2>{apod.title}</h2>
            <img src={apod.url} alt={apod.title} style={{ width: "100%" }} />
            <p>{apod.explanation}</p>
        </div>
    ) : null;
};

export default AstronomyPicture;
