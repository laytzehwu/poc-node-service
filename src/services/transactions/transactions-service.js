
const fs = require('fs');
const path = require('path');

const logger = require('../logger');

const DATA_PATH = path.resolve(__dirname, './data.txt');

class Transaction {
    constructor(txtLine) {
        [this.accFrom, this.accTo, this.amount] = txtLine.split(' ');
        this.amount = parseInt(this.amount);
    }
}

class Account {
    constructor() {
        this.acc = '';
        this.tranNo = 0;
        this.totalAmount = 0;
    }
}

class TransactionService {

    static BASE_PATH = '/transactions';

    getSubPath(path) {
        return path.replace(TransactionService.BASE_PATH, '');
    }

    readTransactionLines() {
        return fs.readFileSync(DATA_PATH, 'utf-8').split(/\r?\n/);
    }

    readTransaction() {
        return this.readTransactionLines().map((line) => new Transaction(line))
            .filter(transaction => transaction.accFrom !== transaction.accTo)
            .filter(transaction => transaction.amount > 0);
    }

    readAccount() {
        const arrAcc = [];
        const transArr = this.readTransactionLines()
            .map(line => line.split(' '))
            .filter(arrAttr => arrAttr[0] !== arrAttr[1])
            .filter(arrAttr => parseFloat(arrAttr[2]) > 0)
            .forEach(arrAttr => {
                const accFrom = arrAttr[0];
                let matchAcc = arrAcc.find(acc => acc.acc === accFrom);
                if (!matchAcc) {
                    matchAcc = new Account();
                    matchAcc.acc = accFrom;
                    arrAcc.push(matchAcc);
                }
                matchAcc.tranNo ++;
                matchAcc.totalAmount += parseFloat(arrAttr[2]);
            });
        return arrAcc.sort((a1, a2) => {
            if (a1.totalAmount > a2.totalAmount) return -1;
            if (a1.totalAmount < a2.totalAmount) return 1;
            return 0;
        });
    }

    handleGet(req, res) {
        let subPath = this.getSubPath(req.url);
        switch(subPath) {
            case '':
            case '/':
                res.writeHead(200);
                res.write(JSON.stringify(this.readTransaction()));
                res.end();
                break;
            case '/account':
                res.writeHead(200);
                res.write(JSON.stringify(this.readAccount()));
                res.end();
                break;
            default:
                res.writeHead(404);
                res.end();
                break;
        }
        res.end();
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

module.exports = TransactionService;
