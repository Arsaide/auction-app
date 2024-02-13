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
            <Toolbar sx={{ bgcolor: "#040A2F" }} />
            <Divider />
            <List>
                <ListItem disablePadding sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
                    <ListItemButton href='/' sx={{ color: '#fff' }}>
                        <ListItemIcon sx={{ color: '#fff' }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
                    <ListItemButton href='/bet' sx={{ color: '#fff' }}>
                        <ListItemIcon sx={{ color: '#fff' }}>
                            <CurrencyBitcoinIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Place a bet'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
                    <ListItemButton href='/online-chat' sx={{ color: '#fff' }}>
                        <ListItemIcon sx={{ color: '#fff' }}>
                            <QuestionAnswerIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Online chat'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
                    <ListItemButton href='/information' sx={{ color: '#fff' }}>
                        <ListItemIcon sx={{ color: '#fff' }}>
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
