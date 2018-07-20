import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
// import {Router, Route, hashHistory, IndexRoute } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import './styles/index.css';
import './styles/custom.css';
import Container from './components/AppContainer';
import reducer from './reducers/home';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(ReduxThunk)
);

let name = Cookies.get('name');
if (name != undefined) {
    store.dispatch({
        type: 'read-cookie-name',
        first_name: name
    })
}
let token = Cookies.get('token');
if (token != undefined) {
    store.dispatch({
        type: 'read-cookie-token',
        token: token.token
    })
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={Container} />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
