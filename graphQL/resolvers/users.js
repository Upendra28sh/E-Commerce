const User = require('../models/user');

module.exports = {
    Query: {
        allUsers: (parent, args, context, info) => {
            return User.find({}).exec();
        }
    },
    Mutation: {
        addUser: (parent, args, context, info) => {
            return User.create({
                name: args.name,
                image: args.image,
                about: args.about,
                email:args.email,
                order:args.order,
                City:args.City,
                Latest:args.Latest,
                Contact:args.Contact,
                Total:args.Total,
                Password:args.Password
            }).then(
                data => data
            )
        }
    }
}