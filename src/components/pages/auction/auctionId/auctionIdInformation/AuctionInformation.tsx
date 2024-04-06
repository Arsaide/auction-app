import React, { FC, useState } from 'react';
import { AuctionInt } from '../../../../../app/auction/auction-id/AuctionItemProps';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuctionTimer from '../../../../layout/common/ui/timers/auctionTimer/AuctionTimer';
import Button from '@mui/material/Button';
import EditAuctionForm from '../../auctionForms/editAuction/EditAuctionForm';
import DeleteSection from '../../auctionForms/deleteSection/DeleteSection';
import Box from '@mui/material/Box';

interface AuctionInformationProps {
    auction: AuctionInt;
    owner: boolean;
    reloadAuction: () => void;
    isRequesting: boolean;
    id: string | undefined;
}

const AuctionInformation: FC<AuctionInformationProps> = ({
    auction,
    owner,
    reloadAuction,
    isRequesting,
    id,
}) => {
    const [visibleForm, setVisibleForm] = useState<boolean>(false);

    const handleReloadAuction = () => {
        reloadAuction();
    };

    return (
        <Grid item sx={{ width: '100%', maxWidth: '100%' }} md={5}>
            <Typography sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}>
                Author @{auction.owner}
            </Typography>
            {!visibleForm && (
                <>
                    {!isRequesting && (
                        <>
                            <Typography
                                sx={{
                                    borderBottom: '1px solid white',
                                    mb: 1,
                                    pb: 1,
                                }}
                            >
                                {auction.desct}
                            </Typography>
                            <Typography>
                                Start rates:{' '}
                                <span
                                    style={{
                                        color: '#ed3b59',
                                        fontSize: '20px',
                                    }}
                                >
                                    {auction.minRates}
                                </span>{' '}
                                $
                            </Typography>
                            <Typography
                                sx={{
                                    borderBottom: '1px solid white',
                                    mb: 1,
                                    pb: 1,
                                }}
                            >
                                Current rate:{' '}
                                <span
                                    style={{
                                        color: '#7dc738',
                                        fontSize: '20px',
                                    }}
                                >
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
                            <AuctionTimer timeEnd={auction.timeEnd} />
                        </>
                    )}
                </>
            )}
            {owner ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        maxWidth: 'max-content',
                    }}
                >
                    {!visibleForm ? (
                        <>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: '#649f2d',
                                    '&:hover': {
                                        bgcolor: '#5a8f29',
                                    },
                                }}
                                onClick={() => setVisibleForm(true)}
                            >
                                Edit auction
                            </Button>
                            <DeleteSection id={id} />
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#649f2d',
                                '&:hover': {
                                    bgcolor: '#5a8f29',
                                },
                            }}
                            onClick={() => {
                                setVisibleForm(false);
                            }}
                        >
                            Close edit auction
                        </Button>
                    )}
                </Box>
            ) : null}

            {owner ? (
                <>
                    {visibleForm && (
                        <EditAuctionForm
                            _id={auction && auction._id}
                            reloadAuction={handleReloadAuction}
                            setVisibleForm={setVisibleForm}
                        />
                    )}
                </>
            ) : (
                <Button
                    variant="contained"
                    sx={{
                        color: 'white',
                        bgcolor: '#dc3545',
                        '&:hover': {
                            bgcolor: '#c82333',
                        },
                    }}
                    onClick={() => {
                        alert('you cant buy');
                    }}
                >
                    Buy
                </Button>
            )}
        </Grid>
    );
};

export default AuctionInformation;
