import React, { FC, memo, useContext } from 'react';
import { drawerWidth } from '../../index';
import Toolbar from '@mui/material/Toolbar';
import GoBack from '../goBack/GoBack';
import { Chip, Hidden, LinearProgress } from '@mui/material';
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
import { MainColorsEnum } from '../../../../../lib/colors/MainColors.enum';
import { ButtonColorsEnum } from '../../../../../lib/colors/ButtonColors.enum';
import { AuthContext } from '../../../../../lib/providers/AuthContext';

interface AppBarMenuInt {
    openRegistrationModal: boolean;
    openLoginModal: boolean;
    handleClose: () => void;
    handleLoginClickOpen: () => void;
    handleRegistrationClickOpen: () => void;
    handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
    handleCloseUserMenu: () => void;
    anchorElUser: HTMLElement | null;
}

const AppBarMenu: FC<AppBarMenuInt> = ({
    handleClose,
    openRegistrationModal,
    openLoginModal,
    handleLoginClickOpen,
    handleRegistrationClickOpen,
    handleOpenUserMenu,
    anchorElUser,
    handleCloseUserMenu,
}) => {
    const { store } = useContext(Context);
    const { setIsLoggedIn, isLoggedIn, isLoading } = useContext(AuthContext);
    const { name, avatar, balance, id } = store.user || {};

    const handleLogOutSubmit = () => {
        store.logout().then(() => setIsLoggedIn(false));
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                bgcolor: MainColorsEnum.GRAY333,
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <GoBack />
                {isLoggedIn && (
                    <Hidden mdUp>
                        {balance ? (
                            <Chip
                                label={`${balance} $`}
                                color="default"
                                sx={{ mr: 2, bgcolor: MainColorsEnum.WHITE }}
                            />
                        ) : (
                            <Chip
                                label={`Loading...`}
                                color="default"
                                sx={{ mr: 2, bgcolor: MainColorsEnum.WHITE }}
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
                            {!isLoggedIn && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        sx={{
                                            color: 'white',
                                            bgcolor: ButtonColorsEnum.DGREEN,
                                            '&:hover': {
                                                bgcolor:
                                                    ButtonColorsEnum.LGREEN,
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
                                            bgcolor: ButtonColorsEnum.DGREEN,
                                            '&:hover': {
                                                bgcolor:
                                                    ButtonColorsEnum.LGREEN,
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

                            {isLoggedIn && (
                                <>
                                    {balance ? (
                                        <Chip
                                            label={`${balance} $`}
                                            color="default"
                                            sx={{
                                                mr: 2,
                                                bgcolor: MainColorsEnum.WHITE,
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            label={`Loading...`}
                                            color="default"
                                            sx={{
                                                mr: 2,
                                                bgcolor: MainColorsEnum.WHITE,
                                            }}
                                        />
                                    )}
                                    <Tooltip title="Open menu">
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
                                                    to={
                                                        isLoading
                                                            ? `/personal-account`
                                                            : `/personal-account/${id}`
                                                    }
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: MainColorsEnum.BLACK,
                                                    }}
                                                >
                                                    My account
                                                </Link>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography
                                                onClick={handleLogOutSubmit}
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
            {isLoggedIn
                ? isLoading && (
                      <LinearProgress
                          sx={{
                              bgcolor: 'white',
                              '& .MuiLinearProgress-bar': {
                                  backgroundColor: MainColorsEnum.GREEN,
                              },
                          }}
                      />
                  )
                : null}
        </AppBar>
    );
};

export default memo(AppBarMenu);
