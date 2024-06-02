import React, { FC, useContext, useEffect, useState } from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import { Context } from '../../../../../../index';
import { auctionSearchValidationSchema } from './auctionSearchValidation/AuctionSearchValidationSchema';
import { Box } from '@mui/material';
import { AuctionInt } from '../../../../../../app/auction/auction-id/AuctionItemProps';
import SearchInput from '../../../../../layout/common/inputs/searchInput/SearchInput';

interface IAuctionSearch {
    onSearch: (auctions: AuctionInt[]) => void;
}

interface AuctionSearchValues {
    text: string;
}

const AuctionSearch: FC<IAuctionSearch> = ({ onSearch }) => {
    const { store } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmittedTwoLetters, setHasSubmittedTwoLetters] = useState(false);
    const [auctionsHippies, setAuctionsHippies] = useState<AuctionInt[]>([]);
    const initialValues = {
        text: '',
    };

    const autoSubmitByLetters = async (
        values: AuctionSearchValues,
        actions: any,
    ) => {
        setIsSubmitting(true);
        try {
            const response = await store.searchAtLetters(values.text);
            setAuctionsHippies(response.data.auctions);
        } catch (e: any) {
            console.error(e);
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitByRequest = async (values: AuctionSearchValues) => {
        setIsSubmitting(true);
        try {
            const response = await store.searchByRequest(values.text);
            onSearch(response.data.auctions);
        } catch (e: any) {
            console.error(e);
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const AutoSubmit: FC = () => {
        const { values } = useFormikContext<AuctionSearchValues>();

        useEffect(() => {
            if (
                values.text.length % 2 === 0 &&
                values.text.length !== 0 &&
                !hasSubmittedTwoLetters
            ) {
                setHasSubmittedTwoLetters(true);
                autoSubmitByLetters(values, null);
            } else if (values.text.length % 2 !== 0) {
                setHasSubmittedTwoLetters(false);
            } else if (values.text.length < 2) {
                setAuctionsHippies([]);
            }
        }, [values.text]);

        return null;
    };

    return (
        <Formik
            validationSchema={auctionSearchValidationSchema}
            validateOnMount
            initialValues={initialValues}
            onSubmit={handleSubmitByRequest}
        >
            {({ isValid }) => (
                <Form>
                    <Box sx={{ display: 'flex', alignItems: 'end' }}>
                        <SearchInput
                            id={'text'}
                            label={'Search'}
                            name={'text'}
                            placeholder={
                                'Enter your request for auction search'
                            }
                            hippies={auctionsHippies}
                            isValid={isValid}
                            isSubmitting={isSubmitting}
                        />
                        <AutoSubmit />
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default AuctionSearch;
