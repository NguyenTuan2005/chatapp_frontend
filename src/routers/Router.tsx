import {createBrowserRouter, Navigate, Outlet} from 'react-router';
import NotFound from "../components/common/NotFound.tsx";
import Login from "../pages/Login.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import {RoomConversation} from "../components/RoomConversation.tsx";

import Home from "../pages/Home.tsx";
import {useAppSelector} from "../store/Store.ts";

export const router = createBrowserRouter([
    {
        children: [
            {
                path: "*",
                element: <NotFound/>
            },
            { path: "/login", element: <Login/> }
        ]
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <MainLayout/>,
                children: [
                    { path: "/home", element: <Home/>}
                 ,   {
                        path:"/hehe",
                        element:<RoomConversation/>
                    }

                ]
            }
        ]
    }
])

function ProtectedRoute() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>
}