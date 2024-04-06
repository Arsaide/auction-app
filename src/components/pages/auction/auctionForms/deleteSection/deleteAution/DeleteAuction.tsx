import React, { FC, useContext, useState } from 'react';
import { Form, Formik } from 'formik';
import { Context } from '../../../../../../index';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Input from '../../../../../layout/common/inputs/input/Input';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { deleteAuctionValidationSchema } from './deleteAutctionValidation/deleteAuctionValidationSchema';

interface DeleteAuctionFormValues {
    code: string;
}

const DeleteAuction: FC = () => {
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const initialValues = {
        code: '',
    };

    const handleSubmit = async (values: DeleteAuctionFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await store.deleteAuction(values.code);
            if (response && response.status === 200) {
                setIsSubmitting(false);
            }
        } catch (e: any) {
            setIsSubmitting(false);
            setErrorMessage(e.response?.data?.message);
            toast.error(e.response?.data?.message);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnMount
                validationSchema={deleteAuctionValidationSchema}
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
                                id={'code'}
                                label={'Your code'}
                                name={'code'}
                                placeholder={'Enter your code'}
                                type={'number'}
                            />

                            <Button
                                variant={'contained'}
                                type={'submit'}
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
                                    ? 'Submitting code...'
                                    : 'Verify code'}
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
        </>
    );
};

export default DeleteAuction;
