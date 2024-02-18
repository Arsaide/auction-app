import React, { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const PersonalData = () => {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userPassword, setUserPassword] = useState<string | null>(null);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const password = localStorage.getItem('userPassword');
        if (email && password) {
            setUserEmail(email);
            setUserPassword(password);
        }
    }, []);
    return (
        <Box>
            {userEmail && userPassword && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 1,
                    }}
                >
                    <Typography>Nickname: None</Typography>
                    <Typography>Email: {userEmail}</Typography>
                    <Typography>Password: {userPassword}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default PersonalData;
