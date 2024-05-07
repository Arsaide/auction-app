import * as yup from 'yup';

const regEx = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;

export const changePasswordFormValidationSchema = yup.object().shape({
    password: yup
        .string()
        .required(`Required field`)
        .min(6, 'Not shorter than 6 characters!')
        .max(32, 'No longer than 32 characters!')
        .matches(regEx, 'At least one Latin letter and one number!'),

    confirmPassword: yup
        .string()
        .required(`Required field`)
        .min(6, 'Not shorter than 6 characters!')
        .max(32, 'No longer than 32 characters!')
        .matches(regEx, 'At least one Latin letter and one number!')
        .nullable()
        .oneOf([yup.ref('password'), null], 'The passwords arent the same'),
});
