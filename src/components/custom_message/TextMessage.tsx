import {formatMessageDate} from "../../utils/DateUtils";
import MessageItem from "../chat/MessageItem";
import { MessageDateSeparator } from "../chat/MessageSeparator";
import type {ChatMessage} from "../../types/Chat.ts";


export interface TextMessageProps {
    message: ChatMessage;
    showSender?: boolean;
    showDateSeparator: boolean;
}

export function TextMessage({ message, showSender, showDateSeparator }: TextMessageProps) {


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
}