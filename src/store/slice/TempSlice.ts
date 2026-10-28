import {createSlice} from "@reduxjs/toolkit";

const tempSlice = createSlice({
    initialState: [],
    name: "products",
    reducers: {
        load: (state, action) => {
            console.log(state);
            return action.payload;
        }
    }
})

export const {load} = tempSlice.actions;
export default tempSlice.reducer;