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
import { ButtonColorsEnum } from '../../../../lib/colors/ButtonColors.enum';
import ForgotPasswordForm from '../recoveryPassword/forgotPassword/ForgotPasswordForm';
import { DialogContentText } from '@mui/material';
import { MainColorsEnum } from '../../../../lib/colors/MainColors.enum';
import { AuthContext } from '../../../../lib/providers/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
    email: string;
    password: string;
}

interface ILoginForm {
    redirect?: boolean;
    toRedirect?: 'pa';
}

const LoginForm: FC<ILoginForm> = ({ redirect, toRedirect }) => {
    const { store } = useContext(Context);
    const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isShowRegistrationForm, setIsShowRegistrationForm] =
        useState<boolean>(false);
    const [isShowForgotPasswordForm, setIsShowForgotPasswordForm] =
        useState<boolean>(false);

    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await store
                .login(values.email, values.password)
                .then(() => {
                    return store.getUser();
                })
                .then(() => {
                    setIsLoggedIn(true);
                    if (redirect) {
                        const { id } = store.user || {};
                        navigate(
                            toRedirect === 'pa'
                                ? `/personal-account/${id}`
                                : '/personal-account',
                        );
                    }
                })
                .catch(error => {
                    setIsLoggedIn(false);
                    setIsSubmitting(false);
                    toast.error(error.response?.data?.message);
                    setErrorMessage(error.response?.data?.message);
                });
        } catch (e: any) {
            setIsLoggedIn(false);
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
            {isShowForgotPasswordForm && (
                <ForgotPasswordForm isVisionLoginButton={true} />
            )}
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
                                    bgcolor: MainColorsEnum.GRAY595,
                                    color: MainColorsEnum.WHITE,
                                    pb: 3,
                                }}
                            >
                                Log in
                            </Typography>
                            <DialogContentText
                                sx={{
                                    color: MainColorsEnum.WHITE,
                                    ml: 0,
                                    mb: 1,
                                }}
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
                                        bgcolor: ButtonColorsEnum.LGREEN,
                                        mt: 1,
                                        '&:hover': {
                                            bgcolor: ButtonColorsEnum.DGREEN,
                                        },
                                        '&:disabled': {
                                            bgcolor: ButtonColorsEnum.LRED,
                                            color: ButtonColorsEnum.WHITE,
                                        },
                                    }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Login'}
                                </Button>
                                {errorMessage && (
                                    <Typography
                                        sx={{
                                            color: ButtonColorsEnum.LRED,
                                            maxWidth: '340px',
                                        }}
                                    >
                                        {errorMessage}
                                    </Typography>
                                )}
                                <Button
                                    onClick={handleRegistrationClick}
                                    sx={{
                                        color: ButtonColorsEnum.WHITE,
                                        '&:hover': {
                                            color: ButtonColorsEnum.GRAY,
                                        },
                                    }}
                                >
                                    Registration
                                </Button>
                                <Button
                                    onClick={handleForgotPasswordClick}
                                    sx={{
                                        color: ButtonColorsEnum.WHITE,
                                        '&:hover': {
                                            color: ButtonColorsEnum.GRAY,
                                        },
                                    }}
                                >
                                    Forgot password?
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default LoginForm;
