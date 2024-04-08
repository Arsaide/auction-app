import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddUserAvatarForm from '../userForms/addUserAvatarForm/AddUserAvatarForm';
import Box from '@mui/material/Box';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Modal,
    Skeleton,
} from '@mui/material';

interface UserDetailsProps {
    name: string | null;
    email: string | null;
    balance: string | null;
    avatar: string | null;
}

const UserDetails: FC<UserDetailsProps> = ({
    name,
    email,
    balance,
    avatar,
}) => {
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
                {avatar ? (
                    <>
                        <Avatar
                            alt={name || 'Loading'}
                            src={avatar || name || 'Loading'}
                            sx={{ width: 150, height: 150 }}
                        />
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
                    </>
                ) : (
                    <Skeleton variant={'circular'} width={150} height={150} />
                )}
            </Box>
            <Dialog
                sx={{}}
                id="menu-appbar"
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                aria-labelledby={'form-dialog-title'}
            >
                <DialogTitle
                    id={'form-dialog-title'}
                    sx={{ bgcolor: '#595858', color: 'white', pl: 3 }}
                >
                    Form
                </DialogTitle>
                <DialogContent sx={{ bgcolor: '#595858' }}>
                    <AddUserAvatarForm />
                </DialogContent>
            </Dialog>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                }}
            >
                {name ? (
                    <Typography>Nickname: {name}</Typography>
                ) : (
                    <Skeleton width={160} height={25} />
                )}
                {email ? (
                    <Typography>Email: {email}</Typography>
                ) : (
                    <Skeleton width={160} height={25} />
                )}
                {balance ? (
                    <Typography>Balance: {balance} $</Typography>
                ) : (
                    <Skeleton width={160} height={25} />
                )}
            </div>
        </div>
    );
};

export default UserDetails;
