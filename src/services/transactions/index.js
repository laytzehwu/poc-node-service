
const TransactionService =require('./transactions-service');

const transactionService = new TransactionService();

exports.TransactionService = TransactionService;
exports.transactionService = transactionService;
