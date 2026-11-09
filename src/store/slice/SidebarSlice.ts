import {createSlice} from "@reduxjs/toolkit";
import type {UserSidebar} from "../../types/SiderbarData.ts";
import {getUserListThunk} from "../../thunks/SidebarThunk.ts";

interface SidebarState {
    users: UserSidebar[];
    error: string | null;
    loading: boolean;
}

const initialState: SidebarState = {
    users: [],
    error: null,
    loading: false,
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserListThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserListThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUserListThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "get user list failed";
            });
    },
})

export const {} = sidebarSlice.actions;
export default sidebarSlice.reducer;