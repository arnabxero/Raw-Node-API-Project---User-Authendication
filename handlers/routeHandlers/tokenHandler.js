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

};

handler.token.put = (requestProperties, callback) => {

};

handler.token.delete = (requestProperties, callback) => {

};

module.exports = handler;
