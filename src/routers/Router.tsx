import {createBrowserRouter, Navigate, Outlet} from 'react-router';
import NotFound from "../components/common/NotFound.tsx";
import Login from "../pages/Login.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import {RoomConversation} from "../components/RoomConversation.tsx";

import {useAppSelector} from "../store/Store.ts";
import ChatPage from "../pages/ChatPage.tsx";

export const router = createBrowserRouter([
    {
        children: [
            {
                path: "*",
                element: <NotFound/>
            },
            {path: "/login", element: <Login/>},
            {path: "/chat/:username", element: <ChatPage/>}
        ]
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <MainLayout/>,
                children: [
                    {path: "/home", element: <RoomConversation/>},
                    // {path: "/chat/:username", element: <ChatPage/>}
                ]
            }
        ]
    }
])

function ProtectedRoute() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>
}