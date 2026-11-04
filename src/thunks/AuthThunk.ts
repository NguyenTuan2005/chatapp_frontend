import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../wsservices/AuthService.ts";
import type {LoginRequest} from "../types/AuthData.ts";
import {KEY} from "../config/WSEventsEnum.ts";

export const reLoginStorage = {
    get: () => localStorage.getItem(KEY),
    set: (code: string) => localStorage.setItem(KEY, code),
    clear: () => localStorage.removeItem(KEY),
};

export const loginThunk = createAsyncThunk<
    string,
    LoginRequest["data"],
    { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const reLoginCode = await AuthService.login(credentials);
        reLoginStorage.set(reLoginCode);
        return reLoginCode
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Login failed");
    }
});