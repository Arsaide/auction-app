import React, { FC } from 'react';
import OwnerDetails from './ownerDetails/OwnerDetails';

interface IOwnerVariantPersonalAccount {
    name: string;
    email: string;
    balance: string;
    avatar: string;
}

const OwnerVariantPersonalAccount: FC<IOwnerVariantPersonalAccount> = ({
    name,
    email,
    balance,
    avatar,
}) => {
    return (
        <>
            <OwnerDetails
                name={name}
                email={email}
                balance={balance}
                avatar={avatar}
            />
        </>
    );
};

export default OwnerVariantPersonalAccount;
