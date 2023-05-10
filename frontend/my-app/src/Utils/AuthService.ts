import axios, {AxiosError} from "axios";
import {API_URL, AUTH, LOGIN, REGISTER} from "../const";
import ILoginData from "../types/ILoginData";
import {IRegisterData} from "../types/IRegisterData";
import IResponse from "../types/IResponse";
import {IUser} from "../types/IUser";



export class AuthService {
    static login (user: ILoginData) {
        return axios.post<string>(API_URL + AUTH + LOGIN, {login: user.login, password: user.password})
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
        });
    }

    static register (user: IRegisterData) {
        return axios.post<IUser>(API_URL + AUTH + REGISTER, {
            login: user.login,
            password: user.password,
            username: user.username,
            city: user.city,
            age: user.age,
            university: user.university,
            avatar: user.avatar
        }, { headers: { "Content-Type": "multipart/form-data" }})
            .then(response => {
                return <IResponse<IUser>>{
                    data: response.data,
                    error: null
                }
            }).catch((err: AxiosError) => {
                console.log(err)
                if (err.response) {
                    return <IResponse<IUser>>{
                        data: null,
                        error: err.response.data as String
                    }
                }
                return <IResponse<IUser>>{
                    data: null,
                    error: "fail"
                }
            }).catch(() => {
                console.log("kek")
                return <IResponse<IUser>>{
                    data: null,
                    error: "fail"
                }
            });
    }

    static logout() {
        console.log(localStorage)
        localStorage.removeItem("jwt");
        console.log(localStorage)
    }
}
export default AuthService
