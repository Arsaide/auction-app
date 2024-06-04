import React, {
    FC,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Context } from '../../../../index';
import { useParams } from 'react-router-dom';
import { AuctionInt } from '../../../../app/auction/auction-id/AuctionItemProps';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuctionDetails from './auctionIdDetails/AuctionDetails';
import AuctionInformation from './auctionIdInformation/AuctionInformation';
import AuctionIdPageSkeleton from './auctionIdPageSkeleton/AuctionIdPageSkeleton';
import WarningAlert from '../../../layout/common/alerts/warningAlert/WarningAlert';
import AuctionBetHistory from './auctionBetHistory/AuctionBetHistory';
import { AuthContext } from '../../../../lib/providers/AuthContext';
import NotAuth from '../../../../app/not-auth/page';
import { toast } from 'react-toastify';

const AuctionIdPage: FC = () => {
    const { store } = useContext(Context);
    const { id } = useParams<{ id: string }>();
    const { isLoggedIn } = useContext(AuthContext);

    const [auction, setAuction] = useState<AuctionInt | null>(null);
    const [owner, setOwner] = useState<boolean>(false);
    const [isRequesting, setIsRequesting] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [avatar, setAvatar] = useState<string>('');
    const [userBet, setUserBet] = useState<number | null>(null);
    const isRequest = useRef<boolean>(false);

    useEffect(() => {
        if (!isRequest.current) {
            isRequest.current = true;
            fetchData();
        }
    }, [id]);

    const fetchData = useCallback(async () => {
        try {
            const response = await store.getOneAuction(id);
            setAuction(response.data.auction as unknown as AuctionInt);
            setAvatar(response.data.avatar);

            if (response.data.stateOwner) {
                setOwner(true);
            } else {
                setOwner(false);
                setUserBet(response.data.UserBid.sum);
            }
        } catch (error: any) {
            console.error('Error fetching auction:', error);
            toast.error(error.message);
        } finally {
            setIsRequesting(false);
            setLoading(false);
        }
    }, [id, store]);

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
                {isLoggedIn ? (
                    <WarningAlert
                        text={'There is no such auction'}
                        title={'404 Not Found'}
                    />
                ) : (
                    <NotAuth id={id} request={fetchData} />
                )}
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
                    reloadAuction={fetchData}
                    isRequesting={isRequesting}
                    id={id}
                    avatar={avatar}
                    userBet={userBet}
                />
            </Grid>
            <AuctionBetHistory id={id} />
        </div>
    );
};

export default AuctionIdPage;
