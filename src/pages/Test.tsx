import {DisplayMembersRoom} from "../components/room/DisplayMembersRoom.tsx";
import {RoomMemberList} from "../components/room/RoomMemberList.tsx";

import {RoomHeader} from "../components/room/RoomHeader.tsx";
import {DefaultNoneChatCarousel} from "../components/common/DefaultNoneChatCarousel.tsx";
import CreateRoom from "../components/room/CreateRoom.tsx";
import {OutRoom} from "../components/room/OutRoom.tsx";

function Hehe() {


    return <div>demo
        <OutRoom roomName={"FIT_NLU"}/>
        <CreateRoom></CreateRoom>
        <DisplayMembersRoom></DisplayMembersRoom>
        <RoomMemberList></RoomMemberList>
        {/*<GroupInfoSidebar></GroupInfoSidebar>*/}
        <RoomHeader/>
        <DefaultNoneChatCarousel/>
    </div>;
}

export default Hehe;