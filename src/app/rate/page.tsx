import React from 'react';
import RateForm from '../../components/pages/rate/rateForm/RateForm';
import AuctionList from '../../components/pages/rate/auctionList/AuctionList';
import useAuthCheck from '../../hooks/useAuthCheck/useAuthCheck';
import InfoAlert from '../../components/layout/common/alerts/infoAlert/InfoAlert';

const RatePage = () => {
    const { isAuth } = useAuthCheck();
    return (
        <section>
            {isAuth ? (
                <RateForm />
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
