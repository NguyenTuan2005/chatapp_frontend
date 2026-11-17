import { websocketService } from "../config/Websocket.ts";
import { WS_EVENTS } from "../config/WSEventsEnum.ts";
import type {
    Room,
    CreateRoomData,
    JoinRoomData,
    OutRoomData,
    OutRoomResponseData,
    GetRoomChatMesData,
    SendRoomChatData,
    SendRoomChatResponseData,
    UserListItem,
} from "../types/RoomManagementData.ts";

export const RoomManagementService = {

    async createRoom(roomName: string): Promise<Room> {
        await websocketService.connect();
        return await websocketService.request<Room, CreateRoomData>(
            WS_EVENTS.CREATE_ROOM,
            { name: roomName }
        );

    },

    async joinRoom(roomName: string): Promise<Room> {
        await websocketService.connect();
       return  await websocketService.request<Room, JoinRoomData>(
            WS_EVENTS.JOIN_ROOM,
            { name: roomName }
       );

    },


    async outRoom(roomName: string): Promise<OutRoomResponseData> {
        await websocketService.connect();
        return await websocketService.request<OutRoomResponseData, OutRoomData>(
            WS_EVENTS.OUT_ROOM,
            { name: roomName }
        );
    },

    async getRoomChatMes(roomName: string, page: number = 1): Promise<Room> {
        await websocketService.connect();
        return await websocketService.request<Room, GetRoomChatMesData>(
            WS_EVENTS.GET_ROOM_CHAT_MES,
            { name: roomName, page }
        );

    },

    async sendRoomChat(roomName: string, mes: string): Promise<SendRoomChatResponseData> {
        await websocketService.connect();
        return await websocketService.request<SendRoomChatResponseData, SendRoomChatData>(
            WS_EVENTS.SEND_CHAT,
            { type: "room", to: roomName, mes }
        );
    },

    async getUserList(): Promise<UserListItem[]> {
        await websocketService.connect();
        return await websocketService.request<UserListItem[]>(
            WS_EVENTS.GET_USER_LIST, undefined
        );
    },


    // onRoomMessage(callback: (message: SendRoomChatResponseData) => void): () => void {
    //     return websocketService.on<SendRoomChatResponseData>(WS_EVENTS.SEND_CHAT, callback);
    // },
};
