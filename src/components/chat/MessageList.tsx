import { useEffect, useRef } from "react";

import MessageItem, {type ChatMessage} from "./MessageItem";
import {MessageDateSeparator} from "./MessageSeparator.tsx";


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
                        T
                    </div>

                    <h6 className="fw-semibold mb-1">
                        Ti Nguyễn
                    </h6>

                    <small className="text-muted">
                        Đây là cuộc trò chuyện giữa bạn và Ti Nguyễn.
                    </small>
                </div>

                <MessageDateSeparator date="Hôm nay" />

                <div className="d-flex flex-column gap-3">
                    {messages.map((message) => (
                        <MessageItem
                            key={message.id}
                            message={message}
                        />
                    ))}
                </div>

                <div ref={bottomRef} />

            </div>

        </main>
    );
};

export default MessageList;