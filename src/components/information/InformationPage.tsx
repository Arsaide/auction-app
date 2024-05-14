import React from 'react';
import {
    Chip,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import Box from '@mui/material/Box';
import { MainColors } from '../../lib/colors/MainColors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import auctionFeatures from './auctionFeatures';

const InformationPage = () => {
    return (
        <>
            <Chip
                label="Information"
                variant="outlined"
                sx={{ color: MainColors.WHITE, mb: 1 }}
            />
            <Typography variant={'h4'} sx={{ color: MainColors.WHITE, mb: 2 }}>
                Information about this project
            </Typography>
            <Box sx={{ maxWidth: '1000px' }}>
                {auctionFeatures.map(item => (
                    <Accordion
                        key={item.key}
                        sx={{ backgroundColor: MainColors.GRAY333_01 }}
                        defaultExpanded={item.defaultExpanded}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                variant={'h6'}
                                sx={{ color: MainColors.WHITE }}
                            >
                                {item.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ color: MainColors.WHITE }}>
                                {item.description}
                                <br />
                                {item.functionality}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </>
    );
};

export default InformationPage;
