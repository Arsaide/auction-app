import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
import PlaceIcon from '@mui/icons-material/Place';

const UserAboutMe = () => {
    return (
        <Box>
            <Typography>
                <InfoIcon /> About me:{' '}
            </Typography>
            <Typography>
                <LanguageIcon /> My website:{' '}
            </Typography>
            <Typography>
                <PlaceIcon /> Place of residence:{' '}
            </Typography>
        </Box>
    );
};

export default UserAboutMe;
