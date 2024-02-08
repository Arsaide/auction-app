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

const SideBar = () => {
    return (
        <>
            <Toolbar/>
            <Divider/>
            <List>

                <ListItem disablePadding>
                    <ListItemButton href='/'>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Home'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href='/bet'>
                        <ListItemIcon>
                            <CurrencyBitcoinIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Place a bet'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href='/online-chat'>
                        <ListItemIcon>
                            <QuestionAnswerIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Online chat'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href='/information'>
                        <ListItemIcon>
                            <AssistantIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Information'}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );
};

export default SideBar;
