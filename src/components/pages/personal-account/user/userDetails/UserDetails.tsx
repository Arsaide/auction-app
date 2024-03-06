import React, { FC } from 'react';
import { UserIdInt } from '../../../../../app/personal-account/user-id/UserInterface';
import Typography from '@mui/material/Typography';

const UserDetails: FC<{ user: UserIdInt }> = ({ user }) => {
    return (
        <>
            <Typography>Nickname: {user && user.name}</Typography>
            <Typography>Email: {user && user.email}</Typography>
            <Typography>Balance: {user && user.balance} $</Typography>
        </>
    );
};

export default UserDetails;
