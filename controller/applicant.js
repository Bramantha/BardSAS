exports.viewHome = (req, res, next) => {
    res.render("applicant/applicantHome", {
        title: "Applicant Home | Student Application System"
    });
}

exports.applyProgramme = (req, res, next) => {
    res.render("applicant/applicantApplyProgramme", {
        title: "Applicant Apply Programme | Student Application System"
    });
}

exports.selectProgramme = (req, res, next) => {
    res.render("applicant/applicantSelectProgramme", {
        title: "Applicant Apply Programme | Student Application System"
    });
}