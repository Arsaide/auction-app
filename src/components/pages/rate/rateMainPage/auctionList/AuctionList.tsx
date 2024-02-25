import React, { useEffect, useState } from 'react';
import { Grid, Box, Skeleton } from '@mui/material';
import AuctionCard from '../../../../layout/common/ui/auctionCard/AuctionCard';
import { API_URL } from '../../../../../api/request';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';
import { keyframes } from '@mui/system';

const spin = keyframes({
    '0%': {
        transform: 'rotate(0deg)',
    },
    '100%': {
        transform: 'rotate(360deg)',
    },
});

interface AuctionItem {
    _id: string;
    img: string;
    title: string;
    minRates: string;
    desct: string;
    timeEnd: string;
}

const AuctionList = () => {
    const [auction, setAuction] = useState<AuctionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setIsRequesting(true);

        fetch(`${API_URL}/getauction`)
            .then(res => res.json())
            .then(data => {
                setAuction(data.auction);
                setLoading(false);
                setIsRequesting(false);
            });
    }, []);

    const reloadAuctions = () => {
        setLoading(true);
        setIsRequesting(true);

        fetch(`${API_URL}/getauction`)
            .then(res => res.json())
            .then(data => {
                setAuction(data.auction);
                setLoading(false);
                setIsRequesting(false);
            });
    };

    return (
        <Box justifyContent={'center'}>
            <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
                Auction List
            </Typography>
            <Button
                disabled={isRequesting}
                variant="contained"
                onClick={reloadAuctions}
                sx={{
                    mb: 1,
                    '&:disabled': {
                        bgcolor: '#f54242',
                        color: 'white',
                    },
                }}
            >
                <CachedIcon
                    sx={{
                        animation: isRequesting
                            ? `${spin} 0.5s linear infinite`
                            : 'none',
                        pointerEvents: isRequesting ? 'none' : 'auto',
                    }}
                />
            </Button>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {loading ? (
                    <>
                        {[1, 2, 3, 4].map(index => (
                            <Grid
                                item
                                spacing={0}
                                xs={4}
                                sm={8}
                                md={6}
                                key={index}
                            >
                                <Card>
                                    <Skeleton
                                        variant="rectangular"
                                        sx={{ height: 450 }}
                                    />
                                    <CardContent>
                                        <Skeleton
                                            sx={{
                                                height: 32,
                                                marginBottom: '0.35em',
                                            }}
                                        />
                                        <Skeleton
                                            width="100%"
                                            sx={{ height: 100 }}
                                        />
                                        <Skeleton
                                            width="50%"
                                            sx={{ height: 42 }}
                                        />
                                    </CardContent>
                                    <CardActions sx={{ marginLeft: 1 }}>
                                        <Skeleton
                                            width="104px"
                                            sx={{ height: 52 }}
                                        />
                                        <Skeleton
                                            width="104px"
                                            sx={{ height: 52 }}
                                        />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </>
                ) : (
                    auction.map((card: AuctionItem) => (
                        <Grid
                            item
                            spacing={0}
                            xs={4}
                            sm={8}
                            md={6}
                            key={card._id}
                        >
                            <AuctionCard
                                img={card.img}
                                title={card.title}
                                desc={card.desct}
                                minRates={card.minRates}
                                timeEnd={card.timeEnd}
                                id={card._id}
                            />
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default AuctionList;
