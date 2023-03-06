/* eslint-disable prefer-const */
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
const data = require('../../lib/data');
const { hash, parseJSON, createRandomString } = require('../../helpers/utilities');

const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    // console.log(requestProperties);
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler.token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler.token = {};

handler.token.post = (requestProperties, callback) => {
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            const hashedPassword = hash(password);

            if (hashedPassword === parseJSON(userData).password) {
                let tokenID = createRandomString(20);
                let expires = Date.now() + 60 * 60 * 1000;
                let tokenObject = {
                    phone,
                    id: tokenID,
                    expires,
                };

                data.create('tokens', tokenID, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            message: 'Server Error',
                        });
                    }
                });
            } else {
                callback(400, {
                    message: 'Wrong Password!!!',
                });
            }
        });
    } else {
        callback(400, {
            message: 'Phone or Password is Wrong',
        });
    }
};

handler.token.get = (requestProperties, callback) => {
    const id = typeof requestProperties.queryStringObject.id === 'string' && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;

    if (id) {
        data.read('tokens', id, (err, tokenData) => {
            const token = { ...parseJSON(tokenData) };

            if (!err && token) {
                callback(200, token);
            } else {
                callback(404, {
                    Message: 'Token not found!',
                });
            }
        });
    } else {
        callback(404, {
            Message: 'No Token Found!',
        });
    }
};

handler.token.put = (requestProperties, callback) => {
    const id = typeof requestProperties.body.id === 'string' && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id : false;
    const extend = !!(typeof requestProperties.body.extend === 'boolean' && requestProperties.body.extend === true);

    if (id && extend) {
        data.read('tokens', id, (err, tokenData) => {
            let tokenObject = parseJSON(tokenData);

            if (tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000;

                data.update('tokens', id, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'Token time updated',
                        });
                    } else {
                        callback(500, {
                            error: 'server error',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'Token already expired',
                });
            }
        });
    } else {
        callback(400, {
            error: 'Problem in request',
        });
    }
};

handler.token.delete = (requestProperties, callback) => {
    const id = typeof requestProperties.queryStringObject.id === 'string' && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;

    if (id) {
        data.read('tokens', id, (err, tokenData) => {
            if (!err && tokenData) {
                data.delete('tokens', id, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'Token deleted successfully',
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
            message: 'Token Does Not Exists',
        });
    }
};

handler.token.verify = (id, phone, callback) => {
    data.read('tokens', id, (err, tokenData) => {
        if (!err && tokenData) {
            if (parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};

module.exports = handler;
