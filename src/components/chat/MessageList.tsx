import { useEffect, useRef } from "react";


import {MessageDateSeparator} from "./MessageSeparator.tsx";
import type {ChatMessage} from "../../types/Chat.ts";
import MessageItem from "./MessageItem.tsx";
import {formatMessageDate, getChatDateKey} from "../../utils/DateUtils.ts";


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
                        Henry Feng 🐉
                    </h6>

                </div>

                <div className="d-flex flex-column gap-3">
                    {messages.map((message, index) => {
                        const previousMessage = messages[index - 1];

                        const showDateSeparator =
                            !previousMessage ||
                            getChatDateKey(previousMessage.createdAt) !==
                            getChatDateKey(message.createdAt);

                        return (
                            <div key={message.id}>
                                {showDateSeparator && (
                                    <MessageDateSeparator
                                        date={formatMessageDate(message.createdAt)}
                                    />
                                )}

                                <MessageItem message={message} />
                            </div>
                        );
                    })}
                </div>

                <div ref={bottomRef} />

            </div>

        </main>
    );
};

export default MessageList;