import {ChatMessageType} from "../config/WSEventsEnum.ts";
import {isJoinRoomLink} from "./joinRoomLink.ts";

export function getChatMessageType(content: string): ChatMessageType {
    if (isJoinRoomLink(content)) {
        return ChatMessageType.JOIN_ROOM_LINK;
    }

    if (isGiphyGIF(content)){
        return ChatMessageType.GIF
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

    if(isHtml(content)){
        return ChatMessageType.HTML;
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

export function isHtml(content: string): boolean {
    if (!content) return false;

    const doc = new DOMParser().parseFromString(content, "text/html");

    return Array.from(doc.body.childNodes).some(
        (node) => node.nodeType === Node.ELEMENT_NODE
    );
}

export function isGiphyGIF(content: string): boolean {
    try {
        const url = new URL(content);

        const isGiphyDomain =
            url.hostname === "giphy.com" ||
            url.hostname.endsWith(".giphy.com");

        if (!isGiphyDomain) {
            return false;
        }

        const path = url.pathname.toLowerCase();

        return (
            path.endsWith(".gif") ||
            path.endsWith(".webp") ||
            path.endsWith(".mp4")
        );
    } catch {
        return false;
    }
}