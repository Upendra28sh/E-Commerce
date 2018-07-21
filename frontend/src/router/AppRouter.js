import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Landing from '../components/Landing';
import Home from '../components/Home';
import Search from '../components/Search';
import SignUp from '../components/SignUp';
import User from '../components/User';
import Seller from '../components/Seller';
import Cart from '../components/Cart';
import Confirm from '../components/Confirm';
import Thanks from '../components/Thanks';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/shop" component={Home} />
            <Route exact path="/search/:query" component={Search} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/user/:id" component={User} />
            <Route exact path="/seller/:id" component={Seller} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/confirm" component={Confirm} />
            <Route exact path="/thanks" component={Thanks} />
        </Switch>
    )
}

export default Router;