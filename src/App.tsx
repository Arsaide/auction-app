import React from 'react';
import './global.scss';
import { Route, Routes } from 'react-router-dom';
import ResponsiveDrawer from './components/layout/nav/Aside';
import HomePage from './pages/home/page';
import BetPage from './pages/bet/page';
import OnlineChatPage from './pages/online-chat/page';
import InformationPage from './pages/information/page';
import ToastMessage from './components/layout/common/alerts/toastMessage/ToastMessage';
import { BetId } from './pages/bet/bet-id/BetId';
import PersonalAccount from './pages/personal-account/page';
import BottomNav from './components/layout/nav/bottomNav/BottomNav';
import { Hidden } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

function App() {
    return (
        <div className="App">
            <ResponsiveDrawer>
                <Routes>
                    <Route path={'/'} element={<HomePage />} />
                    <Route path={'bet'} element={<BetPage />} />
                    <Route path={'bet/:id/'} element={<BetId />} />
                    <Route path={'online-chat'} element={<OnlineChatPage />} />
                    <Route path={'information'} element={<InformationPage />} />
                    <Route
                        path={'personal-account'}
                        element={<PersonalAccount />}
                    />
                </Routes>
                <Hidden mdUp>
                    <Toolbar />
                    <BottomNav />
                </Hidden>
            </ResponsiveDrawer>
            <ToastMessage />
        </div>
    );
}

export default App;
