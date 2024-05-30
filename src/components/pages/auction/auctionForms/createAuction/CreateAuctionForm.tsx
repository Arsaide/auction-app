import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { Context } from '../../../../../index';
import Box from '@mui/material/Box';
import Input from '../../../../layout/common/inputs/input/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageForm from '../../../../layout/common/inputs/imgInput/ImgInput';
import { auctioFormValidationSchema } from './auctionFormValidation/AuctioFormValidationSchema';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import SubmitTimer from '../../../../layout/common/ui/timers/submitTimer/SubmitTimer';
import { MainColorsEnum } from '../../../../../lib/colors/MainColors.enum';
import { ButtonColorsEnum } from '../../../../../lib/colors/ButtonColors.enum';
import Cookies from 'js-cookie';
import TextEditInput from '../../../../layout/common/inputs/textEditInput/TextEditInput';
import { requestParserOptions } from '../../../../../lib/parserOptions/requestParserOptions/requestParserOptions';

interface AuctionCreateFormProps {
    title: string;
    desc: string;
    minRates: string;
    endDate: Date[];
    image: string;
}
const CreateAuctionForm = () => {
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
        const lastSubmittedTime = Cookies.get('LastSubmittedAuctionTime');
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
        values: AuctionCreateFormProps,
        actions: FormikHelpers<AuctionCreateFormProps>,
    ) => {
        if (
            lastSubmittedTimeRef.current &&
            Date.now() - lastSubmittedTimeRef.current < 300000
        ) {
            toast.error('Please wait 5 minutes before submitting again.');
            return;
        }

        const textValidationResult = requestParserOptions(values.desc);
        if (textValidationResult) {
            toast.error(textValidationResult);
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
                Cookies.set(
                    'LastSubmittedAuctionTime',
                    lastSubmittedTimeRef.current.toString(),
                    { expires: 1 / 288 },
                );
            }
        } catch (e: any) {
            setIsSubmitting(false);
            toast.error(e.response?.data?.message);
            setErrorMessage(e.response?.data?.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageSubmit = (image: File) => {
        setSelectedImage(image);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Formik
                    validationSchema={auctioFormValidationSchema}
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
                                    label={'Your auction'}
                                    name={'title'}
                                    placeholder={'Enter your auction'}
                                />
                                <TextEditInput
                                    id={'desc'}
                                    name={'desc'}
                                    placeholder={'Enter your description'}
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
                                        format={'DD/MM/YYYY'}
                                        sx={{
                                            '& input.MuiInputBase-input': {
                                                color: `${MainColorsEnum.GRAY999} !important`,
                                            },
                                            '& fieldset': {
                                                borderColor: `${MainColorsEnum.GRAY999} !important`,
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: `${MainColorsEnum.GRAY999} !important`,
                                            },
                                            '& .MuiInputBase-input.Mui-disabled':
                                                {
                                                    WebkitTextFillColor:
                                                        MainColorsEnum.GRAY999,
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
                                        format={'DD/MM/YYYY'}
                                        sx={{
                                            '& input': {
                                                color: MainColorsEnum.WHITE,
                                            },
                                            '& fieldset': {
                                                borderColor:
                                                    MainColorsEnum.WHITE,
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: MainColorsEnum.WHITE,
                                            },
                                            '&:hover': {
                                                '& input': {
                                                    color: MainColorsEnum.GRAY999,
                                                },
                                                '& fieldset': {
                                                    borderColor: `${MainColorsEnum.GRAY999} !important`,
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: MainColorsEnum.GRAY999,
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
                                        bgcolor: ButtonColorsEnum.LGREEN,
                                        '&:hover': {
                                            bgcolor: ButtonColorsEnum.DGREEN,
                                        },
                                        '&:disabled': {
                                            bgcolor: ButtonColorsEnum.LRED,
                                            color: MainColorsEnum.WHITE,
                                        },
                                    }}
                                >
                                    {isSubmitting
                                        ? 'Submitting...'
                                        : 'Post an auction'}
                                </Button>
                                {errorMessage && (
                                    <Typography
                                        sx={{ color: MainColorsEnum.RED }}
                                    >
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

export default CreateAuctionForm;
