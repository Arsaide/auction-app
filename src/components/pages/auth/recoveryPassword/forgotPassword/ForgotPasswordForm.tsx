import React, { useContext, useState } from 'react';
import { Context } from '../../../../../index';
import { Form, Formik } from 'formik';
import { forgotPasswordFormValidationSchema } from './forgotPasswordValidation/forgotPasswordFormValidationSchema';
import Box from '@mui/material/Box';
import Input from '../../../../layout/common/inputs/input/Input';
import Button from '@mui/material/Button';
import { ButtonColors } from '../../../../../lib/colors/ButtonColors';
import Typography from '@mui/material/Typography';
import LoginForm from '../../loginForm/LoginForm';

interface ForgotFormValues {
    email: string;
}

const ForgotPasswordForm = () => {
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isShowLoginForm, setIsShowLoginForm] = useState<boolean>(false);

    const initialValues = {
        email: '',
    };

    const handleSubmit = async (values: ForgotFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await store.forgotPassword(values.email);
        } catch (e: any) {
            setIsSubmitting(false);
            setErrorMessage(e.response?.data?.message);
        }
    };

    const handleLoginClick = () => {
        setIsShowLoginForm(true);
    };

    return (
        <>
            {isShowLoginForm && <LoginForm />}
            {!isShowLoginForm && (
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validateOnMount
                    validationSchema={forgotPasswordFormValidationSchema}
                >
                    {({ isValid }) => (
                        <Form>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: 2,
                                }}
                            >
                                <Input
                                    id={'email'}
                                    label={'Your Email'}
                                    name={'email'}
                                    placeholder={'Enter your email'}
                                    type={'email'}
                                />

                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    sx={{
                                        bgcolor: ButtonColors.LGREEN,
                                        '&:hover': {
                                            bgcolor: ButtonColors.DGREEN,
                                        },
                                        '&:disabled': {
                                            bgcolor: ButtonColors.LRED,
                                            color: ButtonColors.WHITE,
                                        },
                                    }}
                                >
                                    {isSubmitting
                                        ? 'Submitting...'
                                        : 'Send message'}
                                </Button>
                                <Button
                                    onClick={handleLoginClick}
                                    sx={{
                                        color: ButtonColors.WHITE,
                                        '&:hover': {
                                            color: ButtonColors.GRAY,
                                        },
                                    }}
                                >
                                    Login
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

export default ForgotPasswordForm;
