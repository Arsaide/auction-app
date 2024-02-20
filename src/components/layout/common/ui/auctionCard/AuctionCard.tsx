import React, { FC, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuctionTimer from '../timers/auctionTimer/AuctionTimer';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import useOpenModal from '../../../../../hooks/useOpenModal/useOpenModal';
import LoginModal from '../../../modals/loginModal/LoginModal';
import useAuthCheck from '../../../../../hooks/useAuthCheck/useAuthCheck';
import LazyLoadImage from '../../lazyLoadImage/LazyLoadImage';

interface AuctionCardProps {
    img: string;
    title: string;
    desc: string;
    minRates: string;
    timeEnd: string;
    id: string;
}

const AuctionCard: FC<AuctionCardProps> = ({
    img,
    title,
    desc,
    minRates,
    timeEnd,
    id,
}) => {
    const { openLoginModal, handleLoginClickOpen, handleClose } =
        useOpenModal();
    const { isAuth } = useAuthCheck();
    const [auctionEnded, setAuctionEnded] = useState<boolean>(false);

    const handleLearnMoreClick = () => {
        if (!isAuth) {
            handleLoginClickOpen();
        }
    };

    const trimmedString =
        desc.length > 200 ? desc.substring(0, 200) + '...' : desc;

    return (
        <Card
            sx={{
                height: '100%',
                flex: '1 1 auto',
                opacity: auctionEnded ? 0.5 : 1,
            }}
        >
            <CardMedia>
                <LazyLoadImage src={img} w={'100%'} h={'450px'} alt={'title'} />
            </CardMedia>
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ filter: auctionEnded ? 'blur(0.1rem)' : 'none' }}
                >
                    {title}
                </Typography>
                <Divider sx={{ mb: 1.3 }} />
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ filter: auctionEnded ? 'blur(0.1rem)' : 'none' }}
                >
                    {trimmedString}
                    {desc.length > 200 &&
                        !auctionEnded &&
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
                                to={`/rate/${id}`}
                            >
                                read more
                            </Link>
                        ))}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{ filter: auctionEnded ? 'blur(0.1rem)' : 'none' }}
                >
                    Price: <u>{minRates}</u> $
                </Typography>
                <Divider sx={{ mt: 1.3, mb: 1 }} />
                <AuctionTimer
                    timeEnd={timeEnd}
                    onAuctionEnd={() => setAuctionEnded(true)}
                />
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
                        disabled={auctionEnded}
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
                        disabled={auctionEnded}
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
                        disabled={auctionEnded}
                    >
                        <Link
                            style={{ color: '#fff', textDecoration: 'none' }}
                            to={`/rate/${id}`}
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
