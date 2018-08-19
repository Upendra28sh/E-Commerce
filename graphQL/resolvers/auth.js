const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

module.exports = {
    Mutation: {
        signup: (parent, { input, details }, context, info) => {

            let { email, password } = input;
            let { name, image, about } = details;
            
            return User.findOne({email: email}).exec()
            .then(
                foundUser => {
                    if (foundUser) {
                        return {
                            token: {
                                code: 2,
                                content: "Email already registered"
                            }
                        }
                    } else {
                        const hashedPassword = bcrypt.hashSync(password);

                        return User.create({
                            email: email,
                            password: hashedPassword,
                            name: name,
                            image: image,
                            about: about
                        }).then(
                            createdUser => {
                                const token = jwt.sign(
                                    {id: createdUser._id},
                                    config.secret,
                                    {expiresIn: 86400}
                                );
                                return {
                                    token: {
                                        code: 1,
                                        content: token
                                    }
                                }
                            }
                        )
                    }
                }
            )
            
        },

        login: (parent, { input }, context, info) => {

            let { email, password } = input;

            return User.findOne({email: email}).exec()
            .then(
                foundUser => {
                    if (foundUser) {
                        const passwordIsValid = bcrypt.compareSync(password, foundUser.password);
                        if (!passwordIsValid) {
                            return {
                                token: {
                                    code: 3,
                                    content: "Invalid Password"
                                }
                            }
                        } else {
                            const token = jwt.sign(
                                {id: foundUser._id},
                                config.secret,
                                {expiresIn: 86400}
                            );
                            return {
                                token: {
                                    code: 1,
                                    content: token
                                }
                            }
                        }
                    } else {
                        return {
                            token: {
                                code: 4,
                                content: "Email not registered"
                            }
                        }
                    }
                    return response;
                }
            )
        }
    }
}