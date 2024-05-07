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

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: FC = () => {
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showRegForm, setShowRegForm] = useState(false);

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

    const handleRegClick = () => {
        setShowRegForm(true);
    };

    return (
        <>
            {!showRegForm ? (
                <Formik
                    validationSchema={loginValidationSchema}
                    validateOnMount
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ isValid }) => (
                        <Form>
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
                                    onClick={handleRegClick}
                                    sx={{
                                        color: ButtonColors.WHITE,
                                        '&:hover': {
                                            color: ButtonColors.GRAY,
                                        },
                                    }}
                                >
                                    Registration
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
                            <Typography
                                onClick={() => console.log('hello')}
                                sx={{ cursor: 'pointer' }}
                            >
                                Forget password?
                            </Typography>
                        </Form>
                    )}
                </Formik>
            ) : (
                <RegistrationForm />
            )}
        </>
    );
};

export default LoginForm;
