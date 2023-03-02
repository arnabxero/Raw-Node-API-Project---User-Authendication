/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/*
 * Title: Basic Node app example
 * Description: Simple node application.
 * Author: Eftakhar Ahmed Arnob ( Iftekhar Ahmed Arnob )
 * Github: https://github.com/arnabxero
 * Facebook: https://www.facebook.com/official.arnab
 * Youtube: https://www.youtube.com/iftekhararnab
 * Date: 11/09/19
 *
 */
// Dependencies
const { first } = require('lodash');
const data = require('../../lib/data');
const { hash, parseJSON } = require('../../helpers/utilities');

const handler = {};

handler.userHandler = (requestProperties, callback) => {
    // console.log(requestProperties);
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler.users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler.users = {};

handler.users.post = (requestProperties, callback) => {
    // Create new user
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement = typeof requestProperties.body.tosAgreement === 'boolean' && requestProperties.body.tosAgreement === true;

    if (firstName && lastName && phone && password && tosAgreement) {
        data.read('users', phone, (err1) => {
            if (err1) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };

                console.log(userObject);

                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was created successfully!',
                        });
                    } else {
                        callback(500, {
                            error: 'Could not create user!',
                        });
                    }
                });
            } else {
                callback(200, {
                    message: 'Error, File Already Exists!',
                });
            }
        });
    } else {
        callback(400, {
            message: 'Request is not right!',
        });
    }
};

handler.users.get = (requestProperties, callback) => {
    const phone = typeof requestProperties.queryStringObject.phone === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false;

    if (phone) {
        data.read('users', phone, (err, U) => {
            const user = { ...parseJSON(U) };

            if (!err && user) {
                delete user.password;
                callback(200, user);
            } else {
                callback(404, {
                    Message: 'User not found!',
                });
            }
        });
    } else {
        callback(404, {
            Message: 'No User Found!',
        });
    }
};
handler.users.put = (requestProperties, callback) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if (phone) {
        if (firstName || lastName || password) {
            data.read('users', phone, (err, uData) => {
                const userData = JSON.parse(uData);

                if (!err && userData) {
                    if (firstName) {
                        userData.firstName = firstName;
                    }
                    if (lastName) {
                        userData.lastName = lastName;
                    }
                    if (password) {
                        userData.password = hash(password);
                    }

                    console.log(userData);

                    data.update('users', phone, userData, (err2) => {
                        if (!err2) {
                            callback(200, {
                                Message: 'User Updated Successfully',
                            });
                        } else {
                            callback(500, {
                                Error: 'Server Error',
                            });
                        }
                    });
                } else {
                    callback(400, {
                        Error: 'Invalid Request',
                    });
                }
            });
        } else {
            callback(400, {
                Error: 'Invalid Phone Number 222',
            });
        }
    } else {
        callback(400, {
            Error: 'Invalid phone number 111',
        });
    }
};

handler.users.delete = (requestProperties, callback) => {
    const phone = typeof requestProperties.queryStringObject.phone === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false;

    if (phone) {
        data.read('users', phone, (err, userData) => {
            if (!err && userData) {
                data.delete('users', phone, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'user deleted successfully',
                        });
                    } else {
                        callback(500, {
                            message: 'Problem Occured in server',
                        });
                    }
                });
            } else {
                callback(400, {
                    message: 'Bad request',
                });
            }
        });
    } else {
        callback(400, {
            message: 'User Does Not Exists',
        });
    }
};

module.exports = handler;
