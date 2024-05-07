import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../../index';
import { Typography } from '@mui/material';
import ChangePasswordForm from './changePasswordForm/ChangePasswordForm';

const ChangePassword = () => {
    const { store } = useContext(Context);
    const [isValidToken, setIsValidToken] = useState<boolean>(false);
    const [isRequest, setIsRequest] = useState<boolean>(false);

    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        async function recoveryPassword() {
            setIsRequest(true);
            try {
                const response = await store.recoveryPassword(token);

                if (response && response.data.status === true) {
                    setIsValidToken(true);
                }
            } catch (e: any) {
                console.log('Error');
            }
            setIsRequest(false);
        }

        recoveryPassword();
    }, [token]);

    return (
        <>
            {isRequest ? (
                <>Requesting...</>
            ) : isValidToken ? (
                <ChangePasswordForm token={token} />
            ) : (
                <Typography>Token is not valid</Typography>
            )}
        </>
    );
};

export default ChangePassword;
