
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatService } from "../wsservices/ChatService";
import type {
    ChatMessage,
    ChatMessageResponse
} from "../types/Chat";
import { parseChatDate } from "../utils/DateUtils";

interface GetPeopleMessagesParams {
    recipientUsername: string;
    currentUsername: string;
    page: number;
}

export const getPeopleMessagesThunk = createAsyncThunk<
    ChatMessage[],
    GetPeopleMessagesParams,
    { rejectValue: string }
>(
    "chat/getPeopleMessages",
    async ({ recipientUsername, currentUsername, page }, { rejectWithValue }) => {
        try {
            const response: ChatMessageResponse[] = await ChatService.getPeopleMessages(recipientUsername, page);

            const messages: ChatMessage[] = response
                .map(message => ({
                    id: message.id,
                    sender: message.name,
                    content: message.mes,
                    createdAt: parseChatDate(
                        message.createAt
                    ).toISOString(),
                    isMine: message.name === currentUsername
                }))
                .sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                );

            return messages;

        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Cannot load chat messages"
            );
        }
    }
);
