import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import registerServiceWorker from './registerServiceWorker';
import jwt from 'jsonwebtoken';

import Container from './components/Container';
import Login from './components/Login';

import RequireAuth from "./components/Utils/RequireAuth";

import './main.css';

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


// const BASE_URL = 'http://localhost:4000/graphql' ;
const BASE_URL = 'http://18.216.241.175:4000/graphql' ;


const client = new ApolloClient({
    uri: BASE_URL,
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

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />

                <Route path="/" component={RequireAuth(Container)} />
            </Switch>
        </BrowserRouter>
    </ApolloProvider>,
    
    document.getElementById('root'));

registerServiceWorker();
