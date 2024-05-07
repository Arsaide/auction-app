import * as React from 'react';
import Divider from '@mui/material/Divider';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AssistantIcon from '@mui/icons-material/Assistant';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { MainColors } from '../../../../lib/colors/MainColors';

const SideBar = () => {
    return (
        <>
            <Toolbar sx={{ bgcolor: MainColors.GRAY333 }} />
            <Divider />
            <List>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColors.GRAY333_01 } }}
                >
                    <ListItemButton href="/" sx={{ color: MainColors.WHITE }}>
                        <ListItemIcon sx={{ color: MainColors.WHITE }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColors.GRAY333_01 } }}
                >
                    <ListItemButton
                        href="/auction"
                        sx={{ color: MainColors.WHITE }}
                    >
                        <ListItemIcon sx={{ color: MainColors.WHITE }}>
                            <CurrencyBitcoinIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Place an auction'} />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColors.GRAY333_01 } }}
                >
                    <ListItemButton
                        href="/online-chat"
                        sx={{ color: MainColors.WHITE }}
                    >
                        <ListItemIcon sx={{ color: MainColors.WHITE }}>
                            <QuestionAnswerIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Online chat'} />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColors.GRAY333_01 } }}
                >
                    <ListItemButton
                        href="/information"
                        sx={{ color: MainColors.WHITE }}
                    >
                        <ListItemIcon sx={{ color: MainColors.WHITE }}>
                            <AssistantIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Information'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );
};

export default SideBar;
