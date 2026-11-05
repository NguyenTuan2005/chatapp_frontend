import {Button, Col, Image, Row} from "react-bootstrap";
import {Bell, Pin, Settings, UserPlus} from "lucide-react";

interface IRoomInfoSidebarHeader{
    roomName: string
}

interface RoomInfoSidebarHeaderPros {
    info : IRoomInfoSidebarHeader
}


export function  RoomInfoSidebarHeader({info}:RoomInfoSidebarHeaderPros ){

    const  avatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135515.png';
    return (
        <>
            <div className="d-flex flex-column align-items-center p-4">
                <div className="position-relative mb-3">
                    <Image src={avatar} roundedCircle width={80} height={80} className="border p-1" />
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