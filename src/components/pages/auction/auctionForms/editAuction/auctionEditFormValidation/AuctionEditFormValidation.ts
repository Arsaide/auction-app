import * as yup from 'yup';

export const AuctionFormEditValidationSchema = yup.object().shape({
    title: yup
        .string()
        .min(5, 'Not shorter than 5 characters!')
        .max(60, 'No longer than 60 characters!'),

    desc: yup
        .string()
        .min(15, 'Not shorter than 15 characters!')
        .max(3000, 'No longer than 3000 characters!'),

    minRates: yup
        .string()
        .matches(/^\d+$/, 'MinRates must be a positive integer'),

    endDate: yup.array().of(yup.date()),
});
