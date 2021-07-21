const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionItem = require('./TransactionItem').schema;

// Create Schema
const TransactionSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'client'
    },
    cwnerFirstName: {
        type: String,
        required: true
    },
    ownerLastName: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    transactionTotal: {
        type: Number,
        required: true
    },
    totalAmountPaid: {
        type: Number,
        required: true
    },
    amountDue: {
        type: Number,
        required: true
    },
    items: [TransactionItem],


}, {
    timestamps: true
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
