import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Pagination, ThemeProvider } from '@mui/material';
import AuctionCard from './components/auctionCard/AuctionCard';
import { API_URL } from '../../../../api/request';
import Typography from '@mui/material/Typography';
import AuctionListSkeleton from './components/auctionListSkeleton/AuctionListSkeleton';
import AuctionReloadButton from './components/AuctionReloadButton/AuctionReloadButton';
import usePagination from '../../../../hooks/usePagination/usePagination';
import { pagintaionStyles } from './pagination.styles';
import AuctionSearch from './components/auctionSearch/AuctionSearch';
import { sortAuctions } from './sortAuctions';
import { AuctionInt } from '../../../../app/auction/auction-id/AuctionItemProps';

const AuctionList = () => {
    const { currentPage, handlePageChange, auctionsPerPage } = usePagination();
    const [auction, setAuction] = useState<AuctionInt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = useCallback(() => {
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
    }, []);

    const handleSearchResult = (searchResult: AuctionInt[]) => {
        if (searchResult.length > 0) {
            setAuction(searchResult);
        } else {
            fetchData();
        }
    };

    const reloadAuctions = () => {
        fetchData();
    };

    const sortedAuctions = sortAuctions(auction);

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
                    <AuctionSearch onSearch={handleSearchResult} />
                    <AuctionReloadButton
                        disabled={isRequesting}
                        onClick={reloadAuctions}
                        isRequesting={isRequesting}
                    />
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
                            {currentAuctions.map((auction: AuctionInt) => (
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
                                        owner={auction.owner}
                                        ownerId={auction.ownerId}
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
