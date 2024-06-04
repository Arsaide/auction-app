import React, { FC, useState } from 'react';
import { AuctionInt } from '../../../../../app/auction/auction-id/AuctionItemProps';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuctionTimer from '../../../../layout/common/ui/timers/auctionTimer/AuctionTimer';
import Button from '@mui/material/Button';
import EditAuctionForm from '../../auctionForms/editAuction/EditAuctionForm';
import DeleteSection from '../../auctionForms/deleteSection/DeleteSection';
import Box from '@mui/material/Box';
import { MainColorsEnum } from '../../../../../lib/colors/MainColors.enum';
import { ButtonColorsEnum } from '../../../../../lib/colors/ButtonColors.enum';
import PlaceABet from '../../auctionForms/placeABet/PlaceABet';
import { Close } from '@mui/icons-material';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';

interface AuctionInformationProps {
    auction: AuctionInt;
    owner: boolean;
    reloadAuction: () => Promise<void>;
    isRequesting: boolean;
    id: string | undefined;
    avatar: string | null;
    userBet: number | null;
}

const AuctionInformation: FC<AuctionInformationProps> = ({
    auction,
    owner,
    reloadAuction,
    isRequesting,
    id,
    avatar,
    userBet,
}) => {
    const [isVisibleEditForm, setIsVisibleEditForm] = useState<boolean>(false);
    const [isVisibleBetForm, setIsVisibleBetForm] = useState<boolean>(false);

    const requiredAmount =
        parseFloat(auction.rates) - parseFloat(String(userBet));

    const handleReloadAuction = () => {
        reloadAuction();
    };

    return (
        <Grid item sx={{ width: '100%', maxWidth: '100%' }} md={5}>
            <Typography sx={{ borderBottom: '1px solid white', mb: 1, pb: 1 }}>
                Author -{' '}
                <Link
                    to={`/personal-account/${auction.ownerId}`}
                    style={{ color: MainColorsEnum.WHITE }}
                >
                    <Chip
                        avatar={
                            <Avatar
                                alt={`${auction.owner} avatar`}
                                src={`${avatar}`}
                            />
                        }
                        label={auction.owner}
                        variant="outlined"
                        sx={{
                            color: MainColorsEnum.WHITE,
                            '&:hover': {
                                opacity: '.85',
                                cursor: 'pointer',
                            },
                        }}
                    />
                </Link>
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
                                {parse(auction.desct)}
                            </Typography>
                            <Typography>
                                Start rates:{' '}
                                <span
                                    style={{
                                        color: MainColorsEnum.RED,
                                        fontSize: '20px',
                                    }}
                                >
                                    {parseFloat(
                                        auction.minRates,
                                    ).toLocaleString('de-DE', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </span>{' '}
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
                                        color: MainColorsEnum.GREEN,
                                        fontSize: '20px',
                                    }}
                                >
                                    {parseFloat(auction.rates).toLocaleString(
                                        'de-DE',
                                        {
                                            style: 'currency',
                                            currency: 'USD',
                                        },
                                    )}
                                </span>{' '}
                            </Typography>
                            {!owner && (
                                <>
                                    <Typography>
                                        My current rate:{' '}
                                        <span
                                            style={{
                                                color: MainColorsEnum.GREEN,
                                                fontSize: '20px',
                                            }}
                                        >
                                            {userBet
                                                ? userBet.toLocaleString(
                                                      'de-DE',
                                                      {
                                                          style: 'currency',
                                                          currency: 'USD',
                                                      },
                                                  )
                                                : null}
                                        </span>
                                    </Typography>
                                    {userBet &&
                                    userBet < parseFloat(auction.rates) ? (
                                        <Typography
                                            sx={{
                                                borderBottom: '1px solid white',
                                                mb: 1,
                                                pb: 1,
                                            }}
                                        >
                                            You are ahead by:{' '}
                                            <span
                                                style={{
                                                    color: MainColorsEnum.RED,
                                                }}
                                            >
                                                <i>
                                                    {requiredAmount.toLocaleString(
                                                        'de-DE',
                                                        {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        },
                                                    )}
                                                </i>
                                            </span>
                                        </Typography>
                                    ) : null}
                                </>
                            )}
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
                                        bgcolor: ButtonColorsEnum.LGREEN,
                                        '&:hover': {
                                            bgcolor: ButtonColorsEnum.DGREEN,
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
                                    bgcolor: ButtonColorsEnum.LGREEN,
                                    '&:hover': {
                                        bgcolor: ButtonColorsEnum.DGREEN,
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
                        <Box
                            sx={{
                                borderTop: '1px solid white',
                                mt: 1,
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    color: MainColorsEnum.WHITE,
                                    bgcolor: ButtonColorsEnum.LRED,
                                    '&:hover': {
                                        bgcolor: ButtonColorsEnum.DRED,
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
                                requiredAmount={requiredAmount}
                            />
                        </Box>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                color: MainColorsEnum.WHITE,
                                bgcolor: ButtonColorsEnum.LRED,
                                '&:hover': {
                                    bgcolor: ButtonColorsEnum.DRED,
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
