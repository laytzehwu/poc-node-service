/**
 * Logger service provides log function to collect logging message
*/

const Logger = require('./logger');

exports.log = (message) => {
    Logger.getInstance().log(message);
};
