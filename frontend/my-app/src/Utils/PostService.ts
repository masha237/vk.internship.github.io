import axios, {AxiosError} from "axios";
import {API_URL, LIKE, POST, WRITE} from "../const";
import IResponse from "../types/IResponse";
import {IPostForm} from "../types/IPostForm";
import {IPost} from "../types/IPost";



export class PostService {

    static write (postForm: IPostForm) {
        return axios.post<IPost>(API_URL + POST + WRITE, {
            jwt: postForm.jwt,
            text: postForm.text,
            title: postForm.title,
            image: postForm.image
        }, { headers: { "Content-Type": "multipart/form-data" }})
            .then(response => {
                return <IResponse<IPost>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                if (err.response) {
                    return <IResponse<IPost>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<IPost>>{
                    data: null,
                    error: "fail"
                }
            }).catch(() => {
                return <IResponse<IPost>>{
                    data: null,
                    error: "fail"
                }
            });
    }


    static like (postId: number, jwt: string) {
        return axios.post<string>(API_URL + POST + LIKE, {
            jwt: jwt,
            data: postId
        })
            .then(response => {
                return <IResponse<string>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                if (err.response) {
                    return <IResponse<string>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<string>>{
                    data: null,
                    error: "fail"
                }
            }).catch(() => {
                return <IResponse<string>>{
                    data: null,
                    error: "fail"
                }
            });
    }
}
