import {configureStore} from "@reduxjs/toolkit";
import tempSlice from "./slice/TempSlice.ts";

export const store = configureStore({
    reducer: {
        products: tempSlice,
    }
})