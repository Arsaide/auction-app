import $api from '../request';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { OwnAuctionInt } from '../../app/auction/auction-id/AuctionItemProps';

export default class AccountService {
    static async getUser(
        token: string | null,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/getuser', { token });
    }

    static async getPersonalAccount(
        token: string | null,
        id: string | undefined,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/getpersonalaccount', { token, id });
    }

    static async getOwnAuctions(
        token: string | null | undefined,
        id: string | undefined,
    ): Promise<AxiosResponse<OwnAuctionInt>> {
        return $api.post('/getownauctions', { token, id });
    }

    static async getHistoryAuctionBets(
        id: string | undefined,
    ): Promise<AxiosResponse<OwnAuctionInt>> {
        return $api.get(`/gethistoryauction?id=${id}`);
    }

    static async editProfileImage(
        token: string,
        image: File | null,
    ): Promise<AxiosResponse<AuthResponse>> {
        const formData = new FormData();
        if (image) {
            formData.append('img', image);
        }
        formData.append('token', token);

        return await $api.post<AuthResponse>('/editprofileimage', formData);
    }
}
