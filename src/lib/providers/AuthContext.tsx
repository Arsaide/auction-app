// import React, {
//     createContext,
//     FC,
//     useContext,
//     useEffect,
//     useState,
// } from 'react';
// import { IUser } from '../../api/models/IUser';
// import { Context } from '../../index';
//
// interface IAuthContext {
//     isLoggedIn: boolean;
//     setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
//     user: IUser | null;
//     checkAuthAndFetchUser: () => Promise<void>;
// }
//
// interface IAuthProvider {
//     children: React.ReactNode;
// }
//
// export const AuthContext = createContext<IAuthContext>({
//     isLoggedIn: false,
//     setIsLoggedIn: () => null,
//     user: null,
//     checkAuthAndFetchUser: async () => {},
// });
//
// export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
//     const { store } = useContext(Context);
//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
//         try {
//             const storedAuth = localStorage.getItem('isLoggedIn');
//             return storedAuth ? JSON.parse(storedAuth) : false;
//         } catch (error) {
//             console.error('Error parsing localStorage data', error);
//             return false;
//         }
//     });
//     const [user, setUser] = useState<IUser | null>(null);
//
//     const checkAuthAndFetchUser = async () => {
//         try {
//             await store.getUser();
//             setUser(store.user);
//             setIsLoggedIn(true);
//         } catch (error: any) {
//             console.error('Error: ', error);
//             await store.logout();
//             setIsLoggedIn(false);
//             setUser(null);
//         }
//     };
//
//     useEffect(() => {
//         checkAuthAndFetchUser();
//     }, []);
//
//     useEffect(() => {
//         localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
//     }, [isLoggedIn]);
//
//     const value = {
//         isLoggedIn,
//         setIsLoggedIn,
//         checkAuthAndFetchUser,
//     };
//
//     return (
//         <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//     );
// };
import React, {
    createContext,
    FC,
    useEffect,
    useState,
    useContext,
} from 'react';

import { observer } from 'mobx-react-lite';
import { IUser } from '../../api/models/IUser';
import { Context } from '../../index'; // Для наблюдения за изменениями в MobX

interface IAuthContext {
    isLoggedIn: boolean;
    user: IUser | null;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    // checkAuthAndFetchUser: () => Promise<void>;
}

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    user: null,
    setIsLoggedIn: () => null,
    // checkAuthAndFetchUser: async () => {},
});

export const AuthProvider: FC<IAuthProvider> = observer(({ children }) => {
    const { store } = useContext(Context);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const storedAuth = localStorage.getItem('isLoggedIn');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });
    const [user, setUser] = useState<IUser | null>(null);

    const checkAuthAndFetchUser = async () => {
        try {
            await store.getUser();
            setUser(store.user);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error:', error);
            await store.logout();
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuthAndFetchUser();
    }, []);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
});
