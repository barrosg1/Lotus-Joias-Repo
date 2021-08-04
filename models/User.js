const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    role: {
        type: String,

    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tempPassword: {
        type: String,
        expires: 36

    },
    avatar: {
        type: String
    },
    notes: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {

    try {

        if (!this.isModified('password')) {
            next();
        }

        this.tempPassword = this.password;

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();

    } catch (error) {

        next(error);
    }
});


module.exports = User = mongoose.model('user', UserSchema);