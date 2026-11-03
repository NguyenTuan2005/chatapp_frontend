import {createBrowserRouter, Outlet} from 'react-router';
import NotFound from "../components/common/NotFound.tsx";
import Login from "../pages/Login.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import {RoomConversation} from "../components/RoomConversation.tsx";


export const router = createBrowserRouter([
    {
        children: [
            {
                path: "*",
                element: <NotFound/>
            }

        ]
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <MainLayout/>,
                children: [
                    {
                        path:"/hehe",
                        element:<RoomConversation/>
                    },
                    { path: "/login", element: <Login/> }

                ]
            }
        ]
    }
])

function ProtectedRoute() {
    return <Outlet/>
}