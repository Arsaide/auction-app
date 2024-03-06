import React, { FC } from 'react';
import { AuctionInt } from '../../../../../app/rate/rate-id/AuctionItemInt';

const OwnAuctionsList: FC<{ auctions: AuctionInt[] }> = ({ auctions }) => {
    return (
        <>
            Own Auctions:
            <ul>
                {auctions.map(item => (
                    <li key={item._id}>
                        <a href={`/rate/${item._id}`}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default OwnAuctionsList;
