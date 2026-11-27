import type {ChatMessage} from "../../types/Chat.ts";
import {MessageRow} from "./MessageRow.tsx";



export interface GifMessageProps {
    message: ChatMessage;
}

export function GifMessage({message} : GifMessageProps){
    const isMine = message.isMine;
    const url =  message.content;
    return (
        <>
            <MessageRow isMine={isMine} createdAt={message.createdAt}>
                <img src={url} alt="GIF" />
            </MessageRow>
        </>
    );
}