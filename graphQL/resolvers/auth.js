const User = require('../models/user');
const Address = require('../models/address');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

module.exports = {
    Mutation: {
        UserSignup: (parent, {input, details, address}, context, info) => {
            let {email, password} = input;
            let {name, image, about, username} = details;
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
                                                    id: createdUser._id,
                                                    name: createdUser.name,
                                                    image: createdUser.image,
                                                    email: createdUser.email,
                                                    about: createdUser.about,
                                                    username: createdUser.username
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
                                        username: foundUser.username
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