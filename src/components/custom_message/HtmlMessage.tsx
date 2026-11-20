
import type {ChatMessage} from "../../types/Chat.ts";
import DOMPurify from "dompurify";
import {MessageRow} from "./MessageRow.tsx";

import "../../styles/HtmlMessage.css";


export interface HtmlMessageProps {
    message: ChatMessage;
}

export function HtmlMessage({ message }: HtmlMessageProps) {
    const isMine = message.isMine;

    return (
        <>
            <MessageRow isMine={isMine} createdAt={message.createdAt}>
                <div
                    className={`chat-message-bubble ${
                        isMine ? "chat-message-mine" : "chat-message-theirs"
                    }`}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}
                />

            </MessageRow>
        </>
    );
}