import React, { FC } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import { AuctionInt } from '../../../../../app/auction/auction-id/AuctionItemProps';

interface AuctionDetailsProps {
    auction: AuctionInt;
}

const AuctionDetails: FC<AuctionDetailsProps> = ({ auction }) => {
    return (
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
                {auction.active ? (
                    <VerifiedIcon sx={{ color: '#7dc738', fontSize: 85 }} />
                ) : (
                    <CancelIcon sx={{ color: '#f54242', fontSize: 85 }} />
                )}
            </Box>
        </Grid>
    );
};

export default AuctionDetails;
