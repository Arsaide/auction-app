import React from 'react';
import BetForm from "../../components/pages/bet/betForm/BetForm";
import AuctionList from "../../components/pages/bet/auctionList/AuctionList";

const BetPage = () => {
    return (
        <section>
            <BetForm/>
            <AuctionList/>
        </section>
    );
};

export default BetPage;
