import {createAsyncThunk} from "@reduxjs/toolkit";
import type {WebSocketData} from "../types/WebSocketData.ts";
import type {CreateRoomRequest} from "../types/RoomManagementData.ts";
import {WS_EVENTS} from "../config/WSEventsEnum.ts";
import {websocketService} from "../config/Websocket.ts";


export const createRoomThunk = createAsyncThunk(
    "roomRanagement/createRoom",
    async (roomName: string, { rejectWithValue }) => {
        try {
            const request: WebSocketData<CreateRoomRequest> = {
                action: "onchat",
                data: {
                    event: WS_EVENTS.CREATE_ROOM,
                    data: {
                        name: roomName,
                    },
                },
            };

            websocketService.send(request);

        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Create room failed"
            );
        }
    }
);