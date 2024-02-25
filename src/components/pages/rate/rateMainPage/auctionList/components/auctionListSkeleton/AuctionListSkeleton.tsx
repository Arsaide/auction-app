import React from 'react';
import Card from '@mui/material/Card';
import { Skeleton } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const AuctionListSkeleton = () => {
    return (
        <>
            <Card>
                <Skeleton variant="rectangular" sx={{ height: 450 }} />
                <CardContent>
                    <Skeleton
                        sx={{
                            height: 32,
                            marginBottom: '0.35em',
                        }}
                    />
                    <Skeleton width="100%" sx={{ height: 100 }} />
                    <Skeleton width="50%" sx={{ height: 42 }} />
                </CardContent>
                <CardActions sx={{ marginLeft: 1 }}>
                    <Skeleton width="104px" sx={{ height: 52 }} />
                    <Skeleton width="104px" sx={{ height: 52 }} />
                </CardActions>
            </Card>
        </>
    );
};

export default AuctionListSkeleton;
