import React from 'react';
import BetForm from '../../components/pages/rate/rateMainPage/rateForm/BetForm';
import AuctionList from '../../components/pages/rate/rateMainPage/auctionList/AuctionList';
import useAuthCheck from '../../hooks/useAuthCheck/useAuthCheck';
import InfoAlert from '../../components/layout/common/alerts/infoAlert/InfoAlert';

const BetPage = () => {
    const { isAuth } = useAuthCheck();

    return (
        <section>
            {isAuth ? (
                <BetForm />
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

export default BetPage;
