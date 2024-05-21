import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';

interface UserDetailsProps {
    name: string | null;
    email: string | null;
    avatar: string | null;
}

const UserDetails: FC<UserDetailsProps> = ({ name, email, avatar }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '25px',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                {name ? (
                    <>
                        <Avatar
                            alt={name || 'Loading'}
                            src={avatar || name || 'Loading'}
                            sx={{ width: 150, height: 150 }}
                        />
                    </>
                ) : (
                    <Skeleton variant={'circular'} width={150} height={150} />
                )}
            </Box>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                }}
            >
                {name ? (
                    <Typography>Nickname: {name}</Typography>
                ) : (
                    <Skeleton width={160} height={25} />
                )}
                {email ? (
                    <Typography>Email: {email}</Typography>
                ) : (
                    <Skeleton width={160} height={25} />
                )}
            </div>
        </div>
    );
};

export default UserDetails;
