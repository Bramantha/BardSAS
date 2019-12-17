const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var qualificationSchema = new mongoose.Schema({
    qualificationName: String,
    minimumScore: Number,
    maximumScore: Number,
    resultCalcDesc: String,
    gradeList: String
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Qualification', qualificationSchema);