import React, { FC, useContext, useState } from 'react';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Input from '../../../layout/common/inputs/input/Input';
import Button from '@mui/material/Button';
import { ButtonColors } from '../../../../lib/colors/ButtonColors';
import Typography from '@mui/material/Typography';
import { Context } from '../../../../index';
import { changePasswordFormValidationSchema } from './changePasswordFormValidation/changePasswordFormValidationSchema';
import { useNavigate } from 'react-router-dom';

interface ChangePasswordFormValues {
    password: string;
}

interface IChangePasswordForm {
    token: string | null;
}

const ChangePasswordForm: FC<IChangePasswordForm> = ({ token }) => {
    const { store } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const initialValues = {
        password: '',
    };

    const handleSubmit = async (values: ChangePasswordFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await store.changePassword(token, values.password);
            if (response && response.status === 200) {
                navigate(-1);
            }
        } catch (e: any) {
            setIsSubmitting(false);
        }
    };

    return (
        <Formik
            validationSchema={changePasswordFormValidationSchema}
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
                            {isSubmitting ? 'Submitting...' : 'Change password'}
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
    );
};

export default ChangePasswordForm;
