import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import StoreContainer from './components/shop/Container';
import AdminContainer from './components/admin/Container';
import reducer from './reducers/shop';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(ReduxThunk)
);

let name = Cookies.get('name');
if (name !== undefined) {
    store.dispatch({
        type: 'read-cookie-name',
        first_name: name
    })
}
let token = Cookies.get('token');
if (token !== undefined) {
    store.dispatch({
        type: 'read-cookie-token',
        token: token.token
    })
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/admin" component={AdminContainer} />  
                <Route path="/" component={StoreContainer} />
            </Switch>

        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
