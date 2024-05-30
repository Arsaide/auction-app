import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { Context } from '../../../../../../index';
import Input from '../../../../../layout/common/inputs/input/Input';
import { auctionSearchValidationSchema } from './auctionSearchValidation/AuctionSearchValidationSchema';
import Button from '@mui/material/Button';
import { ButtonColorsEnum } from '../../../../../../lib/colors/ButtonColors.enum';
import { MainColorsEnum } from '../../../../../../lib/colors/MainColors.enum';
import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import { Box, MenuItem, MenuList } from '@mui/material';
import { AuctionInt } from '../../../../../../app/auction/auction-id/AuctionItemProps';
import SearchInput from '../../../../../layout/common/inputs/searchInput/SearchInput';

interface IAuctionSearch {}

interface AuctionSearchValues {
    text: string;
}

const AuctionSearch: FC<IAuctionSearch> = () => {
    const { store } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmittedTwoLetters, setHasSubmittedTwoLetters] = useState(false);
    const [auctions, setAuctions] = useState<AuctionInt[]>([]);
    const initialValues = {
        text: '',
    };

    const handleSubmit = async (values: AuctionSearchValues, actions: any) => {
        setIsSubmitting(true);
        try {
            const response = await store.searchAtLetters(values.text);
            setAuctions(response.data.auctions);
        } catch (e: any) {
            console.error(e);
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const AutoSubmit: FC = () => {
        const { values, submitForm } = useFormikContext<AuctionSearchValues>();

        useEffect(() => {
            if (
                values.text.length % 2 === 0 &&
                values.text.length !== 0 &&
                !hasSubmittedTwoLetters
            ) {
                setHasSubmittedTwoLetters(true);
                handleSubmit(values, null);
            } else if (values.text.length % 2 !== 0) {
                setHasSubmittedTwoLetters(false);
            } else if (values.text.length < 2) {
                setAuctions([]);
            }
        }, [values.text]);

        return null;
    };

    return (
        <Formik
            validationSchema={auctionSearchValidationSchema}
            validateOnMount
            initialValues={initialValues}
            onSubmit={handleSubmit}
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
                            hippies={auctions}
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
