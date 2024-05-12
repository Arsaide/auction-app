import React, { FC, useContext, useState } from 'react';
import { Form, Formik } from 'formik';
import { Context } from '../../../../index';
import { loginValidationSchema } from './loginValidation/loginValidationSchema';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '../../../layout/common/inputs/input/Input';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import RegistrationForm from '../registration/registrationForm/RegistrationForm';
import { ButtonColors } from '../../../../lib/colors/ButtonColors';
import ForgotPasswordForm from '../recoveryPassword/forgotPassword/ForgotPasswordForm';
import { DialogContentText, DialogTitle } from '@mui/material';
import { MainColors } from '../../../../lib/colors/MainColors';

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: FC = () => {
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isShowRegistrationForm, setIsShowRegistrationForm] =
        useState<boolean>(false);
    const [isShowForgotPasswordForm, setIsShowForgotPasswordForm] =
        useState<boolean>(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await store.login(values.email, values.password);
            if (response && response.status === 200) {
                await store.checkAuth();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (e: any) {
            setIsSubmitting(false);
            toast.error(e.response?.data?.message);
            setErrorMessage(e.response?.data?.message);
        }
    };

    const handleRegistrationClick = () => {
        setIsShowRegistrationForm(true);
        setIsShowForgotPasswordForm(false);
    };

    const handleForgotPasswordClick = () => {
        setIsShowForgotPasswordForm(true);
        setIsShowRegistrationForm(false);
    };

    return (
        <>
            {isShowRegistrationForm && <RegistrationForm />}
            {isShowForgotPasswordForm && <ForgotPasswordForm />}
            {!isShowRegistrationForm && !isShowForgotPasswordForm && (
                <Formik
                    validationSchema={loginValidationSchema}
                    validateOnMount
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ isValid }) => (
                        <Form>
                            <Typography
                                variant={'h6'}
                                sx={{
                                    bgcolor: MainColors.GRAY595,
                                    color: MainColors.WHITE,
                                    pb: 3,
                                }}
                            >
                                Log in
                            </Typography>
                            <DialogContentText
                                sx={{ color: MainColors.WHITE, ml: 0, mb: 1 }}
                            >
                                Enter your account login information
                            </DialogContentText>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: 1.5,
                                }}
                            >
                                <Input
                                    id={'email'}
                                    label={'Email'}
                                    name={'email'}
                                    placeholder={'Enter your nick or email'}
                                />
                                <Input
                                    id={'password'}
                                    label={'Password'}
                                    name={'password'}
                                    placeholder={'Enter your password'}
                                    type={'password'}
                                />

                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    sx={{
                                        bgcolor: ButtonColors.LGREEN,
                                        mt: 1,
                                        '&:hover': {
                                            bgcolor: ButtonColors.DGREEN,
                                        },
                                        '&:disabled': {
                                            bgcolor: ButtonColors.LRED,
                                            color: ButtonColors.WHITE,
                                        },
                                    }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Login'}
                                </Button>
                                <Button
                                    onClick={handleRegistrationClick}
                                    sx={{
                                        color: ButtonColors.WHITE,
                                        '&:hover': {
                                            color: ButtonColors.GRAY,
                                        },
                                    }}
                                >
                                    Registration
                                </Button>
                                <Button
                                    onClick={handleForgotPasswordClick}
                                    sx={{
                                        color: ButtonColors.WHITE,
                                        '&:hover': {
                                            color: ButtonColors.GRAY,
                                        },
                                    }}
                                >
                                    Forgot password?
                                </Button>
                            </Box>
                            {errorMessage && (
                                <Typography
                                    sx={{
                                        color: ButtonColors.LRED,
                                        maxWidth: '340px',
                                    }}
                                >
                                    {errorMessage}
                                </Typography>
                            )}
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default LoginForm;
