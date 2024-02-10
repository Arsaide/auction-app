import React from 'react';
import LoginForm from "../../components/pages/auth/loginForm/LoginForm";
import Toolbar from "@mui/material/Toolbar";
import RegistrationForm from "../../components/pages/auth/regestrationForm/RegistrationForm";
import RegCreateForm from "../../components/pages/auth/regCreateForm/RegCreateForm";

const AuthPage = () => {
    return (
        <div>
            <RegistrationForm/>
            {/*<RegCreateForm/>*/}
            <LoginForm/>
            <Toolbar/>
        </div>
    );
};

export default AuthPage;
