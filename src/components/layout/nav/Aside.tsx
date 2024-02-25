import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { drawerWidth } from './index';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SideBar from './sideBar/SideBar';
import useOpenUserMenu from '../../../hooks/useOpenUserMenu/useOpenUserMenu';
import useOpenModal from '../../../hooks/useOpenModal/useOpenModal';
import { useContext } from 'react';
import { Context } from '../../../index';
import RegModal from '../modals/regModal/RegModal';
import LoginModal from '../modals/loginModal/LoginModal';
import { Chip, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import GoBack from './component/goBack/GoBack';

interface ResponsiveDrawerProps {
    children: React.ReactNode;
    balance: string;
}

export default function ResponsiveDrawer({
    children,
    balance,
}: ResponsiveDrawerProps) {
    const { store } = useContext(Context);

    const handleSubmit = () => {
        store.logout();
        window.location.reload();
    };

    const token = localStorage.getItem('token');
    const isAuth = localStorage.getItem('isAuth') === 'true';

    const { handleOpenUserMenu, anchorElUser, handleCloseUserMenu } =
        useOpenUserMenu();

    const {
        openLoginModal,
        openRegistrationModal,
        handleLoginClickOpen,
        handleRegistrationClickOpen,
        handleClose,
    } = useOpenModal();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: '#040A2F',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <GoBack />
                    {isAuth && (
                        <Hidden mdUp>
                            {balance ? (
                                <Chip
                                    label={`${balance} $`}
                                    color="primary"
                                    sx={{ mr: 2 }}
                                />
                            ) : (
                                <Chip
                                    label={`Loading...`}
                                    color="primary"
                                    sx={{ mr: 2 }}
                                />
                            )}
                        </Hidden>
                    )}
                    <Hidden mdDown>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: {
                                    md: 'flex-end',
                                    sm: 'space-between',
                                },
                                width: '100%',
                            }}
                        >
                            <Box sx={{ flexGrow: 0 }}>
                                {!isAuth && (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="inherit"
                                            sx={{
                                                color: 'white',
                                                bgcolor: '#1B266B',
                                                '&:hover': {
                                                    bgcolor: '#2c3f9e',
                                                },
                                            }}
                                            onClick={handleLoginClickOpen}
                                        >
                                            Log in
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="inherit"
                                            sx={{
                                                color: 'white',
                                                bgcolor: '#1B266B',
                                                ml: 2,
                                                '&:hover': {
                                                    bgcolor: '#2c3f9e',
                                                },
                                            }}
                                            onClick={
                                                handleRegistrationClickOpen
                                            }
                                        >
                                            Registration
                                        </Button>

                                        <RegModal
                                            open={openRegistrationModal}
                                            onClose={handleClose}
                                        />
                                        <LoginModal
                                            open={openLoginModal}
                                            onClose={handleClose}
                                        />
                                    </>
                                )}

                                {isAuth && (
                                    <>
                                        {balance ? (
                                            <Chip
                                                label={`${balance} $`}
                                                color="primary"
                                                sx={{ mr: 2 }}
                                            />
                                        ) : (
                                            <Chip
                                                label={`Loading...`}
                                                color="primary"
                                                sx={{ mr: 2 }}
                                            />
                                        )}
                                        <Tooltip title="Open settings">
                                            <IconButton
                                                onClick={handleOpenUserMenu}
                                                sx={{ p: 0 }}
                                            >
                                                <Avatar
                                                    alt="Monkey King"
                                                    src="/avatar/avatar.jpg"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            <MenuItem
                                                onClick={handleCloseUserMenu}
                                            >
                                                <Typography textAlign="center">
                                                    <Link
                                                        to={`/personal-account/${token}`}
                                                        style={{
                                                            textDecoration:
                                                                'none',
                                                            color: '#000',
                                                        }}
                                                    >
                                                        My account
                                                    </Link>
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseUserMenu}
                                            >
                                                <Typography
                                                    onClick={handleSubmit}
                                                    textAlign="center"
                                                >
                                                    Log out
                                                </Typography>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            bgcolor: '#040A2F',
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    <SideBar />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Hidden mdDown>
                    <Toolbar />
                </Hidden>
                <Hidden mdUp>
                    <Toolbar />
                </Hidden>
                {children}
            </Box>
        </Box>
    );
}
