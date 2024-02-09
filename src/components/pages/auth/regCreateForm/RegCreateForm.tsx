import React, {FC, useContext} from 'react';
import {Context} from "../../../../index";
import {Form, Formik, FormikHelpers} from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "../../../layout/common/input/Input";
import {regCreateValidationSchema} from "./regCreateValidation/regCreateValidationSchema";
import Typography from "@mui/material/Typography";
import {toast} from "react-toastify";
import ToastMessage from "../../../layout/common/toastMessage/ToastMessage";

interface RegCreateFormProps {
    onSubmit: () => void;
}

interface RegCreateFormValues {
    code: string;
}

const RegCreateForm: FC<RegCreateFormProps> = ({ onSubmit }) => {
    const {store} = useContext(Context);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const initialValues = {
        code: ''
    };

    const handleSubmit = async (values: RegCreateFormValues, actions: FormikHelpers<RegCreateFormValues>) => {
        try {
            const response = await store.registercreate(values.code);
            if(response && response.status === 200) {
                toast.success(response.data.message);
                onSubmit();
            }
        } catch (e: any) {
            setErrorMessage(e.response?.data?.message);
            toast.error(e.response?.data?.message);
        }
    };

    return (
        <>
            <Formik
                validationSchema={regCreateValidationSchema}
                validateOnMount
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({isValid}) => (
                    <Form>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: 320 }}>
                            <Input
                                id={"code"}
                                label={"Your Code"}
                                name={"code"}
                                placeholder={"Enter your code"}/>
                            <p>valid : {isValid.toString()}</p>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!isValid}
                                sx={{width: 330}}
                            >
                                Access code
                            </Button>
                        </Box>
                        {errorMessage && <Typography sx={{color: 'red', maxWidth: 330}}>{errorMessage}</Typography>}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default RegCreateForm;