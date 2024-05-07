import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../../../index';
import { Form, Formik } from 'formik';
import { forgotPasswordFormValidationSchema } from './forgotPasswordValidation/forgotPasswordFormValidationSchema';
import Box from '@mui/material/Box';
import Input from '../../../../layout/common/inputs/input/Input';
import Button from '@mui/material/Button';
import { ButtonColors } from '../../../../../lib/colors/ButtonColors';
import Typography from '@mui/material/Typography';
import LoginForm from '../../loginForm/LoginForm';
import { MainColors } from '../../../../../lib/colors/MainColors';
import { toast } from 'react-toastify';
import SubmitTimer from '../../../../layout/common/ui/timers/submitTimer/SubmitTimer';

interface ForgotFormValues {
    email: string;
}

const ForgotPasswordForm = () => {
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isShowLoginForm, setIsShowLoginForm] = useState<boolean>(false);
    const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const lastSubmittedTimeRef = useRef<number | null>(null);

    const initialValues = {
        email: '',
    };

    useEffect(() => {
        const lastSubmittedTime = localStorage.getItem(
            'LastForgotPasswordTime',
        );
        if (lastSubmittedTime) {
            lastSubmittedTimeRef.current = parseInt(lastSubmittedTime);
        }
    }, []);

    const handleSubmit = async (values: ForgotFormValues) => {
        if (
            lastSubmittedTimeRef.current &&
            Date.now() - lastSubmittedTimeRef.current < 300000
        ) {
            toast.error('Please wait 5 minute before submitting again');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await store.forgotPassword(values.email);
            if (response && response.status === 200) {
                lastSubmittedTimeRef.current = Date.now();
                localStorage.setItem(
                    'LastForgotPasswordTime',
                    lastSubmittedTimeRef.current.toString(),
                );
                setIsMessageVisible(true);
                setMessage(
                    'An email has been sent to you. Follow the link and recover your password. The link is valid for 5 minutes',
                );
            }
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
                                {!isMessageVisible ? (
                                    <>
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
                                                    bgcolor:
                                                        ButtonColors.DGREEN,
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
                                    </>
                                ) : (
                                    <>
                                        <Typography
                                            sx={{
                                                color: MainColors.GREEN,
                                                maxWidth: '261px',
                                            }}
                                        >
                                            {message}
                                        </Typography>
                                    </>
                                )}

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
                            {lastSubmittedTimeRef.current && (
                                <SubmitTimer
                                    text={'Please wait '}
                                    nextSubmitTime={
                                        lastSubmittedTimeRef.current + 300000
                                    }
                                />
                            )}
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default ForgotPasswordForm;
