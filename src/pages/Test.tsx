import {DisplayMembersRoom} from "../components/room/DisplayMembersRoom.tsx";


// import {RoomHeader} from "../components/room/RoomHeader.tsx";
import {DefaultNoneChatCarousel} from "../components/common/DefaultNoneChatCarousel.tsx";
import CreateRoom from "../components/room/CreateRoom.tsx";
import {OutRoom} from "../components/room/OutRoom.tsx";
import {RoomChatImage} from "../components/common/RoomChatImage.tsx";
import {JoinRoom} from "../components/room/JoinRoom.tsx";
import LinkPreviewMessage from "../components/custom_message/CustomMessage.tsx";

function Hehe() {


    return <div>demo
        <LinkPreviewMessage
            url="https://share.google/zWBhtuHGX9hB3r6rj"
            time="21:55"
        />


        <LinkPreviewMessage
            url="https://docs.google.com/spreadsheets/d/10XDqtICAguDoQExDW1IuMMtZBGrF8ggMyFOkA-RzhPU/edit?gid=0#gid=0"
            time="21:55"
        />
        <JoinRoom></JoinRoom>
        <OutRoom roomName={"FIT_NLU"}/>
        <CreateRoom></CreateRoom>
        <DisplayMembersRoom></DisplayMembersRoom>
        {/*<RoomMemberList></RoomMemberList>*/}
        {/*<GroupInfoSidebar></GroupInfoSidebar>*/}
        {/*<RoomHeader/>*/}
        <RoomChatImage name={"hahah"}/>
        <DefaultNoneChatCarousel/>
    </div>;
}

export default Hehe;