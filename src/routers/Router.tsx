import {createBrowserRouter, Navigate, Outlet} from 'react-router';
import NotFound from "../components/common/NotFound.tsx";
import Login from "../pages/Login.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import {RoomConversation} from "../components/room/RoomConversation.tsx";

import {useAppSelector} from "../store/Store.ts";
import Hehe from "../pages/Test.tsx";

export const router = createBrowserRouter([
    {
        children: [
            {
                path: "*",
                element: <NotFound/>
            },
            { path: "/login", element: <Login/> },
            {path: "/hehe", element: <Hehe/>}
        ]
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <MainLayout/>,
                children: [
                    { path: "/home", element: <RoomConversation/>}

                ]
            }
        ]
    }
])

function ProtectedRoute() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>
}