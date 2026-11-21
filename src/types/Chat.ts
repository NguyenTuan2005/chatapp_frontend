export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
}

export interface ChatMessage {
    id: string | number;
    sender: string;
    content: string;
    createdAt: string;
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


export interface SendChatResponse {
    name: string;
    to: string;
    mes: string;
    type: number;
}