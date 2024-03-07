import * as yup from 'yup';

export const AuctionFormEditValidationSchema = yup
    .object()
    .shape({
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

        endDate: yup
            .array()
            .of(yup.date())
            .min(1, 'Please select a date range'),
    })
    .test('at-least-one', 'At least one field is required', obj => {
        const { title, desc, minRates, endDate } = obj;
        if (!(title || desc || minRates || endDate)) {
            return new yup.ValidationError(
                'At least one field is required',
                null,
                'atLeastOne',
            );
        }
        return true;
    });
