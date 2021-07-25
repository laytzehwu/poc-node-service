/**
 * File logger is writting log message into local file
*/
const path = require('path');
const fs = require('fs');
const config = require('../../config');

const getLogsFilename = () => {
    const today = new Date();
    let month = today.getMonth() + ''; // Make it string at the first place
    month = month.length > 1 ? month : `0${month}`;
    let day = today.getDate() + ''; // Make it string at the first place
    day.length > 1 ? day : `0${day}`;
    return `${today.getFullYear()}-${month}-${day}.log`;
}

exports.messageLogged = (arg) => {
    const logPath = path.resolve(config.logsPath, `./${getLogsFilename()}`);
    let fd;
    try {
        fd = fs.openSync(logPath, 'a');
        fs.appendFileSync(fd, `${arg.message}\n`, 'utf8');
    } catch (e) {
        console.error(e);
    } finally {
        if (fd !== undefined) {
            fs.closeSync(fd);
        }
    }
}
