
import {Accordion} from 'react-bootstrap';
import {RoomInfoSidebarHeader} from "./RoomInfoSidebarHeader.tsx";
import {AccordionManagementRoomMembers} from "./ManagementRoomMember.tsx";
import {RoomNewsBroad} from "./RoomNewsBroad.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../store/Store.ts";

export function RoomInfoSidebar() {
    const  isOpen = useSelector((state: RootState) => state.chatSidebar.isOpen);

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
        return (<></>);
    }

    return (
        <div className="bg-white border-start" style={{ width: '360px', height: '100vh', overflowY: 'auto' }}>
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
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