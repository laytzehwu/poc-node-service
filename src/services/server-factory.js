
const http = require('http');

const logger = require('./logger');
const { userService, UserService } = require('./users');

exports.getServer = () => {
    return http.createServer(async (req, res) => {
        logger.log(`${req.method} ${req.url}`);
        if (req.url.startsWith(UserService.BASE_PATH)) {
            userService.handleRequest(req, res);
            return;
        }
        res.end();
    });
}