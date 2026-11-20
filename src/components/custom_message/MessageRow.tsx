import type { ReactNode } from "react";

interface MessageRowProps {
    isMine: boolean;
    time?: string;
    avatarText?: string;
    children: ReactNode;
}

export const MessageRow = ({ isMine, time, avatarText = "T", children }: MessageRowProps) => (
    <div
        className={`chat-message-row d-flex gap-2 ${
            isMine ? "justify-content-end" : "justify-content-start"
        }`}
    >
        {!isMine && <div className="chat-message-avatar">{avatarText}</div>}

        <div
            className={`chat-message-content d-flex flex-column ${
                isMine ? "align-items-end" : "align-items-start"
            }`}
        >
            {children}

            {time && <small className="chat-message-time">{time}</small>}
        </div>
    </div>
);