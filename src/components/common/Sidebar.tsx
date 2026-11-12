import { useEffect } from "react";
import { Alert, ListGroup, Badge, Placeholder } from "react-bootstrap";
import {
    ExclamationCircleFill,
    PeopleFill,
    PersonCircle,
    ChatDots,
} from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../store/Store.ts";
import { getUserListThunk } from "../../thunks/SidebarThunk.ts";
import type {UserSidebar} from "../../types/SiderbarData.ts";
import {getRoomChatMesThunk} from "../../thunks/RoomManagementThunk.ts";
import {AvatarChatImage} from "./AvatarChatImage.tsx";

const formatTime = (value: string) => {
    const d = new Date(value.replace(" ", "T"));
    return d.toDateString() === new Date().toDateString()
        ? d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
        : d.toLocaleDateString("vi-VN");
};

const SkeletonItem = () => (
    <ListGroup.Item className="d-flex align-items-center py-3">
        <Placeholder animation="glow" className="me-3">
            <Placeholder className="rounded-circle d-block" style={{ width: 44, height: 44 }} />
        </Placeholder>
        <Placeholder animation="glow" className="flex-grow-1">
            <Placeholder xs={7} className="d-block mb-2" />
            <Placeholder xs={3} />
        </Placeholder>
    </ListGroup.Item>
);

function Sidebar() {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.siderbar.users);
    const error = useAppSelector((state) => state.siderbar.error);
    const loading = useAppSelector((state) => state.siderbar.loading);

    useEffect(() => {
        dispatch(getUserListThunk());
    }, [dispatch]);

    if (error) {
        return (
            <Alert variant="danger" className="m-2 py-2 d-flex align-items-center">
                <ExclamationCircleFill className="me-2 flex-shrink-0" />
                {error}
            </Alert>
        );
    }

    const sorted = [...users].sort((a, b) => b.actionTime.localeCompare(a.actionTime));

    const openChat = (userSidebar: UserSidebar) => {
        // Lấy danh sách các phòng chat (type: 1) và bạn chat 1-1 (type: 0) gần nhất của người dùng.
        switch (userSidebar.type) {
            case 1 : {

                const roomName = userSidebar.name;
                dispatch(getRoomChatMesThunk({ name: roomName, page: 1 }))

                break;
            }
            case 0 : {

                break;
            }
            default:
                break;
        }
    };

    return (
        <aside
            className="d-flex flex-column border-end bg-body h-100"
            style={{ width: 300, minWidth: 300 }}
        >
            <header className="d-flex align-items-center px-3 py-3 border-bottom">
                <ChatDots size={22} className="text-primary me-2" />
                <h5 className="mb-0 fw-semibold">Cuộc trò chuyện</h5>
            </header>

            <div className="flex-grow-1 overflow-auto">
                {loading ? (
                    <ListGroup variant="flush">
                        {Array.from({ length: 6 }, (_, i) => (
                            <SkeletonItem key={i} />
                        ))}
                    </ListGroup>
                ) : sorted.length === 0 ? (
                    <p className="text-muted text-center small mt-4 px-3">
                        Chưa có cuộc trò chuyện nào hết, hãy tạo phòng hoặc tạo cuộc trò chuyện
                    </p>
                ) : (
                    <ListGroup variant="flush">
                        {sorted.map((item) => {
                            const isRoom = item.type === 1;
                            const Icon = isRoom ? PeopleFill : PersonCircle;

                            return (
                                <ListGroup.Item
                                    key={`${item.type}-${item.name}`}
                                    action
                                    className="d-flex align-items-center py-3"
                                    onClick={() => openChat(item)}
                                >
                                    <div
                                        className={`rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 ${
                                            isRoom
                                                ? "bg-primary-subtle text-primary"
                                                : "bg-success-subtle text-success"
                                        }`}
                                        style={{ width: 44, height: 44 }}
                                    >
                                        <AvatarChatImage name={item.name}/>
                                    </div>

                                    <div className="flex-grow-1 overflow-hidden">
                                        <div className="d-flex justify-content-between align-items-baseline">
                                            <span className="fw-semibold text-truncate">
                                                {item.name}
                                            </span>
                                            <small className="text-muted ms-2 flex-shrink-0">
                                                {formatTime(item.actionTime)}
                                            </small>
                                        </div>
                                        <Badge
                                            bg={isRoom ? "primary" : "success"}
                                            pill
                                            className="fw-normal"
                                        >
                                            {isRoom ? "Phòng" : ""}
                                        </Badge>
                                    </div>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;