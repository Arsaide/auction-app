import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const AuctionInformationSkeleton = () => {
    return (
        <Grid item sx={{}}>
            <div style={{ borderBottom: '1px solid white' }}>
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={33}
                />
            </div>
            <div style={{ borderBottom: '1px solid white' }}>
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={250}
                />
            </div>
            <div style={{ borderBottom: '1px solid white' }}>
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={46}
                    width={670}
                />
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={46}
                    width={670}
                />
            </div>
            <div style={{ borderBottom: '1px solid white' }}>
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={33}
                    width={670}
                />
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={46}
                    width={670}
                />
            </div>
            <div>
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={50}
                    width={250}
                />
            </div>
        </Grid>
    );
};

export default AuctionInformationSkeleton;
