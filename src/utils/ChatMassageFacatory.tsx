import type { ReactNode } from "react";
import { ChatMessageType } from "../config/WSEventsEnum.ts";
import type { ChatMessage } from "../types/Chat.ts";
import { LinkPreviewMessage } from "../components/custom_message/PreviewLinkMessage.tsx";
import { JoinRoomLinkMessage } from "../components/custom_message/JoinRoomLinkMessage.tsx";
import { getRoomNameFromUrl } from "../utils/joinRoomLink.ts";
import {getRoomAvatarUrl} from "../components/common/RoomChatImage.tsx";
import { TextMessage } from "../components/custom_message/TextMessage.tsx";
import {formatMessageDate} from "./DateUtils.ts";

export interface ChatMessageFactoryPros {
    type: ChatMessageType;
    chatMessage: ChatMessage;
    showDateSeparator: boolean;
}

export function ChatMessageFactory({
                                       type,
                                       chatMessage,showDateSeparator
                                   }: ChatMessageFactoryPros): ReactNode {
    const time = formatMessageDate(chatMessage.createdAt);
    const isMine = chatMessage.isMine;

    switch (type) {
        case ChatMessageType.PREVIEW_LINK: {

            return <LinkPreviewMessage url={chatMessage.content} time={time}  isMine={isMine} />;
        }

        case ChatMessageType.JOIN_ROOM_LINK: {
            const roomName = getRoomNameFromUrl(chatMessage.content) ?? "";
            const roomAvatar = getRoomAvatarUrl(roomName);

            return (
                <JoinRoomLinkMessage
                    url={chatMessage.content}
                    groupName={roomName}
                    groupAvatar={roomAvatar}
                    time={time}
                    isMine={isMine}
                />
            );
        }

        case ChatMessageType.TEXT:
            return <TextMessage message={chatMessage} showDateSeparator={showDateSeparator} />;

        case ChatMessageType.ICON: {

            console.log("Chu code xong")

            return <span style={{fontSize: 32}}>{chatMessage.content}</span>;

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
        default:
            return <span>Unknown</span>;
    }
}