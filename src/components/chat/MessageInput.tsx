
import React, { useState } from "react";

export interface MessageInputProps {
    onSend: (content: string) => void;
}


const MessageInput = ({ onSend }: MessageInputProps) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        const content = message.trim();

        if (!content) return;

        try {
            onSend(content);
            setMessage("");
        } catch (error) {
            console.error("Cannot send message:", error);
        }
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void handleSend();
        }
    };

    return (
        <footer className="chat-input-area">

            <div className="chat-input-toolbar d-flex align-items-center gap-3 px-3 pt-2 pb-1">
                <button className="btn btn-link chat-toolbar-btn" title="Emoji">
                    <i className="bi bi-emoji-smile"></i>
                </button>

                <button className="btn btn-link chat-toolbar-btn" title="Hình ảnh">
                    <i className="bi bi-image"></i>
                </button>

                <button className="btn btn-link chat-toolbar-btn" title="Đính kèm">
                    <i className="bi bi-paperclip"></i>
                </button>
            </div>

            <div className="chat-input-main d-flex align-items-end gap-2 px-3 pb-3">

                <textarea
                    className="form-control chat-textarea"
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />

                <button
                    className="btn btn-primary chat-send-button"
                    onClick={() => void handleSend()}
                    title="Gửi tin nhắn"
                >
                    <i className="bi bi-send-fill"></i>
                </button>

            </div>
        </footer>
    );
};

export default MessageInput;