import {createBrowserRouter} from 'react-router';
import NotFound from "../components/common/NotFound.tsx";
import Login from "../pages/Login.tsx";
import Hehe from "../pages/Test.tsx";

export const router = createBrowserRouter([
    {
        children: [
            {
                path: "*",
                element: <NotFound/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/hehe",
                element: <Hehe/>
            }
        ]
    }
])