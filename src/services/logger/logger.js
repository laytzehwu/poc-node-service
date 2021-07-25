/**
 * Class Logger handling logging activities
*/
const EventEmitter = require('events');

const fileLogger = require('./file-logger');
const remoteLogger = require('./remote-logger');

class Logger extends EventEmitter {
    
    static MESSAGE_LOGGED = 'messageLogged';
    static instance;

    constructor() {
        super();
        this.addListener(Logger.MESSAGE_LOGGED, fileLogger.messageLogged);
        this.addListener(Logger.MESSAGE_LOGGED, remoteLogger.messageLogged);
    }

    formatLog(message) {
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
    
    log(message) {
        const messageString = this.formatLog(message);
        console.log(messageString);
        this.emit(Logger.MESSAGE_LOGGED, {type: 'log', message: messageString});
    }

    static getInstance() {
        if(!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
}

module.exports = Logger;