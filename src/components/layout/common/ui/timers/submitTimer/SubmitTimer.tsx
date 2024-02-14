import React, { FC, useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";

interface SubmitTimerInterface {
    nextSubmitTime: number;
}

const SubmitTimer: FC<SubmitTimerInterface> = ({ nextSubmitTime }) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [timerExpired, setTimerExpired] = useState<boolean>(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = Date.now();
            const timeLeft = nextSubmitTime - now;

            if (timeLeft <= 0) {
                clearInterval(intervalId);
                setTimeRemaining(0);
                setTimerExpired(true); // Устанавливаем флаг времени истекшим, когда таймер завершается
            } else {
                setTimeRemaining(timeLeft);
            }
        }, 1000);

        return () => clearInterval(intervalId); // Чистим интервал при размонтировании компонента
    }, [nextSubmitTime]);

    const formatTime = (time: number): string => {
        if (time <= 0) return '00:00';

        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const seconds = Math.floor((time / 1000) % 60);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        <Typography>
            {!timerExpired && (
                // Отображаем таймер, только если время еще не истекло
                <>
                    Please wait until the next request is sent <u>{formatTime(timeRemaining)}</u>
                </>
            )}
        </Typography>
    );
};

export default SubmitTimer;
