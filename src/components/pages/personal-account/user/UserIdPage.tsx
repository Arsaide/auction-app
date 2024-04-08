import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../index';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { AuctionInt } from '../../../../app/auction/auction-id/AuctionItemProps';
import { UserIdInt } from '../../../../app/personal-account/user-id/UserInterface';
import UserDetails from './userDetails/UserDetails';
import OwnAuctionsList from './ownAuctionsList/OwnAuctionsList';

const UserIdPage: FC = () => {
    const { store } = useContext(Context);
    const { name, email, balance, avatar } = store.user;
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('isAuth') === 'true';
    const [auctions, setAuctions] = useState<AuctionInt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
    }, [store, token]);

    const handleSubmit = () => {
        store.logout();
        window.location.reload();
    };

    // if (loading) {
    //     return (
    //         <Grid container justifyContent="center">
    //             <CircularProgress size={120} color="inherit" />
    //         </Grid>
    //     );
    // }

    return (
        <>
            <UserDetails
                name={name}
                email={email}
                balance={balance}
                avatar={avatar}
            />
            <OwnAuctionsList auctions={auctions} />
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    mt: 3,
                    bgcolor: '#649f2d',
                    '&:hover': {
                        bgcolor: '#5a8f29',
                    },
                }}
            >
                Log out
            </Button>
        </>
    );
};

export default UserIdPage;
