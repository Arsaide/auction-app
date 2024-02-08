import React from 'react';

const useOpenModal = () => {
    const [openLoginModal, setOpenLoginModal] = React.useState(false);
    const [openRegistrationModal, setOpenRegistrationModal] = React.useState(false);

    const handleLoginClickOpen = () => {
        setOpenLoginModal(true);
    };

    const handleRegistrationClickOpen = () => {
        setOpenRegistrationModal(true);
    };

    const handleClose = () => {
        setOpenLoginModal(false);
        setOpenRegistrationModal(false);
    };

    return {
        openLoginModal,
        openRegistrationModal,
        handleLoginClickOpen,
        handleRegistrationClickOpen,
        handleClose,
    };
};

export default useOpenModal;
