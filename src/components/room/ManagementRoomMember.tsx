import {Accordion, Button} from "react-bootstrap";
import {Copy, Link, Share2, Users} from "lucide-react";
import {OutRoom} from "./OutRoom.tsx";

interface IAccordionRoomMembers{
    numberOfMember:number;
    roomName: string;
}

interface AccordionRoomMembersPros {
    info : IAccordionRoomMembers
}


export function AccordionManagementRoomMembers({ info }: AccordionRoomMembersPros){


    return(
        <>
            <Accordion.Item eventKey="0" className="border-0 border-bottom">
                <Accordion.Header>
                    <span className="fw-bold" style={{ color: '#0F2942' }}>Thành viên nhóm</span>
                </Accordion.Header>
                <Accordion.Body className="pt-0">
                    <div className="d-flex align-items-center gap-3 py-2">
                        <Users size={20} color="#0F2942" />
                        <span className="fw-medium">{info.numberOfMember} thành viên</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-2">
                        <div className="d-flex align-items-center gap-3 overflow-hidden">
                            <Link size={20} color="#0F2942" className="flex-shrink-0" />
                            <div className="text-truncate">
                                <div className="fw-medium" style={{ fontSize: '0.9rem' }}>Link tham gia nhóm</div>
                                <small className="text-primary text-truncate d-block">{info.roomName}</small>
                            </div>
                        </div>

                        <div className="d-flex gap-1 flex-shrink-0">
                            <Button variant="light" size="sm" className="rounded-circle p-1"><Copy size={16} /></Button>
                            <Button variant="light" size="sm" className="rounded-circle p-1"><Share2 size={16} /></Button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 py-2">
                        <Users size={20} color="#0F2942" />
                        <span className="fw-medium">
                             <OutRoom roomName={info.roomName}/>
                        </span>
                    </div>



                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}