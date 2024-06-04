import React, { FC, useContext, useEffect, useState } from 'react';
import { Box, Hidden } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginForm from '../auth/loginForm/LoginForm';
import RegistrationForm from '../auth/registration/registrationForm/RegistrationForm';
import { ButtonColorsEnum } from '../../../lib/colors/ButtonColors.enum';
import { AuthContext } from '../../../lib/providers/AuthContext';
import { useNavigate } from 'react-router-dom';

const PersonalAccountPage: FC = () => {
    const [showLoginComponent, setShowLoginComponent] =
        useState<boolean>(false);
    const [showRegComponent, setShowRegComponent] = useState<boolean>(false);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(-1);
        }
    }, [isLoggedIn]);

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
                    {!isLoggedIn && (
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
                                    src="/gifs/fail.gif"
                                    alt="Тут будет логотип в будущем"
                                />
                            </Hidden>
                            <Typography
                                variant={'h5'}
                                sx={{ textAlign: 'center' }}
                            >
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
                                        color: ButtonColorsEnum.WHITE,
                                        bgcolor: ButtonColorsEnum.DGREEN,
                                        '&:hover': {
                                            bgcolor: ButtonColorsEnum.LGREEN,
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
                                        color: ButtonColorsEnum.WHITE,
                                        bgcolor: ButtonColorsEnum.DGREEN,
                                        '&:hover': {
                                            bgcolor: ButtonColorsEnum.LGREEN,
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
                    )}
                </>
            )}
            {showLoginComponent && (
                <>
                    <Typography variant={'h5'} sx={{ textAlign: 'center' }}>
                        To continue please log in.
                    </Typography>
                    <LoginForm redirect toRedirect={`pa`} />
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
