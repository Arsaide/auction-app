import $api from '../request';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { Dayjs } from 'dayjs';
import { OwnAuctionInt } from '../../app/auction/auction-id/AuctionItemProps';

export default class AuctionService {
    static async createAuction(
        title: string,
        desc: string,
        minRates: string,
        image: File | null,
        endDate: Dayjs | null,
        token: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('minRates', minRates);
        if (image) {
            formData.append('img', image);
        }
        if (endDate) {
            formData.append('endDate', endDate.toISOString());
        }
        formData.append('token', token);

        return await $api.post<AuthResponse>('/createauction', formData);
    }

    static async editAuctionFields(
        token: string,
        _id: string,
        title: string,
        minRates: string,
        endDate: Dayjs | null,
        desct: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        let endDateString: string | null = null;
        if (endDate !== null) {
            endDateString = endDate.toDate().toISOString();
        }
        return $api.post<AuthResponse>('/editfieldauction', {
            token,
            _id,
            title,
            minRates,
            timeEnd: endDateString,
            desct,
        });
    }

    static async getOneAuction(
        _id: string | undefined,
        token: string | null,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/getauctionone', { _id, token });
    }

    static async sendDeleteAuction(
        _id: string | undefined,
        token: string | null,
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/deleteauctionsend', {
            _id,
            token,
        });
    }

    static async deleteAuction(
        token: string | null,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/deleteauction', {
            password,
            token,
        });
    }

    static async placeABet(
        token: string | null,
        idAuction: string | undefined,
        sum: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/makebidauctionone', {
            token,
            idAuction,
            sum,
        });
    }
}
