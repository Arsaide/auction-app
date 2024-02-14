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
                sx={{ bgcolor: '#081041', color: 'white', pl: 3 }}
            >
                Log in
            </DialogTitle>
            <DialogContent sx={{ bgcolor: '#081041' }}>
                <DialogContentText sx={{ color: 'white', ml: 0, mb: 2 }}>
                    Enter your account login information
                </DialogContentText>
                <LoginForm />
            </DialogContent>
            <DialogActions sx={{ bgcolor: '#081041' }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color: 'white',
                        mr: 1,
                        mb: 1,
                        p: 1,
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginModal;
