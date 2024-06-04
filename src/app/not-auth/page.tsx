import React, { FC, useState } from 'react';
import WarningAlert from '../../components/layout/common/alerts/warningAlert/WarningAlert';
import { Box, Hidden } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ButtonColorsEnum } from '../../lib/colors/ButtonColors.enum';
import LoginForm from '../../components/pages/auth/loginForm/LoginForm';
import RegistrationForm from '../../components/pages/auth/registration/registrationForm/RegistrationForm';

interface INotAuth {
    id: string | undefined;
    request: () => Promise<void>;
}

const NotAuth: FC<INotAuth> = ({ id, request }) => {
    const [showLoginComponent, setShowLoginComponent] =
        useState<boolean>(false);
    const [showRegComponent, setShowRegComponent] = useState<boolean>(false);

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
            <WarningAlert
                text={'Please log in to use the application'}
                title={'Error: Not authorized'}
            />
            <Box sx={{ mt: 3 }}>
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
                    </>
                )}
                {showLoginComponent && <LoginForm redirect request={request} />}
                {showRegComponent && <RegistrationForm />}
            </Box>
        </>
    );
};

export default NotAuth;
