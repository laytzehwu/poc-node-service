
const http = require('http');

const logger = require('./logger');
const { userService, UserService } = require('./users');
const { transactionService, TransactionService } = require('./transactions');

exports.getServer = () => {
    return http.createServer(async (req, res) => {
        logger.log(`${req.method} ${req.url}`);
        
        if (req.url.startsWith(UserService.BASE_PATH)) {
            userService.handleRequest(req, res);
            return;
        }

        if (req.url.startsWith(TransactionService.BASE_PATH)) {
            transactionService.handleRequest(req, res);
            return;
        }
        res.end();
    });
}