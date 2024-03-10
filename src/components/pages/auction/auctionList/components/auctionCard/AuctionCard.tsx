import React, { FC, useState } from 'react';
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
import useAuthCheck from '../../../../../../hooks/useAuthCheck/useAuthCheck';
import LazyLoadImage from '../../../../../layout/common/lazyLoadImage/LazyLoadImage';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/material';

interface AuctionCardProps {
    img: string;
    title: string;
    desc: string;
    minRates: string;
    timeStart: string;
    timeEnd: string;
    id: string;
    active: boolean;
}

const AuctionCard: FC<AuctionCardProps> = ({
    img,
    title,
    desc,
    minRates,
    timeStart,
    timeEnd,
    id,
    active,
}) => {
    const { openLoginModal, handleLoginClickOpen, handleClose } =
        useOpenModal();
    const { isAuth } = useAuthCheck();
    const handleLearnMoreClick = () => {
        if (!isAuth) {
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
                        <VerifiedIcon sx={{ color: '#7dc738', fontSize: 45 }} />
                    ) : (
                        <CancelIcon sx={{ color: '#f54242', fontSize: 45 }} />
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
                    {trimmedString}
                    {desc.length > 200 &&
                        (!isAuth ? (
                            <u>
                                <span
                                    style={{
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleLearnMoreClick}
                                >
                                    read more
                                </span>
                            </u>
                        ) : (
                            <Link
                                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                to={`/auction/${id}`}
                            >
                                read more
                            </Link>
                        ))}
                </Typography>

                <Typography variant="h6">
                    Price: <u>{minRates}</u> $
                </Typography>
                <Divider sx={{ mt: 1.3, mb: 1 }} />
                <Typography>Created: {formatedTimeStart}</Typography>
                <AuctionTimer timeEnd={timeEnd} />
            </CardContent>
            <CardActions sx={{ ml: 1, mb: 1 }}>
                {isAuth ? (
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            color: 'white',
                            bgcolor: '#dc3545',
                            '&:hover': {
                                bgcolor: '#c82333',
                            },
                        }}
                        disabled={!active}
                    >
                        Buy
                    </Button>
                ) : (
                    <Button disabled size="small" variant="contained">
                        Buy
                    </Button>
                )}
                {!isAuth && (
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            color: 'white',
                            bgcolor: '#32a852',
                            '&:hover': {
                                bgcolor: '#42d469',
                            },
                        }}
                        onClick={handleLearnMoreClick}
                        disabled={!active}
                    >
                        Learn More
                    </Button>
                )}
                {isAuth && (
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            color: 'white',
                            bgcolor: '#32a852',
                            '&:hover': {
                                bgcolor: '#42d469',
                            },
                        }}
                    >
                        <Link
                            style={{ color: '#fff', textDecoration: 'none' }}
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
