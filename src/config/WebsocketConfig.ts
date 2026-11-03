

export const WS_CONFIG = {
    URL: import.meta.env.VITE_CHAT_WS_URL,

    RECONNECT_INTERVAL: 5000,

    MAX_RECONNECT_ATTEMPTS: 10,

    HEARTBEAT_INTERVAL: 30000,
} as const;



export const WS_EVENTS = {

    REGISTER: 'REGISTER',
    LOGIN: 'LOGIN',
    RE_LOGIN: 'RE_LOGIN',
    LOGOUT: 'LOGOUT',

    GET_USER_LIST: 'GET_USER_LIST',
    CHECK_USER_ONLINE: 'CHECK_USER_ONLINE',
    CHECK_USER_EXIST: 'CHECK_USER_EXIST',

    CREATE_ROOM: 'CREATE_ROOM',
    JOIN_ROOM: 'JOIN_ROOM',
    OUT_ROOM: 'OUT_ROOM',
    GET_ROOM_CHAT_MES: 'GET_ROOM_CHAT_MES',

    GET_PEOPLE_CHAT_MES: 'GET_PEOPLE_CHAT_MES',

    SEND_CHAT: 'SEND_CHAT',
} as const;


export const WS_CHAT_CONFIG = {
    MESSAGE_TYPE: {
        PRIVATE: 0,
        GROUP: 1,
    },

    DEFAULT_PAGE_SIZE: 50,
} as const;


export const WS_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
} as const;



export type WebSocketEvent =
    (typeof WS_EVENTS)[keyof typeof WS_EVENTS];

export type WebSocketStatus =
    (typeof WS_STATUS)[keyof typeof WS_STATUS];

export type ChatMessageType =
    (typeof WS_CHAT_CONFIG.MESSAGE_TYPE)[keyof typeof WS_CHAT_CONFIG.MESSAGE_TYPE];
