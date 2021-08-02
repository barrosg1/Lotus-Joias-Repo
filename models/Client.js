const mongoose = require('mongoose');
const Transaction = require('./Transaction').schema;

const ClientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,

    },
    notes: {
        type: String
    },
    social: {
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Client = mongoose.model('client', ClientSchema);