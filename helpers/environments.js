/* eslint-disable operator-linebreak */
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
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'ArnabTesting',
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'ArnabProducion',
};

const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

const environmentsToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

module.exports = environmentsToExport;
