const {ApolloServer, gql} = require('apollo-server');
const mongoose = require('mongoose');

// GraphQL imports
const typeDefs = require('./typeDef/index');
const resolvers = require('./resolvers/index');

// Mongoose configuration
const url = "mongodb://localhost:27017/ecomm";
const server = new ApolloServer({typeDefs, resolvers});

mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.log("Connected to DB");
    server.listen().then(({url}) => {
        console.log(`Server ready at ${url}`);
    });
}).catch(err => {
    console.log(err.message);
});

// require('./seeds')();


