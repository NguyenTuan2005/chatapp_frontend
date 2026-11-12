
import {Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Users, Tag, Maximize2, Minimize2 } from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/Store.ts";
import {reverse} from "../../store/slice/ChatInfoSidebarSlice.ts";
import {RoomChatImage} from "../common/RoomChatImage.tsx";

interface RoomHeaderPros{
    name : string;
    isRoomChat: boolean;
    membersCount: number;
}

export function RoomHeader({name,isRoomChat}:RoomHeaderPros) {

    const dispatch = useDispatch<AppDispatch>();
    const reverseExpandStatusOfChatSideBarOnTheRight = ()=>{
        dispatch(reverse())
    }
    const  isOpen = useSelector((state: RootState) => state.chatSidebar.isOpen);

    const label = isOpen ? 'Thu hẹp' : 'Mở rộng';
    const chatType = isRoomChat ? 'Phong chat' : '';

    return (
        <div className="d-flex align-items-center p-3 bg-white border-bottom">
            <div
                className="rounded-circle border d-flex align-items-center justify-content-center p-1 me-3 flex-shrink-0"
                style={{ width: 56, height: 56, borderColor: '#E2E8F0' }}
            >
               <RoomChatImage name={name}/>
            </div>

            <div className="d-flex flex-column justify-content-center">
                <h5 className="fw-bold mb-1" style={{ color: '#0F2942', fontSize: '1.25rem', lineHeight: 1.2 }}>
                    {name}
                </h5>

                <div className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: '0.9rem' }}>
                    <span>{chatType}</span>
                    <span style={{ fontSize: '0.6rem', color: '#94A3B8' }}>•</span>

                    <div className="d-flex align-items-center gap-1">
                        <Users size={16} color="#0F2942" />
                        <span style={{ color: '#0F2942' }}>{999999999999999999999999999999999999999999999999999999999} thành viên</span>
                    </div>

                    <div className="vr mx-1" />

                    <Tag size={16} color="#0F2942" role="button" />
                </div>
            </div>

            <div className="ms-auto">
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="room-header-toggle-tooltip">{label}</Tooltip>}
                >
                    <Button
                        variant="light"
                        size="sm"
                        className="d-flex align-items-center justify-content-center border-0 rounded-circle p-2"
                        onClick={reverseExpandStatusOfChatSideBarOnTheRight}
                        aria-label={label}
                    >
                        {isOpen ? (
                            <Minimize2 size={18} color="#0F2942" />
                        ) : (
                            <Maximize2 size={18} color="#0F2942" />
                        )}
                    </Button>
                </OverlayTrigger>
            </div>
        </div>
    );
}