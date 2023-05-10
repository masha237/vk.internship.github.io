import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Jwt} from "../../types/Jwt";
import "../../styles/friend.css"
import {IPost} from "../../types/IPost";
import "../../styles/post.css"
import {UserService} from "../../Utils/UserService";
import IResponse from "../../types/IResponse";
import {PostService} from "../../Utils/PostService";
import {IFile} from "../../types/IFile";
import {Link} from "react-router-dom";

interface Props {
    post: IPost;
    jwt0:Jwt;
    setPost:   React.Dispatch<React.SetStateAction<IPost[] | null>>
    setNeedReloadPosts: Dispatch<SetStateAction<boolean>>
}
export const Post = ( {post, jwt0}:Props ) => {
    const login: string | null = localStorage.getItem("login");
    const [image, setImage] = useState<IFile>();
    const [avatar, setAvatar] = useState<IFile>();
    const [likes, setLikes] = useState<number>(0);
    const [youLiked, setYouLiked] = useState<boolean>(false)
    const like = () => {
        if (jwt0.jwt) {
            PostService.like(post.id, jwt0.jwt).then((response: IResponse<string | null>) => {
                if (response.error === null && response.data !== null) {
                    if (response.data === "you liked post") {
                        setLikes(likes + 1);
                        setYouLiked(true);
                    } else {
                        setLikes(likes - 1);
                        setYouLiked(false);
                    }
                }
            }).catch(console.log);
        }
    }

    function formatTime(date: Date) {
        return new Date(date).toLocaleDateString();
    }

    useEffect(() => {
        if (post.likes) {
            setLikes(post.likes.length);
            setYouLiked(post.likes.filter(user => user.login === login).length === 1)
       }
        if (post.user.login && post && post.fileName) {
            UserService.getFile(post.user.login, post.fileName).then((response: IResponse<IFile>) => {
                if (response.error === null) {
                    if (response.data !== null) {
                        setImage(response.data)
                    } else {
                        console.log("lol");
                    }
                }
            }).catch(console.log);
        }
        if (post.user.login && post.user.userInfo.fileName) {
            UserService.getFile(post.user.login, post.user.userInfo.fileName).then((response: IResponse<IFile>) => {
                if (response.error === null) {
                    if (response.data !== null) {
                        setAvatar(response.data)
                    } else {
                        console.log("lol");
                    }
                }
            }).catch(console.log);
        }
    }, [post])

    function getFilter():string {
        return "invert(44%) sepia(50%) saturate(411%) hue-rotate(171deg)" + (!youLiked ? "brightness(300%)" : "brightness(87%)") + "contrast(88%)";
    }

    return (
        <div className="post">
            <div className="post-author-avatar">
                {avatar && <img src={"data:image/" + avatar.type + ";base64," + avatar.base64} alt="avatar"/>}
                {!avatar && <img src="/camera_200.png" alt="avatar"/>}
            </div>
            <div className="second-column-post">
                <div className="post-author">
                    <Link to={"../user/" + post.user.login}>{post.user.userInfo.username}</Link>
                </div>

                <div className="post-title">
                    {post.title}
                </div>
                <div className="post-text">
                    {post.text}
                </div>

                {image && <img className="post-image" src={"data:image/" + image.type + ";base64," + image.base64} alt={post.fileName}/>}

                <div className="button">
                    <div className="count-likes">{likes ? likes : 0}</div>
                    <img onClick={like} src="/heart-svgrepo-com.svg" alt="like" style={{filter: getFilter()}}/>
                    <div className="post-creation-time">
                        {formatTime(post.creationTime)}
                    </div>
                </div>
            </div>
        </div>
    );
};
