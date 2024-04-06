import React, { FC, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteAuction from './deleteAution/DeleteAuction';
import { toast } from 'react-toastify';
import { Context } from '../../../../../index';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

interface IDeleteSection {
    id: string | undefined;
}

const DeleteSection: FC<IDeleteSection> = ({ id }) => {
    const { store } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleSubmit = async () => {
        try {
            const response = await store.sendDeleteAuction(id);
            if (response && response.status === 200) {
                setIsOpen(true);
                setIsSubmitting(true);
            }
        } catch (e: any) {
            toast.error(e.response?.data?.message);
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Button
                variant={'contained'}
                onClick={handleSubmit}
                sx={{
                    color: 'white',
                    bgcolor: '#dc3545',
                    '&:hover': {
                        bgcolor: '#c82333',
                    },
                }}
            >
                Delete
            </Button>

            <Dialog open={isOpen} aria-labelledby={'form-dialog-title'}>
                <DialogTitle
                    id={'form-dialog-title'}
                    sx={{ bgcolor: '#595858', color: 'white', pl: 3 }}
                >
                    Delete Auction
                </DialogTitle>

                <DialogContent sx={{ bgcolor: '#595858' }}>
                    <DeleteAuction />
                </DialogContent>
                <DialogActions sx={{ bgcolor: '#595858' }}>
                    <Button
                        onClick={() => setIsOpen(false)}
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
        </>
    );
};

export default DeleteSection;
