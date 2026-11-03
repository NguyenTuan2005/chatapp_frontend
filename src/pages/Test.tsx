import { createRoomThunk } from "../thunks/RoomManagementThunk";

import { useEffect } from "react";
import {useAppDispatch} from "../store/Store.ts";

function Hehe() {
    const dispatch = useAppDispatch();

    const handleCreateRoom = async () => {
        try {
            const room = await dispatch(
                createRoomThunk("Room ABC")
            ).unwrap();

            console.log("Created room:", room);
        } catch (error) {
            console.error("Create room failed:", error);
        }
    };


    useEffect(() => {

        handleCreateRoom();
    }, [dispatch]);

    return <div>demo</div>;
}

export default Hehe;