import $api from "../request";
import {AxiosResponse} from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {email, password});
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {email, password});
    }

    static async sendemail(): Promise<void> {
        return $api.get('/sendemail');
    }

    static async registercreate(code: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registercreate', {code})
    }

    static async createauction(
        title: string,
        desc: string,
        minRates: string,
        image: File | null,
        endDate: Date[],
        token: string
    ): Promise<AxiosResponse<AuthResponse>> {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('minRates', minRates);
        if (image) {
            formData.append('img', image);
        }
        formData.append('endDate', endDate[0].toISOString());
        formData.append('token', token);

        return await $api.post<AuthResponse>('/createauction', formData);
    }

    static async getauctionone(id: string | undefined): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/getauctionone', {id});
    }
}