import { useParams } from 'react-router-dom';
import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from "@mui/material";

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

const PersonalAccount: FC  = () => {
    const {store} = useContext(Context);
    const {id} = useParams<{ id: string }>();
    const [auction, setAuction] = useState<AuctionItem | null>(null);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                // const response = await store.getauctionone(id);
                // setAuction(response.data.auction as unknown as AuctionItem);
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

        </div>
    );
};

export { PersonalAccount };
