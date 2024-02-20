import React from 'react';
import { Hidden } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Hidden mdUp>
            <KeyboardBackspaceIcon
                onClick={goBack}
                sx={{ fontSize: 40, '&:hover ': { opacity: '0.6' } }}
            />
        </Hidden>
    );
};

export default GoBack;
