const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var programmeSchema = new mongoose.Schema({
    programmeName: String,
    description: String,
    closingDate: Date,
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('programme', programmeSchema);