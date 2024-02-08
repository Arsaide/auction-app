import React from 'react';

const useOpenUserMenu = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return {
        handleOpenUserMenu,
        anchorElUser,
        handleCloseUserMenu
    }
};

export default useOpenUserMenu;
