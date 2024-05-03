export const calculateMinBet = (initialBet: number): number => {
    if (initialBet < 1000) {
        return parseFloat((initialBet + initialBet * 0.1).toFixed(2));
    } else if (initialBet >= 1000 && initialBet < 10000) {
        return parseFloat((initialBet + initialBet * 0.05).toFixed(2));
    } else if (initialBet >= 10000 && initialBet < 100000) {
        return parseFloat((initialBet + initialBet * 0.03).toFixed(2));
    } else {
        return parseFloat((initialBet + initialBet * 0.015).toFixed(2));
    }
};
