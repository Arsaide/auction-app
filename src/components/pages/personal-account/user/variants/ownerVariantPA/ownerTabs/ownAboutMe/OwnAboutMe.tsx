import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
import PlaceIcon from '@mui/icons-material/Place';

const OwnAboutMe = () => {
    return (
        <Box>
            MY PAGE
            <Typography sx={{ mb: 2 }}>
                <InfoIcon /> About me: <br />
                <u>
                    <i>There is no description of functionality yet</i>
                </u>{' '}
                <br />
                We are a team of two developers of this application.
                <br />
                Kirill - Arsaide (Front-End) <br />
                Artem - Talafarael (BackEnd)
            </Typography>
            <Typography sx={{ mb: 2 }}>
                <LanguageIcon /> My website: <br />
                <u>
                    <i>There is no description of functionality yet</i>
                </u>{' '}
                <br />
                Arsaide -{' '}
                <a
                    href={'https://github.com/Arsaide'}
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>{' '}
                <br />
                Talafarael -{' '}
                <a
                    href={'https://github.com/talafarael'}
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>{' '}
                <br />
                FrontEnd -{' '}
                <a
                    href={'https://github.com/Arsaide/auction-app'}
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>{' '}
                <br />
                BackEnd -{' '}
                <a
                    href={'https://github.com/talafarael/ilineirosBeckTestTask'}
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>{' '}
            </Typography>
            <Typography>
                <PlaceIcon /> Place of residence: <br />
                <u>
                    <i>There is no description of functionality yet</i>
                </u>{' '}
                <br />
                Kiev
            </Typography>
        </Box>
    );
};

export default OwnAboutMe;
