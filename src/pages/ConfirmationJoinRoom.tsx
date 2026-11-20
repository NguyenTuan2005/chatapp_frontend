import {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {Alert, Button, Card, Spinner} from "react-bootstrap";
import {AlertCircle, CheckCircle2, LogIn, Users} from "lucide-react";
import {joinRoomThunk} from "../thunks/RoomManagementThunk.ts";
import {useAppDispatch} from "../store/Store.ts";


export function ConfirmationJoinRoom() {
    const {roomName = ""} = useParams<{ roomName: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const mapServerError = (err: string): string => {
        const msg = err.toLowerCase();
        if (msg.includes("not exist") || msg.includes("not found") || msg.includes("doesn't exist")) {
            return `Không tìm thấy phòng "${roomName}"!`;
        }
        if (msg.includes("already") || msg.includes("exist")) {
            return `Bạn đã tham gia phòng "${roomName}" rồi!`;
        }
        if (msg.includes("not login")) {
            return "Bạn chưa đăng nhập! Vui lòng đăng nhập trước khi tham gia phòng.";
        }
        return err || "Tham gia phòng thất bại, vui lòng thử lại sau!";
    };

    const handleJoin = async () => {
        setError(null);
        setIsSubmitting(true);
        try {
            const room = await dispatch(joinRoomThunk(roomName)).unwrap();
            setSuccess(`Tham gia phòng "${room.name}" thành công!`);
            setTimeout(() => navigate("/room"), 1000);
        } catch (err) {
            setError(
                typeof err === "string"
                    ? mapServerError(err)
                    : "Có lỗi xảy ra khi kết nối tới máy chủ!"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
            <Card className="shadow-sm border-0 text-center p-4" style={{maxWidth: 420, width: "100%"}}>
                <Card.Body>
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{width: 64, height: 64, backgroundColor: "#EBF2F7"}}
                    >
                        <Users size={30} color="#0068ff"/>
                    </div>

                    <h5 className="fw-bold mb-1" style={{color: "#0F2942"}}>
                        Bạn được mời tham gia phòng
                    </h5>
                    <div className="fw-semibold text-primary fs-5 mb-3 text-break">
                        {roomName}
                    </div>
                    <p className="text-muted small mb-4">
                        Bấm "Tham gia" để vào phòng chat này.
                    </p>

                    {error && (
                        <Alert variant="danger" className="d-flex align-items-center gap-2 py-2 px-3 text-start">
                            <AlertCircle size={18} className="flex-shrink-0"/>
                            <span className="small">{error}</span>
                        </Alert>
                    )}

                    {success && (
                        <Alert variant="success" className="d-flex align-items-center gap-2 py-2 px-3 text-start">
                            <CheckCircle2 size={18} className="flex-shrink-0"/>
                            <span className="small">{success}</span>
                        </Alert>
                    )}

                    <div className="d-flex justify-content-center gap-2">
                        <Button
                            variant="light"
                            onClick={() => navigate("/")}
                            disabled={isSubmitting || !!success}
                        >
                            Hủy
                        </Button>

                        <Button
                            onClick={handleJoin}
                            disabled={isSubmitting || !!success || !roomName}
                            className="d-flex align-items-center gap-2"
                            style={{backgroundColor: "#0068ff", borderColor: "#0068ff"}}
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner size="sm" animation="border"/>
                                    <span>Đang tham gia...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn size={18}/>
                                    <span>Tham gia</span>
                                </>
                            )}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ConfirmationJoinRoom;