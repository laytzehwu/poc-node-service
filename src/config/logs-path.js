/**
 * Ensure log path existed
 */

const fs = require('fs');
const path = require('path');
const rootPath = require('./root-path');
const logsDirPath = path.resolve(rootPath, './logs');
try {
    if (!fs.existsSync(logsDirPath)) {
        // Logs folder is not existed
        // Create the folder 
        fs.mkdirSync(logsDirPath, {mode: 0o777});
    }
} catch (e) {
    console.error('Error occur when initiate logs folder');
    console.log(e);
}

module.exports = logsDirPath;
