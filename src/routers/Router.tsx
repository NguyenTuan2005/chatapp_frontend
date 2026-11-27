import {createBrowserRouter, Navigate, Outlet} from 'react-router';
import NotFound from "../components/common/NotFound.tsx";
import Login from "../pages/Login.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import {useAppSelector} from "../store/Store.ts";
import AppSkeleton from "../components/common/AppSkeleton.tsx";
import PeopleChatPage from "../pages/PeopleChatPage.tsx";
import {DefaultChat} from "../pages/DefaultChat.tsx";
import {RoomConversation} from "../components/room/RoomConversation.tsx";
import {ConfirmationJoinRoom} from "../pages/ConfirmationJoinRoom.tsx";
import {OutRoomSuccess} from "../pages/OutRoomSuccess.tsx";
import Register from "../pages/Register.tsx";

export const router = createBrowserRouter([
    {
        children: [
            {
                path: "*",
                element: <NotFound/>
            },
        ]
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <MainLayout/>,
                children: [
                    { path: "/", element: <DefaultChat/>},
                    {path : "/chat/room/:roomName", element: <RoomConversation/>},
                    {path : "/chat/room/out-room-success/:roomName", element: <OutRoomSuccess/>},
                    {path : "/join-room/confirmation/:roomName", element: <ConfirmationJoinRoom isRejoin={false}/>},
                    {path: "/chat/people/:username", element: <PeopleChatPage/>}
                ]
            }
        ]
    },
    {
        element: <GuestRoute/>,
        children: [
            { path: "/login", element: <Login/> },
            { path: "/register", element: <Register/> }
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