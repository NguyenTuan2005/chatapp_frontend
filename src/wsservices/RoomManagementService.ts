// import type {WebSocketData} from "../types/WebSocketData";
// import type {CreateRoomRequest, Room} from "../types/RoomManagementData";
// import {ACTION_ON_CHAT, ResponseStatus, WS_EVENTS} from "../config/WSEventsEnum.ts";
// import wsClient from "../config/Websocket.ts";
//
//
//
// export const createRoomSocket = (
//     roomName: string
// ): Promise<Room> => {
//     return new Promise((resolve, reject) => {
//         if (wsClient().readyState !== WebSocket.OPEN) {
//             reject(new Error("WebSocket is not connected"));
//             return;
//         }
//
//         const request: WebSocketData<CreateRoomRequest> = {
//             action: ACTION_ON_CHAT,
//             data: {
//                 event: WS_EVENTS.CREATE_ROOM,
//                 data: {
//                     name: roomName,
//                 },
//             },
//         };
//
//         const handleMessage = (event: MessageEvent) => {
//             const response = JSON.parse(event.data);
//
//             if (response.event !== WS_EVENTS.CREATE_ROOM) return;
//
//             websocket.removeEventListener("message", handleMessage);
//
//             if (response.status === ResponseStatus.SUCCESS) {
//                 resolve(response.data);
//             } else {
//                 reject(new Error(response.mes));
//             }
//         };
//
//         socket.addEventListener("message", handleMessage);
//         socket.send(JSON.stringify(request));
//     });
// };