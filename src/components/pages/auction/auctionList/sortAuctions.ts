import { AuctionInt } from '../../../../app/auction/auction-id/AuctionItemProps';

export function sortAuctions(auctions: AuctionInt[]): AuctionInt[] {
    const expiredAuctions = auctions.filter(
        item => new Date(item.timeEnd) < new Date(),
    );
    const activeAuctions = auctions
        .filter(item => new Date(item.timeEnd) >= new Date())
        .reverse();

    return [...activeAuctions, ...expiredAuctions];
}
