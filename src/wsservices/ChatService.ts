import type {ChatMessageResponse} from "../types/Chat.ts";
import {websocketService} from "../config/Websocket.ts";
import {WS_EVENTS} from "../config/WSEventsEnum.ts";

export interface WebSocketRequest<T> {
    action: "onchat";
    data: {
        event: string;
        data: T;
    };
}

export interface WebSocketResponse<T> {
    status: string;
    event: string;
    data: T;
}


export const ChatService = {
    async getPeopleMessages(
        username: string,
        page: number
    ): Promise<ChatMessageResponse[]> {

        return websocketService.request<
            ChatMessageResponse[],
            {
                name: string;
                page: number;
            }
        >(WS_EVENTS.GET_PEOPLE_CHAT_MES, {
            name: username,
            page
        });
    }
};