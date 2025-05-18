const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    fullName: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: Boolean
    },
    city: {
        required: true,
        type: String
    }
});
module.exports = mongoose.model('user', UserSchema);