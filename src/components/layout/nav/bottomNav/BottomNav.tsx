import React, { memo, useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssistantIcon from '@mui/icons-material/Assistant';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import useAuthCheck from '../../../../hooks/useAuthCheck/useAuthCheck';
import { Link } from 'react-router-dom';
import { useLocation, NavLink } from 'react-router-dom';

const BottomNav = () => {
    const { isAuth } = useAuthCheck();
    const [value, setValue] = useState(0);
    const location = useLocation();

    const token = localStorage.getItem('token');

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
                backgroundColor: '#333',
            }}
        >
            <BottomNavigationAction
                label={'Info'}
                to={'/information'}
                component={NavLink}
                icon={
                    <AssistantIcon
                        sx={{ color: value === 0 ? 'white' : 'grey' }}
                    />
                }
                sx={{
                    color: value === 3 ? 'grey' : 'white',
                    '& .MuiBottomNavigationAction-label': {
                        color: value === 3 ? 'grey' : 'white',
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
                        sx={{ color: value === 1 ? 'white' : 'grey' }}
                    />
                }
                sx={{
                    color: value === 3 ? 'grey' : 'white',
                    '& .MuiBottomNavigationAction-label': {
                        color: value === 3 ? 'grey' : 'white',
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
                    <HomeIcon sx={{ color: value === 2 ? 'white' : 'grey' }} />
                }
                sx={{
                    color: value === 3 ? 'grey' : 'white',
                    '& .MuiBottomNavigationAction-label': {
                        color: value === 3 ? 'grey' : 'white',
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
                        sx={{ color: value === 3 ? 'white' : 'grey' }}
                    />
                }
                sx={{
                    color: value === 3 ? 'grey' : 'white',
                    '& .MuiBottomNavigationAction-label': {
                        color: value === 3 ? 'grey' : 'white',
                    },
                }}
            >
                <span>Chat</span>
            </BottomNavigationAction>
            {isAuth ? (
                <BottomNavigationAction
                    to={`/personal-account/${token}`}
                    component={NavLink}
                    icon={
                        <IconButton sx={{ p: 0 }}>
                            <Avatar
                                alt="Monkey King"
                                src="/avatar/avatar.jpg"
                            />
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
                            sx={{ color: value === 4 ? 'white' : 'grey' }}
                        />
                    }
                    sx={{
                        color: value === 3 ? 'grey' : 'white',
                        '& .MuiBottomNavigationAction-label': {
                            color: value === 3 ? 'grey' : 'white',
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
