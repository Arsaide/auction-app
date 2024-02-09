import React, {FC, useContext} from 'react';
import {Context} from "../../../../index";
import {Form, Formik, FormikHelpers} from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {registrationValidationSchema} from "./registrationValidation/registrationValidationSchema";
import Input from "../../../layout/common/input/Input";
import RegCreateForm from "../regCreateForm/RegCreateForm";
import LoginForm from "../loginForm/LoginForm";
import Typography from "@mui/material/Typography";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastMessage from "../../../layout/common/toastMessage/ToastMessage";

interface RegistrationFormValues {
    email: string;
    password: string;
}

const RegistrationForm: FC = () => {
    const {store} = useContext(Context);
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [isSecondStepCompleted, setIsSecondStepCompleted] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: RegistrationFormValues, actions: FormikHelpers<RegistrationFormValues>) => {
        try {
            const response = await store.registration(values.email, values.password);
            if (response && response.status === 200) {
                setIsRegistered(true);
            }
        } catch (e: any) {
            setErrorMessage(e.response?.data?.message);
            toast.error(e.response?.data?.message);
        }
    };

    const handleSecondStepSubmit = async () => {
        setIsSecondStepCompleted(true);
    };

    return (
        <>
            {!isRegistered ? (
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
                            {errorMessage && <Typography sx={{color: 'red', maxWidth: 330}}>{errorMessage}</Typography>}
                        </Form>
                    )}
                </Formik>
            ) : !isSecondStepCompleted ? (
                <RegCreateForm onSubmit={handleSecondStepSubmit} />
            ) : (
                <LoginForm/>
            )}
        </>
    );
};

export default RegistrationForm;
