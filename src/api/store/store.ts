import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import { toast } from 'react-toastify';
import { Dayjs } from 'dayjs';
import AuctionService from '../services/AuctionService';
import AccountService from '../services/AccountService';

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
                toast.error('Token is not valid');
                return;
            }

            return await toast.promise(
                AuctionService.createAuction(
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
        } catch (e: any) {
            throw e;
        }
    }

    async editAuctionFields(
        _id: string,
        title: string,
        minRates: string,
        endDate: Dayjs | null,
        desct: string,
    ) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Token is not valid');
                return;
            }

            return await toast.promise(
                AuctionService.editAuctionFields(
                    token,
                    _id,
                    title,
                    minRates,
                    endDate,
                    desct,
                ),
                {
                    pending: 'Send request...',
                    success: 'Request successfully!',
                    error: 'Failed to request, please try again...',
                },
            );
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
            return await AuctionService.getOneAuction(_id, token);
        } catch (e: any) {
            throw e;
        }
    }

    async sendDeleteAuction(id: string | undefined) {
        try {
            const token: string | null = localStorage.getItem('token');

            return await toast.promise(
                AuctionService.sendDeleteAuction(id, token),
                {
                    pending: 'Sending code...',
                    success: 'Created successfully!',
                    error: 'Invalid code, please try again...',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }

    async deleteAuction(password: string) {
        try {
            const token: string | null = localStorage.getItem('token');
            return await AuctionService.deleteAuction(token, password);
        } catch (e: any) {
            throw e;
        }
    }

    async placeABet(bet: string, auctionId: string | undefined) {
        try {
            const token: string | null = localStorage.getItem('token');
            return await toast.promise(
                AuctionService.placeABet(token, auctionId, bet),
                {
                    pending: 'Placing a bet...',
                    success: 'Place a bet successfully!',
                    error: 'Invalid request, please try again...',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }

    async getUser() {
        try {
            const token = localStorage.getItem('token');
            const response = await AccountService.getUser(token);
            const userData: IUser = response.data.user;
            this.setUser(userData);
        } catch (e: any) {
            await this.logout();
            throw e;
        }
    }

    async getOwnAuctions(token: string | null | undefined) {
        try {
            return await AuctionService.getOwnAuctions(token);
        } catch (e: any) {
            throw e;
        }
    }

    async editProfileImage(image: File | null) {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Token is not valid');
                return;
            }

            return await toast.promise(
                AccountService.editProfileImage(token, image),
                {
                    pending: 'Send request...',
                    success: 'Request successfully!',
                    error: 'Failed to request, please try again...',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }

    async forgotPassword(email: string) {
        try {
            return await toast.promise(AuthService.forgotPassword(email), {
                pending: 'Send request...',
                success: 'Request successfully!',
                error: 'Failed to request, please try again...',
            });
        } catch (e: any) {
            throw e;
        }
    }

    async recoveryPassword(token: string | null) {
        try {
            return AuthService.recoveryPassword(token);
        } catch (e: any) {
            throw e;
        }
    }

    async changePassword(token: string | null, password: string) {
        try {
            return await toast.promise(
                AuthService.changePassword(token, password),
                {
                    pending: 'Send request...',
                    success: 'Request successfully!',
                    error: 'Failed to request, please try again...',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }
}
