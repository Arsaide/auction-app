import * as yup from 'yup';

export const forgotPasswordFormValidationSchema = yup.object().shape({
    email: yup.string().required(`Required field`),
});
