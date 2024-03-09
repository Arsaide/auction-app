import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

interface UserDetailsProps {
    name: string;
    email: string;
    balance: string;
}

const UserDetails: FC<UserDetailsProps> = ({ name, email, balance }) => {
    return (
        <>
            <Typography>Nickname: {name}</Typography>
            <Typography>Email: {email}</Typography>
            <Typography>Balance: {balance} $</Typography>
        </>
    );
};

export default UserDetails;
