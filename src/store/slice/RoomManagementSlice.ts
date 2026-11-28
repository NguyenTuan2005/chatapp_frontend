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
    users: UserListItem[];
    currentRoom: Room | null;
    loading: boolean;
    sendingMessage: boolean;
    error: string | null;
    currentPage: number;
    hasMoreMessages: boolean;
    loadingMoreMessages: boolean;
}

const initialState: RoomManagementState = {
    rooms: [],
    users: [],
    currentRoom: null,
    loading: false,
    sendingMessage: false,
    error: null,
    currentPage: 1,
    hasMoreMessages: true,
    loadingMoreMessages: false,
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
            const targetRoom =
                state.currentRoom?.name === action.payload.to
                    ? state.currentRoom
                    : state.rooms.find(room => room.name === action.payload.to);

            if (targetRoom) {
                targetRoom.chatData.push(action.payload);
            }
        },

        clearError: (state) => {
            state.error = null;
        },

        reset: (state) => {
            state.rooms = [];
            state.users = [];
            state.currentRoom = null;
            state.loading = false;
            state.sendingMessage = false;
            state.error = null;
            state.currentPage = 1;
            state.hasMoreMessages = true;
            state.loadingMoreMessages = false;
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
            .addCase(getRoomChatMesThunk.pending, (state, action) => {
                const page = action.meta.arg.page ?? 1;

                if (page === 1) {
                    state.loading = true;
                    state.currentPage = 1;
                    state.hasMoreMessages = true;
                } else {
                    state.loadingMoreMessages = true;
                }

                state.error = null;
            })
            .addCase(getRoomChatMesThunk.fulfilled, (state, action) => {
                const page = action.meta.arg.page ?? 1;
                const newRoom = action.payload;

                state.loading = false;
                state.loadingMoreMessages = false;

                if (page === 1) {
                    state.currentRoom = newRoom;
                } else {
                    if (state.currentRoom?.name !== newRoom.name) {
                        return;
                    }

                    state.currentRoom.chatData = [
                        ...newRoom.chatData,
                        ...state.currentRoom.chatData
                    ];
                }

                const roomIndex = state.rooms.findIndex(
                    room => room.name === newRoom.name
                );

                if (roomIndex >= 0) {
                    state.rooms[roomIndex] = state.currentRoom!;
                } else {
                    state.rooms.push(state.currentRoom!);
                }

                state.currentPage = page;

                state.hasMoreMessages = newRoom.chatData.length === 50;
            })
            .addCase(getRoomChatMesThunk.rejected, (state, action) => {
                state.loading = false;
                state.loadingMoreMessages = false;
                state.error = action.payload ?? "Get room messages failed";
            });

        builder
            .addCase(sendRoomChatThunk.pending, (state) => {
                state.sendingMessage = true;
                state.error = null;
            })
            .addCase(sendRoomChatThunk.fulfilled, (state) => {
                state.sendingMessage = false;
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
                state.users = action.payload;
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
