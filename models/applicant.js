const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var applicantSchema = new mongoose.Schema({
    IDType: String,
    IDNumber: String,
    mobileNo: String,
    dateOfBirth: Date,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Applicant', applicantSchema);