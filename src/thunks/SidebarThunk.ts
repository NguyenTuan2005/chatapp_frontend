import {createAsyncThunk} from "@reduxjs/toolkit";
import type {UserSidebar} from "../types/SiderbarData.ts";
import {SidebarService} from "../wsservices/SidebarService.ts";

export const getUserListThunk = createAsyncThunk<
    UserSidebar[],
    void,
    { rejectValue: string }
>("sidebar/getUserList", async (_, { rejectWithValue }) => {
    try {
        const users = await SidebarService.getUserList();
        return users;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "get user list failed");
    }
});

export const checkUserOnlineThunk = createAsyncThunk<
    boolean,
    string,
    { rejectValue: string }
>("sidebar/checkUserOnline", async (user: string, { rejectWithValue })=> {
    try {
        const isOnline = await SidebarService.checkUserOnline(user);
        return isOnline;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "check user online failed");
    }
});