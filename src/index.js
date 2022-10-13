import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HpProvider from "./context/hpContext";
import LoadingProvider from "./context/loadContext";
import FinishedProvider from "./context/finishedContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HpProvider>
            <LoadingProvider>
                <FinishedProvider>
                    <App/>
                </FinishedProvider>
            </LoadingProvider>
        </HpProvider>
    </React.StrictMode>
);
