import { useState } from 'react';

const useDrawerState = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return {
        mobileOpen,
        handleDrawerClose,
        handleDrawerTransitionEnd,
        handleDrawerToggle,
    };
};

export default useDrawerState;
