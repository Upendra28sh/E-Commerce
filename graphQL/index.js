const {ApolloServer, gql} = require('apollo-server');
const mongoose = require('mongoose');

// GraphQL imports
const typeDefs = require('./typeDef/index');
const resolvers = require('./resolvers/index');

// Mongoose imports
const Product = require('./models/product');
const Seller = require('./models/seller');
const User = require('./models/user');
// Mongoose configuration
const url = "mongodb://localhost:27017/ecomm";
mongoose.connect(url, { useNewUrlParser: true })

// require('./seeds')();

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});