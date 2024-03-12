import React, { memo } from 'react';
import CreateAuctionForm from '../../components/pages/auction/auctionForms/createAuction/CreateAuctionForm';
import AuctionList from '../../components/pages/auction/auctionList/AuctionList';
import useAuthCheck from '../../hooks/useAuthCheck/useAuthCheck';
import InfoAlert from '../../components/layout/common/alerts/infoAlert/InfoAlert';
import WarningAlert from '../../components/layout/common/alerts/warningAlert/WarningAlert';

const AuctionPage = () => {
    const { isAuth } = useAuthCheck();
    return (
        <section>
            {isAuth ? (
                <CreateAuctionForm />
            ) : (
                <WarningAlert
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

export default memo(AuctionPage);
