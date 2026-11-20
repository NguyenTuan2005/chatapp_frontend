
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatMessage } from "../../types/Chat";
import { getPeopleMessagesThunk } from "../../thunks/ChatThunk";

interface ChatState {
    messages: ChatMessage[];
    loading: boolean;
    error: string | null;
}

const initialState: ChatState = {
    messages: [],
    loading: false,
    error: null
};

const chatSlice = createSlice({
    name: "chat",
    initialState,

    reducers: {
        addMessage(state, action: PayloadAction<ChatMessage>) {
            state.messages.push(action.payload);
        },

        setMessages(state, action: PayloadAction<ChatMessage[]>) {
            state.messages = action.payload;
        },

        clearMessages(state) {
            state.messages = [];
        }
    },

    extraReducers: builder => {
        builder
            .addCase(getPeopleMessagesThunk.pending, state => {
                state.loading = true;
                state.error = null;
                state.messages = [];
            })

            .addCase(getPeopleMessagesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })

            .addCase(getPeopleMessagesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ?? "Cannot load chat messages";
            });
    }
});

export const {
    addMessage,
    setMessages,
    clearMessages
} = chatSlice.actions;

export default chatSlice.reducer;
