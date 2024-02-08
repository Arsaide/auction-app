import * as yup from 'yup';

export const regCreateValidationSchema = yup.object().shape({
    code: yup
        .string()
        .matches(/^\d{4}$/, 'Code must contain exactly 4 digits')
        .required('Code is required')
})