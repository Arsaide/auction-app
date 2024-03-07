import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../index';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuctionInt } from '../../../../app/auction/auction-id/AuctionItemProps';
import { UserIdInt } from '../../../../app/personal-account/user-id/UserInterface';
import UserDetails from './userDetails/UserDetails';
import OwnAuctionsList from './ownAuctionsList/OwnAuctionsList';

const UserIdPage: FC = () => {
    const { store } = useContext(Context);
    const { token } = useParams<{ token: string }>();
    const [user, setUser] = useState<UserIdInt | null>(null);
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
                const response = await store.getUser(token);
                const auctionResponse = await store.getOwnAuctions(token);
                console.log(auctionResponse.data.auctions);
                setUser(response.data.user as unknown as UserIdInt);
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

    if (!user) {
        return (
            <Grid container justifyContent="center">
                <CircularProgress size={120} color="success" />
            </Grid>
        );
    }

    return (
        <>
            <UserDetails user={user} />
            <OwnAuctionsList auctions={auctions} />
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3 }}>
                Log out
            </Button>
        </>
    );
};

export default UserIdPage;