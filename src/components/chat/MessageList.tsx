import {useEffect, useRef} from "react";
import type {ChatMessage} from "../../types/Chat.ts";
import {getChatDateKey} from "../../utils/DateUtils.ts";
import {getChatMessageType} from "../../utils/MessageTypeDetector.ts";
import {ChatMessageFactory} from "../../utils/ChatMassageFacatory.tsx";


interface Props {
    messages: ChatMessage[];
    showSender?: boolean;
}

const MessageList = ({messages, showSender = false}: Props) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <main className="chat-message-list flex-grow-1 overflow-auto">
            <div className="chat-message-content-area">

                <div className="d-flex flex-column gap-3">
                    {messages.map((message, index) => {
                        const previousMessage = messages[index - 1];

                        const showDateSeparator =
                            !previousMessage ||
                            getChatDateKey(previousMessage.createdAt) !==
                            getChatDateKey(message.createdAt);

                        const type = getChatMessageType(message.content);

                        return (
                            <div key={message.id}>
                                <ChatMessageFactory
                                    type={type}
                                    chatMessage={message}
                                    showDateSeparator={showDateSeparator}
                                    showSender={showSender}
                                />
                            </div>
                        );
                    })}
                </div>

                <div ref={bottomRef}/>
            </div>
        </main>
    );
};

export default MessageList;