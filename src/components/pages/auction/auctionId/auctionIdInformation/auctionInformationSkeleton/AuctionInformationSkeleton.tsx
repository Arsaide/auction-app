import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const AuctionInformationSkeleton = () => {
    return (
        <Grid item xs={12} sm={10} md={8} lg={5}>
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
                />
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={46}
                />
            </div>
            <div style={{ borderBottom: '1px solid white' }}>
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={33}
                />
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={46}
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
