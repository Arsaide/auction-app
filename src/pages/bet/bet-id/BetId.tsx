import { useParams } from 'react-router-dom';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../index';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material';
import AuctionTimer from '../../../components/layout/common/ui/timers/auctionTimer/AuctionTimer';
import Typography from '@mui/material/Typography';

interface AuctionItem {
    _id: string;
    img: string;
    title: string;
    minRates: string;
    rates: string;
    desct: string;
    active: boolean;
    state: boolean;
    owner: string;
    timeStart: string;
    timeEnd: string;
}

const theme = createTheme({
    palette: {
        success: {
            main: '#7dc738',
        },
    },
});

const BetId: FC = () => {
    const { store } = useContext(Context);
    const { id } = useParams<{ id: string }>();
    const [auction, setAuction] = useState<AuctionItem | null>(null);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await store.getauctionone(id);
                console.log(response);
                setAuction(response.data.auction as unknown as AuctionItem);
            } catch (error) {
                console.error('Error fetching auction:', error);
            }
        };

        fetchAuction();
    }, [id]);

    if (!auction) {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress size={120} color="success" />
                </Box>
            </ThemeProvider>
        );
    }

    return (
        <div>
            <Typography variant={'h4'}>ID: {id}</Typography>

            <img
                src={auction.img}
                alt="Preview"
                style={{ maxWidth: '200px', marginTop: '1rem' }}
            />
            <Typography>Image link: {auction && auction.img}</Typography>
            <Typography>
                Active: {auction && auction.active.toString()}
            </Typography>
            <Typography>Title: {auction && auction.title}</Typography>
            <Typography>Description: {auction && auction.desct}</Typography>
            <Typography>Min rates: {auction && auction.minRates}</Typography>
            <Typography>Rates: {auction && auction.rates}</Typography>
            <Typography>Owner: {auction && auction.owner}</Typography>
            <Typography>
                State: {auction && auction.state.toString()}
            </Typography>
            <Typography>Owner: {auction && auction.timeStart}</Typography>
            <Typography>timeEnd: {auction && auction.timeEnd}</Typography>
            <AuctionTimer
                timeEnd={auction.timeEnd}
                onAuctionEnd={() => console.log('auction ended')}
            />
        </div>
    );
};

export { BetId };
