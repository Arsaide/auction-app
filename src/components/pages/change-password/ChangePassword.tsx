import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../../index';
import { CircularProgress, Typography } from '@mui/material';
import ChangePasswordForm from './changePasswordForm/ChangePasswordForm';
import { toast } from 'react-toastify';
import success = toast.success;
import { MainColors } from '../../../lib/colors/MainColors';
import Box from '@mui/material/Box';
import ChangePasswordWindow from './changePasswordWindow/ChangePasswordWindow';

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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'calc(100vh - 112px)',
                    }}
                >
                    <CircularProgress
                        size={200}
                        thickness={2}
                        sx={{ color: MainColors.GREEN }}
                    />
                </Box>
            ) : isValidToken ? (
                <ChangePasswordWindow>
                    <Typography variant="h6">Enter a new password</Typography>
                    <ChangePasswordForm token={token} />
                </ChangePasswordWindow>
            ) : (
                <ChangePasswordWindow>
                    <Typography variant="h6">
                        You cannot change your password
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        The link you clicked is no longer valid or has
                        expired!😥
                    </Typography>
                    <img
                        src="/gifs/sad.gif"
                        alt="Error"
                        style={{
                            width: '100%',
                            marginTop: '20px',
                        }}
                    />
                </ChangePasswordWindow>
            )}
        </>
    );
};

export default ChangePassword;
