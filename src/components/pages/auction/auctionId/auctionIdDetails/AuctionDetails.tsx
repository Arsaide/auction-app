import React, { FC } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import { AuctionInt } from '../../../../../app/auction/auction-id/AuctionItemProps';
import { ButtonColors } from '../../../../../lib/Colors/ButtonColors';

interface AuctionDetailsProps {
    auction: AuctionInt;
}

const AuctionDetails: FC<AuctionDetailsProps> = ({ auction }) => {
    return (
        <Grid
            item
            sx={{
                width: '100%',
                position: 'relative',
                backgroundColor: 'gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            md={5}
        >
            <img
                src={auction.img}
                alt="Preview"
                style={{
                    maxWidth: '650px',
                    maxHeight: '750px',
                    width: '100%',
                    height: '100%',
                }}
            />
            <Box sx={{ position: 'absolute', top: -5, left: 5 }}>
                {auction.active ? (
                    <VerifiedIcon
                        sx={{ color: ButtonColors.LGREEN, fontSize: 85 }}
                    />
                ) : (
                    <CancelIcon
                        sx={{ color: ButtonColors.LRED, fontSize: 85 }}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default AuctionDetails;
