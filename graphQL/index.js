const {ApolloServer, gql} = require('apollo-server-express');
import graphqlHTTP from 'express-graphql';
import {apolloUploadExpress} from 'apollo-upload-server';
import config from './config';
import jwt from 'jsonwebtoken';
import express from 'express';
import bodyParser from 'body-parser' ;

import cors from 'cors';
import {ccAvenueRedirectCallback} from './middlewares/ccAvenueResponse';

const app = express();
const PORT = 4000;
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/callback/ccAvenue/redirect', ccAvenueRedirectCallback);

// app.use('/push', require('./push'));
//Public Key:
// BImBf1MZPoA5x-HrDlQoODpFY0mmshS9t_dGTLfHNBZNt8WsxcquRsYnr9J61Fu44MxKUQyaXUBdz9yJlzElVyM

// Private Key:
// QSKojmLYRF_MAP_zWxMUckT3kk8faHak4wf4Jxqu0fk


// GraphQL imports
const typeDefs = require('./typeDef/index');
const resolvers = require('./resolvers/index');

// Mongoose configuration
const url = "mongodb://localhost:27017/ecomm";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        // get the user token from the headers
        let token = req.headers.authorization || '';
        if (!token) {
            return {
                user: {},
                seller: {}
            };
        }
        token = token.split(" ")[1];

        let decoded = {};
        // try to retrieve a user with the token
        try {
            decoded = jwt.verify(token, config.secret);
        } catch (TokenExpiredError) {
            console.log("Error");
            decoded = {};
        }
        // console.log(decoded);
        // const user = getUser(token);

        if (decoded.seller) {
            return {seller: decoded};
        } else if (decoded.admin) {
            return {admin: decoded};
        }

        // add the user to the context
        return {user: decoded};
    },
    playground: {
        settings: {
            'editor.theme': 'light',
            'editor.cursorShape': 'line',
        },
    }
});

server.applyMiddleware({app});

mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.log("Connected to DB");
    app.listen({port: PORT}, () => {
        console.log(`Server ready at Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
}).catch(err => {
    console.log(err.message);
});

