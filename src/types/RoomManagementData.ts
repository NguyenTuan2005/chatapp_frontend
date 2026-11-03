import {WS_EVENTS} from "../config/WSEventsEnum.ts";


export interface Room {
    name: string;
    user: {
        id: string;
        name: string;
    }[];
    chatMess: [];
}



export interface CreateRoomRequest{
    event: WS_EVENTS.CREATE_ROOM,
    data: {
        name: string;
    };
}

export interface JoinRoomRequest {
    event: WS_EVENTS.JOIN_ROOM,
    data: {
        name: string;
    };
}

export interface OutRoomRequest {
    event:  WS_EVENTS.OUT_ROOM,
    data: {
        name: string;
    };
}

export interface GetPeopleChatMsRequest{
    event:  WS_EVENTS.GET_PEOPLE_CHAT_MES,
    data: {
        name: string;
        page: number;
    };
}