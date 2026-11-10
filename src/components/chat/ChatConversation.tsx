import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList.tsx";
import MessageInput from "./MessageInput.tsx";
import {useEffect, useState} from "react";
import type {ChatMessage, ChatMessageResponse} from "../../types/Chat.ts";
import {ChatService} from "../../wsservices/ChatService.ts";
import {parseChatDate} from "../../utils/DateUtils.ts";
import {USER_KEY} from "../../config/WSEventsEnum.ts";
import {reLoginStorage} from "../../thunks/AuthThunk.ts";
import {useParams} from "react-router";



const ChatConversation = () => {

    const { username: targetUsername } = useParams();

    const currentUsername = reLoginStorage.get(USER_KEY);

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {

        if (!targetUsername || !currentUsername) {
            console.error("Missing username");
            return;
        }

        console.log("1. Start loading messages");

        const loadMessages = async () => {
            try {

                console.log("Current user:", currentUsername);
                console.log("Chat with:", targetUsername);

                const response = await ChatService.getPeopleMessages(targetUsername, 1);


                console.log("2. Chat messages:", response);


                const chatMessages: ChatMessage[] = response
                    .map(message => (
                        mapChatMessage(message, currentUsername)
                    ))
                    .sort((a, b) =>
                        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    );


                setMessages(chatMessages);

            } catch (error) {
                console.error("Cannot load chat messages:", error);
            }
        };

        loadMessages();
    }, []);

    const handleSendMessage = (content: string) => {
        const newMessage: ChatMessage = {
            id: Date.now(),
            sender: "hoang",
            content: content,
            createdAt: new Date().toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            isMine: true,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };


    return (
        <section className="chat-conversation d-flex flex-column">

            <ChatHeader />

            <MessageList messages={messages} />

            <MessageInput onSend={handleSendMessage} />

        </section>
    );
};

export default ChatConversation;


export function mapChatMessage(
    message: ChatMessageResponse,
    currentUsername: string
): ChatMessage {
    return {
        id: message.id,
        sender: message.name,
        content: message.mes,
        createdAt: parseChatDate(message.createAt),
        isMine: message.name === currentUsername,
    };
}
