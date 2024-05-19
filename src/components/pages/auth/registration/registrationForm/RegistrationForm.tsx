import React, { FC, useContext, useState } from 'react';
import { Context } from '../../../../../index';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { registrationValidationSchema } from './registrationValidation/registrationValidationSchema';
import Input from '../../../../layout/common/inputs/input/Input';
import RegCreateForm from '../regCreateForm/RegCreateForm';
import LoginForm from '../../loginForm/LoginForm';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ButtonColors } from '../../../../../lib/colors/ButtonColors';
import { MainColors } from '../../../../../lib/colors/MainColors';
import { DialogContentText } from '@mui/material';

interface RegistrationFormValues {
    name: string;
    email: string;
    password: string;
}

const RegistrationForm: FC = () => {
    const { store } = useContext(Context);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isSecondStepCompleted, setIsSecondStepCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showLoginForm, setShowLoginForm] = useState(false); // Add state to control login form visibility

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleSubmit = async (values: RegistrationFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await store.registration(
                values.name,
                values.email,
                values.password,
            );
            const regToken = response.data.token;

            if (regToken) {
                await store.sendEmail(regToken);
            }

            if (response && response.status === 200 && regToken) {
                setIsRegistered(true);
            } else {
                toast.error('Something went wrong');
            }
        } catch (e: any) {
            const errorMessage =
                e.response?.data?.message || 'An error occurred';
            setErrorMessage(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSecondStepSubmit = async () => {
        setIsSecondStepCompleted(true);
    };

    return (
        <>
            {!isRegistered && !showLoginForm ? (
                <Formik
                    validationSchema={registrationValidationSchema}
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
                                Registration
                            </Typography>
                            <DialogContentText
                                sx={{ color: MainColors.WHITE, ml: 0, mb: 2 }}
                            >
                                Enter your details. Everything is confidential!
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
                                    id={'name'}
                                    label={'Nickname'}
                                    name={'name'}
                                    placeholder={'Enter your nickname'}
                                />
                                <Input
                                    id={'email'}
                                    label={'Email'}
                                    name={'email'}
                                    placeholder={'Enter your email'}
                                    type={'email'}
                                />
                                <Input
                                    id={'password'}
                                    label={'Password'}
                                    name={'password'}
                                    placeholder={'Enter your password'}
                                    type={'password'}
                                />
                                <Input
                                    id={'confirmPassword'}
                                    label={'Confirm password'}
                                    name={'confirmPassword'}
                                    placeholder={'Confirm your password'}
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
                                    {isSubmitting
                                        ? 'Submitting...'
                                        : 'Register'}
                                </Button>
                                <Button
                                    sx={{
                                        color: ButtonColors.WHITE,
                                        '&:hover': {
                                            color: ButtonColors.GRAY,
                                        },
                                    }}
                                    onClick={handleLoginClick}
                                >
                                    Log-in
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
            ) : !isRegistered ? (
                <LoginForm />
            ) : !isSecondStepCompleted ? (
                <RegCreateForm onSubmit={handleSecondStepSubmit} />
            ) : (
                <LoginForm />
            )}
        </>
    );
};

export default RegistrationForm;
