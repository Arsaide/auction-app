import React, {FC} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Timer from "../timer/Timer";
import {Link} from "react-router-dom";

interface AuctionCardProps {
    img: string;
    title: string,
    desc: string,
    minRates: string,
    rates: string,
    timeEnd: string
    id: string,
}

const AuctionCard: FC<AuctionCardProps> = ({
                                               img,
                                               title,
                                               desc,
                                               minRates,
                                               rates,
                                               timeEnd,
                                               id,
                                           }) => {
    return (
        <Card sx={{height: '100%', flex: '1 1 auto'}}>
            <CardMedia
                sx={{height: '400px', objectFit: 'cover', backgroundColor: 'gray'}}
                // image="/avatar/avatar.jpg"
                image={img}
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
                <Timer timeEnd={timeEnd}/>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small"><Link to={`/bet/${id}`}>Learn More</Link></Button>
            </CardActions>
        </Card>
    );
};

export default AuctionCard;
