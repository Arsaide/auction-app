import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../index';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

interface UserIdInt {
    email: string;
    balance: string;
    bidAuction: [string];
    ownAuction: [string];
}

const UserId: FC = () => {
    const { store } = useContext(Context);
    const { token } = useParams<{ token: string }>();
    const [user, setUser] = useState<UserIdInt | null>(null);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await store.getUser(token);
                setUser(response.data.user as unknown as UserIdInt);
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
        <div>
            <p>{user && user.email}</p>
            <p>{user && user.balance}</p>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3 }}>
                Log out
            </Button>
        </div>
    );
};

export { UserId };
