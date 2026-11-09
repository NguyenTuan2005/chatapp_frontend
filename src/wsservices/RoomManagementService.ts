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
        console.log("[RoomManagementService] Bắt đầu gọi CREATE_ROOM với tên phòng:", roomName);
        await websocketService.connect();
        const response = await websocketService.request<Room, CreateRoomData>(
            WS_EVENTS.CREATE_ROOM,
            { name: roomName }
        );
        console.log("[RoomManagementService] CREATE_ROOM thành công, data nhận về:", response);
        return response;
    },

    async joinRoom(roomName: string): Promise<Room> {
        console.log("[RoomManagementService] Bắt đầu gọi JOIN_ROOM với tên phòng:", roomName);
        await websocketService.connect();
        const response = await websocketService.request<Room, JoinRoomData>(
            WS_EVENTS.JOIN_ROOM,
            { name: roomName }
        );
        console.log("[RoomManagementService] JOIN_ROOM thành công, data nhận về:", response);
        return response;
    },


    async outRoom(roomName: string): Promise<OutRoomResponseData> {
        console.log("[RoomManagementService] Bắt đầu gọi OUT_ROOM với tên phòng:", roomName);
        await websocketService.connect();
        const response = await websocketService.request<OutRoomResponseData, OutRoomData>(
            WS_EVENTS.OUT_ROOM,
            { name: roomName }
        );
        console.log("[RoomManagementService] OUT_ROOM thành công, data nhận về:", response);
        return response;
    },

    async getRoomChatMes(roomName: string, page: number = 1): Promise<Room> {
        console.log(`[RoomManagementService] Bắt đầu gọi GET_ROOM_CHAT_MES (name: ${roomName}, page: ${page})`);
        await websocketService.connect();
        const response = await websocketService.request<Room, GetRoomChatMesData>(
            WS_EVENTS.GET_ROOM_CHAT_MES,
            { name: roomName, page }
        );
        console.log("[RoomManagementService] GET_ROOM_CHAT_MES thành công, data nhận về:", response);
        return response;
    },

    async sendRoomChat(roomName: string, mes: string): Promise<SendRoomChatResponseData> {
        console.log(`[RoomManagementService] Bắt đầu gọi SEND_CHAT tới phòng "${roomName}":`, mes);
        await websocketService.connect();
        const response = await websocketService.request<SendRoomChatResponseData, SendRoomChatData>(
            WS_EVENTS.SEND_CHAT,
            { type: "room", to: roomName, mes }
        );
        console.log("[RoomManagementService] SEND_CHAT thành công, data nhận về:", response);
        return response;
    },

    async getUserList(): Promise<UserListItem[]> {
        console.log("[RoomManagementService] Bắt đầu gọi GET_USER_LIST");
        await websocketService.connect();
        const response = await websocketService.request<UserListItem[]>(
            WS_EVENTS.GET_USER_LIST, undefined
        );
        console.log("[RoomManagementService] GET_USER_LIST thành công, data nhận về:", response);
        return response;
    },


    // onRoomMessage(callback: (message: SendRoomChatResponseData) => void): () => void {
    //     return websocketService.on<SendRoomChatResponseData>(WS_EVENTS.SEND_CHAT, callback);
    // },
};
