import React, {
    createContext,
    FC,
    useEffect,
    useState,
    useContext,
} from 'react';

import { observer } from 'mobx-react-lite';
import { IUser } from '../../api/models/IUser';
import { Context } from '../../index';

interface IAuthContext {
    isLoggedIn: boolean;
    user: IUser | null;
    isLoading: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthAndFetchUser: () => Promise<void>;
}

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    user: null,
    isLoading: false,
    setIsLoggedIn: () => null,
    checkAuthAndFetchUser: async () => {},
});

export const AuthProvider: FC<IAuthProvider> = observer(({ children }) => {
    const { store } = useContext(Context);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const storedAuth = localStorage.getItem('isLoggedIn');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const checkAuthAndFetchUser = async () => {
        try {
            setIsLoading(true);
            await store.getUser();
            setUser(store.user);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error:', error);
            await store.logout();
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const token = localStorage.getItem('token');

    useEffect(() => {
        isLoggedIn ? checkAuthAndFetchUser() : null;
    }, [token]);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        user,
        isLoading,
        checkAuthAndFetchUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
});
