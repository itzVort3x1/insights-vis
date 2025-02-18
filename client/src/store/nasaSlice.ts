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
    marsPhotos?: MarsPhoto[];
}

const initialState: NasaState = {
    apod: null,
    loading: false,
    error: null,
};

export const fetchMarsPhotos = createAsyncThunk(
    "nasa/fetchMarsPhotos",
    async () => {
        const response = await axios.get<MarsPhoto[]>(`${API_BASE_URL}/mars`);
        return response.data;
    }
);

// Async thunk to fetch APOD
export const fetchApod = createAsyncThunk("/apod", async () => {
    const response = await axios.get<ApodData>(`${API_BASE_URL}/apod`);
    return response.data;
});

const nasaSlice = createSlice({
    name: "nasa",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export default nasaSlice.reducer;
