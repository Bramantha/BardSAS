const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var universitySchema = new mongoose.Schema({
    universityName: String,
    uniAdmin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }]
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('university', universitySchema);