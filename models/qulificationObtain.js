const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var qualificationObtainSchema = new mongoose.Schema({
    qualificationName: String,
    subjectName: String,
    grade: String,
    score: String,
    applicantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicant"
    }
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('QualificationObt', qualificationObtainSchema);