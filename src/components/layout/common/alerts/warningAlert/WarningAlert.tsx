import React, { FC } from 'react';
import { Alert, AlertTitle, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface AlertInterface {
    text: string;
    title: string;
}

const theme = createTheme({
    components: {
        MuiAlert: {
            styleOverrides: {
                icon: {
                    fontSize: `clamp(40px, 5vw, 55px)`,
                },
            },
        },
    },
});

const WarningAlert: FC<AlertInterface> = ({ title, text }) => {
    return (
        <ThemeProvider theme={theme}>
            <Alert severity="warning" variant="filled">
                <AlertTitle sx={{ fontSize: `clamp(27px, 2.3vw, 40px)` }}>
                    {title}
                </AlertTitle>
                <Typography sx={{ fontSize: `clamp(0.93rem, 2.3vw, 1rem)` }}>
                    {text}
                </Typography>
            </Alert>
        </ThemeProvider>
    );
};

export default WarningAlert;
