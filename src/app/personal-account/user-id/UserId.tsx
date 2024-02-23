import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../index';
import { useParams } from 'react-router-dom';

interface UserIdInt {
    email: string;
    balance: string;
    bidAuction: [string];
    ownAuction: [string];
}

const UserId: FC = () => {
    const { store } = useContext(Context);
    const { token } = useParams<{ token: string }>();
    const [accoundInfo, setAccoundInfo] = useState<UserIdInt | null>(null);

    useEffect(() => {
        const fetchAccount = async () => {
            const response = await store.getUser(token);
            console.log(response);
            setAccoundInfo(response.data.user as unknown as UserIdInt);
        };
        fetchAccount();
    }, [token]);

    return (
        <div>
            <p>{accoundInfo && accoundInfo.email}</p>
            <p>{accoundInfo && accoundInfo.balance}</p>
        </div>
    );
};

export { UserId };
