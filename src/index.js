import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Context from './Context';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <Context>
            <BrowserRouter>
                < App />
            </BrowserRouter>
        </Context>
    </Provider>,
    document.getElementById('root')
);

