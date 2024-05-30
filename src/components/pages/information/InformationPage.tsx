import React from 'react';
import {
    Chip,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import Box from '@mui/material/Box';
import { MainColorsEnum } from '../../../lib/colors/MainColors.enum';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import auctionFeatures from './auctionFeatures';

const InformationPage = () => {
    return (
        <>
            <Chip
                label="Information"
                variant="outlined"
                sx={{ color: MainColorsEnum.WHITE, mb: 1 }}
            />
            <Typography
                variant={'h4'}
                sx={{ color: MainColorsEnum.WHITE, mb: 2 }}
            >
                Information about this project
            </Typography>
            <Box sx={{ maxWidth: '1000px' }}>
                {auctionFeatures.map(item => (
                    <Accordion
                        key={item.key}
                        sx={{ backgroundColor: MainColorsEnum.GRAY333_01 }}
                        defaultExpanded={item.defaultExpanded}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                variant={'h6'}
                                sx={{ color: MainColorsEnum.WHITE }}
                            >
                                {item.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ color: MainColorsEnum.WHITE }}>
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
