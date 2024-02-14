import * as yup from 'yup';

const regEx = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required(`Required field`)
        .email('Invalid email format'),

    password: yup
        .string()
        .required(`Required field`)
        .min(6, 'Not shorter than 6 characters!')
        .max(32, 'No longer than 32 characters!')
        .matches(regEx, 'At least one Latin letter and one number!'),
});
