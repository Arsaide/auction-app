import React, { memo, useContext, useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssistantIcon from '@mui/icons-material/Assistant';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useLocation, NavLink } from 'react-router-dom';
import { Context } from '../../../../index';
import { MainColors } from '../../../../lib/colors/MainColors';
import { AuthContext } from '../../../../lib/providers/AuthContext';

const BottomNav = () => {
    const { store } = useContext(Context);
    const { name, avatar, id } = store.user;
    const { isLoggedIn } = useContext(AuthContext);
    const [value, setValue] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        const values = [
            '/information',
            '/auction',
            '/',
            '/online-chat',
            '/personal-account',
        ];
        if (path.startsWith('/auction/')) {
            setValue(1);
        } else if (path.startsWith('/personal-account/')) {
            setValue(4);
        } else {
            const index = values.indexOf(path);
            setValue(index > -1 ? index : 0);
        }
    }, [location]);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                backgroundColor: MainColors.GRAY333,
            }}
        >
            <BottomNavigationAction
                label={'Info'}
                to={'/information'}
                component={NavLink}
                icon={
                    <AssistantIcon
                        sx={{
                            color:
                                value === 0
                                    ? MainColors.WHITE
                                    : MainColors.GRAY808,
                        }}
                    />
                }
                sx={{
                    color: value === 3 ? MainColors.GRAY808 : MainColors.WHITE,
                    '& .MuiBottomNavigationAction-label': {
                        color:
                            value === 3 ? MainColors.GRAY808 : MainColors.WHITE,
                    },
                }}
            >
                <span>Info</span>
            </BottomNavigationAction>
            <BottomNavigationAction
                label={'Auctions'}
                to={'/auction'}
                component={NavLink}
                icon={
                    <CurrencyBitcoinIcon
                        sx={{
                            color:
                                value === 1
                                    ? MainColors.WHITE
                                    : MainColors.GRAY808,
                        }}
                    />
                }
                sx={{
                    color: value === 3 ? MainColors.GRAY808 : MainColors.WHITE,
                    '& .MuiBottomNavigationAction-label': {
                        color:
                            value === 3 ? MainColors.GRAY808 : MainColors.WHITE,
                    },
                }}
            >
                <span>Rate</span>
            </BottomNavigationAction>
            <BottomNavigationAction
                label={'Home'}
                to={'/'}
                component={NavLink}
                icon={
                    <HomeIcon
                        sx={{
                            color:
                                value === 2
                                    ? MainColors.WHITE
                                    : MainColors.GRAY808,
                        }}
                    />
                }
                sx={{
                    color: value === 3 ? MainColors.GRAY808 : MainColors.WHITE,
                    '& .MuiBottomNavigationAction-label': {
                        color:
                            value === 3 ? MainColors.GRAY808 : MainColors.WHITE,
                    },
                }}
            >
                <span>Home</span>
            </BottomNavigationAction>
            <BottomNavigationAction
                label={'Chat'}
                to={'/online-chat'}
                component={NavLink}
                icon={
                    <QuestionAnswerIcon
                        sx={{
                            color:
                                value === 3
                                    ? MainColors.WHITE
                                    : MainColors.GRAY808,
                        }}
                    />
                }
                sx={{
                    color: value === 3 ? MainColors.GRAY808 : MainColors.WHITE,
                    '& .MuiBottomNavigationAction-label': {
                        color:
                            value === 3 ? MainColors.GRAY808 : MainColors.WHITE,
                    },
                }}
            >
                <span>Chat</span>
            </BottomNavigationAction>
            {isLoggedIn ? (
                <BottomNavigationAction
                    to={`/personal-account/${id}`}
                    component={NavLink}
                    icon={
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt={name} src={avatar} />
                        </IconButton>
                    }
                >
                    <span>Profile</span>
                </BottomNavigationAction>
            ) : (
                <BottomNavigationAction
                    label={'Login'}
                    to={'/personal-account'}
                    component={NavLink}
                    icon={
                        <AccountCircleIcon
                            sx={{
                                color:
                                    value === 4
                                        ? MainColors.WHITE
                                        : MainColors.GRAY808,
                            }}
                        />
                    }
                    sx={{
                        color:
                            value === 3 ? MainColors.GRAY808 : MainColors.WHITE,
                        '& .MuiBottomNavigationAction-label': {
                            color:
                                value === 3
                                    ? MainColors.GRAY808
                                    : MainColors.WHITE,
                        },
                    }}
                >
                    <span>Login</span>
                </BottomNavigationAction>
            )}
        </BottomNavigation>
    );
};

export default memo(BottomNav);
