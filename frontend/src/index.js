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
import AdminContainer from "./components/admin/Container";

import "./main.css";

import {ApolloProvider} from "react-apollo";
import ApolloClient from "apollo-boost";

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

console.log(auth);
const link = createUploadLink({uri: 'http://localhost:4000/graphql'});
const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    // uri: "http://18.216.241.175:4000" ,
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
        //     typeDefs: `
        //         type UserAuth {
        //             name : String ,
        //             email : String
        //         }
        //
        //         type Auth {
        //             isAuthenticated : Boolean ,
        //             user : UserAuth
        //         }
        //         input updateAuthInput {
        //             isAuthenticated : Boolean ,
        //             user : UserAuth
        //         }
        //
        //         type Mutation {
        //             updateAuth(input : updateAuthInput) : Auth
        //         }
        //
        //         type Query {
        //             auth : Auth ,
        //             status : String
        //         }`
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/admin" component={AdminContainer}/>
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

initializeFirebase();
