import {IUser} from "./IUser";

export interface IPost {
    id: number;
    creationTime: Date;
    title: string;
    text: string;
    user: IUser;
    likes: Array<IUser>;
    fileName: string;
}