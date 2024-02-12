import React, {useEffect, useState} from 'react';
import {Grid, Box, Skeleton} from "@mui/material";
import AuctionCard from "../../../layout/common/auctionCard/AuctionCard";
import {API_URL} from "../../../../api/request";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";

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

    useEffect(() => {
        fetch(`${API_URL}/getauction`)
            .then(res => res.json())
            .then(data => setAuction(data.auction))
    }, []);

    return (
        <Box justifyContent={'center'}>
            <Typography variant='h3' sx={{mb: 2, textAlign: 'center'}}>Auction List</Typography>
            <Grid
                container
                spacing={{xs: 2, md: 3}}
                columns={{xs: 4, sm: 8, md: 12}}>

                {auction.length === 0 ? (
                    <>
                        {[1, 2, 3, 4].map((index) => (
                            <Grid
                                item
                                spacing={0}
                                xs={4} sm={8} md={6} key={index}
                            >
                                <Card>
                                    <Skeleton variant="rectangular" sx={{height: 400}}/>
                                    <CardContent>
                                        <Skeleton sx={{height: 32, marginBottom: '0.35em'}}/>
                                        <Skeleton width="100%" sx={{height: 100}}/>
                                        <Skeleton width="50%" sx={{height: 42}}/>
                                    </CardContent>
                                    <CardActions sx={{marginLeft: 1}}>
                                        <Skeleton width="104px" sx={{height: 52}}/>
                                        <Skeleton width="104px" sx={{height: 52}}/>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </>
                ) : (
                    auction.map((card: AuctionItem) => (
                        <Grid item spacing={0} xs={4} sm={8} md={6} key={card._id}>
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
    )
        ;
};

export default AuctionList;