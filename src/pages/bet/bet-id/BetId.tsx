import { useParams } from 'react-router-dom';
import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from "@mui/material";
import Timer from "../../../components/layout/common/timer/Timer";

interface AuctionItem {
    _id: string;
    img: string;
    title: string;
    minRates: string;
    rates: string;
    desct: string;
    active: boolean;
    state: boolean;
    owner: string;
    timeStart: string;
    timeEnd: string;
}

const theme = createTheme({
    palette: {
        success: {
            main: '#7dc738',
        },
    },
});

const BetId: FC  = () => {
    const {store} = useContext(Context);
    const {id} = useParams<{ id: string }>();
    const [auction, setAuction] = useState<AuctionItem | null>(null);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await store.getauctionone(id);
                console.log(response);
                setAuction(response.data.auction as unknown as AuctionItem);
            } catch (error) {
                console.error('Error fetching auction:', error);
            }
        };

        fetchAuction();

    }, [id]);

    console.log(auction)

    if (!auction) {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress size={120} color="success" />
                </Box>
            </ThemeProvider>
        );
    }

    return (
        <div>
            <h1>ID: {id}</h1>
            <img src={auction.img} alt="Preview" style={{ maxWidth: '200px', marginTop: '1rem' }} />
            <p>Image link: {auction && auction.img}</p>
            <h3>Active: {auction && (auction.active).toString()}</h3>
            <h3>Title: {auction && auction.title}</h3>
            <h3>Description: {auction && auction.desct}</h3>
            <h3>Min rates: {auction && auction.minRates}</h3>
            <h3>Rates: {auction && auction.rates}</h3>
            <h3>Owner: {auction && auction.owner}</h3>
            <h3>State: {auction && (auction.state).toString()}</h3>
            <h3>Owner: {auction && auction.timeStart}</h3>
            <h3>timeEnd: {auction && auction.timeEnd}</h3>
            <Timer timeEnd={auction.timeEnd}/>
        </div>
    );
};

export { BetId };
