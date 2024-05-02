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
import { calculateMinBet } from './CalculateMinBet';
import './PlaceABet.css';
import { Link } from 'react-router-dom';

interface IPlaceABet {
    auctionId: string | undefined;
    minBet: string;
    maxBet: string;
}

interface PlaceBetValues {
    bet: string;
}

const PlaceABet: FC<IPlaceABet> = ({ auctionId, minBet, maxBet }) => {
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const initialValues = {
        bet: '',
    };

    const handleSubmit = async (values: PlaceBetValues) => {
        setIsSubmitting(true);
        try {
            const userBet = parseFloat(values.bet);

            const currentBet = parseFloat(maxBet);

            const minBet = calculateMinBet(currentBet);

            if (userBet < minBet) {
                setErrorMessage(`Minimum bet is ${minBet}$`);
                setIsSubmitting(false);
                return;
            }
            const response = await store.placeABet(
                minBet.toString(),
                auctionId,
            );
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
                        <Typography variant={'subtitle2'} sx={{ mt: 2 }}>
                            Minimum amount you can bet{' '}
                            <span style={{ color: MainColors.RED }}>
                                {calculateMinBet(parseFloat(maxBet))}$
                            </span>
                        </Typography>
                        <Typography variant={'subtitle2'}>
                            You can read more about the conditions on the{' '}
                            <Link to={'/information'} className={'link'}>
                                Information page
                            </Link>
                        </Typography>
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
