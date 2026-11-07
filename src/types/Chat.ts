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
    name: string;
    mes: string;
    createAt: string;
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