import { useState } from "react";
import {Form, Button, Alert, Card, Modal, Spinner, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../store/Store.ts";
import {joinRoomThunk} from "../../thunks/RoomManagementThunk.ts";


import {
    Users,
    LogIn,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

import { clearError } from "../../store/slice/RoomManagementSlice.ts";
import type { Room } from "../../types/RoomManagementData.ts";

export interface JoinRoomProps {
    show?: boolean;
    onHide?: () => void;
    onSuccess?: (room: Room) => void;
    isModal?: boolean;
}

export const JoinRoom = ({
                             show,
                             onHide,
                             onSuccess,
                             isModal = true,
                         }: JoinRoomProps) => {
    const dispatch = useAppDispatch();


    const serverError = useAppSelector(
        (state) => state.roomManagement.error
    );

    const [internalShow, setInternalShow] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isVisible = show !== undefined ? show : internalShow;

    const handleClose = () => {
        setRoomName("");
        setLocalError(null);
        setSuccessMessage(null);
        setIsSubmitting(false);

        dispatch(clearError());

        if (show === undefined) {
            setInternalShow(false);
        }

        onHide?.();
    };

    const handleRoomNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRoomName(e.target.value);

        if (localError) {
            setLocalError(null);
        }

        if (serverError) {
            dispatch(clearError());
        }
    };

    const validateRoomName = (name: string): string | null => {
        if (!name) {
            return "Vui lòng nhập tên phòng chat!";
        }

        if (name.length < 2) {
            return "Tên phòng phải có ít nhất 2 ký tự!";
        }

        if (name.length > 50) {
            return "Tên phòng không được vượt quá 50 ký tự!";
        }

        return null;
    };

    const mapServerError = (
        err: string,
        name: string
    ): string => {
        const msg = err.toLowerCase();

        if (
            msg.includes("not exist") ||
            msg.includes("not found") ||
            msg.includes("doesn't exist")
        ) {
            return `Không tìm thấy phòng "${name}"!`;
        }

        if (
            msg.includes("already") ||
            msg.includes("exist")
        ) {
            return `Bạn đã tham gia phòng "${name}" rồi!`;
        }

        if (msg.includes("not login")) {
            return "Bạn chưa đăng nhập phiên WebSocket! Vui lòng đăng nhập tại trang /login trước.";
        }

        return err || "Tham gia phòng thất bại, vui lòng thử lại sau!";
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const trimmedName = roomName.trim();

        const validationError =
            validateRoomName(trimmedName);

        if (validationError) {
            setLocalError(validationError);
            return;
        }

        setLocalError(null);
        setSuccessMessage(null);
        setIsSubmitting(true);

        try {
            const joinedRoom = await dispatch(
                joinRoomThunk(trimmedName)
            ).unwrap();

            setSuccessMessage(
                `Tham gia phòng "${joinedRoom.name}" thành công!`
            );

            setRoomName("");

            setTimeout(() => {
                onSuccess?.(joinedRoom);
                handleClose();
            }, 1000);

        } catch (err) {
            setLocalError(
                typeof err === "string"
                    ? mapServerError(err, trimmedName)
                    : "Có lỗi xảy ra khi kết nối tới máy chủ WebSocket!"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const displayError =
        localError ||
        (serverError
            ? mapServerError(serverError, roomName)
            : null);

    const formContent = (
        <Form onSubmit={handleSubmit}>

            {displayError && (
                <Alert
                    variant="danger"
                    className="d-flex align-items-center gap-2 py-2 px-3"
                >
                    <AlertCircle
                        size={18}
                        className="flex-shrink-0"
                    />

                    <span className="small">
                        {displayError}
                    </span>
                </Alert>
            )}


            {successMessage && (
                <Alert
                    variant="success"
                    className="d-flex align-items-center gap-2 py-2 px-3"
                >
                    <CheckCircle2
                        size={18}
                        className="flex-shrink-0"
                    />

                    <span className="small">
                        {successMessage}
                    </span>
                </Alert>
            )}

            {/* ROOM NAME */}
            <Form.Group
                className="mb-3"
                controlId="joinRoomNameInput"
            >
                <Form.Label className="fw-semibold text-secondary small">
                    Tên phòng chat{" "}
                    <span className="text-danger">*</span>
                </Form.Label>

                <div className="input-group">

                    <span className="input-group-text bg-light border-end-0 text-muted">
                        <Users size={18} />
                    </span>

                    <Form.Control
                        type="text"
                        placeholder="Nhập tên phòng muốn tham gia..."
                        value={roomName}
                        onChange={handleRoomNameChange}
                        disabled={isSubmitting}
                        autoFocus
                        className="border-start-0"
                    />

                </div>

                <Form.Text
                    className="text-muted"
                    style={{ fontSize: "0.8rem" }}
                >
                    Nhập chính xác tên phòng chat mà bạn muốn tham gia.
                </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">

                <Button
                    variant="light"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="px-3"
                >
                    Hủy
                </Button>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={
                        isSubmitting ||
                        !roomName.trim()
                    }
                    className="d-flex align-items-center gap-2 px-3"
                    style={{
                        backgroundColor: "#0068ff",
                        borderColor: "#0068ff",
                    }}
                >
                    {isSubmitting ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />

                            <span>
                                Đang tham gia...
                            </span>
                        </>
                    ) : (
                        <>
                            <LogIn size={18} />

                            <span>
                                Tham gia phòng
                            </span>
                        </>
                    )}
                </Button>

            </div>
        </Form>
    );

    if (!isModal && show === undefined) {
        return (
            <Card className="shadow-sm border-0 p-3">

                <Card.Header
                    className="bg-transparent border-0 px-0 pt-0 pb-3"
                >
                    <div className="d-flex align-items-center gap-2">

                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="join-room-tooltip">
                                    Tham gia phòng chat
                                </Tooltip>
                            }
                        >
                            <div className="d-flex align-items-center gap-1">
                                <LogIn size={18} />
                                <span>Join Room</span>
                            </div>
                        </OverlayTrigger>

                    </div>
                </Card.Header>

                <Card.Body className="p-0">
                    {formContent}
                </Card.Body>

            </Card>
        );
    }

    return (
        <>
            {show === undefined &&
                !internalShow && (
                    <Button
                        variant="primary"
                        onClick={() =>
                            setInternalShow(true)
                        }
                        className="d-inline-flex align-items-center gap-2"
                        style={{
                            backgroundColor: "#0068ff",
                            borderColor: "#0068ff",
                        }}
                    >
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="join-room-tooltip">
                                    Tham gia phòng chat
                                </Tooltip>
                            }
                        >
                            <div className="d-flex align-items-center gap-1">
                                <LogIn size={18} />
                                <span>Join Room</span>
                            </div>
                        </OverlayTrigger>
                    </Button>
                )}

            <Modal
                show={isVisible}
                onHide={handleClose}
                centered
                backdrop="static"
                keyboard={!isSubmitting}
            >

                <Modal.Header
                    closeButton={!isSubmitting}
                    className="border-bottom-0 pb-0"
                >

                    <Modal.Title
                        className="d-flex align-items-center gap-2 h5 fw-bold"
                        style={{ color: "#0F2942" }}
                    >

                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                                width: 36,
                                height: 36,
                                backgroundColor: "#EBF2F7",
                            }}
                        >
                            <LogIn
                                size={20}
                                color="#0068ff"
                            />
                        </div>

                        <span>
                            Tham gia phòng chat
                        </span>

                    </Modal.Title>

                </Modal.Header>

                <Modal.Body className="pt-3">
                    {formContent}
                </Modal.Body>

            </Modal>
        </>
    );
};

export default JoinRoom;