
import {Accordion} from 'react-bootstrap';
import {RoomInfoSidebarHeader} from "./RoomInfoSidebarHeader.tsx";
import {AccordionManagementRoomMembers} from "./ManagementRoomMember.tsx";
import {RoomNewsBroad} from "./RoomNewsBroad.tsx";
import {useSelector} from "react-redux";
import {type RootState, useAppDispatch} from "../../store/Store.ts";


export function RoomInfoSidebar() {
    const  isOpen = useSelector((state: RootState) => state.chatSidebar.isOpen);
    const dispatch = useAppDispatch();
    const currentRoom = useSelector((state: RootState) => state.roomManagement.currentRoom);

    if (!isOpen) {
        return (<></>);
    }

    if (!currentRoom){
        return <>Error</>
    }

    return (
        <div className="bg-white border-start" style={{ width: '360px', height: '100vh', overflowY: 'auto' }}>
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                <h5 className="m-0 fw-bold text-center flex-grow-1" style={{ color: '#0F2942' }}>
                    Thông tin nhóm
                </h5>
                <div style={{ width: '22px' }}></div>
            </div>

            <RoomInfoSidebarHeader info={{roomName: currentRoom?.name }}/>

            <div style={{ height: '8px', backgroundColor: '#F0F2F5' }}></div>

            <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen className="custom-accordion">

                <AccordionManagementRoomMembers info={ {
                    numberOfMember: currentRoom?.user.length,
                    roomName: currentRoom?.name
                }}/>

                <div style={{ height: '8px', backgroundColor: '#F0F2F5' }}></div>

                <RoomNewsBroad info={{roomName: currentRoom?.name}}/>

            </Accordion>
        </div>
    );
}