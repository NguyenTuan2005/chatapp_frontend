import { configureStore } from "@reduxjs/toolkit";
import roomManagementReducer from "./slice/RoomManagementSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "./slice/AuthSlice.ts";
import sidebarSlice from "./slice/SidebarSlice.ts";

import chatInfoSidebarSlice from "./slice/ChatInfoSidebarSlice.ts";

export const store = configureStore({
    reducer: {
        roomManagement: roomManagementReducer,
        auth: authSlice,
        chatSidebar: chatInfoSidebarSlice,
        siderbar: sidebarSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();