import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import ResponsiveDrawer from "./components/layout/nav/Aside";
import HomePage from "./pages/home/page";
import BetPage from "./pages/bet/page";
import OnlineChatPage from "./pages/online-chat/page";
import InformationPage from "./pages/information/page";
import ToastMessage from "./components/layout/common/alerts/toastMessage/ToastMessage";
import { BetId } from "./pages/bet/bet-id/BetId";
import {PersonalAccount} from "./pages/personal-account/page";

function App() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userPassword, setUserPassword] = useState<string | null>(null);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const password = localStorage.getItem('userPassword');
        if (email && password) {
            setUserEmail(email);
            setUserPassword(password);
        }
    }, []);

    return (
        <div className="App">
            <ResponsiveDrawer>
                {userEmail && userPassword && (
                    <div>
                        <p>User Email: {userEmail}</p>
                        <p>User Password: {userPassword}</p>
                    </div>
                )}
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"bet"} element={<BetPage />} />
                    <Route path={"bet/:id/"} element={<BetId />} />
                    <Route path={"online-chat"} element={<OnlineChatPage />} />
                    <Route path={"information"} element={<InformationPage />} />
                    <Route path={"personal-account/:id/"} element={<PersonalAccount />} />
                </Routes>
            </ResponsiveDrawer>
            <ToastMessage />
        </div>
    );
}

export default App;
