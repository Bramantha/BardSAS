const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const Qualification = require('../models/qualification');
const University = require('../models/university');
const User = require('../models/user');

exports.viewHome = (req, res, next) => {
    res.render("sas/sasHome", {
        title: "SAS Home | Student Application System"
    });
}

exports.viewMaintain = (req, res, next) => {
    let fetchPost;
    const postQuery = Qualification.find();
    postQuery.then(documents => {
        fetchPost = documents;
        return Qualification.count;
    }).then(count => {
        res.render("sas/sasMaintain", {
            title: "SAS Maintain Qualification | Student Application System",
            page: 'maintain',
            qualificationList: fetchPost
        });
    }).catch(err => {
        req.flash('error', 'Cannot load Qualification List, ' + err)
        res.render("sas/sasMaintain", {
            title: "SAS Maintain Qualification | Student Application System",
            page: 'maintain',
            qualificationList: []
        });
    })
    
}

exports.addQualification = (req, res, next) => {
    res.render("sas/sasAddQualification", {
        title: "SAS Maintain Qualification | Student Application System"
    });
}

exports.editQualification = (req, res, next) => {
    const id = req.params.id;
    Qualification.findById(id).then(post => {
        if(post) {
            res.render("sas/sasEditQualification", {
                title: "SAS Maintain Qualification | Student Application System",
                qualification: post,
                page: 'maintain'
            });
        } else {
            res.render("sas/sasEditQualification", {
                title: "SAS Maintain Qualification | Student Application System",
                qualification: null,
                page: 'maintain'
            });
        }
    }).catch(err => {
        res.render("sas/sasEditQualification", {
            title: "SAS Maintain Qualification | Student Application System",
            qualification: null,
            page: 'maintain'
        });
    })
}

exports.registerUniversity = (req, res, next) => {
    let fetchPost;
    const postQuery = University.find();
    postQuery.then(documents => {
        fetchPost = documents;
        return University.count;
    }).then(count => {
        res.render("sas/sasRegisterUniversity", {
            title: "SAS Register University | Student Application System",
            page: 'university',
            universityList: fetchPost
        });
    }).catch(err => {
        req.flash('error', 'Cannot load University List, ' + err)
        res.render("sas/sasMaintain", {
            title: "SAS Register University | Student Application System",
            page: 'university',
            universityList: []
        });
    })
}

exports.addNewUniversity = (req, res, next) => {
    res.render("sas/sasAddUniversity", {
        title: "SAS Register University | Student Application System",
        univId: req.params.id
    });
}

exports.viewAdminList = (req, res, next) => {
    University.findById(req.params.id).populate("users").exec(function(err, result) {
        if(err || !result) {
            req.flash('error', 'Something went wrong, ' + err);
            res.render("sas/sasListAdmin", {
                title: "SAS Register University | Student Application System",
                page: 'university',
                adminList: [],
                univId: req.params.id
            }); 
        } else {
            res.render("sas/sasListAdmin", {
                title: "SAS Register University | Student Application System",
                page: 'university',
                adminList: result,
                univId: req.params.id
            });
        }
    });
}

exports.doAddQualification = (req, res, next) => {
    const qualification = new Qualification({
        qualificationName: req.body.qualificationName,
        minimumScore: req.body.minimumScore,
        maximumScore: req.body.maximumScore,
        resultCalcDesc: req.body.resultCalcDesc,
        gradeList: req.body.gradeList
    });

    qualification.save()
    .then(result => {
        req.flash('success', 'Succesfully add data');
        res.redirect('/sas/maintain');
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/sas/add');
    })
}

exports.doEditQualification = (req, res, next) => {
    const qualification = new Qualification({
        _id: req.body.id,
        qualificationName: req.body.qualificationName,
        minimumScore: req.body.minimumScore,
        maximumScore: req.body.maximumScore,
        resultCalcDesc: req.body.resultCalcDesc,
        gradeList: req.body.gradeList
    });
    console.log('qualification update', qualification, req.body)
    Qualification.updateOne({_id: req.params.id}, qualification).then(result => {
        console.log('result', result);
        if(result.n > 0) {
            req.flash('success', 'Succesfully edit data');
            res.redirect('/sas/maintain');
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/sas/edit/' + req.params.id);
        }
    }).catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/sas/edit/' + req.params.id);
    });
}

exports.doDeleteQualification = (req, res, next) => {
    Qualification.deleteOne({_id: req.params.id})
    .then(result => {
        if(result.deleteCount > 0) {
            req.flash('success', 'Succesfully delete data');
            res.redirect('/sas/maintain');
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/sas/maintain');
        }
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/sas/maintain');
    })
}

exports.doAddUniversity = (req, res, next) => {
    const university = new University({
        universityName: req.body.univName
    });

    university.save()
    .then(result => {
        req.flash('success', 'Succesfully add data');
        res.redirect('/sas/register');
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/sas/register');
    })
}

exports.doAddAdminUniversity = (req, res, next) => {
    University.findById(req.params.id, function(err, university) {
        if(err) {
            req.flash('error', 'Something went wrong, ' + err);
            res.redirect('/sas/new/' + req.params.id);
        } else {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        username: req.body.username,
                        password: hash,
                        name: req.body.name,
                        email: req.body.email,
                        level: 1
                    });

                    User.create(user, function(err, user) {
                        console.log('bikin admin', user)
                        if(err) {
                            req.flash('error', 'Something went wrong, ' + err);
                            res.redirect('/sas/new/' + req.params.id);
                        } else {
                            university.uniAdmin.push(user._id)
                            university.save()
                            console.log('tambah admin', university)
                            req.flash('success', 'Succesfully add data');
                            res.redirect('/sas/university/admin/' + university._id);
                        }
                    });
                });
        }
    });
}




