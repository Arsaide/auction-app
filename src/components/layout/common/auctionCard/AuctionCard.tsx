import React, {FC} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Timer from "../timer/Timer";
import {Link} from "react-router-dom";
import Divider from "@mui/material/Divider";

interface AuctionCardProps {
    img: string;
    title: string,
    desc: string,
    minRates: string,
    timeEnd: string
    id: string,
}

const AuctionCard: FC<AuctionCardProps> = ({
                                               img,
                                               title,
                                               desc,
                                               minRates,
                                               timeEnd,
                                               id,
                                           }) => {
    const isAuth = localStorage.getItem('isAuth') === 'true';

    const trimmedString = desc.length > 200 ? desc.substring(0, 200) + '...' : desc;

    return (
        <Card sx={{height: '100%', flex: '1 1 auto'}}>
            <CardMedia
                sx={{height: '400px', objectFit: 'cover', backgroundColor: 'gray'}}
                image={img}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Divider sx={{mb: 1.3}}/>
                <Typography variant="body2" color="text.secondary">
                    {trimmedString} <Link style={{color: "rgba(0, 0, 0, 0.6)"}} to={`/bet/${id}`}>learn more.</Link>
                </Typography>
                <Typography variant="h6">
                    Price: <u>{minRates}</u> $
                </Typography>
                <Divider sx={{mt: 1.3, mb: 1}}/>
                <Timer timeEnd={timeEnd}/>
            </CardContent>
            <CardActions sx={{ml: 1, mb: 1}}>
                {isAuth ? (
                    <Button size="small" variant="contained" sx={{
                            color: 'white',
                            bgcolor:"#dc3545",
                            '&:hover': {
                                bgcolor: '#c82333',
                            },
                        }}>
                        Buy
                    </Button>
                ) : (
                    <Button disabled size="small" variant="contained">
                        Buy
                    </Button>
                )}
                <Button size="small" variant="contained" sx={{
                    color: 'white',
                    bgcolor:"#32a852",
                    '&:hover': {
                        bgcolor: '#42d469',
                    },
                }}>
                    <Link style={{color: "#fff", textDecoration: 'none'}} to={`/bet/${id}`}>Learn More</Link>
                </Button>
            </CardActions>
        </Card>
    );
};

export default AuctionCard;
