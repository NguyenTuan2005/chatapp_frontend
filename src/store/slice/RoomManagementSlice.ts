import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Room } from "../../types/RoomManagementData";
import {createRoomThunk} from "../../thunks/RoomManagementThunk.ts";

interface RoomManagementState {
    rooms: Room[];
    loading: boolean;
    error: string | null;
}

const initialState: RoomManagementState = {
    rooms: [],
    loading: false,
    error: null,
};

const roomManagementSlice = createSlice({
    name: "roomManagement",
    initialState,
    reducers: {
        load: (state, action: PayloadAction<Room[]>) => {
            state.rooms = action.payload;
        },

        removeRoom: (state, action: PayloadAction<string>) => {
            state.rooms = state.rooms.filter(
                room => room.name !== action.payload
            );
        },

        reset: (state) => {
            state.rooms = [];
        },
    },

    extraReducers: builder => {
        builder
            .addCase(createRoomThunk.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRoomThunk.fulfilled, (state, action) => {
                state.loading = false;

                const isExist = state.rooms.some(
                    room => room.name === action.payload.name
                );

                if (!isExist) {
                    state.rooms.push(action.payload);
                }
            })
            .addCase(createRoomThunk.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ?? "Something went wrong";
            });
    },
});

export const { load, removeRoom, reset } = roomManagementSlice.actions;

export default function roomManagementSliceReducer(){
    return roomManagementSlice.reducer;
}