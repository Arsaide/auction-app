import React from 'react';
import './global.scss';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/layout/nav/NavBar';
import HomePage from './home/page';
import AuctionPage from './auction/page';
import OnlineChatPage from './online-chat/page';
import Information from './information/page';
import ToastMessage from '../components/layout/common/alerts/toastMessage/ToastMessage';
import { AuctionId } from './auction/auction-id/AuctionId';
import { UserId } from './personal-account/user-id/UserId';
import PersonalAccount from './personal-account/page';
import BottomNav from '../components/layout/nav/bottomNav/BottomNav';
import { Hidden } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import NotFound from './not-found/page';
import ChangePasswordPage from './change-password/page';
import useOnlineStatus from '../hooks/useOnlineStatus/useOnlineStatus';

function App() {
    const isOnline = useOnlineStatus();

    return (
        <div className="App">
            <NavBar>
                <Routes>
                    {isOnline ? (
                        <>
                            <Route path={'/'} element={<HomePage />} />
                            <Route path={'auction'} element={<AuctionPage />} />
                            <Route
                                path={'auction/:id/'}
                                element={<AuctionId />}
                            />
                            <Route
                                path={'online-chat'}
                                element={<OnlineChatPage />}
                            />
                            <Route
                                path={'information'}
                                element={<Information />}
                            />
                            <Route
                                path={'personal-account'}
                                element={<PersonalAccount />}
                            />
                            <Route
                                path={'personal-account/:id'}
                                element={<UserId />}
                            />
                            <Route
                                path={'/change/password'}
                                element={<ChangePasswordPage />}
                            />
                            <Route path={'*'} element={<NotFound />} />
                        </>
                    ) : (
                        <NotFound />
                    )}
                </Routes>
                <Hidden mdUp>
                    <Toolbar />
                    <BottomNav />
                </Hidden>
            </NavBar>
            <ToastMessage />
        </div>
    );
}

export default App;
