import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddUserAvatarForm from '../userForms/addUserAvatarForm/AddUserAvatarForm';
import Box from '@mui/material/Box';

interface UserDetailsProps {
    name: string;
    email: string;
    balance: string;
}

const UserDetails: FC<UserDetailsProps> = ({ name, email, balance }) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '25px',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                <Avatar alt={name} src={name} sx={{ width: 86, height: 86 }} />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        textAlign: 'center',
                        width: '100%',
                        height: '25px',
                        fontSize: 16,
                        backgroundColor: 'rgba(51, 51, 51, 0.7)',
                    }}
                    onClick={handleOpenUserMenu}
                >
                    Edit
                </Box>
            </Box>
            <Menu
                sx={{ mt: '25px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem>
                    <AddUserAvatarForm />
                </MenuItem>
            </Menu>

            <div>
                <Typography>Nickname: {name}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Balance: {balance} $</Typography>
            </div>
        </div>
    );
};

export default UserDetails;
