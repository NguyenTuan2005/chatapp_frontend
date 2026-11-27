import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {UserSidebar} from "../../types/SiderbarData.ts";
import {checkUserOnlineThunk, getUserListThunk} from "../../thunks/SidebarThunk.ts";

interface SidebarState {
    users: UserSidebar[];
    error: string | null;
    loading: boolean;
    isOnline: boolean;
    collapsed: boolean;
}

const COLLAPSED_KEY = "sidebar_collapsed";

const readCollapsed = (): boolean => {
    try {
        return localStorage.getItem(COLLAPSED_KEY) === "true";
    } catch {
        return false;
    }
};

const saveCollapsed = (value: boolean) => {
    try {
        localStorage.setItem(COLLAPSED_KEY, String(value));
    } catch {
        return;
    }
};

const initialState: SidebarState = {
    users: [],
    error: null,
    loading: false,
    isOnline: false,
    collapsed: readCollapsed()
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.collapsed = !state.collapsed;
            saveCollapsed(state.collapsed);
        },
        setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.collapsed = action.payload;
            saveCollapsed(state.collapsed);
        }
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
        builder
            .addCase(checkUserOnlineThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(checkUserOnlineThunk.fulfilled, (state, action) => {
                state.isOnline = action.payload;
            })
            .addCase(checkUserOnlineThunk.rejected, (state) => {
                state.isOnline = false;
            });
    },
})

export const {toggleSidebar, setSidebarCollapsed} = sidebarSlice.actions;
export default sidebarSlice.reducer;