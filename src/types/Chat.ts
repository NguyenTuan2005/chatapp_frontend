export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
}

export interface Conversation {
    id: string;
    user: User;
    lastMessage: string;
    updatedAt: string;
    unreadCount: number;
}

export interface ChatMessage {
    id: number;
    sender: string;
    content: string;
    createdAt: Date;
    isMine: boolean;
}

export interface ChatMessageResponse {
    id: number;
    name: string;
    to: string;
    mes: string;
    createAt: string;
    type: number;
}