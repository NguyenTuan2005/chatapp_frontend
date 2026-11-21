
import { useEffect, useRef } from "react";
import { MessageDateSeparator } from "./MessageSeparator.tsx";
import type { ChatMessage } from "../../types/Chat.ts";
import MessageItem from "./MessageItem.tsx";
import {
    formatMessageDate,
    getChatDateKey
} from "../../utils/DateUtils.ts";

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

                        return (
                            <div key={message.id}>
                                {showDateSeparator && (
                                    <MessageDateSeparator
                                        date={formatMessageDate(message.createdAt)}
                                    />
                                )}

                                <MessageItem
                                    message={message}
                                    showSender={showSender}
                                />
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
