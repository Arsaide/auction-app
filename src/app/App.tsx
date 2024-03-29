import React, { useContext, useEffect, useState } from 'react';
import './global.scss';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/layout/nav/NavBar';
import HomePage from './home/page';
import AuctionPage from './auction/page';
import OnlineChatPage from './online-chat/page';
import InformationPage from './information/page';
import ToastMessage from '../components/layout/common/alerts/toastMessage/ToastMessage';
import { AuctionId } from './auction/auction-id/AuctionId';
import { UserId } from './personal-account/user-id/UserId';
import PersonalAccount from './personal-account/page';
import BottomNav from '../components/layout/nav/bottomNav/BottomNav';
import { Hidden } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import NotFount from './not-fount/page';
import { Context } from '../index';

function App() {
    const { store } = useContext(Context);
    const [updateBalance, setUpdateBalance] = useState<boolean>(true);
    const { balance } = store.user;

    useEffect(() => {
        async function checkAuthAndFetchUser() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await store.getUser(token);
                    localStorage.setItem('isAuth', 'true');
                    setUpdateBalance(false);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }

        checkAuthAndFetchUser();
    }, [updateBalance]);

    return (
        <div className="App">
            <NavBar balance={balance}>
                <Routes>
                    <Route path={'/'} element={<HomePage />} />
                    <Route path={'auction'} element={<AuctionPage />} />
                    <Route path={'auction/:id/'} element={<AuctionId />} />
                    <Route path={'online-chat'} element={<OnlineChatPage />} />
                    <Route path={'information'} element={<InformationPage />} />
                    <Route
                        path={'personal-account'}
                        element={<PersonalAccount />}
                    />
                    <Route
                        path={'personal-account/:token'}
                        element={<UserId />}
                    />
                    <Route path={'*'} element={<NotFount />} />
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
