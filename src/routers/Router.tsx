import {createBrowserRouter} from 'react-router';
import NotFound from "../components/common/NotFound.tsx";
import Login from "../pages/Login.tsx";

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
            }
        ]
    }
])