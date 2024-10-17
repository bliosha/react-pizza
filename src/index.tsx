import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {render} from 'react-dom';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'

import {store} from './redux/slices/store';

const rootElem = document.getElementById('root')
if (rootElem) {
    const root = ReactDOM.createRoot(rootElem);
    root.render(
        <Provider store={store}>
            <React.StrictMode>
                <BrowserRouter><App/></BrowserRouter>
            </React.StrictMode>
        </Provider>
    );
}


