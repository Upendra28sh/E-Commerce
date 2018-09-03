import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ApolloProvider} from "react-apollo";
import ApolloClient from "apollo-boost";
import registerServiceWorker from './registerServiceWorker';
import jwt from 'jsonwebtoken';

import Container from './components/Container';
import AddSeller from "./components/AddSeller";
import WrappedLogin from "./components/Login";
import './main.css';
import RequireAuth from "./components/Utils/RequireAuth";

let token = localStorage.getItem("token");

let found = false;
if (token) {
    found = true;
}

let auth = {
    isAuthenticated: found,
    user: {
        id: "",
        name: "",
        username: "",
        ...jwt.decode(token),
        __typename: "AuthUser"
    },
    __typename: "Auth"
};


const client = new ApolloClient({
    uri: "http://localhost:4000/",
    headers: {
        authorization: token ? `Bearer ${token}` : ""
    },
    clientState: {
        defaults: {
            auth: auth
        },
        resolvers: {
            Mutation: {
                updateAuth: (_, params, {cache}) => {
                    let token = localStorage.getItem("token");
                    let found = false;
                    if (token) {
                        found = true;
                    }

                    let auth = {
                        isAuthenticated: found,
                        user: {...jwt.decode(token), __typename: "AuthUser"},
                        __typename: "Auth"
                    };

                    cache.writeData({data: {auth}});
                    return null;
                }
            }
        }
    }
});


// TODO : Make A New Layout for Auth ( /login and /shop/create ) Same as Client Side.

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={WrappedLogin}/>
                <Route exact path="/shop/create/" component={AddSeller}/>
                <Route path="/" component={RequireAuth(Container)}/>
            </Switch>
        </BrowserRouter>
    </ApolloProvider>,

    document.getElementById('root'));

registerServiceWorker();
