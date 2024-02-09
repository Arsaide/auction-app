import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import ResponsiveDrawer from "./components/layout/nav/Aside";
import HomePage from "./pages/home/page";
import BetPage from "./pages/bet/page";
import OnlineChatPage from "./pages/online-chat/page";
import InformationPage from "./pages/information/page";
import AuthPage from "./pages/auth-page/page";
import ToastMessage from "./components/layout/common/toastMessage/ToastMessage";

function App() {
    return (
        <div className="App">
            <ResponsiveDrawer>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path={"bet"} element={<BetPage/>}/>
                    <Route path={"online-chat"} element={<OnlineChatPage/>}/>
                    <Route path={"information"} element={<InformationPage/>}/>
                    <Route path={"/auth-page"} element={<AuthPage />}/>
                </Routes>
                <ToastMessage/>
            </ResponsiveDrawer>
        </div>
    );
}

export default App;
