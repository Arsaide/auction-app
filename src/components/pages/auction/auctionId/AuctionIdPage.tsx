import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../index';
import { useParams } from 'react-router-dom';
import { AuctionInt } from '../../../../app/auction/auction-id/AuctionItemProps';
import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AuctionDetails from './auctionIdDetails/AuctionDetails';
import AuctionInformation from './auctionIdInformation/AuctionInformation';
import EditAuctionForm from '../auctionForms/editAuction/EditAuctionForm';
import Button from '@mui/material/Button';

const theme = createTheme({
    palette: {
        success: {
            main: '#7dc738',
        },
    },
});

const AuctionIdPage: FC = () => {
    const { store } = useContext(Context);
    const { id } = useParams<{ id: string }>();
    const [auction, setAuction] = useState<AuctionInt | null>(null);
    const [owner, setOwner] = useState<boolean>(false);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await store.getOneAuction(id);
                setAuction(response.data.auction as unknown as AuctionInt);
                if (response.data.stateOwner) {
                    setOwner(true);
                } else {
                    setOwner(false);
                }
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
                <AuctionInformation auction={auction} owner={owner} />
            </Grid>
        </div>
    );
};

export default AuctionIdPage;
