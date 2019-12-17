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
    const postQuery = Programme.findOne({_id: programId});
    postQuery.then(documents => {
        fetchPost = documents;
        return Programme.count;
    }).then(count => {
        res.render("applicant/applicantSelectProgramme", {
            title: "Applicant Apply Programme | Student Application System",
            program: fetchPost
        });
    }).catch(err => {
        req.flash('error', 'Cannot load Programme List, ' + err)
        res.render("applicant/applicantSelectProgramme", {
            title: "Applicant Apply Programme | Student Application System",
            program: []
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

exports.addQualification = (req, res, next) => {
    let fetchPost;
    const postQuery = Qualification.find();
    postQuery.then(documents => {
        fetchPost = documents;
        return Programme.count;
    }).then(count => {
        res.render("applicant/addQualification", {
            title: "Applicant Home | Student Application System",
            qualification: fetchPost,
            programId: req.params.idProgram
        });
    }).catch(err => {
        req.flash('error', 'Cannot load Programme List, ' + err)
        res.render("applicant/addQualification", {
            title: "Applicant Home | Student Application System",
            qualification: [],
            programId: req.params.idProgram
        });
    })
}

exports.doAddQualification = (req, res, next) => {
    console.log('session', req.session.idUser)
    const qualification = new QualificationObt({
        qualificationName: req.body.qualificationName,
        subjectName: req.body.subjectName,
        grade: req.body.grade,
        score: req.body.score,
        applicantID: req.session.idUser
    });

    qualification.save()
    .then(result => {
        req.flash('success', 'Succesfully add data');
        res.redirect('/applicant/qualification/' + req.params.idProgram);
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/applicant/new-qualification/' + req.params.idProgram);
    })
}

exports.doAddApplication = (req, res, next) => {
    console.log('Session', req.session.idUser)
    Programme.findById(req.params.idProgram, function(err, program) {
        if(err) {
            console.log('Error Tambah Admin',err)
            req.flash('error', 'Something went wrong, ' + err);
            res.redirect('/applicant/apply/' + req.params.id);
        } else {
            const application = new Application({
                applicationDate: new Date(),
                status: 'NEW',
                qualificationObt: req.params.idQualification,
                applicantID: req.session.idUser
            });

            console.log('application', application)

            Application.create(application, function(err, app) {
                if(err) {
                    console.log('Error Tambah Admin 1', err)
                    req.flash('error', 'Something went wrong, ' + err);
                    res.redirect('/sas/new/' + req.params.id);
                } else {
                    console.log('Program Sebelum', program)
                    program.applicationID.push(app._id)
                    program.save()
                    console.log('Program Sesudah', program)
                    req.flash('success', 'Succesfully add data');
                    res.redirect('/applicant/apply/');
                }
            });
        }
    });
}