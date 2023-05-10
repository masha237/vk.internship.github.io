import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {UserService} from "../../Utils/UserService";
import IResponse from "../../types/IResponse";
import {IUserData} from "../../types/IUserData";
import "../../styles/user-page.css"
import {Button, Form, Input, Upload, UploadFile, UploadProps} from "antd";
import {Jwt} from "../../types/Jwt";
import {IUser} from "../../types/IUser";
import {DeleteButton} from "../molecules/DeleteButton";
import {AddButton} from "../molecules/AddButton";
import {IPost} from "../../types/IPost";
import {Post} from "../molecules/Post";
import TextArea from "antd/es/input/TextArea";
import {IPostForm} from "../../types/IPostForm";
import {PostService} from "../../Utils/PostService";
import {IFile} from "../../types/IFile";
import "./../../styles/form.css"

interface Props {
    jwt0: Jwt;
    setFriends: Dispatch<SetStateAction<IUser[] | null>>;
}
const UserPage = ({jwt0, setFriends}:Props) => {
    const {login} = useParams<string>();
    const [user, setUser] = useState<IUserData>();
    const [avatar, setAvatar] = useState<IFile>();
    const myLogin: string | null = localStorage.getItem("login");
    const [isFriends, setIsFriends] = useState<boolean>()
    const [posts, setPosts] = useState<Array<IPost> | null>(null)
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<UploadFile | null>()
    const [needReloadPosts, setNeedReloadPosts] = useState<boolean>(true)
    const [form] = Form.useForm();

    useEffect(() => {
        if (login && myLogin) {
            UserService.getUserInfo(login).then((response: IResponse<IUserData>) => {
                if (response.error === null) {
                    if (response.data) {
                        setUser(response.data)
                        setNeedReloadPosts(true);
                    }
                }
            }).catch(console.log);
            UserService.getFriends(myLogin).then((response: IResponse<Array<IUser>>) => {
                if (response.error === null) {
                    if (response.data) {
                        setIsFriends(response.data.filter(user => user.login === login).length > 0);
                    }
                }
            }).catch(console.log);


        }
    }, [login, isFriends, myLogin])

    useEffect(() => {
        if (login && user && user.fileName) {
            UserService.getFile(login, user.fileName).then((response: IResponse<IFile>) => {
                if (response.error === null) {
                    if (response.data !== null) {
                        setAvatar(response.data)
                        setNeedReloadPosts(true);
                    }
                }
            }).catch(console.log);
        }
    }, [user, login])

    useEffect(() => {
        if (login && needReloadPosts) {
            setNeedReloadPosts(false);
            UserService.getPosts(login).then((response: IResponse<Array<IPost>>) => {
                if (response.error === null) {
                    if (response.data) {
                        setPosts(response.data);
                    }
                }
            }).catch(console.log);
        }
    }, [needReloadPosts, login])

    if (!user) {
        return (<h1>Unknown User </h1>)
    }

    function writePost(data: IPostForm) {
        if (jwt0.jwt === null) {
            return
        }
        if (file !== undefined && file !== null) {
            data.image = file
            setFile(null)
        } else {
            data.image = undefined
        }

        form.resetFields();


        data.jwt = jwt0.jwt;
        PostService.write(data).then((response: IResponse<IPost>) => {
            if (response.error === null) {
                setNeedReloadPosts(true);
            } else {
                setError(response.error);
            }
        }).catch(console.log);

    }
    const handleRemove: UploadProps['onRemove'] = () => {
        setFile(null);
    }

    return (
        <div className="content user-page">
            <div id="person-name-header">
                {user?.username}
            </div>
            <div className="first-column">
                <div id="person-avatar">
                    {avatar && <img src={"data:image/" + avatar.type + ";base64," + avatar.base64} alt="avatar"/>}
                    {!avatar && <img src="/camera_200.png" alt="avatar"/>}
                </div>
                {myLogin !== login && login && isFriends &&
                    <DeleteButton login={login} jwt0={jwt0} setFriends={setFriends} setIsFriends={setIsFriends}/>
                }
                {myLogin !== login && login && !isFriends &&
                    <AddButton login={login} jwt0={jwt0} setFriends={setFriends} setIsFriends={setIsFriends}/>
                }
            </div>
            <div className="second-column">
                <div id="person-name">
                    {user?.username}
                </div>
                <h4><span>Личная информация</span></h4>
                <div id="person-age" className="info">
                    <div className="explanation">Возраст:</div>
                    {user?.age}
                </div>
                <h4><span>Контактная информация</span></h4>

                <div id="person-city" className="info">
                    <div className="explanation">Город:</div>
                    {user?.city}
                </div>
                <h4><span>Образование</span></h4>

                <div id="person-university" className="info">
                    <div className="explanation">Университет:</div>
                    {user?.university}
                </div>

                {login === myLogin &&
                    <div id="write-post">
                        <div className="selector">Что у вас нового?</div>
                        <Form className="form" form={form} name="post" initialValues={{remember: false}} onFinish={writePost}
                              autoComplete="off"
                              labelCol={{span: 2}} wrapperCol={{span: 8}}
                        >
                            <Form.Item className="form-item" wrapperCol={{ sm: 24 }}  name="title" rules={[
                                {required: true, message: "Please, input title!"}
                                ]}>
                                <Input placeholder="title"/>
                            </Form.Item>

                            <Form.Item className="form-text-area" name="text" wrapperCol={{ sm: 24 }}   rules={[
                                {required: true, message: "Please, input text!"}
                            ]}>
                                <TextArea  className="text-area"  placeholder="text"/>
                            </Form.Item>
                            <Form.Item className="form-upload" name="image">
                                <Upload
                                    action="/"
                                    listType="picture"
                                    accept="image/png,image/jpeg,image/jpg"
                                    maxCount={1}
                                    beforeUpload={(file) => {
                                        if(file.size && file.size > 1097152){
                                            alert("File is too big!");
                                            return true;
                                        }
                                        setFile(file);
                                        return false;
                                    }}
                                    onRemove={handleRemove}

                                >
                                    <Button>Click Upload avatar</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 2}}>
                                <Button type="primary" htmlType="submit" className="form-button">
                                    Write Post
                                </Button>
                                <div>{error}</div>
                            </Form.Item>

                        </Form>
                    </div>

                }
                <div className="selector">Стена</div>
                {posts?.map((post, index) => <Post post={post} key={index} jwt0={jwt0} setPost={setPosts}
                                                   setNeedReloadPosts={setNeedReloadPosts}/>)}
            </div>
        </div>
    );
};

export default UserPage;