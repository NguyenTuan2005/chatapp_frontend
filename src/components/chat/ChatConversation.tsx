import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList.tsx";
import MessageInput from "./MessageInput.tsx";
import type {ChatMessage} from "../../types/Chat.ts";
import {ChatService} from "../../wsservices/ChatService.ts";
import {USER_KEY} from "../../config/WSEventsEnum.ts";
import {reLoginStorage} from "../../thunks/AuthThunk.ts";
import {useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../../store/Store.ts";
import {addMessage, clearMessages} from "../../store/slice/ChatSlice.ts";
import {useEffect} from "react";
import {getPeopleMessagesThunk} from "../../thunks/ChatThunk.ts";

const ChatConversation = () => {

    const { username: recipientUsername } = useParams();

    const currentUsername = reLoginStorage.get(USER_KEY);

    const dispatch = useAppDispatch();

    const { messages, loading, error } = useAppSelector(
        state => state.chat
    );

    useEffect(() => {
        if (!recipientUsername || !currentUsername) {
            console.error("Missing username");
            return;
        }

        dispatch(getPeopleMessagesThunk({
            recipientUsername,
            currentUsername,
            page: 1
        }));

        return () => {
            dispatch(clearMessages());
        };
    }, [recipientUsername, currentUsername, dispatch]);

    useEffect(() => {
        if (!recipientUsername || !currentUsername) return;

        const unsubscribe = ChatService.subscribeToIncomingMessages(
            message => {
                console.log("[Chat] Incoming message:", message);

                if (
                    message.to !== currentUsername ||
                    message.name !== recipientUsername
                ) {
                    return;
                }

                const newMessage: ChatMessage = {
                    id: crypto.randomUUID(),
                    sender: message.name,
                    content: message.mes,
                    createdAt: new Date().toISOString(),
                    isMine: false
                };

                dispatch(addMessage(newMessage));
            }
        );

        return unsubscribe;
    }, [recipientUsername, currentUsername, dispatch]);

    const handleSendMessage = (content: string): void => {
        if (!recipientUsername || !currentUsername) {
            console.error("Missing username");
            return;
        }

        try {
            ChatService.sendPeopleMessage(
                recipientUsername,
                content
            );

            const newMessage: ChatMessage = {
                id: crypto.randomUUID(),
                sender: currentUsername,
                content,
                createdAt: new Date().toISOString(),
                isMine: true
            };

            dispatch(addMessage(newMessage));

        } catch (error) {
            console.error("Send message failed:", error);
            throw error;
        }
    };

    return (
        <section className="chat-conversation d-flex flex-column">

            <ChatHeader />

            {loading && (
                <div className="text-center p-3">
                    Đang tải tin nhắn...
                </div>
            )}

            {error && (
                <div className="text-danger text-center p-3">
                    {error}
                </div>
            )}

            <MessageList messages={messages} />

            <MessageInput onSend={handleSendMessage} />

        </section>
    );
};

export default ChatConversation;

