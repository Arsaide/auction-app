import {IUser} from "../models/IUser";
import {makeAutoObservable } from 'mobx'
import AuthService from "../services/AuthService";

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
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
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
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async registercreate(code: string) {
        try {
            const response = await AuthService.registercreate(code);
            console.log(response);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            // const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(true);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {

        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
}