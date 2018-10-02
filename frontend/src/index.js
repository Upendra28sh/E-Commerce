import React from "react";
import jwt from "jsonwebtoken";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ModalContainer} from "react-router-modal";
import {createUploadLink} from "apollo-upload-client";
import {
    initializeFirebase,
    sendmessageusertoseller
} from "./push-notification";
import StoreContainer from "./components/shop/Container";
// import AdminContainer from "./components/admin/Container";

import "./main.css";

import {ApolloProvider} from "react-apollo";
// import ApolloClient from "apollo-client";

import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {withClientState} from 'apollo-link-state';
import {ApolloLink, Observable} from 'apollo-link';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

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

const BASE_URL = 'http://localhost:4000/graphql';
// const BASE_URL = 'http://18.216.241.175:4000/graphql' ;

console.log(auth);

const cache = new InMemoryCache({
    fragmentMatcher
});

const request = async (operation) => {
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ""
        }
    });
};

const requestLink = new ApolloLink((operation, forward) =>
    new Observable(observer => {
        let handle;
        Promise.resolve(operation)
            .then(oper => request(oper))
            .then(() => {
                handle = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                });
            })
            .catch(observer.error.bind(observer));

        return () => {
            if (handle) handle.unsubscribe();
        };
    })
);

const client = new ApolloClient({
    // connectToDevTools: true,
    link: ApolloLink.from([
        onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors) {
                graphQLErrors.map(({message, locations, path}) => {
                    if (message === 'Context creation failed: jwt expired') {
                        console.log('Token Expired');
                        localStorage.removeItem('token');
                        window.location.reload();
                    } else {
                        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,);
                    }

                });
            }
            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        }),
        requestLink,
        withClientState({
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
            },
            cache
        }),
        new HttpLink({
            uri: BASE_URL,
        })
    ]),
    cache
});

initializeFirebase();

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div>
                <Switch>
                    {/* <Route path="/admin" component={AdminContainer}/> */}
                    <Route path="/" component={StoreContainer}/>
                </Switch>
                <ModalContainer
                    modalClassName={"react-router-modal__modal container"}
                />
            </div>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("root")
);

