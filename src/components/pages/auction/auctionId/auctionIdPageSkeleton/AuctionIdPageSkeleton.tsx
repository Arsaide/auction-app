import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import AuctionInformationSkeleton from '../auctionIdInformation/auctionInformationSkeleton/AuctionInformationSkeleton';
import AuctionDetailsSkeleton from '../auctionIdDetails/auctionDetailsSkeleton/AuctionDetailsSkeleton';

const AuctionIdPageSkeleton = () => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: '1px solid white',
                    marginBottom: '16px',
                }}
            >
                <Skeleton
                    variant="text"
                    sx={{
                        bgcolor: 'grey.700',
                    }}
                    height={50}
                    width={550}
                />
            </div>
            <Grid container justifyContent="flex-start" sx={{ gap: 6 }}>
                <AuctionDetailsSkeleton />
                <AuctionInformationSkeleton />
            </Grid>
        </div>
    );
};

export default AuctionIdPageSkeleton;
