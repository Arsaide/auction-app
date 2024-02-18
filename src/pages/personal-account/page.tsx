import React, { FC, useContext, useState } from 'react';
import PersonalData from '../../components/pages/personalAccount/personalData/PersonalData';
import LoginForm from '../../components/pages/auth/loginForm/LoginForm';
import Typography from '@mui/material/Typography';
import { Context } from '../../index';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Box, Hidden } from '@mui/material';
import RegistrationForm from '../../components/pages/auth/regestrationForm/RegistrationForm';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';

const PersonalAccount: FC = () => {
    const { store } = useContext(Context);
    const isAuth = localStorage.getItem('isAuth') === 'true';
    const [showLoginComponent, setShowLoginComponent] =
        useState<boolean>(false);
    const [showRegComponent, setShowRegComponent] = useState<boolean>(false);

    const handleSubmit = () => {
        store.logout();
        window.location.reload();
    };

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
            {isAuth ? (
                <>
                    <Typography sx={{ mb: 3 }} variant={'h4'}>
                        Personal Account
                    </Typography>
                    <Box>
                        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            <Avatar
                                alt="Monkey King"
                                src="/avatar/avatar.jpg"
                                sx={{ width: 106, height: 106 }}
                            />
                            <PersonalData />
                        </Box>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            Log out
                        </Button>
                    </Box>
                </>
            ) : (
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
                                        color="success"
                                        variant="contained"
                                        size="large"
                                        onClick={handleClickShowLogin}
                                    >
                                        Log-in
                                    </Button>
                                    <Button
                                        color="success"
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
                            <Typography
                                variant={'h5'}
                                sx={{ textAlign: 'center' }}
                            >
                                To continue please log in.
                            </Typography>
                            <LoginForm />
                        </>
                    )}
                    {showRegComponent && (
                        <>
                            <Typography
                                variant={'h5'}
                                sx={{ textAlign: 'center' }}
                            >
                                To continue please log in.
                            </Typography>
                            <RegistrationForm />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default PersonalAccount;
