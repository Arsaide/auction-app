import React from 'react';
import {Grid, Box} from "@mui/material";
import AuctionCard from "../../../layout/common/auctionCard/AuctionCard";

const auction = [
    {
        id: '1',
        title: 'Mega title',
        desc: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        endDate: ["2024-02-10T15:16:00.809Z"],
        minRates: "100",
        rates: "1200",
    },
    {
        id: '2',
        title: 'Mega title',
        desc: 'Often a card allow users to interact with the entirety of its surface to trigger its main action, be it an expansion, a link to another screen or some other behavior. The action area of the card can be specified by wrapping its contents in a CardActionArea component.',
        endDate: ["2024-02-11T15:16:00.809Z"],
        minRates: "1423",
        rates: "14324",
    },
    {
        id: '3',
        title: 'Mega title',
        desc: 'A card can also offer supplemental actions which should stand detached from the main action area in order to avoid event overlap',
        endDate: ["2024-02-12T15:16:00.809Z"],
        minRates: "121",
        rates: "1624",
    },
    {
        id: '4',
        title: 'Mega title',
        desc: 'Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the cards an example of a media control card.',
        endDate: ["2024-03-10T15:16:00.809Z"],
        minRates: "523",
        rates: "1123",
    },
    {
        id: '5',
        title: 'Mega title',
        desc: 'See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.',
        endDate: ["2024-02-11T19:16:00.809Z"],
        minRates: "1532",
        rates: "1123125",
    },
    {
        id: '6',
        title: 'Mega title',
        desc: 'See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.',
        endDate: ["2024-02-15T01:16:00.809Z"],
        minRates: "1532",
        rates: "1123125",
    },
    {
        id: '7',
        title: 'Mega title',
        desc: 'See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.',
        endDate: ["2024-02-10T15:16:00.809Z"],
        minRates: "1532",
        rates: "1123125",
    },
    {
        id: '8',
        title: 'Mega title',
        desc: 'See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.',
        endDate: ["2024-02-10T15:16:00.809Z"],
        minRates: "1532",
        rates: "1123125",
    },
    {
        id: '9',
        title: 'Mega title',
        desc: 'See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.',
        endDate: ["2024-02-10T15:16:00.809Z"],
        minRates: "1532",
        rates: "1123125",
    },
]

const AuctionList = () => {
    return (
        <Box justifyContent={'center'}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}>
                {auction.map((card) => (
                    <Grid
                        item
                        spacing={0}
                        xs={2} sm={4} md={4} key={card.id}
                    >
                        <AuctionCard
                            title={card.title}
                            desc={card.desc}
                            minRates={card.minRates}
                            rates={card.rates}
                            endDate={card.endDate}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AuctionList;
