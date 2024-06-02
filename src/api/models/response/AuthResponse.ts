import { IUser } from '../IUser';
import { IPersonalAccount } from '../IPersonalAccount';

export interface AuthResponse {
    token: string;
    balance: string;
    message: string;
    auction: [];
    user: IUser;
    info: IPersonalAccount;
    avatar: string; // avatar
    stateOwner: boolean;
    status: boolean; // recovery password
    UserBid: {
        sum: number;
    };
}
