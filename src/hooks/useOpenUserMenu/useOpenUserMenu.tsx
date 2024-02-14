import React, { useState } from 'react';

const useOpenUserMenu = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return {
        handleOpenUserMenu,
        anchorElUser,
        handleCloseUserMenu,
    };
};

export default useOpenUserMenu;
