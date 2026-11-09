import type {ChatMessage} from "../../types/Chat.ts";
import {formatMessageTime} from "../../utils/DateUtils.ts";

interface Props {
    message: ChatMessage;
}

const MessageItem = ({ message }: Props) => {
    return (
        <div
            className={`chat-message-row d-flex gap-2 ${
                message.isMine ? "justify-content-end" : "justify-content-start"
            }`}
        >
            {!message.isMine && (
                <div className="chat-message-avatar">
                    T
                </div>
            )}

            <div className={`chat-message-content d-flex flex-column ${
                message.isMine ? "align-items-end" : "align-items-start"
            }`}>

                <div className={`chat-message-bubble ${
                    message.isMine ? "chat-message-mine" : "chat-message-theirs"
                }`}>
                    {message.content}
                </div>

                <small className="chat-message-time">
                    {formatMessageTime(message.createdAt)}
                </small>

            </div>
        </div>
    );
};

export default MessageItem;