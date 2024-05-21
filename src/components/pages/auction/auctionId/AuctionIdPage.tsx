import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../index';
import { useParams } from 'react-router-dom';
import { AuctionInt } from '../../../../app/auction/auction-id/AuctionItemProps';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuctionDetails from './auctionIdDetails/AuctionDetails';
import AuctionInformation from './auctionIdInformation/AuctionInformation';
import AuctionIdPageSkeleton from './auctionIdPageSkeleton/AuctionIdPageSkeleton';
import WarningAlert from '../../../layout/common/alerts/warningAlert/WarningAlert';

const AuctionIdPage: FC = () => {
    const { store } = useContext(Context);
    const { id } = useParams<{ id: string }>();
    const [auction, setAuction] = useState<AuctionInt | null>(null);
    const [owner, setOwner] = useState<boolean>(false);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        setIsRequesting(true);
        setLoading(true);
        try {
            const response = await store.getOneAuction(id);
            setAuction(response.data.auction as unknown as AuctionInt);
            setAvatar(response.data.avatar);
            setIsRequesting(false);
            setLoading(false);

            if (response.data.stateOwner) {
                setOwner(true);
            } else {
                setOwner(false);
            }
        } catch (error) {
            console.error('Error fetching auction:', error);
            setIsRequesting(true);
            setLoading(true);
        }
        setIsRequesting(false);
        setLoading(false);
    };

    const reloadAuction = () => {
        fetchData();
    };

    if (loading) {
        return (
            <>
                <AuctionIdPageSkeleton />
            </>
        );
    }

    if (!auction) {
        return (
            <>
                <WarningAlert
                    text={'There is no such auction'}
                    title={'404 Not Found'}
                />
            </>
        );
    }

    return (
        <div>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '30px',
                    borderBottom: '1px solid white',
                    pb: 1,
                    mb: 2,
                }}
            >
                {auction && auction.title}
            </Typography>
            <Grid container justifyContent="flex-start" sx={{ gap: 6 }}>
                <AuctionDetails auction={auction} />
                <AuctionInformation
                    auction={auction}
                    owner={owner}
                    reloadAuction={reloadAuction}
                    isRequesting={isRequesting}
                    id={id}
                    avatar={avatar}
                />
            </Grid>
        </div>
    );
};

export default AuctionIdPage;
