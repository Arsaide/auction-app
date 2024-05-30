import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { MainColorsEnum } from '../../../../lib/colors/MainColors.enum';

interface IChangePasswordWindow {
    children: React.ReactNode;
}

const ChangePasswordWindow: FC<IChangePasswordWindow> = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 112px)',
            }}
        >
            <Box
                sx={{
                    backgroundColor: MainColorsEnum.GRAY808,
                    padding: 4,
                    borderRadius: '4px',
                    maxWidth: '400px',
                    width: '100%',
                    boxShadow:
                        '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default ChangePasswordWindow;
