import * as yup from 'yup';

export const auctionSearchValidationSchema = yup.object().shape({
    text: yup.string().required(''),
});
