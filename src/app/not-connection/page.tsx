import React from 'react';
import WarningAlert from '../../components/layout/common/alerts/warningAlert/WarningAlert';
import { Box } from '@mui/material';

const NotConnection = () => {
    return (
        <>
            <WarningAlert text={'Page not found'} title={'404'} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    src="/gifs/fail.gif"
                    alt="Error"
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                        marginTop: '20px',
                    }}
                />
            </Box>
        </>
    );
};

export default NotConnection;
