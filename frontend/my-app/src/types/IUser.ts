import {IUserData} from "./IUserData";

export interface IUser {
    login: string;
    password: string;
    id: number;
    userInfo: IUserData;
}