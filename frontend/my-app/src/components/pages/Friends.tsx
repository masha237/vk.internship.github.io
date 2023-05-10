import React, {useEffect} from 'react';
import {UserService} from "../../Utils/UserService";
import {Navigate} from "react-router-dom";
import IResponse from "../../types/IResponse";
import {IUser} from "../../types/IUser";
import Friend from "../molecules/Friend";
import {Jwt} from "../../types/Jwt";
import "../../styles/layout.css"
import "../../styles/friend.css"

interface Props {
    jwt0: Jwt,
    friends: Array<IUser> | null;
    setFriends: React.Dispatch<React.SetStateAction<IUser[] | null>>
}

const Friends = ({jwt0, friends, setFriends}:Props) => {
    const login: string | null = localStorage.getItem("login");

    useEffect(() => {
        if (friends !== null) {
            return;
        }
        if (login === null) {
            return;
        }
        UserService.getFriends(login).then((response: IResponse<Array<IUser>>) => {
            if (response.error === null) {
                setFriends(response.data)
            }
        }).catch(console.log);
    }, [friends]);

    if (login === null) {
        return <Navigate to={"../login"}/>;
    }
    return (
        <div className="content friends">
            {friends?.map((user: IUser) => {
                    console.log(user);
                    return <Friend key={user.id} user={user} jwt0={jwt0} setFriends={setFriends}/>
                })}
        </div>
    );
};

export default Friends;