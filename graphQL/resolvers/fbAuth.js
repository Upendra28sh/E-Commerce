const config = require('../config');
const request = require('request');
const User = require('../models/user');
import jwt from 'jsonwebtoken';

const app_id = config.fbAppID;
const app_secret = config.fbSecret;

module.exports = {
    Mutation: {
        fbSignup: (parent, { input }, context, info) => {

            let {accessToken, userID} = input;

            const url = `https://graph.facebook.com/debug_token?access_token=${app_id}|${app_secret}&input_token=${accessToken}`;
            const me = `https://graph.facebook.com/${userID}?fields=name,id,email,picture.width(360).height(360),friends,about&access_token=${accessToken}`

            const responsePromise = new Promise(
                (resolve, reject) => {
                    request(url, function (error, response, body) {
                        let data = JSON.parse(body).data;
        
                        if (data.error || data.app_id != app_id) {
                            console.log(data);
                            resolve({
                                token: {
                                    code: 5, 
                                    content: 'Error occured with Facebook'
                                }
                            });
                        } else {
        
                            // Check user's authenticity and get data
                            return request(me, function(error, response, body) {
                                let info = JSON.parse(body);
        
                                if (error) {
                                    console.log(error);
                                    resolve({
                                        token: {
                                            code: 5, 
                                            content: 'Error occured with Facebook'
                                        }
                                    });
                                } else {
        
                                    // Find if email is already registered
                                    return User.findOne({email: info.email}).exec().then(
                                        foundUser => {
                                            console.log("Found User",foundUser);
                                            if (foundUser) {
                                                resolve({
                                                    token: {
                                                        code: 2, 
                                                        content: 'Email already registered'
                                                    }
                                                });
                                            } else {
        
                                                // Create new user with FB data
                                                return User.create({
                                                    name: info.name,
                                                    email: info.email,
                                                    about: '',
                                                    image: info.picture.data.url,
                                                    username: info.email,
                                                    facebook: info.id
                                                }).then(
                                                    createdUser => {
                                                        console.log(createdUser);
                                                        
                                                        // Generate token for new user
                                                        const token = jwt.sign(
                                                            {
                                                                id: createdUser._id,
                                                                name: createdUser.name,
                                                                image: createdUser.image,
                                                                email: createdUser.email,
                                                                username: createdUser.username
                                                            },
                                                            config.secret,
                                                            {expiresIn: 86400}
                                                        );
                                                        resolve({
                                                            token: {
                                                                code: 1,
                                                                content: token
                                                            }
                                                        });
                                                    }
                                                )
                                            }
                                        }
                                    );
                                }
                            });                    
                        }
                    })  
                }
            );

            return responsePromise;              
        },

        fbSignin: (parent, { input }, context, info) => {
            let {accessToken, userID} = input;
            const url = `https://graph.facebook.com/debug_token?access_token=${app_id}|${app_secret}&input_token=${accessToken}`;
            const me = `https://graph.facebook.com/${userID}?fields=name,id,email,picture.width(360).height(360),friends,about&access_token=${accessToken}`

            const responsePromise = new Promise(
                (resolve, reject) => {
                    request(url, function (error, response, body) {
                        let data = JSON.parse(body).data;
        
                        if (data.error || data.app_id != app_id) {
                            console.log(data);
                            resolve({
                                token: {
                                    code: 5, 
                                    content: 'Error occured with Facebook'
                                }
                            });
                        } else {
        
                            // Check user's authenticity and get data
                            return request(me, function(error, response, body) {
                                let info = JSON.parse(body);
        
                                if (error) {
                                    console.log(error);
                                    resolve({
                                        token: {
                                            code: 5, 
                                            content: 'Error occured with Facebook'
                                        }
                                    });
                                } else {
        
                                    // Check if user exists
                                    return User.findOne({email: info.email}).exec().then(
                                        foundUser => {
                                            if (foundUser) {
        
                                                // Generate token for signed in user
                                                const token = jwt.sign(
                                                    {
                                                        id: foundUser._id,
                                                        name: foundUser.name,
                                                        image: foundUser.image,
                                                        email: foundUser.email,
                                                        username: foundUser.username
                                                    },
                                                    config.secret,
                                                    {expiresIn: 86400}
                                                );
                                                resolve({
                                                    token: {
                                                        code: 1,
                                                        content: token
                                                    }
                                                });
                                            } else {
                                                resolve({
                                                    token: {
                                                        code: 4,
                                                        content: "Email not registered"
                                                    }
                                                });
                                            }
                                        }
                                    );
                                }
                            });
                        }
                    });
                }
            );

            return responsePromise;
        }
    }
}