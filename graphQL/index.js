const {ApolloServer, gql} = require('apollo-server');
const mongoose = require('mongoose');

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
        if(!token){
            return {
                user : {}
            }
        }
        token = token.split(" ")[1];

        // try to retrieve a user with the token
        let decoded = jwt.verify(token, config.secret);
        // console.log(decoded);
        // const user = getUser(token);

        // add the user to the context
        return {user: decoded};
    },

});

mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.log("Connected to DB");
    server.listen().then(({url}) => {
        console.log(`Server ready at ${url}`);
    });
}).catch(err => {
    console.log(err.message);
});

