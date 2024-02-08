import React from 'react';
import LoginForm from "../../components/pages/auth/loginForm/LoginForm";
import Toolbar from "@mui/material/Toolbar";
import RegistrationForm from "../../components/pages/auth/regestrationForm/RegistrationForm";

const AuthPage = () => {
    return (
        <div>
            <LoginForm/>
            <Toolbar/>
            <RegistrationForm/>
        </div>
    );
};

export default AuthPage;
