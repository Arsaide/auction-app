import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

interface UserDetailsProps {
    name: string;
    email: string;
    balance: string;
}

const UserDetails: FC<UserDetailsProps> = ({ name, email, balance }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '25px',
                alignItems: 'center',
            }}
        >
            <Avatar alt={name} src={name} sx={{ width: 86, height: 86 }} />
            <div>
                <Typography>Nickname: {name}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Balance: {balance} $</Typography>
            </div>
        </div>
    );
};

export default UserDetails;
