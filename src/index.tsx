import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import reportWebVitals from './app/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Store from './api/store/store';
import { AuthProvider } from './lib/providers/AuthContext';

interface State {
    store: Store;
}

const store = new Store();
export const Context = createContext<State>({
    store,
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <Context.Provider value={{ store }}>
            <AuthProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </Context.Provider>
    </React.StrictMode>,
);

reportWebVitals();
