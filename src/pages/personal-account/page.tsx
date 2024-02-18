import React, { FC, useContext } from 'react';
import PersonalData from '../../components/pages/personalAccount/personalData/PersonalData';
import LoginForm from '../../components/pages/auth/loginForm/LoginForm';
import Typography from '@mui/material/Typography';
import { Context } from '../../index';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';

const PersonalAccount: FC = () => {
    const { store } = useContext(Context);
    const isAuth = localStorage.getItem('isAuth') === 'true';
    const handleSubmit = () => {
        store.logout();
        window.location.reload();
    };

    return (
        <section>
            <Typography sx={{ mb: 3 }} variant={'h4'}>
                Personal Account
            </Typography>
            {isAuth ? (
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
            ) : (
                <LoginForm />
            )}
        </section>
    );
};

export default PersonalAccount;
