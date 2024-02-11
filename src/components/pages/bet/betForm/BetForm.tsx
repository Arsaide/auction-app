import React, {useContext, useState} from 'react';
import {Form, Formik, FormikHelpers} from "formik";
import {toast} from "react-toastify";
import {Context} from "../../../../index";
import Box from "@mui/material/Box";
import Input from "../../../layout/common/inputs/input/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageForm from '../../../layout/common/inputs/imgInput/ImgInput';
import {betFormValidationSchema} from "./betFormValidation/betFormValidationSchema";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import dayjs from 'dayjs';

interface LoginFormValues {
    title: string;
    desc: string;
    minRates: string;
    endDate: Date[];
    image: string;
}

const BetForm = () => {
    const {store} = useContext(Context);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const initialValues = {
        title: '',
        desc: '',
        minRates: '',
        endDate: [new Date()],
        image: '',
    };

    const today = dayjs();
    const yesterday = dayjs().subtract(-1, 'day');

    const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        try {
            const response = await store.createauction(
                values.title,
                values.desc,
                values.minRates,
                selectedImage,
                values.endDate
            );
            if (response && response.status === 200) {

            }
        } catch (e: any) {
            toast.error(e.response?.data?.message);
            setErrorMessage(e.response?.data?.message);
        }
    };

    const handleImageSubmit = (image: File) => {
        setSelectedImage(image);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker', 'DateRangePicker']}>
                    <Formik
                        validationSchema={betFormValidationSchema}
                        validateOnMount
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({isValid}) => (
                            <Form>
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                                    <ImageForm name={'image'} onSubmit={handleImageSubmit}/>
                                    <Input
                                        id={'title'}
                                        label={'Your rate'}
                                        name={'title'}
                                        placeholder={'Enter your rate'}/>
                                    <Input
                                        id={'desc'}
                                        label={'Your description'}
                                        name={'desc'}
                                        placeholder={'Enter your description'}/>
                                    <Input
                                        id={'minRates'}
                                        label={'Your min rates'}
                                        name={'minRates'}
                                        placeholder={'Enter your min rates'}/>
                                    <Box sx={{display: 'flex', gap: 20}}>
                                        <DatePicker
                                            value={today}
                                            disabled
                                            sx={{
                                                '& input.MuiInputBase-input': {
                                                    color: 'white !important',
                                                },
                                                '& fieldset': {
                                                    borderColor: 'white !important',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: 'white !important',
                                                },
                                            }}
                                        />
                                        <DatePicker
                                            name={'endDate'}
                                            value={yesterday}
                                            disablePast
                                            sx={{
                                                '& input': {
                                                    color: 'white',
                                                },
                                                '& fieldset': {
                                                    borderColor: 'white',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: 'white',
                                                },
                                                '&:hover': {
                                                    '& input': {
                                                        color: '#a3a3a3',
                                                    },
                                                    '& fieldset': {
                                                        borderColor: '#a3a3a3 !important',
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        color: '#a3a3a3',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                    {/*<p>valid : {isValid.toString()}</p>*/}
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={!isValid}
                                        sx={{
                                            height: 60,
                                            bgcolor: '#7dc738',
                                            '&:hover': {
                                                bgcolor: '#5a8f29'
                                            },
                                            '&:disabled': {
                                                bgcolor: '#f54242',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        Place a bet
                                    </Button>
                                </Box>
                                {errorMessage && <Typography sx={{color: 'red'}}>{errorMessage}</Typography>}
                            </Form>
                        )}
                    </Formik>
                </DemoContainer>
            </LocalizationProvider>
        </>
    );
};

export default BetForm;