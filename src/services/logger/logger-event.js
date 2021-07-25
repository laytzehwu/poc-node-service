/**
 * Logger events provides event emitter and the log event name
*/
const EventEmitter = require('events');
const fileLogger = require('./file-logger');
const remoteLogger = require('./remote-logger');

const eventEmitter = new EventEmitter();
const MESSAGE_LOGGED = 'messageLogged';

eventEmitter.addListener(MESSAGE_LOGGED, fileLogger.messageLogged);
eventEmitter.addListener(MESSAGE_LOGGED, remoteLogger.messageLogged);

exports.MESSAGE_LOGGED = MESSAGE_LOGGED;
exports.emitter = eventEmitter;
