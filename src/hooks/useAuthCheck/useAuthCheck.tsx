import { useState, useEffect } from 'react';

const useAuthCheck = () => {
    const [isAuth, setIsAuth] = useState(false);

    const checkAuth = () => {
        const isAuth = localStorage.getItem('isAuth') === 'true';
        setIsAuth(isAuth);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return { isAuth };
};

export default useAuthCheck;
