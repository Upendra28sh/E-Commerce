const User = require('../models/user');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        allUsers: (parent, args, context, info) => {
            return User.find({}).exec();
        },
        User: (parent, args, context, info) => {
            return User.findOne({username: args.username}).exec();
        }
    },
};