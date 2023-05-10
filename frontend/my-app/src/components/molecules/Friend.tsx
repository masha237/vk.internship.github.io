import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {IUser} from "../../types/IUser";
import {Jwt} from "../../types/Jwt";
import "../../styles/friend.css"
import {Link} from "react-router-dom";
import {DeleteButton} from "./DeleteButton";
import {UserService} from "../../Utils/UserService";
import IResponse from "../../types/IResponse";
import {IFile} from "../../types/IFile";

interface Props {
    user: IUser;
    jwt0:Jwt;
    setFriends: Dispatch<SetStateAction<IUser[] | null>>;
}
const Friend = ( {user, jwt0, setFriends}:Props ) => {
   const [avatar, setAvatar] = useState<IFile>();

    useEffect(() => {
        if (user.login && user && user.userInfo.fileName) {
            UserService.getFile(user.login, user.userInfo.fileName).then((response: IResponse<IFile>) => {
                if (response.error === null) {
                    if (response.data !== null) {
                        setAvatar(response.data)
                    }
                }
            }).catch(console.log);
        }
    }, [user])

    return (
        <div className="friend">
            <div className="avatar-friend">
                {avatar && <img src={"data:image/" + avatar.type + ";base64," + avatar.base64} alt="avatar"/>}
                {!avatar && <img src="/camera_200.png" alt="avatar"/>}
            </div>
            <div className="friend-info">
                <div className="friend-name">
                    <Link to={"../user/" + user.login}>{user.userInfo.username}</Link>
                </div>
                <div className="friend-university">
                    {user.userInfo.university}
                </div>
                <DeleteButton login={user.login} jwt0={jwt0} setFriends={setFriends} setIsFriends={undefined}/>
            </div>

        </div>
    );
};

export default Friend;