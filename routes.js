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

const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
};

module.exports = routes;
