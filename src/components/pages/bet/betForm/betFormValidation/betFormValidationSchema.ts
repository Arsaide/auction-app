import * as yup from 'yup';

export const betFormValidationSchema = yup.object().shape({
    title: yup
        .string()
        .required('Required field'),

    desc: yup
        .string()
        .required('Required field')
        .min(15, 'Not shorter than 6 characters!')
        .max(300, 'No longer than 32 characters!'),

    rates: yup
        .string()
        .required('Required field'),

    minRates: yup
        .string()
        .required('Required field'),


    image: yup
        .mixed(),
        // .required("Required"),

    date: yup
        .array()
        .of(yup.date())
        .min(1, 'Please select a date range')
        .required('Please select a date range')
});
