import {UploadFile} from "antd";

export interface IRegisterData {
    login: string;
    password: string;
    username: string,
    age: number,
    university: string,
    city: string,
    avatar: UploadFile | undefined
}