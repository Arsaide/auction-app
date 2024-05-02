import * as yup from 'yup';

export const PlaceABetValidationSchema = yup.object().shape({
    bet: yup
        .string()
        .matches(
            /^\d+(\.\d{1,2})?$/,
            'Bet must be a number with up to two decimal places',
        )
        .required('Required field'),
});
