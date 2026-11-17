import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Room, RoomChatMessage, UserListItem } from "../../types/RoomManagementData";
import {
    createRoomThunk,
    joinRoomThunk,
    outRoomThunk,
    getRoomChatMesThunk,
    sendRoomChatThunk,
    getUserListThunk,
} from "../../thunks/RoomManagementThunk.ts";

export interface RoomManagementState {
    rooms: Room[];
    userList: UserListItem[];
    currentRoom: Room | null;
    loading: boolean;
    sendingMessage: boolean;
    error: string | null;
}

const initialState: RoomManagementState = {
    rooms: [],
    userList: [],
    currentRoom: null,
    loading: false,
    sendingMessage: false,
    error: null,
};

const roomManagementSlice = createSlice({
    name: "roomManagement",
    initialState,
    reducers: {
        load: (state, action: PayloadAction<Room[]>) => {
            state.rooms = action.payload;
        },

        setCurrentRoom: (state, action: PayloadAction<Room | null>) => {
            state.currentRoom = action.payload;
        },

        removeRoom: (state, action: PayloadAction<string>) => {
            state.rooms = state.rooms.filter((room) => room.name !== action.payload);
            if (state.currentRoom?.name === action.payload) {
                state.currentRoom = null;
            }
        },

        addMessageToCurrentRoom: (state, action: PayloadAction<RoomChatMessage>) => {
            if (state.currentRoom && state.currentRoom.name === action.payload.to) {
                const exists = action.payload.id
                    ? state.currentRoom.chatMess.some((m) => m.id === action.payload.id)
                    : false;

                if (!exists) {
                    state.currentRoom.chatMess.push(action.payload);
                }
            }

            const targetRoom = state.rooms.find((r) => r.name === action.payload.to);
            if (targetRoom) {
                const exists = action.payload.id
                    ? targetRoom.chatMess.some((m) => m.id === action.payload.id)
                    : false;
                if (!exists) {
                    targetRoom.chatMess.push(action.payload);
                }
            }
        },

        clearError: (state) => {
            state.error = null;
        },

        reset: (state) => {
            state.rooms = [];
            state.userList = [];
            state.currentRoom = null;
            state.loading = false;
            state.sendingMessage = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {

        builder
            .addCase(createRoomThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRoomThunk.fulfilled, (state, action) => {
                state.loading = false;
                const isExist = state.rooms.some((room) => room.name === action.payload.name);
                if (!isExist) {
                    state.rooms.push(action.payload);
                }
                state.currentRoom = action.payload;
            })
            .addCase(createRoomThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Create room failed";
            });

        builder
            .addCase(joinRoomThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(joinRoomThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.rooms.findIndex((room) => room.name === action.payload.name);
                if (index >= 0) {
                    state.rooms[index] = action.payload;
                } else {
                    state.rooms.push(action.payload);
                }
                state.currentRoom = action.payload;
            })
            .addCase(joinRoomThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Join room failed";
            });

        builder
            .addCase(outRoomThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(outRoomThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = state.rooms.filter((room) => room.name !== action.payload.roomName);
                if (state.currentRoom?.name === action.payload.roomName) {
                    state.currentRoom = null;
                }
            })
            .addCase(outRoomThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Out room failed";
            });

        builder
            .addCase(getRoomChatMesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRoomChatMesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRoom = action.payload;
                const roomIndex = state.rooms.findIndex((r) => r.name === action.payload.name);
                if (roomIndex >= 0) {
                    state.rooms[roomIndex] = action.payload;
                } else {
                    state.rooms.push(action.payload);
                }
            })
            .addCase(getRoomChatMesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Get room messages failed";
            });

        builder
            .addCase(sendRoomChatThunk.pending, (state) => {
                state.sendingMessage = true;
                state.error = null;
            })
            .addCase(sendRoomChatThunk.fulfilled, (state, action) => {
                state.sendingMessage = false;
                const newMsg: RoomChatMessage = {
                    name: action.payload.name,
                    to: action.payload.to,
                    mes: action.payload.mes,
                    type: action.payload.type,
                    createAt: new Date().toISOString(),
                };
                if (state.currentRoom && state.currentRoom.name === action.payload.to) {
                    state.currentRoom.chatMess.push(newMsg);
                }
            })
            .addCase(sendRoomChatThunk.rejected, (state, action) => {
                state.sendingMessage = false;
                state.error = action.payload ?? "Send message failed";
            });


        builder
            .addCase(getUserListThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserListThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userList = action.payload;
            })
            .addCase(getUserListThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Get user list failed";
            });
    },
});

export const {
    load,
    setCurrentRoom,
    removeRoom,
    addMessageToCurrentRoom,
    clearError,
    reset,
} = roomManagementSlice.actions;

export default roomManagementSlice.reducer;
