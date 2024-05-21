import $api from '../request';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

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
