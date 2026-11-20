import {Accordion, Button} from "react-bootstrap";
import {Check, Copy, Link, Share2, Users} from "lucide-react";
import {OutRoom} from "./OutRoom.tsx";
import {useState} from "react";
import {RoomMemberList} from "./RoomMemberList.tsx";
import type {RoomMember} from "../../types/RoomManagementData.ts";

interface IAccordionRoomMembers{
    numberOfMember:number;
    roomName: string;
    userList: RoomMember[];

}

interface AccordionRoomMembersPros {
    info : IAccordionRoomMembers
}


export function AccordionManagementRoomMembers({ info }: AccordionRoomMembersPros){

    const [isShowMemberList , setIsShowMemberList] = useState<boolean>(false);

    const generateJoinUrl = (roomName: string ): string => {
        return `${window.location.origin}/join-room/confirmation/${roomName}`;
    };

    const [copied, setCopied] = useState(false);
    const joinUrl = generateJoinUrl(info.roomName);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(joinUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy thất bại', err);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({title: info.roomName, url: joinUrl});
            } catch {
            }
        } else {
            handleCopy();
        }
    };

    return(
        <>
            <Accordion.Item eventKey="0" className="border-0 border-bottom">
                <Accordion.Header>
                    <span className="fw-bold" style={{ color: '#0F2942' }}>Thành viên nhóm</span>
                </Accordion.Header>
                <Accordion.Body className="pt-0">
                    <div className="d-flex align-items-center gap-3 py-2">
                        <Users size={20} color="#0F2942" />
                        <div className={"d-flex justify-content-center"}>
                            <Button className={""} onClick={()=>{
                                setIsShowMemberList(!isShowMemberList)
                            }}>
                                <span className="fw-medium">{info.numberOfMember} thành viên</span>
                            </Button>

                        </div>

                    </div>
                    {
                        isShowMemberList &&(<RoomMemberList userList={info.userList}></RoomMemberList>)
                    }

                    <div className="d-flex align-items-center justify-content-between py-2">
                        <div className="d-flex align-items-center gap-3 overflow-hidden">
                            <Link size={20} color="#0F2942" className="flex-shrink-0"/>
                            <div className="text-truncate">
                                <div className="fw-medium" style={{fontSize: '0.9rem'}}>Link tham gia nhóm</div>
                                <small className="text-primary text-truncate d-block">{joinUrl}</small>
                            </div>
                        </div>

                        <div className="d-flex gap-1 flex-shrink-0">
                            <Button variant="light" size="sm" className="rounded-circle p-1"
                                    onClick={handleCopy} title="Sao chép link">
                                {copied ? <Check size={16} color="#198754"/> : <Copy size={16}/>}
                            </Button>
                            <Button variant="light" size="sm" className="rounded-circle p-1"
                                    onClick={handleShare} title="Chia sẻ">
                                <Share2 size={16}/>
                            </Button>
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