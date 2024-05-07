import React, { FC } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import LoginForm from '../../../pages/auth/loginForm/LoginForm';
import Button from '@mui/material/Button';
import { MainColors } from '../../../../lib/colors/MainColors';

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
            <DialogTitle
                id={'form-dialog-title'}
                sx={{
                    bgcolor: MainColors.GRAY595,
                    color: MainColors.WHITE,
                    pl: 3,
                }}
            >
                Log in
            </DialogTitle>
            <DialogContent sx={{ bgcolor: MainColors.GRAY595 }}>
                <DialogContentText
                    sx={{ color: MainColors.WHITE, ml: 0, mb: 1 }}
                >
                    Enter your account login information
                </DialogContentText>
                <LoginForm />
            </DialogContent>
            <DialogActions sx={{ bgcolor: MainColors.GRAY595 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color: MainColors.WHITE,
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
