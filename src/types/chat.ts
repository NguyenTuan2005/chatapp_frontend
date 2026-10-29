export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
}

export interface Conversation {
    id: string;
    user: User;
    lastMessage: string;
    updatedAt: string;
    unreadCount: number;
}