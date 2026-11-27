import { websocketService } from "../config/Websocket.ts";
import { WS_EVENTS } from "../config/WSEventsEnum.ts";
import type {LoginRequest, ReLoginRequest} from "../types/AuthData.ts";

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

    async reLogin(credentials: ReLoginRequest["data"]): Promise<string> {
        await websocketService.connect();

        const { RE_LOGIN_CODE } = await websocketService.request<
            LoginResponseData,
            ReLoginRequest["data"]
        >(WS_EVENTS.RE_LOGIN, credentials);

        return RE_LOGIN_CODE;
    },
    async checkUserExist(user: string): Promise<boolean> {
        const data = await websocketService.request<{ status: boolean }>(
            WS_EVENTS.CHECK_USER_EXIST,
            { user }
        );
        return data.status;
    },
    async logout(): Promise<string> {
        const data = await websocketService.request<string, {}>(
            WS_EVENTS.LOGOUT,
            {}
        );
        return data;
    }
};