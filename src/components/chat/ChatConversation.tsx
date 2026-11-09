import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList.tsx";
import MessageInput from "./MessageInput.tsx";
import {useEffect, useState} from "react";
import type {ChatMessage} from "../../types/Chat.ts";
import {ChatService} from "../../wsservices/ChatService.ts";



const ChatConversation = () => {

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {

        console.log("1. Start loading messages");

        const loadMessages = async () => {
            try {

                const response = await ChatService.getPeopleMessages("henryfeng", 1);


                console.log("2. Chat messages:", response);


                const chatMessages: ChatMessage[] = response
                    .map((message) => ({
                        id: message.id,
                        name: message.name,
                        mes: message.mes,
                        createAt: message.createAt,
                        isMine: message.name === "hoang",
                    }))
                    .sort((a, b) =>
                        new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
                    );


                setMessages(chatMessages);

            } catch (error) {
                console.error("Cannot load chat messages:", error);


                console.log("3. Messages failed:", messages);
            }
        };

        loadMessages();
    }, []);

    const handleSendMessage = (content: string) => {
        const newMessage: ChatMessage = {
            id: Date.now(),
            name: "hoang",
            mes: content,
            createAt: new Date().toLocaleTimeString("vi-VN", {
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
