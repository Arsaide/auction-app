import React, { FC, useContext, useEffect, useState } from 'react';
import useAuthCheck from '../../hooks/useAuthCheck/useAuthCheck';
import PersonalData from '../../components/pages/personalAccount/personalData/PersonalData';
import LoginForm from '../../components/pages/auth/loginForm/LoginForm';
import Typography from '@mui/material/Typography';
import { Context } from '../../index';
import Button from '@mui/material/Button';

const PersonalAccount: FC = () => {
    const { store } = useContext(Context);
    const { isAuth } = useAuthCheck();
    const handleSubmit = () => {
        store.logout();
        window.location.reload();
    };

    return (
        <section>
            <Typography variant={'h3'}>Personal Account</Typography>
            {isAuth ? (
                <>
                    <PersonalData />
                    <Button onClick={handleSubmit}>Log out</Button>
                </>
            ) : (
                <LoginForm />
            )}
        </section>
    );
};

export default PersonalAccount;
