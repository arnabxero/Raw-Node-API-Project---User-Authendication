/*
 * Title: Uptime Monitoring Application
 * Description: Simple node application.
 * Author: Eftakhar Ahmed Arnob ( Iftekhar Ahmed Arnob )
 * Github: https://github.com/arnabxero
 * Facebook: https://www.facebook.com/official.arnab
 * Youtube: https://www.youtube.com/iftekhararnab
 * Date: 11/09/19
 *
 */
// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
// const data = require('./lib/data');

// app object - module scafolding
const app = {};

// data.create('test', 'newFile', { name: 'Bangladesh', language: 'Bangla' }, (err) => {
//     console.log('error was', err);
// });

// data.read('test', 'newFile', (err, result) => {
//     console.log(err, result);
// });

// data.update('test', 'newFile', { name: 'England', language: 'English' }, (err) => {
//     console.log('error was', err);
// });

// data.delete('test', 'newFile', (err) => {
//     console.log(err);
// });

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to port number ${environment.port}`);
    });
};

app.handleReqRes = handleReqRes;

app.createServer();
