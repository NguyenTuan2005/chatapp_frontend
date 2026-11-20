import {Outlet} from "react-router";
import Sidebar from "../components/common/Sidebar.tsx";

function MainLayout() {
    return (
        <div className="d-flex flex-row vh-100 overflow-hidden">
            <Sidebar/>

            <main className="flex-grow-1 bg-light">
                <Outlet/>
            </main>
        </div>
    )
}

export default MainLayout;