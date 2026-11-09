import type {UserSidebar} from "../types/SiderbarData.ts";
import {websocketService} from "../config/Websocket.ts";
import {WS_EVENTS} from "../config/WSEventsEnum.ts";


export const SidebarService = {
    async getUserList(): Promise<UserSidebar[]>{
        await websocketService.connect();

        return await websocketService.request<
            UserSidebar[],
            {}
        >(WS_EVENTS.GET_USER_LIST, {});
    }
}