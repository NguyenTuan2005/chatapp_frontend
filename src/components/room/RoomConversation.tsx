import {RoomInfoSidebar} from "./RoomInfoSidebar.tsx";
import {RoomHeader} from "./RoomHeader.tsx";
import {useAppDispatch, useAppSelector} from "../../store/Store.ts";
import {USER_KEY} from "../../config/WSEventsEnum.ts";
import {reLoginStorage} from "../../thunks/AuthThunk.ts";
import {useEffect, useMemo} from "react";
import type {ChatMessage} from "../../types/Chat.ts";
import {parseChatDate} from "../../utils/DateUtils.ts";
import MessageList from "../chat/MessageList.tsx";
import MessageInput from "../chat/MessageInput.tsx";
import {RoomManagementService} from "../../wsservices/RoomManagementService.ts";
import type {RoomChatMessage, SendRoomChatResponseData} from "../../types/RoomManagementData.ts";
import {addMessageToCurrentRoom} from "../../store/slice/RoomManagementSlice.ts";
import {getRoomChatMesThunk, sendRoomChatThunk} from "../../thunks/RoomManagementThunk.ts";
import {useParams} from "react-router";


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

    const currentPage = useAppSelector(
        state => state.roomManagement.currentPage
    );

    const hasMoreMessages = useAppSelector(
        state => state.roomManagement.hasMoreMessages
    );

    const loadingMoreMessages = useAppSelector(
        state => state.roomManagement.loadingMoreMessages
    );

    const currentUsername = reLoginStorage.get(USER_KEY) ?? "";

    const { roomName } = useParams<{ roomName: string }>();

    const currentRoomName = roomName ? decodeURIComponent(roomName) : "";

    const displayRoomName = currentRoomName || "Loading";

    const isRoomMatched = Boolean(currentRoomName && room?.name === currentRoomName);

    const membersCount = isRoomMatched ? (room?.userList?.length ?? 0) : 0;


    const messages = useMemo<ChatMessage[]>(() => {

        if (!room?.chatData) return [];

        return room.chatData
            .map((message, index) => ({
                id: message.id ??
                    `${message.name}-${message.createAt}-${index}`,

                sender: message.name,

                content: message.mes,

                createdAt: parseChatDate(message.createAt!).toISOString(),

                isMine: message.name === currentUsername
            }))
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
            );

    }, [room?.chatData, currentUsername]);


    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!roomName) return;

        dispatch(getRoomChatMesThunk({
            name: decodeURIComponent(roomName),
            page: 1
        }));
    }, [dispatch, roomName]);

    useEffect(() => {
        const unsubscribe = RoomManagementService.onRoomMessage(
            (response: SendRoomChatResponseData) => {
                const newMessage = {
                    name: response.name,
                    to: response.to,
                    mes: response.mes,
                    type: response.type,
                    createAt: new Date().toISOString(),
                };

                dispatch(addMessageToCurrentRoom(newMessage));
            }
        );

        return unsubscribe;
    }, [dispatch]);

    const handleSendMessage = (content: string): void => {
        if (!room?.name) return;

        const newMessage: RoomChatMessage = {
            id: crypto.randomUUID(),
            name: currentUsername,
            to: room.name,
            mes: content,
            type: 1,
            createAt: new Date().toISOString(),
        };

        dispatch(addMessageToCurrentRoom(newMessage));

        dispatch(sendRoomChatThunk({
            roomName: room.name,
            mes: content
        }));
    }

    const handleLoadMoreMessages = () => {
        if (!isRoomMatched || loadingMoreMessages || !hasMoreMessages) {
            return;
        }

        dispatch(getRoomChatMesThunk({
            name: currentRoomName,
            page: currentPage + 1
        }));
    };

    return (
        <div className="d-flex w-100 vh-100 overflow-hidden bg-light">

            <div className="d-flex flex-column flex-grow-1 h-100 border-end overflow-hidden">

                <div className="flex-shrink-0 bg-white border-bottom">
                    <RoomHeader name={displayRoomName} isRoomChat={true} membersCount={membersCount}/>
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

                    <MessageList
                        key={currentRoomName}
                        messages={messages}
                        showSender={true}
                        hasMoreMessages={hasMoreMessages}
                        loadingMoreMessages={loadingMoreMessages}
                        onLoadMore={handleLoadMoreMessages}
                    />
                )}

                <MessageInput onSend={handleSendMessage} />

            </div>

            <RoomInfoSidebar/>
        </div>
    );
}