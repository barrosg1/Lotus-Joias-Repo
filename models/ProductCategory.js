const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductCategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Category = mongoose.model('productCategory', ProductCategorySchema);
