import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList.tsx";
import MessageInput from "./MessageInput.tsx";
import type {ChatMessage} from "./MessageItem.tsx";
import {useState} from "react";

const MOCK_MESSAGES: ChatMessage[] = [
    {
        id: 1,
        name: "ti",
        mes: "Chào bạn, bạn đang làm gì đấy?",
        createAt: "09:30",
        isMine: false,
    },
    {
        id: 1,
        name: "ti",
        mes: "Chan bố mayf đê?",
        createAt: "09:30",
        isMine: false,
    },
    {
        id: 2,
        name: "long",
        mes: "Mình đang xây dựng một ứng dụng chat bằng React và Spring Boot.",
        createAt: "09:31",
        isMine: true,
    },
    {
        id: 3,
        name: "ti",
        mes: "Ồ, bạn sử dụng WebSocket để giao tiếp realtime à?",
        createAt: "09:32",
        isMine: false,
    },
    {
        id: 4,
        name: "long",
        mes: "Đúng rồi, hiện tại mình đang hoàn thiện giao diện trước.",
        createAt: "09:33",
        isMine: true,
    },
];


const ChatConversation = () => {
    const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);

    const handleSendMessage = (content: string) => {
        const newMessage: ChatMessage = {
            id: Date.now(),
            name: "long",
            mes: content,
            createAt: new Date().toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            isMine: true,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        // setMessages(() => [newMessage]);
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
