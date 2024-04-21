import * as yup from 'yup';

export const PlaceABetValidationSchema = yup.object().shape({
    bet: yup
        .string()
        .matches(/^\d+$/, 'Bet must be a positive integer')
        .required('Required field'),
});
