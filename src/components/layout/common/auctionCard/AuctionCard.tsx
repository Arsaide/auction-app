import React, {FC} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Timer from "../timer/Timer";

interface AuctionCardProps {
    title: string,
    desc: string,
    minRates: string,
    rates: string,
    endDate: string[]
}

const AuctionCard: FC<AuctionCardProps> = ({title, desc, minRates, rates, endDate}) => {
    return (
        <Card sx={{height: '100%', flex: '1 1 auto'}}>
            <CardMedia
                sx={{height: '400px', objectFit: 'cover'}}
                image="/avatar/avatar.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {desc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {rates}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {minRates}
                </Typography>
                <Timer endDate={endDate}/>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default AuctionCard;
