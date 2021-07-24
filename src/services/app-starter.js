/**
 * App start service provides required logic when the app is being started 
*/
const os = require('os');
const logger = require('./logger');

exports.logStart = () => {
    logger.log(`App started ${new Date().toISOString()}`);
    logger.log(`* Under ${os.type()}(${os.version()})`);
    logger.log(os.userInfo());
}
