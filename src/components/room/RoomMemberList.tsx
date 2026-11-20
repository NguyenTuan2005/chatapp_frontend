import {Container} from 'react-bootstrap';
import type {RoomMember} from "../../types/RoomManagementData.ts";
import {UserAvatarImage} from "../common/RoomChatImage.tsx";

export interface RoomMemberListProps {
    userList: RoomMember[];
}

export function RoomMemberList({userList}: RoomMemberListProps) {
    return (
        <Container className="py-3 px-4" style={{maxWidth: '350px', backgroundColor: '#ffffff'}}>
            <div className="d-flex flex-column gap-3">
                {userList.map((member) => (
                    <div key={member.id} className="d-flex align-items-center">
                        <div className="position-relative me-3" style={{width: '48px', height: '48px'}}>
                            <UserAvatarImage name={member.name}/>

                            {/*{member.isOwner && (*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        viewBox="0 0 24 24"*/}
                            {/*        fill="#ECC94B"*/}
                            {/*        className="position-absolute"*/}
                            {/*        style={{width: '18px', height: '18px', bottom: 0, right: 0}}*/}
                            {/*    >*/}
                            {/*        <path d="M7 14A5 5 0 1 0 7 4a5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm7.586-4l2-2H21v3h-2v2h-2v2h-2.414l-2-2H7v-3h7.586Z"/>*/}
                            {/*    </svg>*/}
                            {/*)}*/}
                        </div>

                        <span style={{color: '#0F2942'}}>{member.name}</span>
                    </div>
                ))}
            </div>
        </Container>
    );
}