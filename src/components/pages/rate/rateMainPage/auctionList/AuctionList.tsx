import React, { FC, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import AuctionCard from '../../../../layout/common/ui/auctionCard/AuctionCard';
import { API_URL } from '../../../../../api/request';
import Typography from '@mui/material/Typography';
import AuctionListSkeleton from './components/auctionListSkeleton/AuctionListSkeleton';
import AuctionReloadButton from './components/AuctionReloadButton/AuctionReloadButton';
import Button from '@mui/material/Button';

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

    const expiredAuctions = auction.filter(
        item => new Date(item.timeEnd) < new Date(),
    );
    const activeAuctions = auction.filter(
        item => new Date(item.timeEnd) >= new Date(),
    );

    return (
        <Box justifyContent={'center'}>
            <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
                Auction List
            </Typography>
            <Box sx={{ mb: 1 }}>
                <AuctionReloadButton
                    disabled={isRequesting}
                    onClick={reloadAuctions}
                    isRequesting={isRequesting}
                />
                <Button>1</Button>
                <Button>1</Button>
                <Button>1</Button>
            </Box>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 8, md: 12 }}
            >
                {loading ? (
                    <>
                        {[1, 2, 3, 4, 5, 6].map(index => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <AuctionListSkeleton />
                            </Grid>
                        ))}
                    </>
                ) : (
                    <>
                        {activeAuctions
                            .slice()
                            .reverse()
                            .map((card: AuctionItem) => (
                                <Grid item xs={2} sm={4} md={4} key={card._id}>
                                    <AuctionCard
                                        img={card.img}
                                        title={card.title}
                                        desc={card.desct}
                                        minRates={card.minRates}
                                        timeEnd={card.timeEnd}
                                        id={card._id}
                                    />
                                </Grid>
                            ))}
                        {expiredAuctions
                            .slice()
                            .reverse()
                            .map((card: AuctionItem) => (
                                <Grid item xs={2} sm={4} md={4} key={card._id}>
                                    <AuctionCard
                                        img={card.img}
                                        title={card.title}
                                        desc={card.desct}
                                        minRates={card.minRates}
                                        timeEnd={card.timeEnd}
                                        id={card._id}
                                    />
                                </Grid>
                            ))}
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default AuctionList;
