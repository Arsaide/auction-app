import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../index';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ButtonColors } from '../../../../lib/colors/ButtonColors';
import { AuthContext } from '../../../../lib/providers/AuthContext';
import { toast } from 'react-toastify';
import UserVariantPersonalAccount from './variants/userVariantPersonalAccount/UserVariantPersonalAccount';
import OwnerVariantPersonalAccount from './variants/ownerVariantPersonalAccount/ownerVariantPersonalAccount';

const UserIdPage: FC = () => {
    const { store } = useContext(Context);
    const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
    const { name, avatar, email, status, balance } =
        store.personalAccount || {};
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await store.getPersonalAccount(id);

                if (status) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            } catch (error: any) {
                console.error('Error fetching auction:', error);
                toast.error(error.response?.data?.message);
            }
        };

        fetchData();
    }, [id, store]);

    const handleSubmit = () => {
        store
            .logout()
            .then(() => setIsLoggedIn(false))
            .then(() => navigate(`/personal-account`));
    };

    return (
        <>
            {isOwner ? (
                <OwnerVariantPersonalAccount
                    name={name}
                    email={email}
                    avatar={avatar}
                    balance={balance}
                />
            ) : (
                <UserVariantPersonalAccount
                    name={name}
                    email={email}
                    avatar={avatar}
                />
            )}
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    mt: 3,
                    bgcolor: ButtonColors.LGREEN,
                    '&:hover': {
                        bgcolor: ButtonColors.DGREEN,
                    },
                }}
            >
                Log out
            </Button>
        </>
    );
};

export default UserIdPage;
