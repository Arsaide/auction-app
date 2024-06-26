import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../index';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../lib/providers/AuthContext';
import { toast } from 'react-toastify';
import UserVariantPA from './variants/userVariantPA/UserVariantPA';
import OwnerVariantPA from './variants/ownerVariantPA/OwnerVariantPA';
import { CircularProgress } from '@mui/material';
import { MainColorsEnum } from '../../../../lib/colors/MainColors.enum';
import Box from '@mui/material/Box';
import { FetchDataProvider } from '../../../../lib/providers/FetchDataPA';

const UserIdPage: FC = () => {
    const { store } = useContext(Context);
    const { isLoggedIn } = useContext(AuthContext);
    const { name, avatar, email, balance } = store.personalAccount || {};
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [isOwner, setIsOwner] = useState<boolean>(false);

    const redirectPage = () => {
        if (!isLoggedIn) {
            navigate(`/personal-account`);
        }
    };

    useEffect(() => {
        redirectPage();
    }, [isLoggedIn]);

    const fetchData = async () => {
        setIsSubmitting(false);
        try {
            const response = await store.getPersonalAccount(id);

            if (response.data.status) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        } catch (error: any) {
            console.error('Error fetching auction:', error);
            toast.error(error.response?.data?.message);
        } finally {
            setIsSubmitting(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id, store]);

    return (
        <FetchDataProvider fetchData={fetchData}>
            {isSubmitting ? (
                <>
                    {isOwner && (
                        <>
                            <OwnerVariantPA
                                id={id}
                                name={name}
                                email={email}
                                avatar={avatar}
                                balance={balance}
                            />
                        </>
                    )}
                    {!isOwner && (
                        <UserVariantPA
                            id={id}
                            name={name}
                            email={email}
                            avatar={avatar}
                        />
                    )}
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 'calc(100vh - 112px)',
                        }}
                    >
                        <CircularProgress
                            size={200}
                            thickness={2}
                            sx={{ color: MainColorsEnum.GREEN }}
                        />
                    </Box>
                </>
            )}
        </FetchDataProvider>
    );
};

export default UserIdPage;
