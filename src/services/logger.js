
const path = require('path');

// Note: variable __filename and __dirname are parameters module function wrapper as 
// (function (exports, require, module, __filename, __dirname){})
const pathObj = path.parse(__filename);

const url = 'http://mylogger.io/log';

function log(message) {
    // Send an HTTP request
    console.log(message);

    // console.log(`At file ${__filename} of directory ${__dirname}`);
}

module.exports.log = log;
