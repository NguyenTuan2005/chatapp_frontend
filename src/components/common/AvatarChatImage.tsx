import {Image} from "react-bootstrap";
import {getRoomAvatarUrl} from "./RoomChatImage.tsx";
import type {ReactNode} from "react";

interface AvatarChatImageProps {
    name?: string | null;
    children?: ReactNode;
}

export function AvatarChatImage({name, children}: AvatarChatImageProps) {
    const displayName = name ?? '';

    return (
        <div className="position-relative w-100 h-100">
            <Image
                src={getRoomAvatarUrl(displayName)}
                alt={displayName}
                roundedCircle
                className="w-100 h-100 object-fit-cover"
            />
            {children}
        </div>
    );
}