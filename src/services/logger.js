
const loggerEvent = require('./logger-event');

const formatLog = (message) => {
    let messageString;
    switch(typeof message) {
        case String:
            messageString = message;
            break;
        default:
            messageString = JSON.stringify(message);
            break;
    }
    return `${new Date().toISOString()} ${messageString}`;
}

exports.log = (message) => {
    const messageString = formatLog(message);
    console.log(messageString);
    loggerEvent.emitter.emit(loggerEvent.MESSAGE_LOGGED, {type: 'log', message: messageString});
};
