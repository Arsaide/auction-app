import React, { FC } from 'react';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import LoginForm from '../../../pages/auth/loginForm/LoginForm';
import Button from '@mui/material/Button';
import { MainColorsEnum } from '../../../../lib/colors/MainColors.enum';

interface LoginModalInterface {
    open: boolean;
    onClose: () => void;
}

const LoginModal: FC<LoginModalInterface> = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby={'form-dialog-title'}
        >
            <DialogContent sx={{ bgcolor: MainColorsEnum.GRAY595 }}>
                <LoginForm />
            </DialogContent>
            <DialogActions sx={{ bgcolor: MainColorsEnum.GRAY595 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color: MainColorsEnum.WHITE,
                        mr: 1,
                        mb: 1,
                        p: 0.5,
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginModal;
