const {ApolloServer, gql} = require('apollo-server');
const mongoose = require('mongoose');
import express from 'express';
import cors from 'cors';
import upload from './middlewares/upload'

const app = express();

app.use(cors());

// app.use('/push', require('./push'));
//Public Key:
// BImBf1MZPoA5x-HrDlQoODpFY0mmshS9t_dGTLfHNBZNt8WsxcquRsYnr9J61Fu44MxKUQyaXUBdz9yJlzElVyM

// Private Key:
// QSKojmLYRF_MAP_zWxMUckT3kk8faHak4wf4Jxqu0fk


// GraphQL imports
const typeDefs = require('./typeDef/index');
const resolvers = require('./resolvers/index');

import config from './config';
import jwt from 'jsonwebtoken';

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

        // try to retrieve a user with the token
        let decoded = jwt.verify(token, config.secret);
        console.log(decoded);
        // const user = getUser(token);
        if (decoded.seller) {
            return {seller: decoded};
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

mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.log("Connected to DB");
    server.listen().then(({url}) => {
        console.log(`Server ready at ${url}`);
    });
}).catch(err => {
    console.log(err.message);
});

