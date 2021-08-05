const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const WholeSalerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    cnpj: {
        type: Number,
        required: true
    },
    stateRegistration: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        trim: true,

    },
    address: {
        streetName: {
            type: String,
            trim: true,
            required: true
        },
        streetNumber: {
            type: Number,

        },
        streetAddon: {
            type: String,
        },
        district: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        },
        state: {
            type: String,
            trim: true,
            required: true
        },
        zipCode: {
            type: Number,

        }
    },
    staff: [
        {
            name: {
                type: String,
                trim: true,
            },
            phone: {
                type: Number,

            }

        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Wholesaler = mongoose.model('wholesaler', WholeSalerSchema);
