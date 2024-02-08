import React, {FC, useContext} from 'react';
import {Context} from "../../../../index";
import {Form, Formik, FormikHelpers} from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "../../../layout/common/input/Input";
import {regCreateValidationSchema} from "./regCreateValidation/regCreateValidationSchema";

interface RegCreateFormValues {
    code: string;
}

const RegCreateForm: FC = () => {
    const {store} = useContext(Context);

    const initialValues = {
        code: ''
    };

    const handleSubmit = (values: RegCreateFormValues, actions: FormikHelpers<RegCreateFormValues>) => {
        store.registercreate(values.code);
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
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default RegCreateForm;
