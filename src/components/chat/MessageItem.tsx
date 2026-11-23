
import type { ChatMessage } from "../../types/Chat.ts";
import { formatMessageTime } from "../../utils/DateUtils.ts";

interface Props {
    message: ChatMessage;
    showSender?: boolean;
}

const MessageItem = ({ message, showSender = false }: Props) => {
    const firstChar =
        message.sender?.trim().charAt(0).toUpperCase() || "?";

    return (
        <div
            className={`chat-message-row d-flex gap-2 ${
                message.isMine
                    ? "justify-content-end"
                    : "justify-content-start"
            }`}
        >
            {!message.isMine && (
                <div className="chat-message-avatar">
                    {firstChar}
                </div>
            )}

            <div
                className={`chat-message-content d-flex flex-column ${
                    message.isMine
                        ? "align-items-end"
                        : "align-items-start"
                }`}
            >
                {showSender && !message.isMine && (
                    <small className="fw-semibold text-muted mb-1">
                        {message.sender}
                    </small>
                )}

                <div
                    className={`chat-message-bubble ${
                        message.isMine
                            ? "chat-message-mine"
                            : "chat-message-theirs"
                    }`}
                >
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