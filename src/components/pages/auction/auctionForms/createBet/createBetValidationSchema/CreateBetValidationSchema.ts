import * as yup from 'yup';

export const CreateBetValidationSchema = yup.object().shape({
    bet: yup
        .string()
        .matches(/^\d+$/, 'MinRates must be a positive integer')
        .required('Required field'),
});
