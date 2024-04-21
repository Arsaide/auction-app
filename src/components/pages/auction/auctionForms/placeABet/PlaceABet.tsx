import React, { FC, useContext, useState } from 'react';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Input from '../../../../layout/common/inputs/input/Input';
import { Context } from '../../../../../index';
import { PlaceABetValidationSchema } from './placeABetValidationSchema/PlaceABetValidationSchema';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { ButtonColors } from '../../../../../lib/Colors/ButtonColors';
import { MainColors } from '../../../../../lib/Colors/MainColors';
import Typography from '@mui/material/Typography';

interface IPlaceABet {
    auctionId: string | undefined;
}

interface PlaceBetValues {
    bet: string;
}

const PlaceABet: FC<IPlaceABet> = ({ auctionId }) => {
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const initialValues = {
        bet: '',
    };

    const handleSubmit = async (values: PlaceBetValues) => {
        setIsSubmitting(true);
        try {
            const response = await store.placeABet(values.bet, auctionId);
        } catch (e: any) {
            setIsSubmitting(false);
            toast.error(e.response?.data?.message);
            setErrorMessage(e.response?.data?.message);
        }
        setIsSubmitting(false);
    };

    return (
        <div>
            <Formik
                validationSchema={PlaceABetValidationSchema}
                validateOnMount
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ isValid }) => (
                    <Form>
                        <Box>
                            <Input
                                id={'bet'}
                                label={'Place a bet'}
                                name={'bet'}
                                placeholder={'Enter your bet'}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            sx={{
                                mt: 2,
                                bgcolor: ButtonColors.LGREEN,
                                '&:hover': {
                                    bgcolor: ButtonColors.DGREEN,
                                },
                                '&:disabled': {
                                    bgcolor: ButtonColors.LRED,
                                    color: MainColors.WHITE,
                                },
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Place a bet'}
                        </Button>
                        {errorMessage && (
                            <Typography sx={{ color: MainColors.RED }}>
                                {errorMessage}
                            </Typography>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PlaceABet;