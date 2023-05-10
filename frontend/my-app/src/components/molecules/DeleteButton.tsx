import React, {Dispatch, SetStateAction} from 'react';
import {UserService} from "../../Utils/UserService";
import IResponse from "../../types/IResponse";
import {Jwt} from "../../types/Jwt";
import {IUser} from "../../types/IUser";
import "../../styles/button.css"

interface Props {
    login: string;
    jwt0: Jwt;
    setFriends: Dispatch<SetStateAction<IUser[] | null>>;
    setIsFriends: Dispatch<React.SetStateAction<boolean | undefined>> | undefined
}
export const DeleteButton = ({login, jwt0, setFriends, setIsFriends}:Props) => {
    const handleClick = () => {
        UserService.deleteFriend(login, jwt0.jwt).then((response:IResponse<string | null>) => {
            if (response.error === null && response.data !== null) {
                setFriends(null);
                if (setIsFriends) {
                    setIsFriends(false);
                }
            }
        }).catch(console.log);
    }
    return (
        <button className="button-friend" onClick={handleClick}>Удалить из друзей</button>
    );
};