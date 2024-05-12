import React, { FC } from 'react';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
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
            <DialogContent sx={{ bgcolor: MainColors.GRAY595 }}>
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
