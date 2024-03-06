import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { Context } from '../../../../index';
import Box from '@mui/material/Box';
import Input from '../../../layout/common/inputs/input/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageForm from '../../../layout/common/inputs/imgInput/ImgInput';
import { betFormValidationSchema } from './betFormValidation/betFormValidationSchema';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import SubmitTimer from '../../../layout/common/ui/timers/submitTimer/SubmitTimer';

interface RateFormInt {
    title: string;
    desc: string;
    minRates: string;
    endDate: Date[];
    image: string;
}
const RateForm = () => {
    const { store } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const lastSubmittedTimeRef = useRef<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs().subtract(-1, 'day'),
    );
    const today = dayjs();

    useEffect(() => {
        const lastSubmittedTime = localStorage.getItem('lastSubmittedTime');
        if (lastSubmittedTime) {
            lastSubmittedTimeRef.current = parseInt(lastSubmittedTime);
        }
    }, []);

    const initialValues = {
        title: '',
        desc: '',
        minRates: '',
        endDate: [new Date()],
        image: '',
    };

    const handleSubmit = async (
        values: RateFormInt,
        actions: FormikHelpers<RateFormInt>,
    ) => {
        if (
            lastSubmittedTimeRef.current &&
            Date.now() - lastSubmittedTimeRef.current < 300000
        ) {
            toast.error('Please wait 5 minutes before submitting again.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await store.createAuction(
                values.title,
                values.desc,
                values.minRates,
                selectedImage,
                value,
            );
            if (response && response.status === 200) {
                actions.resetForm();
                lastSubmittedTimeRef.current = Date.now();
                localStorage.setItem(
                    'lastSubmittedTime',
                    lastSubmittedTimeRef.current.toString(),
                );
            }
        } catch (e: any) {
            setIsSubmitting(false);
            toast.error(e.response?.data?.message);
            setErrorMessage(e.response?.data?.message);
        }
        setIsSubmitting(false);
    };

    const handleImageSubmit = (image: File) => {
        setSelectedImage(image);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Formik
                    validationSchema={betFormValidationSchema}
                    validateOnMount
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ isValid }) => (
                        <Form>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    mb: 6,
                                }}
                            >
                                <ImageForm
                                    name={'image'}
                                    onSubmit={handleImageSubmit}
                                />
                                <Input
                                    id={'title'}
                                    label={'Your rate'}
                                    name={'title'}
                                    placeholder={'Enter your rate'}
                                />
                                <Input
                                    id={'desc'}
                                    label={'Your description'}
                                    name={'desc'}
                                    placeholder={'Enter your description'}
                                    type={'text'}
                                />
                                <Input
                                    id={'minRates'}
                                    label={'Your min rates'}
                                    name={'minRates'}
                                    placeholder={'Enter your min rates'}
                                    type={'number'}
                                />
                                <Box sx={{ display: 'flex', gap: 20 }}>
                                    <DatePicker
                                        value={today}
                                        disabled
                                        sx={{
                                            '& input.MuiInputBase-input': {
                                                color: '#999999 !important',
                                            },
                                            '& fieldset': {
                                                borderColor:
                                                    '#999999 !important',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: '#999999 !important',
                                            },
                                            '& .MuiInputBase-input.Mui-disabled':
                                                {
                                                    WebkitTextFillColor:
                                                        '#999999',
                                                },
                                        }}
                                    />
                                    <DatePicker
                                        name={'endDate'}
                                        value={value}
                                        onChange={newValue =>
                                            setValue(newValue)
                                        }
                                        disablePast
                                        sx={{
                                            '& input': {
                                                color: 'white',
                                            },
                                            '& fieldset': {
                                                borderColor: 'white',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: 'white',
                                            },
                                            '&:hover': {
                                                '& input': {
                                                    color: '#a3a3a3',
                                                },
                                                '& fieldset': {
                                                    borderColor:
                                                        '#a3a3a3 !important',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: '#a3a3a3',
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    sx={{
                                        height: 60,
                                        bgcolor: '#7dc738',
                                        '&:hover': {
                                            bgcolor: '#5a8f29',
                                        },
                                        '&:disabled': {
                                            bgcolor: '#f54242',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    {isSubmitting
                                        ? 'Submitting...'
                                        : 'Post an auction'}
                                </Button>
                                {errorMessage && (
                                    <Typography sx={{ color: 'red' }}>
                                        {errorMessage}
                                    </Typography>
                                )}
                                {lastSubmittedTimeRef.current && (
                                    <SubmitTimer
                                        nextSubmitTime={
                                            lastSubmittedTimeRef.current +
                                            300000
                                        }
                                    />
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </LocalizationProvider>
        </>
    );
};

export default RateForm;
