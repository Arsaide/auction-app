import React, {FC, useContext} from 'react';
import {Form, Formik, FormikHelpers} from "formik";
import {Context} from "../../../../index";
import {loginValidationSchema} from "./loginValidation/loginValidationSchema";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Input from "../../../layout/common/inputs/input/Input";
import Typography from "@mui/material/Typography";
import {toast, ToastContainer} from "react-toastify";

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: FC = () => {
    const {store} = useContext(Context);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const initialValues = {
        email: '',
        password: ''
    };

    const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        try {
            const response = await store.login(values.email, values.password);
            if(response && response.status === 200) {
                await store.checkAuth();
                // toast.success('Authorization successful!');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (e: any) {
            toast.error(e.response?.data?.message);
            setErrorMessage(e.response?.data?.message);
        }
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
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '340px', gap: 2}}>
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
                            <p style={{color:"white", marginLeft:3}}>valid : {isValid.toString()}</p>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!isValid}
                            >
                                Login
                            </Button>
                        </Box>
                        {errorMessage && <Typography sx={{color: 'red', maxWidth: '340px'}}>{errorMessage}</Typography>}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;