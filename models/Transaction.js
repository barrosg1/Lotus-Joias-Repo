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

    },
    items: [TransactionItem],


}, {
    timestamps: true
});

TransactionSchema.pre('save', function (next) {

    this.amountDue = this.transactionTotal - this.totalAmountPaid;

    next();
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
