import type {ReactNode} from "react";
import {ChatMessageType} from "../config/WSEventsEnum.ts";
import type {ChatMessage} from "../types/Chat.ts";
import {LinkPreviewMessage} from "../components/custom_message/PreviewLinkMessage.tsx";
import {JoinRoomLinkMessage} from "../components/custom_message/JoinRoomLinkMessage.tsx";
import {getRoomNameFromUrl} from "../utils/joinRoomLink.ts";
import {getRoomAvatarUrl} from "../components/common/RoomChatImage.tsx";
import {TextMessage} from "../components/custom_message/TextMessage.tsx";
import {HtmlMessage} from "../components/custom_message/HtmlMessage.tsx";
import {GifMessage} from "../components/custom_message/GifMessage.tsx";

export interface ChatMessageFactoryProps {
    type: ChatMessageType;
    chatMessage: ChatMessage;
    showDateSeparator: boolean;
    showSender?: boolean;
}

export function ChatMessageFactory({
   type,
   chatMessage,
   showDateSeparator,
   showSender,
}: ChatMessageFactoryProps): ReactNode {

    switch (type) {
        case ChatMessageType.PREVIEW_LINK: {

            return <LinkPreviewMessage url={chatMessage.content}   message={chatMessage} />;
        }

        case ChatMessageType.JOIN_ROOM_LINK: {
            const roomName = getRoomNameFromUrl(chatMessage.content) ?? "";
            const roomAvatar = getRoomAvatarUrl(roomName);

            return (
                <JoinRoomLinkMessage
                    url={chatMessage.content}
                    groupName={roomName}
                    groupAvatar={roomAvatar}
                    message={chatMessage}
                />
            );
        }

        case ChatMessageType.TEXT:
            return <TextMessage message={chatMessage} showSender={showSender} showDateSeparator={showDateSeparator} />;

        case ChatMessageType.ICON: {

            console.log("Chu code xong")

            return <span style={{fontSize: 32}}>{chatMessage.content}</span>;

        }

        case  ChatMessageType.GIF :{
            return <GifMessage message={chatMessage}/>
        }

        case ChatMessageType.IMAGE: {

            console.log("Chu code xong")

            return (
                <img
                    src={chatMessage.content}
                    alt="image"
                    style={{maxWidth: 300, borderRadius: 8}}
                />
            );
        }

        case ChatMessageType.HTML : {
            return <HtmlMessage message={chatMessage} />;
        }

        default:
            return <span>Unknown</span>;
    }
}