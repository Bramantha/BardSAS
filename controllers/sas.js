const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcryptjs = require('bcryptjs');
const Qualification = require('../models/qualification');
const University = require('../models/university');
const User = require('../models/user');

exports.viewHome = (req, res, next) => {
    res.render("sas/sasHome", {
        title: "SAS Home | Student Application System"
    });
}

exports.viewRegisterUniversity = (req, res, next) => {
    res.render("sas/addUniversity", {
        title: "SAS Register University | Student Application System"
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

exports.editUniversity = (req, res, next) => {
    const id = req.params.id;
    University.findById(id).then(post => {
        if(post) {
            res.render("sas/sasEditUniversity", {
                title: "SAS Register University | Student Application System",
                university: post,
                page: 'university',
                univId: id
            });
        } else {
            res.render("sas/sasEditUniversity", {
                title: "SAS Register University | Student Application System",
                university: null,
                page: 'university',
                univId: id
            });
        }
    }).catch(err => {
        res.render("sas/sasEditUniversity", {
            title: "SAS Register University | Student Application System",
            university: null,
            page: 'university',
            univId: id
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
            console.log('err', err)
            req.flash('error', 'Something went wrong, ' + err);
            res.render("sas/sasListAdmin", {
                title: "SAS Register University | Student Application System",
                page: 'university',
                adminList: [],
                univId: req.params.id
            }); 
        } else {
            console.log('result', result)
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
    Qualification.updateOne({_id: req.params.id}, qualification).then(result => {
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
        res.redirect('/sas/addUniversity');
    })
}

exports.doEditUniversity = (req, res, next) => {
    University.updateOne({_id: req.params.id}, {$set: {"universityName": req.body.univName}}).then(result => {
        if(result.n > 0) {
            req.flash('success', 'Succesfully edit data');
            res.redirect('/sas/register');
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/sas/university/edit/' + req.params.id);
        }
    }).catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/sas/university/edit/' + req.params.id);
    });
}

exports.doDeleteUniversity = (req, res, next) => {
    University.deleteOne({_id: req.params.id})
    .then(result => {
        if(result.deleteCount > 0) {
            req.flash('success', 'Succesfully delete data');
            res.redirect('/sas/register');
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/sas/register');
        }
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/sas/register');
    })
}

exports.doAddAdminUniversity = (req, res, next) => {
    University.findById(req.params.id, function(err, university) {
        if(err) {
            console.log('Error Tambah Admin',err)
            req.flash('error', 'Something went wrong, ' + err);
            res.redirect('/sas/new/' + req.params.id);
        } else {
            bcryptjs.hash(req.body.password, 10)
                .then(hash => {
                    const userInput = new User({
                        username: req.body.username,
                        password: hash,
                        name: req.body.name,
                        email: req.body.email,
                        level: 1
                    });

                    User.create(userInput, function(err, user) {
                        if(err) {
                            console.log('Error Tambah Admin 1', err)
                            req.flash('error', 'Something went wrong, ' + err);
                            res.redirect('/sas/new/' + req.params.id);
                        } else {
                            console.log('University Sebelum', university)
                            university.users.push(user._id)
                            university.save()
                            console.log('University Sesudah', university)
                            req.flash('success', 'Succesfully add data');
                            res.redirect('/sas/university/admin/' + university._id);
                        }
                    });
                });
        }
    });
}

exports.editAdminUniversity = (req, res, next) => {
    User.findById(req.params.idAdmin).then(post => {
        if(post) {
            res.render("sas/sasEditAdminUniversity", {
                title: "SAS Register University | Student Application System",
                users: post,
                page: 'university',
                univId: req.params.idUniv
            });
        } else {
            res.render("sas/sasEditAdminUniversity", {
                title: "SAS Register University | Student Application System",
                university: null,
                page: 'university',
                univId: req.params.idUniv
            });
        }
    }).catch(err => {
        res.render("sas/sasEditAdminUniversity", {
            title: "SAS Register University | Student Application System",
            university: null,
            page: 'university',
            univId: req.params.idUniv
        });
    })
}

exports.doEditAdminUniversity = (req, res, next) => {
    User.updateOne({_id: req.params.idAdmin}, {$set: {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email
    }}).then(result => {
        if(result.n > 0) {
            req.flash('success', 'Succesfully edit data');
            res.redirect('/sas/university/admin/' + req.params.idUniv);
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/sas/university/admin/edit/' + req.params.idAdmin + '/' + req.params.idUniv);
        }
    }).catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/sas/university/admin/edit/' + req.params.idAdmin + '/' + req.params.idUniv);
    });
}

exports.doDeleteAdminUniversity = (req, res, next) => {
    University.findById(req.params.idUniv, function(err, university) {
        if(err) {
            req.flash('error', 'Something went wrong, ' + err);
            res.redirect('/sas/university/admin/' + req.params.idUniv);
        } else {
            User.deleteOne({_id: req.params.idAdmin}, function(err, user) {
                if(err) {
                    req.flash('error', 'Something went wrong, ' + err);
                    res.redirect('/sas/university/admin/' + req.params.idUniv);
                } else {
                    let userIndex = university.users.indexOf(req.params.idAdmin)
                    university.users.splice(userIndex, 1)
                    university.save()
                    req.flash('success', 'Succesfully remove data');
                    res.redirect('/sas/university/admin/' + req.params.idUniv);
                }
            });
        }
    });
}