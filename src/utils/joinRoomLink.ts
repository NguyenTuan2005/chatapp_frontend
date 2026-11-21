const domainFe = import.meta.env.VITE_DOMAIN_FE;

export const JOIN_ROOM_CONFIRMATION_URL =
    `${domainFe}/join-room/confirmation/`;

export function isJoinRoomLink(url: string): boolean {
    return url.startsWith(JOIN_ROOM_CONFIRMATION_URL);
}


export function getGroupNameFromUrl(url: string): string {
    if (!isJoinRoomLink(url)) return "";
    const name = url.slice(JOIN_ROOM_CONFIRMATION_URL.length).split(/[?#]/)[0];
    return decodeURIComponent(name);
}

// utils/joinRoomLink.ts
const CONFIRMATION_SEGMENT = "/join-room/confirmation/";


export function getRoomNameFromUrl(url: string): string | null {
    try {
        const { pathname } = new URL(url);

        if (!pathname.startsWith(CONFIRMATION_SEGMENT)) return null;

        const roomName = pathname
            .slice(CONFIRMATION_SEGMENT.length)
            .replace(/\/+$/, "");

        return roomName ? decodeURIComponent(roomName) : null;
    } catch {
        return null;
    }
}
