import {RoomChatImage} from "../common/RoomChatImage.tsx";


interface IRoomInfoSidebarHeader{
    roomName: string
}

interface RoomInfoSidebarHeaderPros {
    info : IRoomInfoSidebarHeader
}


export function  RoomInfoSidebarHeader({info}:RoomInfoSidebarHeaderPros ){
    return (
        <>
            <div className="d-flex flex-column align-items-center p-4">
                <div className="position-relative mb-3">
                    <RoomChatImage name={info.roomName}/>
                </div>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <span className="fw-bold fs-5 text-center" style={{ color: '#0F2942' }}>
                    {info.roomName}
                  </span>
                </div>
            </div>
        </>
    )
}