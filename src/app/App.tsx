import React from 'react';
import './global.scss';
import { Route, Routes } from 'react-router-dom';
import ResponsiveDrawer from '../components/layout/nav/Aside';
import HomePage from './home/page';
import BetPage from './rate/page';
import OnlineChatPage from './online-chat/page';
import InformationPage from './information/page';
import ToastMessage from '../components/layout/common/alerts/toastMessage/ToastMessage';
import { RateId } from './rate/rate-id/RateId';
import PersonalAccount from './personal-account/page';
import BottomNav from '../components/layout/nav/bottomNav/BottomNav';
import { Hidden } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

function App() {
    return (
        <div className="App">
            <ResponsiveDrawer>
                <Routes>
                    <Route path={'/'} element={<HomePage />} />
                    <Route path={'rate'} element={<BetPage />} />
                    <Route path={'rate/:id/'} element={<RateId />} />
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
