import React, { FC, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteAuction from './deleteAution/DeleteAuction';
import { toast } from 'react-toastify';
import { Context } from '../../../../../index';

interface IDeleteSection {
    id: string | undefined;
}

const DeleteSection: FC<IDeleteSection> = ({ id }) => {
    const { store } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            const response = await store.sendDeleteAuction(id);
            if (response && response.status === 200) {
                toast.success('Code sent by email');
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

            {isSubmitting && <DeleteAuction />}
        </>
    );
};

export default DeleteSection;
