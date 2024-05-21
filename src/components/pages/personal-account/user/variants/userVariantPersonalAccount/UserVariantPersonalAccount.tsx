import React, { FC } from 'react';
import UserDetails from './userDetails/UserDetails';

interface IUserVariantPersonalAccount {
    name: string;
    email: string;
    avatar: string;
}

const UserVariantPersonalAccount: FC<IUserVariantPersonalAccount> = ({
    name,
    email,
    avatar,
}) => {
    return (
        <>
            <UserDetails name={name} email={email} avatar={avatar} />
        </>
    );
};

export default UserVariantPersonalAccount;
