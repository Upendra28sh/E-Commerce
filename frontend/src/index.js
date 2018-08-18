import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Cookies from 'js-cookie';
import {ModalContainer, ModalRoute} from 'react-router-modal';

import StoreContainer from './components/shop/Container';
import AdminContainer from './components/admin/Container';
import reducer from './reducers/shop';
import './main.css' ;
import Details from "./components/shop/Details";

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
    });
}
let token = Cookies.get('token');
if (token !== undefined) {
    store.dispatch({
        type: 'read-cookie-token',
        token: token.token
    });
}
// console.log(ModalContainer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/admin" component={AdminContainer}/>
                    <Route path="/" component={StoreContainer}/>
                </Switch>
                {/*<ModalRoute path={`${match.url}/users/:userId`} parentPath={match.url} component={UserProfile} />*/}
                {/*<ModalRoute component={} path='/foo' className='test-modal test-modal-foo'/>*/}
                {/*<ModalRoute component={BarModal} path='/bar' className='test-modal test-modal-bar'/>*/}

                <ModalContainer modalClassName={'react-router-modal__modal container'}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
