import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../index';
import { useNavigate } from 'react-router-dom';
import { Box, Hidden } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginForm from '../auth/loginForm/LoginForm';
import RegistrationForm from '../auth/registration/registrationForm/RegistrationForm';
import { ButtonColors } from '../../../lib/colors/ButtonColors';

const PersonalAccountPage: FC = () => {
    const [showLoginComponent, setShowLoginComponent] =
        useState<boolean>(false);
    const [showRegComponent, setShowRegComponent] = useState<boolean>(false);
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('isAuth') === 'true';
    const token = localStorage.getItem('token');

    const redirectPage = () => {
        if (isAuth) {
            navigate(`/personal-account/${token}`);
        }
    };

    useEffect(() => {
        redirectPage();
    }, []);

    const handleClickShowLogin = () => {
        setShowLoginComponent(true);
        setShowRegComponent(false);
    };
    const handleClickShowReg = () => {
        setShowRegComponent(true);
        setShowLoginComponent(false);
    };

    return (
        <>
            {showLoginComponent || showRegComponent ? null : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 3,
                        }}
                    >
                        <Hidden mdUp>
                            <img
                                style={{ width: '100%' }}
                                src="/flr2.gif"
                                alt="Тут будет логотип в будущем"
                            />
                        </Hidden>
                        <Typography variant={'h5'} sx={{ textAlign: 'center' }}>
                            To continue please log in.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                            }}
                        >
                            <Button
                                sx={{
                                    color: ButtonColors.WHITE,
                                    bgcolor: ButtonColors.DGREEN,
                                    '&:hover': {
                                        bgcolor: ButtonColors.LGREEN,
                                    },
                                }}
                                variant="contained"
                                size="large"
                                onClick={handleClickShowLogin}
                            >
                                Log-in
                            </Button>
                            <Button
                                sx={{
                                    color: ButtonColors.WHITE,
                                    bgcolor: ButtonColors.DGREEN,
                                    '&:hover': {
                                        bgcolor: ButtonColors.LGREEN,
                                    },
                                }}
                                variant="contained"
                                size="large"
                                onClick={handleClickShowReg}
                            >
                                Registration
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
            {showLoginComponent && (
                <>
                    <Typography variant={'h5'} sx={{ textAlign: 'center' }}>
                        To continue please log in.
                    </Typography>
                    <LoginForm />
                </>
            )}
            {showRegComponent && (
                <>
                    <Typography variant={'h5'} sx={{ textAlign: 'center' }}>
                        To continue please log in.
                    </Typography>
                    <RegistrationForm />
                </>
            )}
        </>
    );
};

export default PersonalAccountPage;
