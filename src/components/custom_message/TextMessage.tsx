import {formatMessageDate} from "../../utils/DateUtils";
import MessageItem from "../chat/MessageItem";
import { MessageDateSeparator } from "../chat/MessageSeparator";
import type {ChatMessage} from "../../types/Chat.ts";


export interface TextMessageProps {
    message: ChatMessage;
    showDateSeparator: boolean;
}

export function TextMessage({ message, showDateSeparator }: TextMessageProps) {


    return (
        <div>
            {showDateSeparator && (
                <MessageDateSeparator date={formatMessageDate(message.createdAt)} />
            )}

            <MessageItem message={message} />
        </div>
    );
}