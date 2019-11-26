const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    level: {
        type: Number,
        default: 0
    }
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);