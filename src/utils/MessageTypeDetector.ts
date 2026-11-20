import { ChatMessageType } from "../config/WSEventsEnum.ts";
import {isJoinRoomLink} from "./joinRoomLink.ts";

export function getChatMessageType(content: string): ChatMessageType {
    if (isJoinRoomLink(content)) {
        return ChatMessageType.JOIN_ROOM_LINK;
    }

    if (isPreviewLink(content)) {
        return ChatMessageType.PREVIEW_LINK;
    }

    if (isImage(content)) {
        return ChatMessageType.IMAGE;
    }

    if (isIcon(content)) {
        return ChatMessageType.ICON;
    }

    return ChatMessageType.TEXT;
}



export function isPreviewLink(content: string): boolean {
    return content.startsWith("http://") ||
        content.startsWith("https://");
}

export function isImage(content: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(content);
}

export function isIcon(content: string): boolean {
    return content.startsWith(":icon:");
}