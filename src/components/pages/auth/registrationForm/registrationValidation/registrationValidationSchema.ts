import * as yup from 'yup';

const regEx = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;

export const registrationValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Required field')
        .min(6, 'Not shorter than 6 characters!')
        .max(15, 'Not longer than 15 characters!'),

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

    confirmPassword: yup
        .string()
        .required(`Required field`)
        .min(6, 'Not shorter than 6 characters!')
        .max(32, 'No longer than 32 characters!')
        .matches(regEx, 'At least one Latin letter and one number!')
        .nullable()
        .oneOf([yup.ref('password'), null], 'The passwords arent the same'),
});
