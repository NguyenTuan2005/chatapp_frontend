import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../../store/Store.ts";
import { outRoomThunk } from "../../thunks/RoomManagementThunk.ts";
import {useNavigate} from "react-router";

export interface OutRoomProps {
    roomName: string;
}

export function OutRoom({ roomName }: OutRoomProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate =  useNavigate();

    const handleOutRoom = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(outRoomThunk(roomName)).unwrap();
            navigate(`/chat/room/out-room-success/${roomName}`)
        } catch (err) {
            setError(typeof err === "string" ? err : "Rời phòng thất bại!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button onClick={handleOutRoom} disabled={isLoading}>
                {isLoading ? "Đang rời..." : "Out room"}
            </Button>
            {error && <div className="text-danger mt-1">{error}</div>}
        </>
    );
}