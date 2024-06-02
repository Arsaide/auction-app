import React, { FC, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Chip, Typography } from '@mui/material';
import { Context } from '../../../../../index';
import { AuctionHistoryBetsUsers } from '../../../../../app/auction/auction-id/AuctionItemProps';
import { Link } from 'react-router-dom';
import { MainColorsEnum } from '../../../../../lib/colors/MainColors.enum';
import Avatar from '@mui/material/Avatar';
import { formattedDateTime } from '../formatedDateTime';
import './AuctionBetHistory.css';

interface IAuctionBetHistory {
    id: string | undefined;
}

const AuctionBetHistory: FC<IAuctionBetHistory> = ({ id }) => {
    const { store } = useContext(Context);
    const [historyBets, setHistoryBets] = useState<AuctionHistoryBetsUsers[]>(
        [],
    );
    const [firstAppearance, setFirstAppearance] = useState<{
        [userId: string]: boolean;
    }>({});

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

    useEffect(() => {
        const appearance: { [userId: string]: boolean } = {};
        historyBets.forEach(item => {
            if (!appearance[item.id]) {
                appearance[item.id] = true;
            }
        });

        setFirstAppearance(appearance);
    }, [historyBets]);

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant={'h5'}>Bet history:</Typography>
            <ul className={'historyList'}>
                {historyBets.map((item, index) => (
                    <li key={item.id} className={'historyListItem'}>
                        <div className={'historyIndex'}>{index + 1}</div>
                        <div className={'historyLink item'}>
                            <Link
                                to={`/personal-account/${item.id}`}
                                style={{ color: MainColorsEnum.WHITE }}
                            >
                                <Chip
                                    avatar={
                                        <Avatar
                                            alt={`${item.user} avatar`}
                                            src={`${item.avatar}`}
                                        />
                                    }
                                    label={item.user}
                                    variant="outlined"
                                    sx={{
                                        color: MainColorsEnum.WHITE,
                                        '&:hover': {
                                            opacity: '.85',
                                            cursor: 'pointer',
                                        },
                                    }}
                                />
                            </Link>
                        </div>
                        <div className={'historyInfo item'}>
                            <div className={'historySum'}>
                                {firstAppearance[item.id] ? (
                                    <>
                                        User bet:{' '}
                                        <span
                                            style={{
                                                color: MainColorsEnum.GREEN,
                                            }}
                                        >
                                            {item.sum.toLocaleString('de-DE', {
                                                style: 'currency',
                                                currency: 'USD',
                                            })}
                                        </span>{' '}
                                    </>
                                ) : (
                                    <>
                                        User added bet:
                                        <span
                                            style={{
                                                color: MainColorsEnum.GREEN,
                                            }}
                                        >
                                            +{' '}
                                            {item.sum.toLocaleString('de-DE', {
                                                style: 'currency',
                                                currency: 'USD',
                                            })}
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className={'historyDate item'}>
                                Time: {formattedDateTime(item.time)}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default AuctionBetHistory;
