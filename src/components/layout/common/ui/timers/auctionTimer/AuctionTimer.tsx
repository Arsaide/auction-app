import React, { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

interface AuctionTimerInterface {
    timeEnd: string;
    onAuctionEnd: () => void;
}

const AuctionTimer: FC<AuctionTimerInterface> = ({ timeEnd, onAuctionEnd }) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [timeExpired, setTimeExpired] = useState<boolean>(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const endTime = new Date(timeEnd).getTime();
            const timeLeft = endTime - now;

            setTimeRemaining(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(intervalId);
                setTimeExpired(true);
                onAuctionEnd();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeEnd, onAuctionEnd]);

    const formatTime = (time: number): string => {
        if (time <= 0) return '00:00:00:00';

        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const seconds = Math.floor((time / 1000) % 60);

        return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            {timeExpired ? (
                <Typography sx={{ fontSize: 23 }}>
                    Auction finished: 00:00:00:00
                </Typography>
            ) : (
                <Typography sx={{ fontSize: 23 }}>
                    Time left: {formatTime(timeRemaining)}
                </Typography>
            )}
        </div>
    );
};

export default AuctionTimer;
