export interface AuctionInt {
    _id: string;
    img: string;
    title: string;
    minRates: string;
    rates: string;
    desct: string;
    active: boolean;
    state: boolean;
    owner: string;
    timeStart: string;
    timeEnd: string;
}

export interface OwnAuctionInt {
    auctions: AuctionInt[];
}
