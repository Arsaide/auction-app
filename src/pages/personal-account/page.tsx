import React, { FC, useContext, useState } from 'react';
import PersonalData from '../../components/pages/personalAccount/personalData/PersonalData';
import LoginForm from '../../components/pages/auth/loginForm/LoginForm';
import Typography from '@mui/material/Typography';
import { Context } from '../../index';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import RegistrationForm from '../../components/pages/auth/regestrationForm/RegistrationForm';

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
        <section>
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
                            <Box sx={{ display: 'flex' }}>
                                <Button onClick={handleClickShowLogin}>
                                    Log-in
                                </Button>
                                <Button onClick={handleClickShowReg}>
                                    Registration
                                </Button>
                            </Box>
                        </>
                    )}
                    {showLoginComponent && <LoginForm />}
                    {showRegComponent && <RegistrationForm />}
                </>
            )}
        </section>
    );
};

export default PersonalAccount;
