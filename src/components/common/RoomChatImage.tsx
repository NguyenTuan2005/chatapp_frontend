import {Image} from "react-bootstrap";

interface RoomChatImagePros{
    name: string
}
const DEFAULT_ROOM_AVATAR_URL = 'https://api.dicebear.com/9.x/shapes/svg?seed=default&size=64';

export const getRoomAvatarUrl = (roomName?: string | null, size = 64): string => {
    const name = roomName?.trim();

    if (!name) {
        return DEFAULT_ROOM_AVATAR_URL.replace('size=64', `size=${size}`);
    }

    const seed = encodeURIComponent(name.toLowerCase());
    return `https://api.dicebear.com/9.x/shapes/svg?seed=${seed}&size=${size}`;
};

export  function RoomChatImage({name} :RoomChatImagePros){
    return(
        <Image
        src={getRoomAvatarUrl(name)}
        alt={name}
        roundedCircle
        className="w-100 h-100 object-fit-cover"
         />
    );
}