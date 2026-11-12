import {Image} from "react-bootstrap";
import {getRoomAvatarUrl} from "./RoomChatImage.tsx";

interface AvatarChatImagePros{
    name : string;
}

export  function AvatarChatImage({name} :AvatarChatImagePros ){
    return(
        <Image
            src={getRoomAvatarUrl(name)}
            alt={name}
            roundedCircle
            className="w-100 h-100 object-fit-cover"
        />
    );
}