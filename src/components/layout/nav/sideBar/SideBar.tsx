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
import { MainColorsEnum } from '../../../../lib/colors/MainColors.enum';
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
            <Toolbar sx={{ bgcolor: MainColorsEnum.GRAY333 }} />
            <Divider />
            <List>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColorsEnum.GRAY333_01 } }}
                >
                    <NavLink
                        to={'/'}
                        style={{ width: '100%' }}
                        className={({ isActive }) =>
                            [isActive ? 'active' : ''].join(' ')
                        }
                    >
                        <ListItemButton sx={{ color: MainColorsEnum.WHITE }}>
                            <ListItemIcon sx={{ color: MainColorsEnum.WHITE }}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColorsEnum.GRAY333_01 } }}
                >
                    <NavLink to={'/auction'} style={{ width: '100%' }}>
                        <ListItemButton sx={{ color: MainColorsEnum.WHITE }}>
                            <ListItemIcon sx={{ color: MainColorsEnum.WHITE }}>
                                <CurrencyBitcoinIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Place an auction'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColorsEnum.GRAY333_01 } }}
                >
                    <NavLink to={'/online-chat'} style={{ width: '100%' }}>
                        <ListItemButton sx={{ color: MainColorsEnum.WHITE }}>
                            <ListItemIcon sx={{ color: MainColorsEnum.WHITE }}>
                                <QuestionAnswerIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Online chat'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ '&:hover': { bgcolor: MainColorsEnum.GRAY333_01 } }}
                >
                    <NavLink to={'/information'} style={{ width: '100%' }}>
                        <ListItemButton sx={{ color: MainColorsEnum.WHITE }}>
                            <ListItemIcon sx={{ color: MainColorsEnum.WHITE }}>
                                <AssistantIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Information'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                {isLoggedIn &&
                    (!isLoading ? (
                        <ListItem
                            disablePadding
                            sx={{
                                '&:hover': {
                                    bgcolor: MainColorsEnum.GRAY333_01,
                                },
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
                                <ListItemButton
                                    sx={{ color: MainColorsEnum.WHITE }}
                                >
                                    <ListItemIcon
                                        sx={{ color: MainColorsEnum.WHITE }}
                                    >
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
                    ) : null)}
            </List>
        </>
    );
};

export default SideBar;
