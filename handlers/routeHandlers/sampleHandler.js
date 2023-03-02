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

const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    // console.log(requestProperties);

    callback(200, {
        message: 'This is a sample utl',
    });
};

module.exports = handler;
