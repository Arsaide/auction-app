import * as yup from 'yup';
export const betFormValidationSchema = yup.object().shape({
    rate: yup
        .string()
        .required('Required field'),

    password: yup
        .string()
        .required('Required field')
        .min(6, 'Not shorter than 6 characters!')
        .max(32, 'No longer than 32 characters!')
        .matches(/^(?=.*\d)(?=.*[a-zA-Z]).*$/, 'At least one Latin letter and one number!'),

    image: yup
        .mixed(),

    date: yup
        .array()
        .of(yup.date())
        .min(2, 'Please select a date range')
        .required('Please select a date range')
});