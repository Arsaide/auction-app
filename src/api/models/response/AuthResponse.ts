import {IUser} from "../IUser";

export interface AuthResponse {
    token: string;
    message: string;
    auction: [],
    user: IUser;
}