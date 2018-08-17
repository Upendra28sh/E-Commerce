const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const response = {
    code: undefined,
    content: ''
};

module.exports = {
    Mutation: {
        signup: (parent, args, context, info) => {

            return User.findOne({email: args.email}).exec()
            .then(
                foundUser => {
                    if (foundUser) {
                        return {
                            code: 2,
                            content: "Email already registered"
                        }
                    } else {
                        const hashedPassword = bcrypt.hashSync(args.password);

                        return User.create({
                            email: args.email,
                            password: hashedPassword,
                            name: '',
                            image: '',
                            about: ''
                        }).then(
                            createdUser => {
                                const token = jwt.sign(
                                    {id: createdUser._id},
                                    config.secret,
                                    {expiresIn: 86400}
                                );
                                return {
                                    code: 1,
                                    content: token
                                }
                            }
                        )
                    }
                    return response;
                }
            )
            
        },

        login: (parent, args, context, info) => {
            return User.findOne({email: args.email}).exec()
            .then(
                foundUser => {
                    if (foundUser) {
                        const passwordIsValid = bcrypt.compareSync(args.password, foundUser.password);
                        if (!passwordIsValid) {
                            return {
                                code: 3,
                                content: "Invalid Password"
                            }
                        } else {
                            const token = jwt.sign(
                                {id: foundUser._id},
                                config.secret,
                                {expiresIn: 86400}
                            );
                            return {
                                code: 1,
                                content: token
                            }
                        }
                    } else {
                        return {
                            code: 4,
                            content: "Email not registered"
                        }
                    }
                    return response;
                }
            )
        }
    }
}