import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { drawerWidth } from './index';
import Drawer from '@mui/material/Drawer';
import SideBar from './sideBar/SideBar';
import useOpenUserMenu from '../../../hooks/useOpenUserMenu/useOpenUserMenu';
import useOpenModal from '../../../hooks/useOpenModal/useOpenModal';
import { memo, useContext } from 'react';
import { Context } from '../../../index';
import { Hidden } from '@mui/material';
import AppBarMenu from './component/appBarMenu/AppBarMenu';
import { MainColors } from '../../../lib/colors/MainColors';

interface ResponsiveDrawerProps {
    children: React.ReactNode;
    balance: string;
}

function NavBar({ children, balance }: ResponsiveDrawerProps) {
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
            <AppBarMenu
                isAuth={isAuth}
                openRegistrationModal={openRegistrationModal}
                openLoginModal={openLoginModal}
                balance={balance}
                token={token}
                handleClose={handleClose}
                handleLoginClickOpen={handleLoginClickOpen}
                handleRegistrationClickOpen={handleRegistrationClickOpen}
                handleOpenUserMenu={handleOpenUserMenu}
                handleCloseUserMenu={handleCloseUserMenu}
                handleSubmit={handleSubmit}
                anchorElUser={anchorElUser}
            />
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            bgcolor: MainColors.GRAY333,
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

export default NavBar;
