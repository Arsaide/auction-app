import $api from '../request';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { Dayjs } from 'dayjs';
import { OwnAuctionInt } from '../../app/rate/rate-id/AuctionItemInt';

export default class AuthService {
    static async login(
        email: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password });
    }

    static async registration(
        name: string,
        email: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {
            name,
            email,
            password,
        });
    }

    static async sendEmail(): Promise<void> {
        return $api.get('/sendemail');
    }

    static async registerCreate(
        code: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registercreate', { code });
    }

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

    static async getOneAuction(
        _id: string | undefined,
        token: string | null,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/getauctionone', { _id, token });
    }

    static async getUser(
        token: string | null | undefined,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/getuser', { token });
    }

    static async getOwnAuctions(
        token: string | null | undefined,
    ): Promise<AxiosResponse<OwnAuctionInt>> {
        return $api.post('/getownauctions', { token });
    }
}
