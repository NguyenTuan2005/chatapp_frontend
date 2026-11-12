import {Button, Col, Row} from "react-bootstrap";
import {Bell, Pin, Settings, UserPlus} from "lucide-react";
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

                <Row className="w-100 text-center gx-2">
                    <Col xs={3}>
                        <div className="d-flex flex-column align-items-center">
                            <Button variant="light" className="rounded-circle p-2 mb-1 bg-light border-0">
                                <Bell size={20} color="#0F2942" />
                            </Button>
                            <span style={{ fontSize: '0.75rem', color: '#4A5568' }}>Tắt thông báo</span>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="d-flex flex-column align-items-center">
                            <Button variant="light" className="rounded-circle p-2 mb-1 bg-light border-0">
                                <Pin size={20} color="#0F2942" />
                            </Button>
                            <span style={{ fontSize: '0.75rem', color: '#4A5568' }}>Ghim hội thoại</span>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="d-flex flex-column align-items-center">
                            <Button variant="light" className="rounded-circle p-2 mb-1 bg-light border-0">
                                <UserPlus size={20} color="#0F2942" />
                            </Button>
                            <span style={{ fontSize: '0.75rem', color: '#4A5568' }}>Thêm thành viên</span>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="d-flex flex-column align-items-center">
                            <Button variant="light" className="rounded-circle p-2 mb-1 bg-light border-0">
                                <Settings size={20} color="#0F2942" />
                            </Button>
                            <span style={{ fontSize: '0.75rem', color: '#4A5568' }}>Quản lý nhóm</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}