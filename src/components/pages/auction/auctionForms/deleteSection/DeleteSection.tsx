import React, { FC, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteAuction from './deleteAution/DeleteAuction';
import { toast } from 'react-toastify';
import { Context } from '../../../../../index';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { ButtonColorsEnum } from '../../../../../lib/colors/ButtonColors.enum';
import { MainColorsEnum } from '../../../../../lib/colors/MainColors.enum';

interface IDeleteSection {
    id: string | undefined;
}

const DeleteSection: FC<IDeleteSection> = ({ id }) => {
    const { store } = useContext(Context);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleSubmit = async () => {
        try {
            const response = await store.sendDeleteAuction(id);
            if (response && response.status === 200) {
                setIsOpen(true);
            }
        } catch (e: any) {
            toast.error(e.response?.data?.message);
        }
    };

    return (
        <>
            <Button
                variant={'contained'}
                onClick={handleSubmit}
                sx={{
                    color: MainColorsEnum.WHITE,
                    bgcolor: ButtonColorsEnum.LRED,
                    '&:hover': {
                        bgcolor: ButtonColorsEnum.DRED,
                    },
                }}
            >
                Delete
            </Button>

            <Dialog open={isOpen} aria-labelledby={'form-dialog-title'}>
                <DialogTitle
                    id={'form-dialog-title'}
                    sx={{
                        bgcolor: MainColorsEnum.GRAY595,
                        color: MainColorsEnum.WHITE,
                        pl: 3,
                    }}
                >
                    Delete Auction
                </DialogTitle>

                <DialogContent sx={{ bgcolor: MainColorsEnum.GRAY595 }}>
                    <DeleteAuction />
                </DialogContent>
                <DialogActions sx={{ bgcolor: MainColorsEnum.GRAY595 }}>
                    <Button
                        onClick={() => setIsOpen(false)}
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
        </>
    );
};

export default DeleteSection;
