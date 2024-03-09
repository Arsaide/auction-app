import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const AuctionDetailsSkeleton = () => {
    return (
        <Grid item xs={13} sm={12} md={13} lg={5}>
            <Skeleton
                variant="rectangular"
                sx={{
                    bgcolor: 'grey.700',
                }}
                height={750}
            />
        </Grid>
    );
};

export default AuctionDetailsSkeleton;
