import React, { useEffect, useState } from 'react';
import { Box, Grid, Pagination, ThemeProvider } from '@mui/material';
import AuctionCard from './components/auctionCard/AuctionCard';
import { API_URL } from '../../../../api/request';
import Typography from '@mui/material/Typography';
import AuctionListSkeleton from './components/auctionListSkeleton/AuctionListSkeleton';
import AuctionReloadButton from './components/AuctionReloadButton/AuctionReloadButton';
import Button from '@mui/material/Button';
import usePagination from '../../../../hooks/usePagination/usePagination';
import { pagintaionStyles } from './pagination.styles';
import { ButtonColors } from '../../../../lib/colors/ButtonColors';

interface AuctionItem {
    _id: string;
    img: string;
    title: string;
    minRates: string;
    rates: string;
    desct: string;
    timeStart: string;
    timeEnd: string;
    active: boolean;
}

const AuctionList = () => {
    const { currentPage, handlePageChange, auctionsPerPage } = usePagination();
    const [auction, setAuction] = useState<AuctionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = () => {
        setLoading(true);
        setIsRequesting(true);

        fetch(`${API_URL}/getauction`)
            .then(res => res.json())
            .then(data => {
                setAuction(data.auction);
                setLoading(false);
                setIsRequesting(false);
            })
            .catch(error => {
                console.error('Error fetching auction data:', error);
                setLoading(false);
                setIsRequesting(false);
            });
    };

    const reloadAuctions = () => {
        fetchData();
    };

    const expiredAuctions = auction.filter(
        item => new Date(item.timeEnd) < new Date(),
    );
    const activeAuctions = auction
        .filter(item => new Date(item.timeEnd) >= new Date())
        .reverse();

    const sortedAuctions = [...activeAuctions, ...expiredAuctions];

    const indexOfLastAuction = currentPage * auctionsPerPage;
    const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
    const currentAuctions = sortedAuctions.slice(
        indexOfFirstAuction,
        indexOfLastAuction,
    );

    return (
        <ThemeProvider theme={pagintaionStyles}>
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
                    <Button
                        sx={{
                            color: ButtonColors.LGREEN,
                            '&:hover': {
                                color: ButtonColors.DGREEN,
                            },
                        }}
                    >
                        1
                    </Button>
                    <Button
                        sx={{
                            color: ButtonColors.LGREEN,
                            '&:hover': {
                                color: ButtonColors.DGREEN,
                            },
                        }}
                    >
                        2
                    </Button>
                    <Button
                        sx={{
                            color: ButtonColors.LGREEN,
                            '&:hover': {
                                color: ButtonColors.DGREEN,
                            },
                        }}
                    >
                        3
                    </Button>
                </Box>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 2, sm: 8, md: 12 }}
                >
                    {loading ? (
                        <>
                            {[...Array(auctionsPerPage)].map((_, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <AuctionListSkeleton />
                                </Grid>
                            ))}
                        </>
                    ) : (
                        <>
                            {currentAuctions.map((auction: AuctionItem) => (
                                <Grid
                                    item
                                    xs={2}
                                    sm={4}
                                    md={4}
                                    key={auction._id}
                                >
                                    <AuctionCard
                                        img={auction.img}
                                        title={auction.title}
                                        desc={auction.desct}
                                        minRates={auction.minRates}
                                        rates={auction.rates}
                                        timeStart={auction.timeStart}
                                        timeEnd={auction.timeEnd}
                                        active={auction.active}
                                        id={auction._id}
                                    />
                                </Grid>
                            ))}
                        </>
                    )}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={Math.ceil(auction.length / auctionsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        shape="rounded"
                    />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default AuctionList;
