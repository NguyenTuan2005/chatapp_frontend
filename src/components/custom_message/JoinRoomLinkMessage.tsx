import {Card} from "react-bootstrap";
import {useNavigate} from "react-router";
import {MessageRow} from "./MessageRow.tsx";
import type {ChatMessage} from "../../types/Chat.ts";


export interface JoinRoomLinkMessagePros {
    url: string;
    groupName: string;
    groupAvatar?: string;
    time?: string;
    message: ChatMessage;
}

export function JoinRoomLinkMessage({
                                        url,
                                        groupName,
                                        groupAvatar,
    message

                                    }: JoinRoomLinkMessagePros) {
    const navigate = useNavigate();

    let host = url;
    try {
        host = new URL(url, window.location.origin).host;
    } catch {

    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const target = new URL(url, window.location.origin);
            if (target.origin === window.location.origin) {
                navigate(target.pathname + target.search + target.hash);
            } else {
                window.location.href = target.href;
            }
        } catch {
            window.location.href = url;
        }
    };

    return (
        <MessageRow isMine={message.isMine} createdAt={message.createdAt}>
            <Card
                className="border-primary-subtle"
                style={{ width: 360, maxWidth: "100%", background: "#e3f0ff" }}
            >
                <Card.Body className="p-3">
                    <a
                        href={url}
                        onClick={handleClick}
                        className="d-block text-primary text-decoration-none mb-2 text-break"
                    >
                        {url}
                    </a>

                    <div role="button" onClick={handleClick}>
                        <div
                            className="d-flex align-items-center gap-3 text-white rounded px-3 py-4"
                            style={{ background: "linear-gradient(135deg, #2b7de9, #0a58c9)" }}
                        >
                            <div
                                className="rounded-circle border border-3 border-white bg-success overflow-hidden d-flex align-items-center justify-content-center flex-shrink-0"
                                style={{ width: 64, height: 64 }}
                            >
                                {groupAvatar ? (
                                    <img
                                        src={groupAvatar}
                                        alt={groupName}
                                        className="w-100 h-100"
                                        style={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <span className="fs-3 fw-bold">
                                    {groupName.charAt(0).toUpperCase()}
                                </span>
                                )}
                            </div>
                            <div>
                                <div className="small opacity-75">Nhóm</div>
                                <div className="fs-5 fw-semibold lh-sm">{groupName}</div>
                            </div>
                        </div>

                        <div className="fw-bold mt-2">{groupName}</div>
                        <div className="text-secondary small mt-1">
                            Bấm vào đây để tham gia nhóm
                        </div>
                        <div className="text-primary small mt-1">{host}</div>
                    </div>
                </Card.Body>
            </Card>
        </MessageRow>
    );
}