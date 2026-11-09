import {DisplayMembersRoom} from "../components/room/DisplayMembersRoom.tsx";
import {RoomMemberList} from "../components/room/RoomMemberList.tsx";

import {RoomHeader} from "../components/room/RoomHeader.tsx";
import {DefaultNoneChatCarousel} from "../components/common/DefaultNoneChatCarousel.tsx";

function Hehe() {


    return <div>demo
        <DisplayMembersRoom></DisplayMembersRoom>
        <RoomMemberList></RoomMemberList>
        {/*<GroupInfoSidebar></GroupInfoSidebar>*/}
        <RoomHeader/>
        <DefaultNoneChatCarousel/>
    </div>;
}

export default Hehe;