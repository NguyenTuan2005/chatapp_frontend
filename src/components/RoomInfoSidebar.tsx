
import { Button, Accordion, } from 'react-bootstrap';
import {
    Menu,
} from 'lucide-react';
import {useState} from "react";
import {RoomInfoSidebarHeader} from "./RoomInfoSidebarHeader.tsx";
import {AccordionManagementRoomMembers} from "./ManagementRoomMember.tsx";
import {RoomNewsBroad} from "./RoomNewsBroad.tsx";

export function RoomInfoSidebar() {
    const [isOpen, setIsOpen] = useState(true);

    // Mock data
    const groupData = {
        name: 'DS_high cùng 3 ae siêu nhân',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135515.png',
        memberCount: 3,
        inviteLink: 'zalo.me/g/vxxrgl139',
        media: [
            'https://picsum.photos/100/100?random=1',
            'https://picsum.photos/100/100?random=2',
            'https://picsum.photos/100/100?random=3',
            'https://picsum.photos/100/100?random=4',
            'https://picsum.photos/100/100?random=5',
            'https://picsum.photos/100/100?random=6',
            'https://picsum.photos/100/100?random=7',
            'https://picsum.photos/100/100?random=8',
        ]
    };

    if (!isOpen) {
        return (
            <Button
                variant="light"
                onClick={() => setIsOpen(true)}
                className="m-2 p-2 rounded-circle shadow-sm border"
                title="Mở thông tin nhóm"
            >
                <Menu size={24} color="#0F2942" />
            </Button>
        );
    }

    return (
        <div className="bg-white border-start" style={{ width: '360px', height: '100vh', overflowY: 'auto' }}>
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                <Button
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="p-1 border-0 bg-transparent text-dark"
                    title="Thu nhỏ"
                >
                    <Menu size={22} color="#0F2942" />
                </Button>
                <h5 className="m-0 fw-bold text-center flex-grow-1" style={{ color: '#0F2942' }}>
                    Thông tin nhóm
                </h5>
                <div style={{ width: '22px' }}></div>
            </div>

            <RoomInfoSidebarHeader info={{roomName: groupData.name}}/>

            <div style={{ height: '8px', backgroundColor: '#F0F2F5' }}></div>

            <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen className="custom-accordion">

                <AccordionManagementRoomMembers info={ {
                    numberOfMember:groupData.memberCount,
                    roomName: groupData.name
                }}/>

                <div style={{ height: '8px', backgroundColor: '#F0F2F5' }}></div>

                <RoomNewsBroad info={{roomName: groupData.name}}/>

            </Accordion>
        </div>
    );
}