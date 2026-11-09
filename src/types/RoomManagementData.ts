import { WS_EVENTS } from "../config/WSEventsEnum.ts";

export interface RoomMember {
    id: number | string;
    name: string;
}

export interface RoomChatMessage {
    id?: number | string;
    name: string;
    to: string;
    mes: string;
    createAt?: string;
    type: number; // 1 for room message
}

export interface Room {
    name: string;
    user: RoomMember[];
    chatMess: RoomChatMessage[];
}

export interface UserListItem {
    name: string;
    type: number; // 1: room, 0: people
    actionTime: string;
}

// Request Data
export interface CreateRoomData {
    name: string;
}

export interface JoinRoomData {
    name: string;
}

export interface OutRoomData {
    name: string;
}

export interface GetRoomChatMesData {
    name: string;
    page: number;
}

export interface SendRoomChatData {
    type: "room";
    to: string;
    mes: string;
}

// Response Data
export interface OutRoomResponseData {
    mes: string;
}

export interface SendRoomChatResponseData {
    name: string;
    to: string;
    mes: string;
    type: number;
}

// Envelopes
export interface CreateRoomRequest {
    event: WS_EVENTS.CREATE_ROOM;
    data: CreateRoomData;
}

export interface JoinRoomRequest {
    event: WS_EVENTS.JOIN_ROOM;
    data: JoinRoomData;
}

export interface OutRoomRequest {
    event: WS_EVENTS.OUT_ROOM;
    data: OutRoomData;
}

export interface GetRoomChatMesRequest {
    event: WS_EVENTS.GET_ROOM_CHAT_MES;
    data: GetRoomChatMesData;
}

export interface SendRoomChatRequest {
    event: WS_EVENTS.SEND_CHAT;
    data: SendRoomChatData;
}
