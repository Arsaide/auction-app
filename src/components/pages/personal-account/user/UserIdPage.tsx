import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../index';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AuctionInt } from '../../../../app/auction/auction-id/AuctionItemProps';
import UserDetails from './userDetails/UserDetails';
import OwnAuctionsList from './ownAuctionsList/OwnAuctionsList';
import { ButtonColors } from '../../../../lib/colors/ButtonColors';
import ListOfBets from './listOfBets/ListOfBets';
import { Typography } from '@mui/material';

const UserIdPage: FC = () => {
    const { store } = useContext(Context);
    const { name, email, balance, avatar } = store.user;
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('isAuth') === 'true';
    const [auctions, setAuctions] = useState<AuctionInt[]>([]);

    const redirectPage = () => {
        if (!isAuth) {
            navigate(`/personal-account`);
        }
    };

    useEffect(() => {
        redirectPage();
    }, []);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const auctionResponse = await store.getOwnAuctions(token);
                setAuctions(auctionResponse.data.auctions);
            } catch (error) {
                console.error('Error fetching account:', error);
            }
        };

        fetchAccount();
    }, [store, token]);

    const handleSubmit = () => {
        store.logout();
        window.location.reload();
    };

    return (
        <>
            <UserDetails
                name={name}
                email={email}
                balance={balance}
                avatar={avatar}
            />
            <Typography variant={'h5'} sx={{ mb: 2, mt: 2 }}>
                Own auctions list:
            </Typography>
            <OwnAuctionsList auctions={auctions} />
            <Typography variant={'h5'} sx={{ mb: 2, mt: 2 }}>
                My bet history:
            </Typography>
            <ListOfBets auctions={auctions} />
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
