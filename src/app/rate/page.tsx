import React from 'react';
import CreateRateForm from '../../components/pages/rate/rateForm/createAuction/CreateRateForm';
import AuctionList from '../../components/pages/rate/auctionList/AuctionList';
import useAuthCheck from '../../hooks/useAuthCheck/useAuthCheck';
import InfoAlert from '../../components/layout/common/alerts/infoAlert/InfoAlert';

const RatePage = () => {
    const { isAuth } = useAuthCheck();
    return (
        <section>
            {isAuth ? (
                <CreateRateForm />
            ) : (
                <InfoAlert
                    title={'Why do I see this alert? - Log in, please'}
                    text={
                        'If you would like to post your auction, read more, or participate in the auction, please log in ✅'
                    }
                />
            )}
            <AuctionList />
        </section>
    );
};

export default RatePage;
