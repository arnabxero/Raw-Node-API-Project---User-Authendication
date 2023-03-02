/* eslint-disable prefer-const */
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
const crypto = require('crypto');
// const { random } = require('lodash');

const environments = require('./environments');

const utilities = {};

utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', environments.secretKey).update(str).digest('hex');

        return hash;
    }
    return false;
};

utilities.createRandomString = (stringLength) => {
    let length = stringLength;
    length = typeof stringLength === 'number' && stringLength > 0 ? stringLength : false;

    if (length) {
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';

        for (let i = 1; i <= length; i += 1) {
            let randomCharacters = possibleCharacters.charAt(
                Math.floor(Math.random() * possibleCharacters.length)
            );
            output += randomCharacters;
        }
        return output;
    }
    return false;
};

module.exports = utilities;
