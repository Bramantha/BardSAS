const express = require('express');
const Programme = require('../models/programme');
const University = require('../models/university');
const Applicant = require('../models/applicant');
const Application = require('../models/application')
const QualificationObt = require('../models/qulificationObtain');
const Qualification = require('../models/qualification');

exports.viewHome = (req, res, next) => {
    res.render("applicant/applicantHome", {
        title: "Applicant Home | Student Application System"
    });
}

exports.viewProgramList = (req, res, next) => {
    let fetchPost;
    const postQuery = Programme.find();
    postQuery.then(documents => {
        fetchPost = documents;
        return Programme.count;
    }).then(count => {
        University.find().then(docs => {
            res.render("applicant/programList", {
                title: "Applicant Home | Student Application System",
                programme: fetchPost,
                university: docs
            });
        }).catch(err => {
            req.flash('error', 'Cannot load University List, ' + err)
            res.render("applicant/programList", {
                title: "Applicant Home | Student Application System",
                programme: fetchPost,
                university: []
            });
        })
    }).catch(err => {
        req.flash('error', 'Cannot load Programme List, ' + err)
        res.render("applicant/programList", {
            title: "Applicant Home | Student Application System",
            programme: [],
            university: []
        });
    })
}

exports.applyProgramme = (req, res, next) => {
    let fetchPost;
    const postQuery = Programme.find();
    postQuery.then(documents => {
        fetchPost = documents;
        return Programme.count;
    }).then(count => {
        University.find().then(docs => {
            res.render("applicant/applicantApplyProgramme", {
                title: "Applicant Apply Programme | Student Application System",
                programme: fetchPost,
                university: docs
            });
        }).catch(err => {
            req.flash('error', 'Cannot load University List, ' + err)
            res.render("applicant/applicantApplyProgramme", {
                title: "Applicant Apply Programme | Student Application System",
                programme: fetchPost,
                university: []
            });
        })
    }).catch(err => {
        req.flash('error', 'Cannot load Programme List, ' + err)
        res.render("applicant/applicantApplyProgramme", {
            title: "Applicant Apply Programme | Student Application System",
            programme: [],
            university: []
        });
    })
}

exports.viewProgram = (req, res, next) => {
    let fetchPost;
    const univId = req.params.idUniv
    const postQuery = Programme.find({universityID: univId});
    postQuery.then(documents => {
        fetchPost = documents;
        return Programme.count;
    }).then(count => {
        res.render("applicant/applicantProgram", {
            title: "Applicant Home | Student Application System",
            programme: fetchPost
        });
    }).catch(err => {
        req.flash('error', 'Cannot load Programme List, ' + err)
        res.render("applicant/applicantProgram", {
            title: "Applicant Home | Student Application System",
            programme: []
        });
    })
}

exports.selectProgramme = (req, res, next) => {
    let fetchPost;
    const programId = req.params.idProgram
    const applicantId = req.session.idUser
    const postQuery = Programme.findOne({_id: programId});
    postQuery.then(documents => {
        fetchPost = documents;
        return Programme.count;
    }).then(count => {
        Application.findOne({programID: programId, applicantID: applicantId}).then(docs => {
            console.log(applicantId)
            console.log(docs)
            res.render("applicant/applicantSelectProgramme", {
                title: "Applicant Apply Programme | Student Application System",
                program: fetchPost,
                application: docs,
                userId: applicantId
            });
        }).catch(err => {
            req.flash('error', 'Cannot load University List, ' + err)
            res.render("applicant/applicantSelectProgramme", {
                title: "Applicant Apply Programme | Student Application System",
                program: fetchPost,
                application: [],
                userId: applicantId
            });
        })
    }).catch(err => {
        req.flash('error', 'Cannot load Programme List, ' + err)
        res.render("applicant/applicantSelectProgramme", {
            title: "Applicant Apply Programme | Student Application System",
            program: [],
            application: [],
            userId: applicantId
        });
    })
}

exports.viewQualification = (req, res, next) => {
    let fetchPost;
    const postQuery = QualificationObt.find({applicantID: req.session.idUser});
    postQuery.then(documents => {
        fetchPost = documents;
        return Programme.count;
    }).then(count => {
        res.render("applicant/applicantQualification", {
            title: "Applicant Home | Student Application System",
            qualification: fetchPost,
            programId: req.params.idProgram
        });
    }).catch(err => {
        req.flash('error', 'Cannot load Programme List, ' + err)
        res.render("applicant/applicantQualification", {
            title: "Applicant Home | Student Application System",
            qualification: [],
            programId: req.params.idProgram
        });
    })
}

