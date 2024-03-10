import React, { FC } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import RegistrationForm from '../../../pages/auth/regestrationForm/RegistrationForm';
import Button from '@mui/material/Button';

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
                sx={{ bgcolor: '#595858', color: 'white', pl: 3 }}
            >
                Authorization
            </DialogTitle>
            <DialogContent sx={{ bgcolor: '#595858' }}>
                <DialogContentText sx={{ color: 'white', ml: 0, mb: 2 }}>
                    Enter your details. Everything is confidential!
                </DialogContentText>
                <RegistrationForm />
            </DialogContent>
            <DialogActions sx={{ bgcolor: '#595858' }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color: 'white',
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
