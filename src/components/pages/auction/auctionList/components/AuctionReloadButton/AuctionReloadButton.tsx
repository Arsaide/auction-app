import React, { FC } from 'react';
import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';
import { keyframes } from '@mui/system';
import { ButtonColors } from '../../../../../../lib/colors/ButtonColors';

interface ReloadButtonInt {
    disabled: boolean;
    onClick: () => void;
    isRequesting: boolean;
}

const spin = keyframes({
    '0%': {
        transform: 'rotate(360deg)',
    },
    '100%': {
        transform: 'rotate(0deg)',
    },
});

const AuctionReloadButton: FC<ReloadButtonInt> = ({
    disabled,
    onClick,
    isRequesting,
}) => {
    return (
        <Button
            disabled={disabled}
            variant="contained"
            onClick={onClick}
            sx={{
                bgcolor: ButtonColors.DGREEN,
                '&:hover': {
                    bgcolor: ButtonColors.LGREEN,
                },
                '&:disabled': {
                    bgcolor: ButtonColors.LRED,
                    color: ButtonColors.WHITE,
                },
            }}
        >
            <CachedIcon
                sx={{
                    animation: isRequesting
                        ? `${spin} 0.5s linear infinite`
                        : 'none',
                    pointerEvents: isRequesting ? 'none' : 'auto',
                }}
            />
        </Button>
    );
};

export default AuctionReloadButton;
