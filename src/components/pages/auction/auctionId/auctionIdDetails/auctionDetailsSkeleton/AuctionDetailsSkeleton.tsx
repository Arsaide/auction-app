import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const AuctionDetailsSkeleton = () => {
    return (
        <Grid item sx={{ width: '650px' }}>
            <Skeleton
                variant="rectangular"
                sx={{
                    bgcolor: 'grey.700',
                }}
                width={650}
                height={750}
            />
        </Grid>
    );
};

export default AuctionDetailsSkeleton;
