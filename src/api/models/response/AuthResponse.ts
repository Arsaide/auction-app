import {IUser} from "../IUser";

export interface AuthResponse {
    token: string;
    message: string;
    // refreshToken: string;
    user: IUser;
}