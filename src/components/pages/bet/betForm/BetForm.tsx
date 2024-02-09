import React, { useContext, useState } from 'react';
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { Context } from "../../../../index";
import Box from "@mui/material/Box";
import Input from "../../../layout/common/inputs/input/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageForm from '../../../layout/common/inputs/imgInput/ImgInput';
import {betFormValidationSchema} from "./betFormValidation/betFormValidationSchema";


interface LoginFormValues {
    email: string;
    password: string;
}

const BetForm = () => {
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const initialValues = {
        email: '',
        password: ''
    };

    const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
        try {
            const response = await store.sendimg(values.email, values.password, selectedImage);
            if(response && response.status === 200) {

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
            <Formik
                validationSchema={betFormValidationSchema}
                validateOnMount
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ isValid }) => (
                    <Form>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <ImageForm onSubmit={handleImageSubmit} />
                            <Input
                                id={'email'}
                                label={'Email'}
                                name={'email'}
                                placeholder={'Enter your email'} />
                            <Input
                                id={'password'}
                                label={'Password'}
                                name={'password'}
                                placeholder={'Enter your password'} />
                            <p>valid : {isValid.toString()}</p>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!isValid}
                                sx={{ height: 60 }}
                            >
                                Login
                            </Button>
                        </Box>
                        {errorMessage && <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default BetForm;

