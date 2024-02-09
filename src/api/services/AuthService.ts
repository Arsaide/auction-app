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

    // static async logout(): Promise<void> {
    //     return $api.post('/logout');
    // }

    static async sendemail(): Promise<void> {
        return $api.get('/sendemail');
    }

    static async registercreate(code: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registercreate', {code})
    }

    static async sendimg(email: string, password: string, image: File | null): Promise<AxiosResponse<AuthResponse>> {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        if (image) {
            formData.append('image', image);
        }


        return await $api.post<AuthResponse>('/sendimg', formData);
    }
}