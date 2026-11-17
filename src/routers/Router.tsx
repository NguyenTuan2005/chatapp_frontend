import {createBrowserRouter, Navigate, Outlet} from 'react-router';
import NotFound from "../components/common/NotFound.tsx";
import Login from "../pages/Login.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import {RoomConversation} from "../components/room/RoomConversation.tsx";
import {useAppSelector} from "../store/Store.ts";
import Hehe from "../pages/Test.tsx";
import AppSkeleton from "../components/common/AppSkeleton.tsx";
import ChatPage from "../pages/ChatPage.tsx";

export const router = createBrowserRouter([
    {
        children: [
            {
                path: "*",
                element: <NotFound/>
            },
            {path: "/hehe", element: <Hehe/>}
        ]
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <MainLayout/>,
                children: [
                    { path: "/", element: <RoomConversation/>},
                    {path: "/chat/:username", element: <ChatPage/>}
                ]
            }
        ]
    },
    {
        element: <GuestRoute/>,
        children: [
            { path: "/login", element: <Login/> }
        ]
    }
])

function ProtectedRoute() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const relogin = useAppSelector(state => state.auth.relogin);

    if (relogin) return <AppSkeleton/>;
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>
}

function GuestRoute() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}