import React, { FC, memo, useContext } from 'react';
import { drawerWidth } from '../../index';
import Toolbar from '@mui/material/Toolbar';
import GoBack from '../goBack/GoBack';
import { Chip, Hidden } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RegModal from '../../../modals/regModal/RegModal';
import LoginModal from '../../../modals/loginModal/LoginModal';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { Context } from '../../../../../index';
import { MainColors } from '../../../../../lib/colors/MainColors';
import { ButtonColors } from '../../../../../lib/colors/ButtonColors';

interface AppBarMenuInt {
    isAuth: boolean;
    openRegistrationModal: boolean;
    openLoginModal: boolean;
    token: string | null;
    handleClose: () => void;
    handleLoginClickOpen: () => void;
    handleRegistrationClickOpen: () => void;
    handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
    handleCloseUserMenu: () => void;
    handleSubmit: () => void;
    anchorElUser: HTMLElement | null;
}

const AppBarMenu: FC<AppBarMenuInt> = ({
    isAuth,
    handleClose,
    openRegistrationModal,
    openLoginModal,
    handleLoginClickOpen,
    handleRegistrationClickOpen,
    handleOpenUserMenu,
    anchorElUser,
    handleCloseUserMenu,
    handleSubmit,
    token,
}) => {
    const { store } = useContext(Context);
    const { name, avatar, balance } = store.user;

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                bgcolor: MainColors.GRAY333,
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
                                color="default"
                                sx={{ mr: 2, bgcolor: MainColors.WHITE }}
                            />
                        ) : (
                            <Chip
                                label={`Loading...`}
                                color="default"
                                sx={{ mr: 2, bgcolor: MainColors.WHITE }}
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
                                            bgcolor: ButtonColors.DGREEN,
                                            '&:hover': {
                                                bgcolor: ButtonColors.LGREEN,
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
                                            ml: 2,
                                            bgcolor: ButtonColors.DGREEN,
                                            '&:hover': {
                                                bgcolor: ButtonColors.LGREEN,
                                            },
                                        }}
                                        onClick={handleRegistrationClickOpen}
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
                                            color="default"
                                            sx={{
                                                mr: 2,
                                                bgcolor: MainColors.WHITE,
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            label={`Loading...`}
                                            color="default"
                                            sx={{
                                                mr: 2,
                                                bgcolor: MainColors.WHITE,
                                            }}
                                        />
                                    )}
                                    <Tooltip title="Open settings">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            <Avatar alt={name} src={avatar} />
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
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography
                                                textAlign="center"
                                                sx={{ p: 1 }}
                                            >
                                                <Link
                                                    to={`/personal-account/${token}`}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: MainColors.BLACK,
                                                    }}
                                                >
                                                    My account
                                                </Link>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography
                                                onClick={handleSubmit}
                                                sx={{ p: 1 }}
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
    );
};

export default memo(AppBarMenu);
