
// @ts-ignore
export enum WS_EVENTS {
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    RE_LOGIN = 'RE_LOGIN',
    LOGOUT = 'LOGOUT',

    GET_USER_LIST = 'GET_USER_LIST',
    CHECK_USER_ONLINE = 'CHECK_USER_ONLINE',
    CHECK_USER_EXIST = 'CHECK_USER_EXIST',

    CREATE_ROOM = 'CREATE_ROOM',
    JOIN_ROOM = 'JOIN_ROOM',
    OUT_ROOM = 'OUT_ROOM',
    GET_ROOM_CHAT_MES = 'GET_ROOM_CHAT_MES',

    GET_PEOPLE_CHAT_MES = 'GET_PEOPLE_CHAT_MES',

    SEND_CHAT = 'SEND_CHAT',
}
// @ts-ignore
export enum ResponseStatus {
    SUCCESS = 'success',
    ERROR = 'error',
    PENDING = 'pending',
}

export const ACTION_ON_CHAT = "onchat";

// @ts-ignore
export const WS_DESTINATIONS = {
    CREATE_ROOM: "/app/chat.createRoom",
    ROOM_RESPONSE: "/topic/messages",
}