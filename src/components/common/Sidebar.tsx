import {useEffect, useState} from "react";
import {Alert, ListGroup, Badge, Placeholder, Button, Modal} from "react-bootstrap";
import {
    ExclamationCircleFill,
    PeopleFill,
    PersonCircle,
    ChatDots,
    CircleFill,
    BoxArrowRight,
} from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../store/Store.ts";
import {checkUserOnlineThunk, getUserListThunk} from "../../thunks/SidebarThunk.ts";
import type {UserSidebar} from "../../types/SiderbarData.ts";
import {getRoomChatMesThunk} from "../../thunks/RoomManagementThunk.ts";
import {AvatarChatImage} from "./AvatarChatImage.tsx";
import CreateRoom from "../room/CreateRoom.tsx";
import JoinRoom from "../room/JoinRoom.tsx";
import {checkUserExistThunk, logoutThunk, reLoginStorage} from "../../thunks/AuthThunk.ts";
import {USER_KEY} from "../../config/WSEventsEnum.ts";
import {useNavigate} from "react-router";
import SearchUser from "./SearchUser.tsx";
import "../../styles/sidebar.css";

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
    const users = useAppSelector((state) => state.sidebar.users);
    const error = useAppSelector((state) => state.sidebar.error);
    const loading = useAppSelector((state) => state.sidebar.loading);
    const isOnline = useAppSelector((state) => state.sidebar.isOnline);
    const currentUser = reLoginStorage.get(USER_KEY);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserListThunk());
    }, [dispatch]);

    useEffect(() => {
        if (!currentUser) return;

        let timer: ReturnType<typeof setTimeout>;
        let stopped = false;

        const poll = async () => {
            await dispatch(checkUserOnlineThunk(currentUser)).catch(() => {});
            if (!stopped) timer = setTimeout(poll, 30000);
        };

        poll();

        return () => {
            stopped = true;
            clearTimeout(timer);
        };
    }, [dispatch, currentUser]);

    const [searchedUser, setSearchedUser] = useState<string | null>(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const checkUserExist = async (username: string) => {
        try {
            const exists = await dispatch(checkUserExistThunk(username)).unwrap();
            if (exists) {
                setSearchedUser(username);
                navigate(`/chat/${username}`);
            }
            return Boolean(exists);
        } catch {
            return false;
        }
    };

    const handleConfirmLogout = async () => {
        setLoggingOut(true);
        try {
            await dispatch(logoutThunk()).unwrap();
        } catch {
        } finally {
            setLoggingOut(false);
            setShowLogoutModal(false);
        }
    };

    if (error) {
        return (
            <Alert variant="danger" className="m-2 py-2 d-flex align-items-center">
                <ExclamationCircleFill className="me-2 flex-shrink-0" />
                {error}
            </Alert>
        );
    }

    const sorted = [...users].sort((a, b) => b.actionTime.localeCompare(a.actionTime));

    const items: UserSidebar[] =
        searchedUser && !sorted.some((u) => u.type === 0 && u.name === searchedUser)
            ? [{ name: searchedUser, type: 0, actionTime: new Date().toISOString() } as UserSidebar, ...sorted]
            : sorted;

    const openChat = (userSidebar: UserSidebar) => {
        const conversationName = userSidebar.name;

        switch (userSidebar.type) {
            case 1 : {

                dispatch(getRoomChatMesThunk({ name: conversationName, page: 1 }))
                navigate(`/chat/room/${conversationName}`)
                break;
            }
            case 0 : {

                navigate(`/chat/people/${conversationName}`)
                break;
            }
            default:
                break;
        }
    };

    // @ts-ignore
    return (
        <aside
            className="d-flex flex-column border-end bg-body vh-100"
            style={{ width: 300, minWidth: 300 }}
        >
            <header className="d-flex align-items-center px-3 py-3 border-bottom flex-shrink-0">
                <ChatDots size={22} className="text-primary me-2" />
                <h5 className="mb-0 fw-semibold">Cuộc trò chuyện</h5>
            </header>

            <div
                className="d-flex px-3 py-2"
                style={{
                    gap: "1px",
                }}
            >
                <SearchUser onSearch={checkUserExist} />
                <CreateRoom />
                <JoinRoom />
            </div>

            <div
                className="flex-grow-1 overflow-auto hide-scrollbar"
                style={{ minHeight: 0 }}
            >
                {loading ? (
                    <ListGroup variant="flush">
                        {Array.from({ length: 6 }, (_, i) => (
                            <SkeletonItem key={i} />
                        ))}
                    </ListGroup>
                ) : items.length === 0 ? (
                    <p className="text-muted text-center small mt-4 px-3">
                        Chưa có cuộc trò chuyện nào hết, hãy tạo phòng hoặc tạo cuộc trò chuyện
                    </p>
                ) : (
                    <ListGroup variant="flush">
                        {items.map((item) => {
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
                                        <AvatarChatImage name={item.name}>
                                            <Icon size={22} />
                                        </AvatarChatImage>
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

            <div className="flex-shrink-0 border-top px-3 py-2 d-flex align-items-center justify-content-between">
                <Badge
                    pill
                    bg={isOnline ? "success" : "secondary"}
                    className="d-inline-flex align-items-center fw-normal px-2 py-2"
                >
                    <CircleFill size={8} className="me-1" />
                    {isOnline ? "Trực tiếp" : "Mất kết nối"}
                </Badge>

                <Button
                    variant="outline-danger"
                    size="sm"
                    className="d-inline-flex align-items-center"
                    onClick={() => setShowLogoutModal(true)}
                >
                    <BoxArrowRight className="me-1" />
                    Đăng xuất
                </Button>
            </div>

            <Modal
                show={showLogoutModal}
                onHide={() => !loggingOut && setShowLogoutModal(false)}
                centered
                backdrop="static"
            >
                <Modal.Header closeButton={!loggingOut}>
                    <Modal.Title className="fs-5">Xác nhận đăng xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn đăng xuất không?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowLogoutModal(false)}
                        disabled={loggingOut}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleConfirmLogout}
                        disabled={loggingOut}
                    >
                        {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </aside>
    );
}

export default Sidebar;