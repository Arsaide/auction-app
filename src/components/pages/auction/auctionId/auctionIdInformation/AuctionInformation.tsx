import React, { FC, useState } from 'react';
import { AuctionInt } from '../../../../../app/auction/auction-id/AuctionItemProps';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuctionTimer from '../../../../layout/common/ui/timers/auctionTimer/AuctionTimer';
import Button from '@mui/material/Button';
import EditAuctionForm from '../../auctionForms/editAuction/EditAuctionForm';
import DeleteSection from '../../auctionForms/deleteSection/DeleteSection';
import Box from '@mui/material/Box';
import { MainColors } from '../../../../../lib/Colors/MainColors';
import { ButtonColors } from '../../../../../lib/Colors/ButtonColors';
import PlaceABet from '../../auctionForms/placeABet/PlaceABet';
import { Close } from '@mui/icons-material';

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
    const [isVisibleEditForm, setIsVisibleEditForm] = useState<boolean>(false);
    const [isVisibleBetForm, setIsVisibleBetForm] = useState<boolean>(false);

    const handleReloadAuction = () => {
        reloadAuction();
    };

    return (
        <Grid item sx={{ width: '100%', maxWidth: '100%' }} md={5}>
            <Typography sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}>
                Author @{auction.owner}
            </Typography>
            {!isVisibleEditForm && (
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
                                        color: MainColors.RED,
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
                                        color: MainColors.GREEN,
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    maxWidth: 'max-content',
                }}
            >
                {owner && auction.minRates === auction.rates ? (
                    <>
                        {!isVisibleEditForm ? (
                            <>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: ButtonColors.LGREEN,
                                        '&:hover': {
                                            bgcolor: ButtonColors.DGREEN,
                                        },
                                    }}
                                    onClick={() => setIsVisibleEditForm(true)}
                                >
                                    Edit auction
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: ButtonColors.LGREEN,
                                    '&:hover': {
                                        bgcolor: ButtonColors.DGREEN,
                                    },
                                }}
                                onClick={() => {
                                    setIsVisibleEditForm(false);
                                }}
                            >
                                Close edit auction
                            </Button>
                        )}
                    </>
                ) : null}
                {owner && !isVisibleEditForm && <DeleteSection id={id} />}
            </Box>
            {owner ? (
                auction.minRates === auction.rates ? (
                    <>
                        {isVisibleEditForm && (
                            <EditAuctionForm
                                _id={auction && auction._id}
                                reloadAuction={handleReloadAuction}
                                setVisibleForm={setIsVisibleEditForm}
                            />
                        )}
                    </>
                ) : null
            ) : (
                <>
                    {isVisibleBetForm ? (
                        <>
                            <Button
                                variant="contained"
                                sx={{
                                    color: MainColors.WHITE,
                                    bgcolor: ButtonColors.LRED,
                                    '&:hover': {
                                        bgcolor: ButtonColors.DRED,
                                    },
                                }}
                                onClick={() => {
                                    setIsVisibleBetForm(false);
                                }}
                            >
                                <Close />
                            </Button>
                            <PlaceABet
                                auctionId={id}
                                minBet={auction.minRates}
                                maxBet={auction.rates}
                            />
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                color: MainColors.WHITE,
                                bgcolor: ButtonColors.LRED,
                                '&:hover': {
                                    bgcolor: ButtonColors.DRED,
                                },
                            }}
                            onClick={() => {
                                setIsVisibleBetForm(true);
                            }}
                        >
                            Place a bet
                        </Button>
                    )}
                </>
            )}
        </Grid>
    );
};

export default AuctionInformation;
