import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { ButtonColorsEnum } from '../../../lib/colors/ButtonColors.enum';
import { Close } from '@mui/icons-material';
import CreateAuctionForm from './auctionForms/createAuction/CreateAuctionForm';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import WarningAlert from '../../layout/common/alerts/warningAlert/WarningAlert';
import AuctionList from './auctionList/AuctionList';
import { AuthContext } from '../../../lib/providers/AuthContext';
import Box from '@mui/material/Box';

const AuctionsPage = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    return (
        <section>
            {isLoggedIn ? (
                <>
                    {isFormVisible ? (
                        <>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: ButtonColorsEnum.LRED,
                                    '&:hover': {
                                        bgcolor: ButtonColorsEnum.DRED,
                                    },
                                    mb: 2,
                                }}
                                onClick={() => setIsFormVisible(false)}
                            >
                                <Close />
                            </Button>
                            <CreateAuctionForm />
                        </>
                    ) : (
                        <>
                            <Typography>
                                You can create your own auction!
                            </Typography>
                            <Typography>
                                Also you can read more about the functionality
                                on the{' '}
                                <Link to={'/information'} className={'link'}>
                                    Information page
                                </Link>
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: ButtonColorsEnum.LGREEN,
                                    '&:hover': {
                                        bgcolor: ButtonColorsEnum.DGREEN,
                                    },
                                }}
                                onClick={() => setIsFormVisible(true)}
                            >
                                Create auction
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <WarningAlert
                    title={'Why do I see this alert? - Log in, please'}
                    text={
                        'If you would like to post your auction, read more, or participate in the auction, please log in ✅'
                    }
                />
            )}
            <AuctionList />
        </section>
    );
};

export default AuctionsPage;
