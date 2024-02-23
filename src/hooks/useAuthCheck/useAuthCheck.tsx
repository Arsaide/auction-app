import { useState, useEffect } from 'react';

const useAuthCheck = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const checkAuth = () => {
        const isAuth = localStorage.getItem('isAuth') === 'true';
        const token = localStorage.getItem('token') || '';

        setIsAuth(isAuth && token !== undefined && token !== '');
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return { isAuth };
};

export default useAuthCheck;
