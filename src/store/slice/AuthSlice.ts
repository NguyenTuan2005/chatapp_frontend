import {createSlice} from "@reduxjs/toolkit";
import {checkUserExistThunk, loginThunk, reLoginStorage, reloginThunk} from "../../thunks/AuthThunk.ts";
import {KEY, USER_KEY} from "../../config/WSEventsEnum.ts";

interface AuthState {
    isAuthenticated: boolean;
    reLoginCode: string | null;
    error: string | null;
    loading: boolean;
    relogin: boolean;
    isExist: boolean;
}

const reLoginCode = reLoginStorage.get(KEY);

const initialState: AuthState = {
    isAuthenticated: false,
    reLoginCode: reLoginCode,
    error: null,
    loading: false,
    relogin: reLoginCode != null,
    isExist: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.reLoginCode = null;
            state.error = null;
            reLoginStorage.clear(KEY);
            reLoginStorage.clear(USER_KEY);
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
        builder
            .addCase(reloginThunk.pending, (state) => {
                state.relogin = true;
                state.error = null;
            })
            .addCase(reloginThunk.fulfilled, (state, action) => {
                state.relogin = false;
                state.isAuthenticated = true;
                state.reLoginCode = action.payload;
            })
            .addCase(reloginThunk.rejected, (state, action) => {
                state.relogin = false;
                state.isAuthenticated = false;
                state.reLoginCode = null;
                state.error = action.payload ?? "Relogin failed";
            });
        builder
            .addCase(checkUserExistThunk.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.isExist = false;
            })
            .addCase(checkUserExistThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isExist = action.payload;
            })
            .addCase(checkUserExistThunk.rejected, (state, action) => {
                state.loading = false;
                state.isExist = false;
                state.error = action.payload ?? "Check user failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;