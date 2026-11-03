import {DisplayMembersRoom} from "../components/DisplayMembersRoom.tsx";
import {RoomMemberList} from "../components/RoomMemberList.tsx";

import {RoomHeader} from "../components/RoomHeader.tsx";
import {DefaultNoneChatCarousel} from "../components/DefaultNoneChatCarousel.tsx";

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