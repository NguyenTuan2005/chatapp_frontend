import { useEffect, useRef } from "react";


import type {ChatMessage} from "../../types/Chat.ts";
import { getChatDateKey} from "../../utils/DateUtils.ts";
import {ChatMessageFactory} from "../../utils/ChatMassageFacatory.tsx";
import {getChatMessageType} from "../../utils/MessageTypeDetector.ts";


interface Props {
    messages: ChatMessage[];
}

const MessageList = ({ messages }: Props) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <main className="chat-message-list flex-grow-1 overflow-auto">

            <div className="chat-message-content-area">

                <div className="chat-start-info text-center">
                    <div className="chat-user-avatar chat-user-avatar-large mx-auto mb-2">
                        H
                    </div>

                    <h6 className="fw-semibold mb-1">

                    </h6>

                </div>

                <div className="d-flex flex-column gap-3">
                    {messages.map((message, index) => {
                        const previousMessage = messages[index - 1];

                        const showDateSeparator =
                            !previousMessage ||
                            getChatDateKey(previousMessage.createdAt) !==
                            getChatDateKey(message.createdAt);

                        const type = getChatMessageType(message.content);

                        return(
                            <ChatMessageFactory
                                type={type}
                                       chatMessage={message}
                                                showDateSeparator={showDateSeparator} />
                        );
                    })}
                </div>

                <div ref={bottomRef} />

            </div>

        </main>
    );
};

export default MessageList;