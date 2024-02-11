import {IUser} from "../models/IUser";
import {makeAutoObservable } from 'mobx'
import AuthService from "../services/AuthService";
import {toast} from "react-toastify";

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

    async sendemail() {
        try {
            const response = await toast.promise(
                AuthService.sendemail(),
                {
                    pending: 'Sending code...',
                    success: 'Code sent!',
                    error: 'Sending code error, please try again...'
                }
            );
            console.log(response);
            return response;
        } catch (e: any) {
            throw e;
        }
    }

    async login(email: string, password: string) {
        try {
            // const response = await AuthService.login(email, password);
            const response = await toast.promise(
                AuthService.login(email, password),
                {
                    pending: 'Logging in...',
                    success: 'Logged in successfully!',
                    error: 'Failed to login, please try again...'
                }
            );
            console.log(response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response;
        } catch (e: any) {
            throw e;
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await toast.promise(
                AuthService.registration(email, password),
                {
                    pending: 'Registering...',
                    success: 'Registered successfully!',
                    error: 'Failed to register, please try again...'
                }
            );
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
            await this.sendemail()
            return response;
        } catch (e: any) {
            throw e;
        }
    }

    async createauction(title: string, desc: string, minRates: string, image: File | null, endDate: Date[]){
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Token not found in LocalStorage');
                return
            }

            const response = await toast.promise(
                AuthService.createauction(title, desc, minRates, image, endDate, token),
                {
                    pending: 'Send request...',
                    success: 'Request successfully!',
                    error: 'Failed to request, please try again...'
                }
            )

            console.log(response);
            return response;
        } catch (e: any) {
            throw e;
        }
    }

    async registercreate(code: string) {
        try {
            const response = await toast.promise(
                AuthService.registercreate(code),
                {
                    pending: 'Sending code...',
                    success: 'Created successfully!',
                    error: 'Invalid code, please try again...'
                }
            );
            console.log(response);
            return response;
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
            this.setAuth(true);
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


    async getauctionone(id: string | undefined) {
        try {
            const response = await AuthService.getauctionone(id);
            console.log(response);
            return response;
        } catch (e: any) {
            throw e;
        }
    }
}