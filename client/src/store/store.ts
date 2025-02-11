import { configureStore } from "@reduxjs/toolkit";
import nasaReducer from "./nasaSlice.ts";

const store = configureStore({
    reducer: {
        nasa: nasaReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
