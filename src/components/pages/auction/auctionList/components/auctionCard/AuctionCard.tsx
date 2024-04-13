import React, { FC } from 'react';
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
import { ButtonColors } from '../../../../../../lib/Colors/ButtonColors';
import { MainColors } from '../../../../../../lib/Colors/MainColors';

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
                        <VerifiedIcon
                            sx={{ color: ButtonColors.LGREEN, fontSize: 45 }}
                        />
                    ) : (
                        <CancelIcon
                            sx={{ color: ButtonColors.LRED, fontSize: 45 }}
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
                    {trimmedString}
                    {desc.length > 200 &&
                        (!isAuth ? (
                            <u>
                                <span
                                    style={{
                                        color: MainColors.BLACK_06,
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleLearnMoreClick}
                                >
                                    read more
                                </span>
                            </u>
                        ) : (
                            <Link
                                style={{ color: MainColors.BLACK_06 }}
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
                            color: MainColors.WHITE,
                            bgcolor: ButtonColors.LRED,
                            '&:hover': {
                                bgcolor: ButtonColors.DRED,
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
                            color: MainColors.WHITE,
                            bgcolor: ButtonColors.DGREEN,
                            '&:hover': {
                                bgcolor: ButtonColors.LGREEN,
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
                            color: MainColors.WHITE,
                            bgcolor: ButtonColors.DGREEN,
                            '&:hover': {
                                bgcolor: ButtonColors.LGREEN,
                            },
                        }}
                    >
                        <Link
                            style={{
                                color: MainColors.WHITE,
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
