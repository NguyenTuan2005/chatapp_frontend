import {createSlice} from "@reduxjs/toolkit";
import {loginThunk, reLoginStorage} from "../../thunks/AuthThunk.ts";

interface AuthState {
    isAuthenticated: boolean;
    reLoginCode: string | null;
    error: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    isAuthenticated: reLoginStorage.get() !== null, //login unlimited
    reLoginCode: reLoginStorage.get(),
    error: null,
    loading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.reLoginCode = null;
            state.error = null;
            reLoginStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.reLoginCode = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.reLoginCode = null;
                state.error = action.payload ?? "Login failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;