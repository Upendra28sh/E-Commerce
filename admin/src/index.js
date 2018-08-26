import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import registerServiceWorker from './registerServiceWorker';

import Container from './components/Container';
import './main.css';

const client = new ApolloClient({
    uri: "http://localhost:4000/"
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Container} />
            </Switch>
        </BrowserRouter>
    </ApolloProvider>,
    
    document.getElementById('root'));

registerServiceWorker();
