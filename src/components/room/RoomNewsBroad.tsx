import {Accordion} from "react-bootstrap";
import {Clock, FileText} from "lucide-react";

interface IAccordionRoomNewsBroad{
    roomName: string
}

interface AccordionRoomNewsBroadPros {
    info : IAccordionRoomNewsBroad
}


export  function RoomNewsBroad({info }: AccordionRoomNewsBroadPros){
    console.log(info)

    return(
        <>
            <Accordion.Item eventKey="1" className="border-0 border-bottom">
                <Accordion.Header>
                    <span className="fw-bold" style={{ color: '#0F2942' }}>Bảng tin nhóm</span>
                </Accordion.Header>
                <Accordion.Body className="pt-0">
                    <div className="d-flex align-items-center gap-3 py-2 cursor-pointer">
                        <Clock size={20} color="#0F2942" />
                        <span>Danh sách nhắc hẹn</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 py-2 cursor-pointer">
                        <FileText size={20} color="#0F2942" />
                        <span>Ghi chú, ghim, bình chọn</span>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}