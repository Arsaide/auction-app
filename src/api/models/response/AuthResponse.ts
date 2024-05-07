import { IUser } from '../IUser';

export interface AuthResponse {
    token: string;
    balance: string;
    message: string;
    auction: [];
    user: IUser;
    avatar: string; // avatar
    stateOwner: boolean;
    status: boolean; // recovery password
}
