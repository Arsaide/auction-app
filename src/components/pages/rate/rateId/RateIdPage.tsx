import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../index';
import { useParams } from 'react-router-dom';
import { AuctionInt } from '../../../../app/rate/rate-id/AuctionItemInt';
import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AuctionDetails from './rateIdDetails/AuctionDetails';
import AuctionInformation from './rateIdInformation/AuctionInformation';

const theme = createTheme({
    palette: {
        success: {
            main: '#7dc738',
        },
    },
});

const RateIdPage: FC = () => {
    const { store } = useContext(Context);
    const { id } = useParams<{ id: string }>();
    const [auction, setAuction] = useState<AuctionInt | null>(null);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await store.getOneAuction(id);
                setAuction(response.data.auction as unknown as AuctionInt);
            } catch (error) {
                console.error('Error fetching auction:', error);
            }
        };

        fetchAuction();
    }, [id]);

    if (!auction) {
        return (
            <ThemeProvider theme={theme}>
                <Grid container justifyContent="center">
                    <CircularProgress size={120} color="success" />
                </Grid>
            </ThemeProvider>
        );
    }

    return (
        <div>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '30px',
                    borderBottom: '1px solid white',
                    pb: 1,
                    mb: 2,
                }}
            >
                {auction && auction.title}
            </Typography>
            <Grid container justifyContent="flex-start" spacing={2}>
                <AuctionDetails auction={auction} />
                <AuctionInformation auction={auction} />
            </Grid>
        </div>
    );
};

export default RateIdPage;
