import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../wsservices/AuthService.ts";
import type {LoginRequest} from "../types/AuthData.ts";
import {KEY, USER_KEY} from "../config/WSEventsEnum.ts";

export const reLoginStorage = {
    get: (key: string) => localStorage.getItem(key),
    set: (key: string, code: string) => localStorage.setItem(key, code),
    clear: (key: string) => localStorage.removeItem(key),
};

export const loginThunk = createAsyncThunk<
    string,
    LoginRequest["data"],
    { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const reLoginCode = await AuthService.login(credentials);
        reLoginStorage.set(USER_KEY, credentials.user);
        reLoginStorage.set(KEY, reLoginCode);
        return reLoginCode
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Login failed");
    }
});

export const reloginThunk = createAsyncThunk<
    string,
    void,
    { rejectValue: string }
>("auth/relogin", async (_, { rejectWithValue }) => {
    const user = reLoginStorage.get(USER_KEY);
    const code = reLoginStorage.get(KEY);
    if (!user || !code) return rejectWithValue("No save session");

    try {
        const reLoginCode = await AuthService.reLogin({user, code});
        reLoginStorage.set(KEY, reLoginCode);
        return reLoginCode
    } catch (error) {
        reLoginStorage.clear(USER_KEY);
        reLoginStorage.clear(KEY);
        return rejectWithValue(error instanceof Error ? error.message : "Relogin failed");
    }
});