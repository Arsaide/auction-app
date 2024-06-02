import React, { FC } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import OwnAuctionsList from '../../../../ownAuctionsList/OwnAuctionsList';
import { AuctionInt } from '../../../../../../../../app/auction/auction-id/AuctionItemProps';

interface IOwnerAuctionsInfo {
    auctions: AuctionInt[];
}

const OwnerAuctionsInfo: FC<IOwnerAuctionsInfo> = ({ auctions }) => {
    return (
        <>
            <Box>
                <Typography sx={{ mb: 3 }}>
                    All listings of auctions you have created and your bidding
                    histories will be displayed here
                </Typography>
                <Typography variant={'h5'}>List of my auctions</Typography>
                <OwnAuctionsList auctions={auctions} />
            </Box>
        </>
    );
};

export default OwnerAuctionsInfo;
