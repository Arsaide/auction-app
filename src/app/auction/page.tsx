import React, { memo } from 'react';
import '../../components/pages/auction/AuctionPage.css';
import AuctionsPage from '../../components/pages/auction/AuctionsPage';

const AuctionPage = () => {
    return (
        <>
            <AuctionsPage />
        </>
    );
};

export default memo(AuctionPage);
