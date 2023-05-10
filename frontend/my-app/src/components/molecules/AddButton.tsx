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
    setIsFriends: Dispatch<React.SetStateAction<boolean | undefined>>
}
export const AddButton = ({login, jwt0, setFriends, setIsFriends}:Props) => {
    const handleClick = () => {
        UserService.addFriend(login, jwt0.jwt).then((response:IResponse<string | null>) => {
            if (response.error === null && response.data !== null) {
                setFriends(null);
                setIsFriends(true);
            }
        }).catch(console.log);
    }
    return (
        <button className="button-friend" onClick={handleClick}>Добавить в  друзья</button>
    );
};