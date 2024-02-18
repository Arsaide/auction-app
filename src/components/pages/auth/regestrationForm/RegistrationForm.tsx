import React, { FC, useContext, useState } from 'react';
import { Context } from '../../../../index';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { registrationValidationSchema } from './registrationValidation/registrationValidationSchema';
import Input from '../../../layout/common/inputs/input/Input';
import RegCreateForm from '../regCreateForm/RegCreateForm';
import LoginForm from '../loginForm/LoginForm';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegistrationFormValues {
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
                values.email,
                values.password,
            );
            if (response && response.status === 200) {
                setIsRegistered(true);
            }
        } catch (e: any) {
            setErrorMessage(e.response?.data?.message);
            toast.error(e.response?.data?.message);
            setIsSubmitting(false);
        }
    };

    const handleSecondStepSubmit = async () => {
        setIsSecondStepCompleted(true);
    };

    return (
        <>
            {!isRegistered && !showLoginForm ? ( // Show registration form if user is not registered and not clicked login button
                <Formik
                    validationSchema={registrationValidationSchema}
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
                                    width: '340px',
                                    gap: 1.5,
                                }}
                            >
                                <Input
                                    id={'email'}
                                    label={'Email'}
                                    name={'email'}
                                    placeholder={'Enter your email'}
                                />
                                <Input
                                    id={'password'}
                                    label={'Password'}
                                    name={'password'}
                                    placeholder={'Enter your password'}
                                />
                                <Input
                                    id={'confirmPassword'}
                                    label={'Confirm password'}
                                    name={'confirmPassword'}
                                    placeholder={'Confirm your password'}
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    sx={{
                                        bgcolor: '#7dc738',
                                        '&:hover': {
                                            bgcolor: '#5a8f29',
                                        },
                                        '&:disabled': {
                                            bgcolor: '#f54242',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    {isSubmitting
                                        ? 'Submitting...'
                                        : 'Register'}
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={handleLoginClick}
                                >
                                    Log-in
                                </Button>
                            </Box>
                            {errorMessage && (
                                <Typography
                                    sx={{ color: 'red', maxWidth: '340px' }}
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
