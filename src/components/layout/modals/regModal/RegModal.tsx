import React, { FC } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import RegistrationForm from '../../../pages/auth/registration/registrationForm/RegistrationForm';
import Button from '@mui/material/Button';
import { MainColors } from '../../../../lib/colors/MainColors';

interface RegModalInterface {
    open: boolean;
    onClose: () => void;
}

const RegModal: FC<RegModalInterface> = ({ open, onClose }) => {
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
                Authorization
            </DialogTitle>
            <DialogContent sx={{ bgcolor: MainColors.GRAY595 }}>
                <DialogContentText
                    sx={{ color: MainColors.WHITE, ml: 0, mb: 2 }}
                >
                    Enter your details. Everything is confidential!
                </DialogContentText>
                <RegistrationForm />
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

export default RegModal;
