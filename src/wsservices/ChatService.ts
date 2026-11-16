import type {ChatMessageResponse} from "../types/Chat.ts";
import {websocketService} from "../config/Websocket.ts";
import {ACTION_ON_CHAT, WS_EVENTS} from "../config/WSEventsEnum.ts";



export const ChatService = {
    async getPeopleMessages(
        username: string,
        page: number
    ): Promise<ChatMessageResponse[]> {

        try {
            console.log("Sending GET_PEOPLE_CHAT_MES...");

            const payload = {
                name: username,
                page
            };
            console.log("GET_PEOPLE_CHAT_MES payload:", payload);

            const messages = await websocketService.request<
                ChatMessageResponse[],
                {
                    name: string;
                    page: number;
                }
            >(WS_EVENTS.GET_PEOPLE_CHAT_MES, {
                name: username,
                page
            });

            console.log("Received messages:", messages);

            return messages;
        } catch (error) {
            console.error("Get messages error:", error);
            throw error;
        }
    },

    sendPeopleMessage(
        recipientUsername: string,
        content: string
    ): void {
        websocketService.send({
            action: ACTION_ON_CHAT,
            data: {
                event: WS_EVENTS.SEND_CHAT,
                data: {
                    type: "people",
                    to: recipientUsername,
                    mes: content
                }
            }
        });
    }
};