import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../../index';
import { Typography } from '@mui/material';

const ChangePassword = () => {
    const { store } = useContext(Context);
    const [isValidToken, setIsValidToken] = useState<boolean>(true);
    const [isRequest, setIsRequest] = useState<boolean>(false);

    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        async function recoveryPassword() {
            setIsRequest(true);
            try {
                await store.recoveryPassword(token);
            } catch (e: any) {
                setIsValidToken(false);
                setIsRequest(false);
            }
            setIsRequest(false);
        }

        recoveryPassword();
    }, [token]);

    return (
        <>
            {isValidToken ? (
                <Typography>Token valid</Typography>
            ) : (
                <Typography>Token is not valid</Typography>
            )}
        </>
    );
};

export default ChangePassword;
