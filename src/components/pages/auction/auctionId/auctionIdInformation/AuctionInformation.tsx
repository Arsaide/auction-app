import React, { FC } from 'react';
import { AuctionInt } from '../../../../../app/auction/auction-id/AuctionItemProps';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuctionTimer from '../../../../layout/common/ui/timers/auctionTimer/AuctionTimer';

interface AuctionInformationProps {
    auction: AuctionInt;
}

const AuctionInformation: FC<AuctionInformationProps> = ({ auction }) => {
    return (
        <Grid item sx={{ width: '100%', maxWidth: '100%' }} md={6}>
            <Typography sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}>
                Author @{auction.owner}
            </Typography>
            <Typography sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}>
                {auction.desct}
            </Typography>
            <Typography>
                Start rates:{' '}
                <span style={{ color: '#ed3b59', fontSize: '20px' }}>
                    {auction.minRates}
                </span>{' '}
                $
            </Typography>
            <Typography sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}>
                Current rate:{' '}
                <span style={{ color: '#7dc738', fontSize: '20px' }}>
                    {auction.rates}
                </span>{' '}
                $
            </Typography>
            <Typography>
                Auction start date:{' '}
                {new Date(auction.timeStart).toLocaleDateString('ua-UA')}
            </Typography>
            <AuctionTimer
                timeEnd={auction.timeEnd}
                onAuctionEnd={() => console.log('auction ended')}
            />
        </Grid>
    );
};

export default AuctionInformation;
