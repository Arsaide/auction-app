import React, { createContext, FC, useEffect, useState } from 'react';

interface IAuthContext {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    setIsLoggedIn: () => null,
});

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const storedAuth = localStorage.getItem('isLoggedIn');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
