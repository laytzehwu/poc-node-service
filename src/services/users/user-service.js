
const fs = require('fs');
const path = require('path');

class UserService {

    static BASE_PATH = '/user';

    getAllUser() {
        let rawdata = fs.readFileSync(path.resolve(__dirname, './data.json'));
        return JSON.parse(rawdata);
    }

    getSubPath(path) {
        return path.replace(UserService.BASE_PATH, '');
    }

    parseUsers(users, res) {
        if (users.length > 0) {
            res.writeHead(200);
            res.write(JSON.stringify(users));
        } else {
            res.writeHead(404);
        }
        res.end();
    }

    handleGet(req, res) {
        let subPath = this.getSubPath(req.url);
        switch(subPath) {
            case '':
            case '/':
                this.parseUsers(this.getAllUser(), res);
                break;
            case '/female':
                this.parseUsers(this.getAllUser().filter(user => user.gender === 'female'), res);
                break;
            case '/male':
                this.parseUsers(this.getAllUser().filter(user => user.gender === 'male'), res);
                break;
            default:
                if (subPath.match(/\/search\/.*/g)) {
                    const key = decodeURI(subPath.slice(8)).toLowerCase();
                    const matchedUsers = this.getAllUser().filter(user => user.gender === key || 
                        user.name.toLowerCase().indexOf(key) >= 0);
                    this.parseUsers(matchedUsers, res);
                } else {
                    res.writeHead(404);
                    res.end();
                }
                break;
        }
    }

    handleRequest(req, res) {
        switch(req.method) {
            case 'GET':
                this.handleGet(req, res);
                break;
            default:
                res.writeHead(404);
                res.end();
                break;
        }
    }
}

module.exports = UserService;
