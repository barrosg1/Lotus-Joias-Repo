const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    wholesalePrice: {
        type: Number,
        required: true
    },
    retailPrice: {
        type: Number,
        required: true
    },
    wholesaler: {
        type: String,
        required: true
    },
    image: {
        type: String,

    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Product = mongoose.model('product', ProductSchema);
