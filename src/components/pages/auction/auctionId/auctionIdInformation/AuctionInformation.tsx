import React, { FC, useState } from 'react';
import { AuctionInt } from '../../../../../app/auction/auction-id/AuctionItemProps';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuctionTimer from '../../../../layout/common/ui/timers/auctionTimer/AuctionTimer';
import Button from '@mui/material/Button';
import EditAuctionForm from '../../auctionForms/editAuction/EditAuctionForm';

interface AuctionInformationProps {
    auction: AuctionInt;
    owner: boolean;
}

const AuctionInformation: FC<AuctionInformationProps> = ({
    auction,
    owner,
}) => {
    const [visibleForm, setVisibleForm] = useState<boolean>(false);

    return (
        <Grid item sx={{ width: '100%', maxWidth: '100%' }} md={6}>
            <Typography sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}>
                Author @{auction.owner}
            </Typography>
            {!visibleForm && (
                <>
                    <Typography
                        sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}
                    >
                        {auction.desct}
                    </Typography>
                    <Typography>
                        Start rates:{' '}
                        <span style={{ color: '#ed3b59', fontSize: '20px' }}>
                            {auction.minRates}
                        </span>{' '}
                        $
                    </Typography>
                    <Typography
                        sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}
                    >
                        Current rate:{' '}
                        <span style={{ color: '#7dc738', fontSize: '20px' }}>
                            {auction.rates}
                        </span>{' '}
                        $
                    </Typography>
                    <Typography>
                        Auction start date:{' '}
                        {new Date(auction.timeStart).toLocaleDateString(
                            'ua-UA',
                        )}
                    </Typography>
                    <AuctionTimer
                        timeEnd={auction.timeEnd}
                        onAuctionEnd={() => console.log('auction ended')}
                    />
                </>
            )}
            {owner ? (
                <>
                    {!visibleForm ? (
                        <Button
                            variant="contained"
                            onClick={() => setVisibleForm(true)}
                        >
                            Edit auction
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => setVisibleForm(false)}
                        >
                            Close edit auction
                        </Button>
                    )}
                </>
            ) : null}
            {owner ? (
                <>
                    {visibleForm && (
                        <EditAuctionForm _id={auction && auction._id} />
                    )}
                </>
            ) : null}
        </Grid>
    );
};

export default AuctionInformation;
