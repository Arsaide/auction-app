import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { ButtonColorsEnum } from '../../../../../../../../lib/colors/ButtonColors.enum';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../../../../../../index';
import { AuthContext } from '../../../../../../../../lib/providers/AuthContext';
import ForgotPasswordForm from '../../../../../../auth/recoveryPassword/forgotPassword/ForgotPasswordForm';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const OwnSettings = () => {
    const { store } = useContext(Context);
    const { setIsLoggedIn } = useContext(AuthContext);
    const [isForgotPasswordFormVisible, setIsForgotPasswordFormVisible] =
        useState<boolean>(false);
    const navigate = useNavigate();
    const handleSubmit = () => {
        store
            .logout()
            .then(() => setIsLoggedIn(false))
            .then(() => navigate(`/personal-account`));
    };

    return (
        <>
            <Typography>
                Here you can set up your account, change your password or log
                out
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '400px',
                }}
            >
                {isForgotPasswordFormVisible ? (
                    <>
                        <ForgotPasswordForm isVisionLoginButton={false} />
                        <Button
                            variant="contained"
                            onClick={() =>
                                setIsForgotPasswordFormVisible(false)
                            }
                            sx={{
                                mt: 3,
                                bgcolor: ButtonColorsEnum.LGREEN,
                                '&:hover': {
                                    bgcolor: ButtonColorsEnum.DGREEN,
                                },
                            }}
                        >
                            Close form
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            onClick={() => setIsForgotPasswordFormVisible(true)}
                            sx={{
                                mt: 3,
                                bgcolor: ButtonColorsEnum.LGREEN,
                                '&:hover': {
                                    bgcolor: ButtonColorsEnum.DGREEN,
                                },
                            }}
                        >
                            Forgot your password?
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                mt: 3,
                                bgcolor: ButtonColorsEnum.LGREEN,
                                '&:hover': {
                                    bgcolor: ButtonColorsEnum.DGREEN,
                                },
                            }}
                        >
                            Log out
                        </Button>
                    </>
                )}
            </Box>
        </>
    );
};

export default OwnSettings;
