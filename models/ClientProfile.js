const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = require('./Transaction');

// Create Schema
const ClientProfileSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client'
    },
    transactions: [Transaction],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = ClientProfile = mongoose.model('clientProfile', ClientProfileSchema);
