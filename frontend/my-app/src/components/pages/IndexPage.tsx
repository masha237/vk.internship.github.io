import React, {useEffect, useState} from 'react';
import {UserService} from "../../Utils/UserService";
import IResponse from "../../types/IResponse";
import {IPost} from "../../types/IPost";
import {Post} from "../molecules/Post";
import {Jwt} from "../../types/Jwt";

interface Params {
    jwt0: Jwt
}

const IndexPage = ({jwt0}:Params) => {

    const [posts, setPosts] = useState<Array<IPost> | null>(null);
    const myLogin: string | null = localStorage.getItem("login");
    const [needReloadPosts, setNeedReloadPosts] = useState<boolean>(true)


    useEffect(() => {
        if (myLogin && needReloadPosts) {
             UserService.getFriendsPosts(myLogin).then((response: IResponse<Array<IPost>>) => {
                if (response.error === null) {
                    if (response.data) {
                        setNeedReloadPosts(false)
                        setPosts(response.data);
                    }
                }
            }).catch(console.log);
        }
    },[needReloadPosts, myLogin])

    return (
        <div className="content index">
            {posts?.map((post, index) => <Post post={post} key={index} jwt0={jwt0} setPost={setPosts} setNeedReloadPosts={setNeedReloadPosts}/>)}
        </div>
    );
};

export default IndexPage;