import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Landing from '../components/shop/Landing';
import Home from '../components/shop/Home';
import Search from '../components/shop/Search';
import SignUp from '../components/shop/SignUp';
import User from '../components/shop/User';
import Seller from '../components/shop/Seller';
import AddSeller from '../components/shop/AddSeller/index';
import Cart from '../components/shop/Cart';
import Checkout from '../components/shop/Checkout';
import Saved from '../components/shop/Saved';
import Confirm from '../components/shop/Confirm';
import Thanks from '../components/shop/Thanks';
import Feed from '../components/shop/Feed'
const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/shop" component={Home} />
            <Route exact path="/search/:query" component={Search} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/user/:id" component={User} />
            <Route exact path="/seller/new" component={AddSeller} />
            <Route exact path="/seller/:id" component={Seller} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/saved" component={Saved} />
            <Route exact path="/confirm" component={Confirm} />
            <Route exact path="/thanks" component={Thanks} />
            <Route exact path="/feed" component={Feed} />
        </Switch>
    )
}

export default Router;