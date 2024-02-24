import { IUser } from '../IUser';

export interface AuthResponse {
    token: string;
    balance: string;
    message: string;
    auction: [];
    user: IUser;
}
