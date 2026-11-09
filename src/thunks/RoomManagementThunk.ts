import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomManagementService } from "../wsservices/RoomManagementService.ts";
import type {
    Room,
    SendRoomChatResponseData,
    UserListItem,
} from "../types/RoomManagementData.ts";

export const createRoomThunk = createAsyncThunk<
    Room,
    string,
    { rejectValue: string }
>("roomManagement/createRoom", async (roomName, { rejectWithValue }) => {
    try {

        return await RoomManagementService.createRoom(roomName);

    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Create room failed"
        );
    }
});

export const joinRoomThunk = createAsyncThunk<
    Room,
    string,
    { rejectValue: string }
>("roomManagement/joinRoom", async (roomName, { rejectWithValue }) => {
    try {
        return  await RoomManagementService.joinRoom(roomName);
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Join room failed"
        );
    }
});

export const outRoomThunk = createAsyncThunk<
    { roomName: string; mes: string },
    string,
    { rejectValue: string }
>("roomManagement/outRoom", async (roomName, { rejectWithValue }) => {
    try {
        const response = await RoomManagementService.outRoom(roomName);
        return {
            roomName,
            mes: response.mes,
        };
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Out room failed"
        );
    }
});

export const getRoomChatMesThunk = createAsyncThunk<
    Room,
    { name: string; page?: number },
    { rejectValue: string }
>("roomManagement/getRoomChatMes", async ({ name, page = 1 }, { rejectWithValue }) => {
    try {

        return  await RoomManagementService.getRoomChatMes(name, page);

    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Get room messages failed"
        );
    }
});

export const sendRoomChatThunk = createAsyncThunk<
    SendRoomChatResponseData,
    { roomName: string; mes: string },
    { rejectValue: string }
>("roomManagement/sendRoomChat", async ({ roomName, mes }, { rejectWithValue }) => {
    try {

        return await RoomManagementService.sendRoomChat(roomName, mes);
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Send room chat message failed"
        );
    }
});

export const getUserListThunk = createAsyncThunk<
    UserListItem[],
    void,
    { rejectValue: string }
>("roomManagement/getUserList", async (_, { rejectWithValue }) => {
    try {

        return await RoomManagementService.getUserList();
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Get user list failed"
        );
    }
});
