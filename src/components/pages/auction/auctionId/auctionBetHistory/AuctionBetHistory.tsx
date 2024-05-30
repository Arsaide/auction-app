import React, { FC, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Context } from '../../../../../index';
import { AuctionHistoryBetsUsers } from '../../../../../app/auction/auction-id/AuctionItemProps';

interface IAuctionBetHistory {
    id: string | undefined;
}

const AuctionBetHistory: FC<IAuctionBetHistory> = ({ id }) => {
    const { store } = useContext(Context);
    const [historyBets, setHistoryBets] = useState<AuctionHistoryBetsUsers[]>(
        [],
    );

    const fetchData = async () => {
        try {
            const response = await store.getHistoryAuctionBets(id);
            setHistoryBets(response.data.ListUser);
        } catch (error) {
            console.error('Error fetching auction:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <Box>
            <Typography>Bet history</Typography>
            <ul>
                {historyBets.map(item => (
                    <>
                        <li key={item.id}>User id: {item.id}</li>
                        <li key={item.id}>User name: {item.user}</li>
                        <li key={item.id}>User sum: {item.sum}</li>
                        <li key={item.id}>User time: {item.time}</li>
                    </>
                ))}
            </ul>
        </Box>
    );
};

export default AuctionBetHistory;
