import axios, {AxiosError} from "axios";
import {ADD_FRIEND, API_URL, DELETE_FRIEND, FILE, FRIENDS, FRIENDS_POST, LOGIN, POSTS, USER, USERINFO} from "../const";
import {IPost} from "../types/IPost";
import {IUser} from "../types/IUser";
import IResponse from "../types/IResponse";
import {IUserData} from "../types/IUserData";
import {IFile} from "../types/IFile";


export class UserService {
    static getUserInfo (login: String) {
        return axios.get<IUserData>(API_URL + USER + USERINFO, {params:{login: login}})

            .then(response => {

                return <IResponse<IUserData>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                if (err.response) {
                    return <IResponse<IUserData>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<IUserData>>{
                    data: null,
                    error: "fail"
                }
            }).catch((e: Error) => {
                return <IResponse<IUserData>>{
                    data: null,
                    error: "fail"
                }
            });
    }

    static getFile (login: string, fileName: string | undefined) {
        return axios.get<IFile>(API_URL + USER + FILE, {params:{login: login, fileName:fileName}})
            .then(response => {

                return <IResponse<IFile>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                if (err.response) {
                    return <IResponse<IFile>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<IFile>>{
                    data: null,
                    error: "fail"
                }
            });
    }

    static getUserLogin(jwt: string | null) {
        return axios.get<string | null>(API_URL + USER + LOGIN, {params:{jwt: jwt}})
            .then(response => {

                return <IResponse<string>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                if (err.response) {
                    return <IResponse<string | null>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<string | null>>{
                    data: null,
                    error: "fail"
                }
            });
    }

    static deleteFriend(login: string | null, jwt: string | null) {
        return axios.post<string>(API_URL + USER + DELETE_FRIEND, {jwt: jwt, data:login})
            .then(response => {
                return <IResponse<string | null>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                if (err.response) {
                    return <IResponse<string | null>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<string | null>>{
                    data: null,
                    error: "fail"
                }
            }).catch((err: Error) => {
               console.log(err)
                return <IResponse<string | null>>{
                    data: null,
                    error: "fail"
                }
            });
    }


    static addFriend(login: string | null, jwt: string | null) {
        return axios.post<string>(API_URL + USER + ADD_FRIEND, {jwt: jwt, data:login})
            .then(response => {
                return <IResponse<string | null>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                if (err.response) {
                    return <IResponse<string | null>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<string | null>>{
                    data: null,
                    error: "fail"
                }
            }).catch((err: Error) => {
                return <IResponse<string | null>>{
                    data: null,
                    error: "fail"
                }
            });
    }

    static getFriends (login: String) {
        return axios.get<Array<IUser>>(API_URL + USER + FRIENDS, {params:{login: login}})
            .then(response => {
                return <IResponse<Array<IUser>>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                if (err.response) {
                    return <IResponse<Array<IUser>>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<Array<IUser>>>{
                    data: null,
                    error: "fail"
                }
            });
    }

    static getPosts (login: String) {
        return axios.get<Array<IPost>>(API_URL + USER + POSTS, {params:{login: login}})
            .then(response => {
                return <IResponse<Array<IPost>>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                if (err.response) {
                    return <IResponse<Array<IPost>>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<Array<IPost>>>{
                    data: null,
                    error: "fail"
                }
            });
    }

    static getFriendsPosts (login: String) {
        return axios.get<Array<IPost>>(API_URL + USER + FRIENDS_POST, {params:{login: login}})
            .then(response => {
                return <IResponse<Array<IPost>>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                if (err.response) {
                    return <IResponse<Array<IPost>>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<Array<IPost>>>{
                    data: null,
                    error: "fail"
                }
            });
    }
}