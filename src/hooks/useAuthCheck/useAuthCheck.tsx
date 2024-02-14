import { useState, useEffect } from 'react';

const useAuthCheck = () => {
    const [isAuth, setIsAuth] = useState(false);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const auth = token !== null;
        setIsAuth(auth);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return { isAuth };
};

export default useAuthCheck;
