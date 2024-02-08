import React, {FC, useContext} from 'react';
import {Context} from "../../../../index";
import {Form, Formik, FormikHelpers} from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {registrationValidationSchema} from "./registrationValidation/registrationValidationSchema";
import Input from "../../../layout/common/input/Input";

interface RegistrationFormValues {
    email: string;
    password: string;
}

const RegistrationForm: FC = () => {
    const {store} = useContext(Context);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = (values: RegistrationFormValues, actions: FormikHelpers<RegistrationFormValues>) => {
        store.registration(values.email, values.password);
    };

    return (
        <>
            <Formik
                validationSchema={registrationValidationSchema}
                validateOnMount
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({isValid}) => (
                    <Form>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: 320 }}>
                            <Input
                                id={"email"}
                                label={"Email"}
                                name={"email"}
                                placeholder={"Enter your email"}/>
                            <Input
                                id={"password"}
                                label={"Password"}
                                name={"password"}
                                placeholder={"Enter your password"}/>
                            <Input
                                id={"confirmPassword"}
                                label={"Confirm password"}
                                name={"confirmPassword"}
                                placeholder={"Confirm your password"}/>
                            <p>valid : {isValid.toString()}</p>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!isValid}
                                sx={{width: 330}}
                            >
                                Registration
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default RegistrationForm;
