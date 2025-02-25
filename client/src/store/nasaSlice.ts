import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

// Define the APOD response data structure
interface ApodData {
    title: string;
    url: string;
    explanation: string;
}

interface MarsPhoto {
    id: number;
    img_src: string;
}

interface NasaState {
    apod: ApodData | null;
    loading: boolean;
    error: string | null;
    marsPhotos: MarsPhoto[];
    asteroidData: any;
}

// Initialize the state
const initialState: NasaState = {
    apod: null,
    loading: false,
    error: null,
    marsPhotos: [],
    asteroidData: null,
};

// Async thunk to fetch APOD
export const fetchApod = createAsyncThunk("/apod", async () => {
    const response = await axios.get<ApodData>(`${API_BASE_URL}/apod`);
    return response.data;
});

// Async thunk to fetch Mars photos
export const fetchMarsPhotos = createAsyncThunk(
    "/fetchMarsPhotos",
    async () => {
        const response = await axios.get<MarsPhoto[]>(
            `${API_BASE_URL}/fetchMarsPhotos`
        );
        return response.data;
    }
);

export const fetchAstroidData = createAsyncThunk(
    "/fetchAsteroids",
    async (date: Date | null) => {
        const response = await axios.get(`${API_BASE_URL}/fetchAsteroids`, {
            params: { date },
        });
        return response.data;
    }
);

const nasaSlice = createSlice({
    name: "nasa",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // APOD
            .addCase(fetchApod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchApod.fulfilled,
                (state, action: PayloadAction<ApodData>) => {
                    state.loading = false;
                    state.apod = action.payload;
                }
            )
            .addCase(fetchApod.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch APOD data.";
            })

            // Mars Photos
            .addCase(fetchMarsPhotos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchMarsPhotos.fulfilled,
                (state, action: PayloadAction<MarsPhoto[]>) => {
                    state.loading = false;
                    state.marsPhotos = action.payload;
                }
            )
            .addCase(fetchMarsPhotos.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch Mars photos.";
            })
            .addCase(fetchAstroidData.fulfilled, (state, action) => {
                state.loading = false;
                state.asteroidData = action.payload;
            })
            .addCase(fetchAstroidData.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch Asteroid data.";
            })
            .addCase(fetchAstroidData.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            });
    },
});

export default nasaSlice.reducer;
