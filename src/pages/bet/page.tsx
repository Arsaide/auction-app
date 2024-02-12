import React from 'react';
import BetForm from "../../components/pages/bet/betForm/BetForm";
import AuctionList from "../../components/pages/bet/auctionList/AuctionList";

const BetPage = () => {
    const isAuth = localStorage.getItem('isAuth') === 'true';

    return (
        <section>
            {isAuth && (
                <BetForm/>
            )}
            <AuctionList/>
        </section>
    );
};

export default BetPage;
