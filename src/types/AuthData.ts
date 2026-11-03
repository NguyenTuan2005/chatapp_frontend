import {WS_EVENTS} from "../config/WSEventsEnum.ts";

export interface LoginRequest {
    event: WS_EVENTS.LOGIN,
    data: {
        user: string;
        pass: string;
    };
}