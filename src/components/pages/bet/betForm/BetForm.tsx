import React, {useContext, useState} from 'react';
import {Form, Formik, FormikHelpers, useField, useFormik, useFormikContext} from "formik";
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
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import dayjs from 'dayjs';

interface LoginFormValues {
    email: string;
    password: string;
    date: Date[];
}

const BetForm = () => {
    const {store} = useContext(Context);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const initialValues = {
        email: '',
        password: '',
        date: [new Date(), new Date()],
    };

    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');

    const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        try {
            const response = await store.sendimg(values.email, values.password, selectedImage);
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
                                    <ImageForm onSubmit={handleImageSubmit}/>
                                    <Input
                                        id={'rate'}
                                        label={'Your rate'}
                                        name={'rate'}
                                        placeholder={'Enter your rate'}
                                        
                                        />
                                    <DateRangePicker name={'date'} defaultValue={[yesterday, today]} disablePast />
                                    <Input
                                        id={'password'}
                                        label={'Password'}
                                        name={'password'}
                                        placeholder={'Enter your password'}/>
                                    <p>valid : {isValid.toString()}</p>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={!isValid}
                                        sx={{height: 60}}
                                    >
                                        Login
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