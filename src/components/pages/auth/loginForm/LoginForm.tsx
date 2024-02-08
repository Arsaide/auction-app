import React, {FC, useContext} from 'react';
import {Form, Formik, FormikHelpers} from "formik";
import {Context} from "../../../../index";
import {loginValidationSchema} from "./loginValidation/loginValidationSchema";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Input from "../../../layout/common/input/Input";

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: FC = () => {
    const {store} = useContext(Context);

    const initialValues = {
        email: '',
        password: ''
    };

    const handleSubmit = (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        store.login(values.email, values.password);
    };

    return (
        <>
            <Formik
                validationSchema={loginValidationSchema}
                validateOnMount
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({isValid}) => (
                    <Form>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: 320, gap: 2 }}>
                            <Input
                                id={'email'}
                                label={'Email'}
                                name={'email'}
                                placeholder={'Enter your email'}/>
                            <Input
                                id={'password'}
                                label={'Password'}
                                name={'password'}
                                placeholder={'Enter your password'}/>
                            <p>valid : {isValid.toString()}</p>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!isValid}
                                sx={{width: 330}}
                            >
                                Login
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;