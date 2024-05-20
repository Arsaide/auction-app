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
    ownerId: string;
    timeStart: string;
    timeEnd: string;
}

export interface OwnAuctionInt {
    auctions: AuctionInt[];
}

export interface ListOfBets {
    auctions: AuctionInt[];
}
