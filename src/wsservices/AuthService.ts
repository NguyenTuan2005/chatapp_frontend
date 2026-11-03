import { websocketService } from "../config/Websocket.ts";
import { WS_EVENTS } from "../config/WSEventsEnum.ts";
import type { LoginRequest } from "../types/AuthData.ts";

interface LoginResponseData {
    RE_LOGIN_CODE: string;
}

export const AuthService = {
    async login(credentials: LoginRequest["data"]): Promise<string> {
        await websocketService.connect();

        const { RE_LOGIN_CODE } = await websocketService.request<
            LoginResponseData,
            LoginRequest["data"]
        >(WS_EVENTS.LOGIN, credentials);

        return RE_LOGIN_CODE;
    },
};