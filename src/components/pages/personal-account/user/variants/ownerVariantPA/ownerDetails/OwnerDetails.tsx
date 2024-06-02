import React, { FC, useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import { Dialog, DialogContent, DialogTitle, Skeleton } from '@mui/material';
import { MainColorsEnum } from '../../../../../../../lib/colors/MainColors.enum';
import AddUserAvatarForm from '../../../userForms/addUserAvatarForm/AddUserAvatarForm';

interface OwnerDetailsProps {
    name: string | null;
    email: string | null;
    balance: number | null;
    avatar: string | null;
}

const OwnerDetails: FC<OwnerDetailsProps> = ({
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
                {name ? (
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
                id="menu-appbar"
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                aria-labelledby={'form-dialog-title'}
            >
                <DialogTitle
                    id={'form-dialog-title'}
                    sx={{
                        bgcolor: MainColorsEnum.GRAY595,
                        color: MainColorsEnum.WHITE,
                        pl: 3,
                    }}
                >
                    Upload image
                </DialogTitle>
                <DialogContent sx={{ bgcolor: MainColorsEnum.GRAY595 }}>
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
                {balance || balance == 0 ? (
                    <Typography>
                        Balance:{' '}
                        <span style={{ color: MainColorsEnum.GREEN }}>
                            {balance.toLocaleString('de-DE', {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </span>
                    </Typography>
                ) : (
                    <Skeleton width={160} height={25} />
                )}
            </div>
        </div>
    );
};

export default OwnerDetails;
