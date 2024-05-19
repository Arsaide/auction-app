import $api from '../request';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

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

    static async sendEmail(regToken: string): Promise<void> {
        return $api.get(`/sendemail?token=${regToken}`);
    }

    static async registerCreate(
        code: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registercreate', { code });
    }

    static async forgotPassword(
        email: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/recoverypassword', { email });
    }

    static async recoveryPassword(
        token: string | null,
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/checktoken', { token });
    }

    static async changePassword(
        token: string | null,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/changepassword', {
            token,
            password,
        });
    }
}
