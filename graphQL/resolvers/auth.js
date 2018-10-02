const User = require('../models/user');
const Address = require('../models/address');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

module.exports = {
    Mutation: {
        CreateUser: (parent, {input}, context, address) => {
            let {email, password, username} = input;
            // console.log(input);
            return User.findOne({email: email}).exec()
                .then(
                    foundUser => {
                        if (foundUser) {
                            return {
                                token: {
                                    code: 2,
                                    content: "Email already registered"
                                }
                            };
                        } else {
                            // checking for unique username
                            return User.findOne({username: username}).exec()
                                .then(
                                    foundUsername => {
                                        if (foundUsername) {
                                            console.log("Username found");
                                            return {
                                                token: {
                                                    code: 6,
                                                    content: "Username already taken"
                                                }
                                            }
                                        } else {
                                            const hashedPassword = bcrypt.hashSync(password);
                                            return User.create({
                                                email: email,
                                                password: hashedPassword,
                                                username: username
                                            }).then(
                                                createdUser => {
                                                    console.log(createdUser);
                                                    const token = jwt.sign(
                                                        {
                                                            id: createdUser._id,
                                                            username: createdUser.username,
                                                            email: createdUser.email,
                                                            finished: createdUser.finished.signup
                                                        },
                                                        config.secret,
                                                        {expiresIn: 86400}
                                                    );
                                                    return {
                                                        token: {
                                                            code: 1,
                                                            content: token
                                                        }
                                                    };
                                                }
                                            )
                                        }
                                    }
                                );
                        }
                    }
                );
        },

        CompleteSignup: (parent, {details, address}, {user}, info) => {
            let {name, image, about, username} = details;

            return User.findOne({email: user.email}).exec()
                .then(
                    (foundUser, err) => {
                        console.log(err);
                        foundUser.name = name;
                        foundUser.image = image;
                        foundUser.about = about;
                        foundUser.address = address;
                        foundUser.finished.signup = true;
                        foundUser.save();

                        const token = jwt.sign(
                            {
                                id: foundUser._id,
                                name: foundUser.name,
                                image: foundUser.image,
                                email: foundUser.email,
                                about: foundUser.about,
                                username: foundUser.username,
                                finished: foundUser.finished.signup
                            },
                            config.secret,
                            {expiresIn: 86400}
                        );
                        return {
                            token: {
                                code: 1,
                                content: token
                            }
                        };
                    }
                );
        },

        // Not being used anymore but updated with changes made in type definitions
        UserSignup: (parent, {input, details, address}, context, info) => {
            let {email, password, username} = input;
            let {name, image, about} = details;
            let {street, city, state, zipcode} = address;

            return User.findOne({email: email}).exec()
                .then(
                    foundUser => {
                        if (foundUser) {
                            return {
                                token: {
                                    code: 2,
                                    content: "Email already registered"
                                }
                            };
                        } else {
                            const hashedPassword = bcrypt.hashSync(password);

                            return User.create({
                                email: email,
                                password: hashedPassword,
                                name: name,
                                image: image,
                                about: about,
                                username: username
                            }).then(
                                createdUser => {

                                    // TODO : Address Sahi Karo Yaha Pe.

                                    return Address.create({
                                        address: address.address,
                                        street: street,
                                        city: city,
                                        state: state,
                                        zipcode: zipcode
                                    }).then(
                                        createdAddress => {
                                            createdUser.address = createdAddress;
                                            createdUser.save();

                                            const token = jwt.sign(
                                                {
                                                    id: foundUser._id,
                                                    name: foundUser.name,
                                                    image: foundUser.image,
                                                    email: foundUser.email,
                                                    about: foundUser.about,
                                                    username: foundUser.username,
                                                    finished: foundUser.finished.signup
                                                },
                                                config.secret,
                                                {expiresIn: 86400}
                                            );
                                            return {
                                                token: {
                                                    code: 1,
                                                    content: token
                                                }
                                            };
                                        }
                                    );

                                }
                            );
                        }
                    }
                );

        },

        UserLogin: (parent, {input}, context, info) => {
            console.log(input);
            let {email, password} = input;

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
                                };
                            } else {
                                const token = jwt.sign(
                                    {
                                        id: foundUser._id,
                                        name: foundUser.name,
                                        image: foundUser.image,
                                        email: foundUser.email,
                                        about: foundUser.about,
                                        username: foundUser.username,
                                        finished: foundUser.finished.signup
                                    },
                                    config.secret,
                                    {expiresIn: 86400}
                                );
                                return {
                                    token: {
                                        code: 1,
                                        content: token
                                    }
                                };
                            }
                        } else {
                            return {
                                token: {
                                    code: 4,
                                    content: "Email not registered"
                                }
                            };
                        }
                        return response;
                    }
                );
        }
    }
};