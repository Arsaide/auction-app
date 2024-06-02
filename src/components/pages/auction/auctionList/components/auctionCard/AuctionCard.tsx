import React, { FC, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuctionTimer from '../../../../../layout/common/ui/timers/auctionTimer/AuctionTimer';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import useOpenModal from '../../../../../../hooks/useOpenModal/useOpenModal';
import LoginModal from '../../../../../layout/modals/loginModal/LoginModal';
import LazyLoadImage from '../../../../../layout/common/lazyLoadImage/LazyLoadImage';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/material';
import { ButtonColorsEnum } from '../../../../../../lib/colors/ButtonColors.enum';
import { MainColorsEnum } from '../../../../../../lib/colors/MainColors.enum';
import { AuthContext } from '../../../../../../lib/providers/AuthContext';
import { textParserOptions } from '../../../../../../lib/parserOptions/textParserOptions/textParserOptions';
import parse from 'html-react-parser';

interface AuctionCardProps {
    img: string;
    title: string;
    desc: string;
    minRates: string;
    rates: string;
    timeStart: string;
    timeEnd: string;
    id: string;
    active: boolean;
    owner: string;
    ownerId: string;
}

const AuctionCard: FC<AuctionCardProps> = ({
    img,
    title,
    desc,
    minRates,
    rates,
    timeStart,
    timeEnd,
    id,
    active,
    owner,
    ownerId,
}) => {
    const { openLoginModal, handleLoginClickOpen, handleClose } =
        useOpenModal();
    const { isLoggedIn } = useContext(AuthContext);
    const handleLearnMoreClick = () => {
        if (!isLoggedIn) {
            handleLoginClickOpen();
        }
    };

    const formatedTimeStart = new Date(timeStart).toLocaleDateString('ua-UA');

    const trimmedString =
        desc.length > 200 ? desc.substring(0, 200) + '...' : desc;

    return (
        <Card
            sx={{
                height: '100%',
                flex: '1 1 auto',
            }}
        >
            <CardMedia sx={{ position: 'relative' }}>
                <Box sx={{ position: 'absolute', top: 5, left: 5, zIndex: 5 }}>
                    {active ? (
                        <VerifiedIcon
                            sx={{
                                color: ButtonColorsEnum.LGREEN,
                                fontSize: 45,
                            }}
                        />
                    ) : (
                        <CancelIcon
                            sx={{ color: ButtonColorsEnum.LRED, fontSize: 45 }}
                        />
                    )}
                </Box>
                <LazyLoadImage
                    src={img}
                    active={active}
                    w={'100%'}
                    h={'450px'}
                    alt={'title'}
                />
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Divider sx={{ mb: 1.3 }} />
                <Typography variant="body2" color="text.secondary">
                    {parse(trimmedString, textParserOptions)}
                    {desc.length > 200 &&
                        (!isLoggedIn ? (
                            <u>
                                <span
                                    style={{
                                        color: MainColorsEnum.BLACK_06,
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleLearnMoreClick}
                                >
                                    ...read more
                                </span>
                            </u>
                        ) : (
                            <Link
                                style={{ color: MainColorsEnum.BLACK_06 }}
                                to={`/auction/${id}`}
                            >
                                read more
                            </Link>
                        ))}
                </Typography>

                <Typography variant="h6">
                    Price:{' '}
                    {active ? (
                        minRates === rates ? (
                            <>
                                <u>
                                    {parseFloat(minRates).toLocaleString(
                                        'de-DE',
                                        {
                                            style: 'currency',
                                            currency: 'USD',
                                        },
                                    )}
                                </u>
                                <span
                                    style={{
                                        color: MainColorsEnum.GREEN,
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        paddingLeft: '10px',
                                    }}
                                >
                                    no bids yet!
                                </span>
                            </>
                        ) : (
                            <>
                                <u>
                                    {parseFloat(rates).toLocaleString('de-DE', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </u>
                                <span
                                    style={{
                                        color: MainColorsEnum.RED,
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        paddingLeft: '10px',
                                    }}
                                >
                                    initial bid -{' '}
                                    <u>
                                        {parseFloat(minRates).toLocaleString(
                                            'de-DE',
                                            {
                                                style: 'currency',
                                                currency: 'USD',
                                            },
                                        )}
                                    </u>
                                </span>
                            </>
                        )
                    ) : minRates === rates ? (
                        <>
                            <span>Auction not sold</span>
                        </>
                    ) : (
                        <>
                            <span>
                                Auction sold for -{' '}
                                <u style={{ color: MainColorsEnum.RED }}>
                                    {parseFloat(rates).toLocaleString('de-DE', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </u>
                            </span>
                        </>
                    )}
                </Typography>
                <Divider sx={{ mt: 1.3, mb: 1 }} />
                <Typography>Created: {formatedTimeStart}</Typography>
                <Typography sx={{ fontSize: '15px' }}>
                    Author:{' '}
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: MainColorsEnum.BLACK_06,
                        }}
                        to={`/personal-account/${ownerId}`}
                    >
                        @{owner}
                    </Link>
                </Typography>
                <AuctionTimer timeEnd={timeEnd} />
            </CardContent>
            <CardActions sx={{ ml: 1, mb: 1 }}>
                {!isLoggedIn && (
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            color: MainColorsEnum.WHITE,
                            bgcolor: ButtonColorsEnum.DGREEN,
                            '&:hover': {
                                bgcolor: ButtonColorsEnum.LGREEN,
                            },
                        }}
                        onClick={handleLearnMoreClick}
                        disabled={!active}
                    >
                        Learn More
                    </Button>
                )}
                {isLoggedIn && (
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            color: MainColorsEnum.WHITE,
                            bgcolor: ButtonColorsEnum.DGREEN,
                            '&:hover': {
                                bgcolor: ButtonColorsEnum.LGREEN,
                            },
                        }}
                    >
                        <Link
                            style={{
                                color: MainColorsEnum.WHITE,
                                textDecoration: 'none',
                            }}
                            to={`/auction/${id}`}
                        >
                            Learn More
                        </Link>
                    </Button>
                )}
            </CardActions>
            {openLoginModal && (
                <LoginModal open={openLoginModal} onClose={handleClose} />
            )}
        </Card>
    );
};

export default AuctionCard;
