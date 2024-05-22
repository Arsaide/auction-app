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
import { useContext } from 'react';
import { Context } from '../../../../index';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../../../lib/providers/AuthContext';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
    const { store } = useContext(Context);
    const { name, avatar, id } = store.user;
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    return (
        <>
            <Toolbar sx={{ bgcolor: MainColors.GRAY333 }} />
            <Divider />
            <List>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColors.GRAY333_01 } }}
                >
                    <NavLink
                        to={'/'}
                        style={{ width: '100%' }}
                        className={({ isActive }) =>
                            [isActive ? 'active' : ''].join(' ')
                        }
                    >
                        <ListItemButton sx={{ color: MainColors.WHITE }}>
                            <ListItemIcon sx={{ color: MainColors.WHITE }}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColors.GRAY333_01 } }}
                >
                    <NavLink to={'/auction'} style={{ width: '100%' }}>
                        <ListItemButton sx={{ color: MainColors.WHITE }}>
                            <ListItemIcon sx={{ color: MainColors.WHITE }}>
                                <CurrencyBitcoinIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Place an auction'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColors.GRAY333_01 } }}
                >
                    <NavLink to={'/online-chat'} style={{ width: '100%' }}>
                        <ListItemButton sx={{ color: MainColors.WHITE }}>
                            <ListItemIcon sx={{ color: MainColors.WHITE }}>
                                <QuestionAnswerIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Online chat'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColors.GRAY333_01 } }}
                >
                    <NavLink to={'/information'} style={{ width: '100%' }}>
                        <ListItemButton sx={{ color: MainColors.WHITE }}>
                            <ListItemIcon sx={{ color: MainColors.WHITE }}>
                                <AssistantIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Information'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                {isLoggedIn && (
                    <ListItem
                        disablePadding
                        sx={{
                            '&:hover': { bgcolor: MainColors.GRAY333_01 },
                            borderTop: 1,
                            borderColor: 'divider',
                            mt: 4,
                        }}
                    >
                        <NavLink
                            to={
                                isLoading
                                    ? `/personal-account`
                                    : `/personal-account/${id}`
                            }
                            style={{ width: '100%' }}
                        >
                            <ListItemButton sx={{ color: MainColors.WHITE }}>
                                <ListItemIcon sx={{ color: MainColors.WHITE }}>
                                    <Avatar
                                        sx={{ width: 24, height: 24 }}
                                        alt={name}
                                        src={`${avatar}`}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={`${name || 'Personal'} account`}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                )}
            </List>
        </>
    );
};

export default SideBar;
