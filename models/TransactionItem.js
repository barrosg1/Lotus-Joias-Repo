const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TransactionItemSchema = new Schema({

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

module.exports = TransactionItem = mongoose.model('transactionItem', TransactionItemSchema);
