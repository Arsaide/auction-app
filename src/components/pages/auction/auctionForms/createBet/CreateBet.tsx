import React, { FC, useContext, useState } from 'react';
import { Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import Input from '../../../../layout/common/inputs/input/Input';
import { Context } from '../../../../../index';
import { CreateBetValidationSchema } from './createBetValidationSchema/CreateBetValidationSchema';
import { toast } from 'react-toastify';

interface ICreateBet {
    bet: string;
    token: string;
    auctionId: string;
}

const CreateBet: FC<ICreateBet> = ({ token, auctionId }) => {
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const initialValues = {
        auctionId: auctionId,
        token: token,
        bet: '',
    };

    const handleSubmit = async (values: ICreateBet) => {
        try {
            const response = await store.placeABet(auctionId, values.bet);
        } catch (e: any) {
            toast.error(e.response?.data?.message);
            setErrorMessage(e.response?.data?.message);
        }
    };

    return (
        <div>
            <Formik
                validationSchema={CreateBetValidationSchema}
                validateOnMount
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Box>
                        <Input
                            id={'bet'}
                            label={'Place a bet'}
                            name={'bet'}
                            placeholder={'Enter your bet'}
                        />
                    </Box>
                </Form>
            </Formik>
        </div>
    );
};

export default CreateBet;
