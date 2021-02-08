import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { ContextProvider } from './Context';

ReactDOM.render(
    <ContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ContextProvider>,
    document.getElementById('root'));