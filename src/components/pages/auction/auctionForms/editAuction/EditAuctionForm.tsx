import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../../../index';
import dayjs, { Dayjs } from 'dayjs';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuctionFormEditValidationSchema } from './auctionEditFormValidation/AuctionEditFormValidation';
import Box from '@mui/material/Box';
import Input from '../../../../layout/common/inputs/input/Input';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SubmitTimer from '../../../../layout/common/ui/timers/submitTimer/SubmitTimer';
import { MainColorsEnum } from '../../../../../lib/colors/MainColors.enum';
import { ButtonColorsEnum } from '../../../../../lib/colors/ButtonColors.enum';
import Cookies from 'js-cookie';
import TextEditInput from '../../../../layout/common/inputs/textEditInput/TextEditInput';
import { requestParserOptions } from '../../../../../lib/parserOptions/requestParserOptions/requestParserOptions';

interface EditAuctionProps {
    _id: string;
    title: string;
    desc: string;
    minRates: string;
    endDate: Date[];
}

interface EditAuctionsSubmitProps {
    _id: string;
    reloadAuction: () => void;
    setVisibleForm: (value: boolean) => void;
}

const EditAuctionForm: FC<EditAuctionsSubmitProps> = ({
    _id,
    reloadAuction,
    setVisibleForm,
}) => {
    const { store } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const lastSubmittedTimeRef = useRef<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [value, setValue] = useState<Dayjs | null>(
        dayjs().subtract(-1, 'day'),
    );
    const today = dayjs();

    useEffect(() => {
        const lastSubmittedTime = Cookies.get('LastEditAuctionTime');
        if (lastSubmittedTime) {
            lastSubmittedTimeRef.current = parseInt(lastSubmittedTime);
        }
    }, []);

    const initialValues = {
        _id: _id,
        title: '',
        desc: '',
        minRates: '',
        endDate: [new Date()],
    };

    const handleSubmit = async (
        values: EditAuctionProps,
        actions: FormikHelpers<EditAuctionProps>,
    ) => {
        if (
            lastSubmittedTimeRef.current &&
            Date.now() - lastSubmittedTimeRef.current < 60000
        ) {
            toast.error('Please wait 1 minute before submitting again');
            return;
        }

        const textValidationResult = requestParserOptions(values.desc);
        if (textValidationResult) {
            toast.error(textValidationResult);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await store.editAuctionFields(
                _id,
                values.title,
                values.minRates,
                value,
                values.desc,
            );
            if (response && response.status === 200) {
                actions.resetForm();
                lastSubmittedTimeRef.current = Date.now();
                Cookies.set(
                    'LastEditAuctionTime',
                    lastSubmittedTimeRef.current.toString(),
                    { expires: 1 / 288 },
                );
                reloadAuction();
                setVisibleForm(false);
            }
        } catch (e: any) {
            setIsSubmitting(false);
            toast.error(e.response?.data?.message);
            setErrorMessage(e.response?.data?.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Formik
                    validationSchema={AuctionFormEditValidationSchema}
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
                                    gap: 1,
                                    mb: 6,
                                }}
                            >
                                <Input
                                    id={'title'}
                                    label={'Your title'}
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: 4,
                                    }}
                                >
                                    <DatePicker
                                        value={today}
                                        format={'DD/MM/YYYY'}
                                        disabled
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
                                        format={'DD/MM/YYYY'}
                                        disablePast
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
                                        : 'Edit your auction'}
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
                                            lastSubmittedTimeRef.current + 60000
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

export default EditAuctionForm;
