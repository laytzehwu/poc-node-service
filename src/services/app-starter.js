/**
 * App start service provides required logic when the app is being started 
*/
const os = require('os');
const logger = require('./logger');
const config = require('../config');
const serverFactory = require('./server-factory');

const port = config.server.port;

const logStart = () => {
    logger.log(`App started`);
    logger.log(`* Under ${os.type()}(${os.version()})`);
}

exports.start = () => {
    logStart();
    serverFactory.getServer().listen(port);
    logger.log(`* Listen to port: ${port}`);
}