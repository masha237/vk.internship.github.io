import {UploadFile} from "antd";

export interface IPostForm {
    text: string;
    title: string;
    jwt: string;
    image: UploadFile | undefined
}