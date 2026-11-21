import {RoomInfoSidebar} from "./RoomInfoSidebar.tsx";
import {RoomHeader} from "./RoomHeader.tsx";
import {useAppSelector} from "../../store/Store.ts";
import {USER_KEY} from "../../config/WSEventsEnum.ts";
import {reLoginStorage} from "../../thunks/AuthThunk.ts";
import {useMemo} from "react";
import type {ChatMessage} from "../../types/Chat.ts";
import {parseChatDate} from "../../utils/DateUtils.ts";
import MessageList from "../chat/MessageList.tsx";


export function RoomConversation() {

    const room = useAppSelector(
        state => state.roomManagement.currentRoom
    );

    const loading = useAppSelector(
        state => state.roomManagement.loading
    );

    const error = useAppSelector(
        state => state.roomManagement.error
    );

    const currentUsername = reLoginStorage.get(USER_KEY) ?? "";

    const roomName = room?.name ?? "Loading";
    const membersCount = room?.userList.length ?? 0;


    const messages = useMemo<ChatMessage[]>(() => {

        if (!room?.chatData) return [];

        return room.chatData
            .map((message, index) => ({
                id: message.id ??
                    `${message.name}-${message.createAt}-${index}`,

                sender: message.name,

                content: message.mes,

                createdAt: parseChatDate(
                    message.createAt!
                ).toISOString(),

                isMine: message.name === currentUsername
            }))
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
            );

    }, [room?.chatData, currentUsername]);


    return (
        <div className="d-flex w-100 vh-100 overflow-hidden bg-light">

            <div className="d-flex flex-column flex-grow-1 h-100 border-end overflow-hidden">

                <div className="flex-shrink-0 bg-white border-bottom">
                    <RoomHeader name={roomName} isRoomChat={true} membersCount={membersCount}/>
                </div>

                {loading && messages.length === 0 ? (
                    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                        Đang tải tin nhắn...
                    </div>
                ) : error ? (
                    <div className="flex-grow-1 d-flex justify-content-center align-items-center text-danger">
                        {error}
                    </div>
                ) : (
                    <MessageList messages={messages} showSender={true}/>
                )}

            </div>

            <RoomInfoSidebar/>
        </div>
    );
}