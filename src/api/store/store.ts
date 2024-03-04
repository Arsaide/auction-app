import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import { toast } from 'react-toastify';
import { Dayjs } from 'dayjs';

export default class Store {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async sendEmail() {
        try {
            return await toast.promise(AuthService.sendEmail(), {
                pending: 'Sending code...',
                success: 'Code sent!',
                error: 'Sending code error, please try again...',
            });
        } catch (e: any) {
            throw e;
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await toast.promise(
                AuthService.login(email, password),
                {
                    pending: 'Logging in...',
                    success: 'Logged in successfully!',
                    error: 'Failed to login, please try again...',
                },
            );
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response;
        } catch (e: any) {
            throw e;
        }
    }

    async registration(name: string, email: string, password: string) {
        try {
            const response = await toast.promise(
                AuthService.registration(name, email, password),
                {
                    pending: 'Registering...',
                    success: 'Registered successfully!',
                    error: 'Failed to register, please try again...',
                },
            );
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
            await this.sendEmail();
            return response;
        } catch (e: any) {
            throw e;
        }
    }

    async createAuction(
        title: string,
        desc: string,
        minRates: string,
        image: File | null,
        endDate: Dayjs | null,
    ) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Token not found in LocalStorage');
                return;
            }

            const response = await toast.promise(
                AuthService.createAuction(
                    title,
                    desc,
                    minRates,
                    image,
                    endDate,
                    token,
                ),
                {
                    pending: 'Send request...',
                    success: 'Request successfully!',
                    error: 'Failed to request, please try again...',
                },
            );
            return response;
        } catch (e: any) {
            throw e;
        }
    }

    async registerCreate(code: string) {
        try {
            return await toast.promise(AuthService.registerCreate(code), {
                pending: 'Sending code...',
                success: 'Created successfully!',
                error: 'Invalid code, please try again...',
            });
        } catch (e: any) {
            throw e;
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuth');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPassword');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const token = localStorage.getItem('token');
            if (token !== undefined && token !== null) {
                localStorage.setItem('isAuth', 'true');
            } else {
                localStorage.setItem('isAuth', 'false');
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async getOneAuction(_id: string | undefined) {
        try {
            const token: string | null = localStorage.getItem('token');
            return await AuthService.getOneAuction(_id, token);
        } catch (e: any) {
            throw e;
        }
    }

    async getUser(token: string | undefined) {
        try {
            return await AuthService.getUser(token);
        } catch (e: any) {
            await this.logout();
            throw e;
        }
    }
}
