import { useNavigate, useParams } from 'react-router-dom';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../index';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import AuctionTimer from '../../../components/layout/common/ui/timers/auctionTimer/AuctionTimer';
import Typography from '@mui/material/Typography';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import { AuctionInt } from './AuctionItemInt';

const theme = createTheme({
    palette: {
        success: {
            main: '#7dc738',
        },
    },
});

const RateId: FC = () => {
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
                <Grid
                    item
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        position: 'relative',
                    }}
                    md={6}
                >
                    <img
                        src={auction.img}
                        alt="Preview"
                        style={{ maxWidth: '100%', marginTop: '1rem' }}
                    />
                    <Box sx={{ position: 'absolute', top: 0 }}>
                        {auction &&
                            (auction.active ? (
                                <VerifiedIcon
                                    sx={{ color: '#7dc738', fontSize: 85 }}
                                />
                            ) : (
                                <CancelIcon
                                    sx={{ color: '#f54242', fontSize: 85 }}
                                />
                            ))}
                    </Box>
                </Grid>
                <Grid item sx={{ width: '100%', maxWidth: '100%' }} md={6}>
                    <Typography
                        sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}
                    >
                        Author @{auction && auction.owner}
                    </Typography>
                    <Typography
                        sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}
                    >
                        {auction && auction.desct}
                    </Typography>
                    <Typography>
                        Start rates:{' '}
                        <span style={{ color: '#ed3b59', fontSize: '20px' }}>
                            {auction && auction.minRates}
                        </span>{' '}
                        $
                    </Typography>
                    <Typography
                        sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}
                    >
                        Current rate:{' '}
                        <span style={{ color: '#7dc738', fontSize: '20px' }}>
                            {auction && auction.rates}
                        </span>{' '}
                        $
                    </Typography>
                    <Typography>
                        Auction start date:{' '}
                        {auction &&
                            new Date(auction.timeStart).toLocaleDateString(
                                'ua-UA',
                            )}
                    </Typography>
                    <AuctionTimer
                        timeEnd={auction.timeEnd}
                        onAuctionEnd={() => console.log('auction ended')}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export { RateId };
