import {IUser} from "../models/IUser";
import {makeAutoObservable } from 'mobx'
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../request";

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

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
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
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
            await AuthService.sendemail();
            return response;
        } catch (e: any) {
            throw e;
        }
    }

    async registercreate(code: string) {
        try {
            const response = await AuthService.registercreate(code);
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
}