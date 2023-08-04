import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import store, { persistor } from './store';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
                    <App />
                </PersistGate>
            </HelmetProvider>
        </Provider>
    </React.StrictMode>
);
