import $api from '../request';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AccountService {
    static async getUser(
        token: string | null | undefined,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/getuser', { token });
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
