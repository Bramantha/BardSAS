const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcryptjs = require('bcryptjs');
const Programme = require('../models/programme');
const University = require('../models/university');

exports.viewHome = (req, res, next) => {
    console.log(req.params.idAdmin)
    res.render("university/univHome", {
        title: "University Admin Home | Student Application System",
        idAdmin: req.params.idAdmin,
    });
}

exports.viewProgramme = (req, res, next) => {
    let idAdmin = req.params.idAdmin;
    University.find().then(docs => {
        let id;
        docs.forEach(function(doc) {
            console.log('foreach',doc)
            if (doc.users.includes(idAdmin)) {
                console.log('include',doc._id)
                id = doc._id
            }
        })
        return id;
    }).then(univId => {
        let fetchPost;
        const postQuery = Programme.find({universityID: univId});
        postQuery.then(documents => {
            fetchPost = documents;
            return Programme.count;
        }).then(count => {
            res.render("university/univRecordProgramme", {
                title: "University Admin Home | Student Application System",
                page: 'record',
                programmeList: fetchPost,
                idAdmin: idAdmin,
                idUniv: univId
            });
        }).catch(err => {
            req.flash('error', 'Cannot load Programme List, ' + err)
            res.render("university/univRecordProgramme", {
                title: "University Admin Home | Student Application System",
                page: 'record',
                programmeList: [],
                idAdmin: idAdmin,
                idUniv: univId
            });
        })
    }).catch(err => {
        req.flash('error', 'Cannot load Programme List, ' + err)
        res.render("university/univRecordProgramme", {
            title: "University Admin Home | Student Application System",
            page: 'record',
            programmeList: [],
            idAdmin: idAdmin,
            idUniv: univId
        });
    })
}
exports.addProgramme = (req, res, next) => {
    res.render("university/univAddProgramme", {
        title: "University Admin Record Programme | Student Application System",
        idAdmin: req.params.idAdmin,
        idUniv: req.params.idUniv
    });
}

exports.viewEditProgramme = (req, res, next) => {
    const id = req.params.idProgram;
    Programme.findById(id).then(post => {
        console.log('program', post)
        if(post) {
            res.render("university/univEditProgramme", {
                title: "University Admin Record Programme | Student Application System",
                idAdmin: req.params.idAdmin,
                programme: post,
                page: 'maintain'
            });
        } else {
            res.redirect('/university/' + req.params.idAdmin + '/record');
        }
    }).catch(err => {
        res.redirect('/university/' + req.params.idAdmin + '/record');
    })
}

exports.reviewApplication = (req, res, next) => {
    res.render("university/univReviewApplication", {
        title: "University Admin Review Application | Student Application System",
        idAdmin: req.params.idAdmin
    });
}

exports.listApplication = (req, res, next) => {
    res.render("university/univListApplication", {
        title: "University Admin Review Application | Student Application System"
    });
}

exports.changeStatus = (req, res, next) => {
    res.render("university/univChangeStatus", {
        title: "University Admin Review Application | Student Application System"
    });
}

exports.doAddProgramme = (req, res, next) => {
    const programme = new Programme({
        programmeName: req.body.programmeName,
        description: req.body.description,
        closingDate: req.body.closingDate,
        universityID: req.params.idUniv
    });

    programme.save()
    .then(result => {
        req.flash('success', 'Succesfully add data');
        res.redirect('/university/' + req.params.idAdmin + '/record');
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/university/' + req.params.idAdmin + '/' + req.params.idUniv + '/program');
    })
}

exports.doEditPorgramme = (req, res, next) => {
    console.log('programme update', req.body)
    Programme.updateOne({_id: req.params.idProgram}, {$set: {
        programmeName: req.body.programmeName,
        description: req.body.description,
        closingDate: req.body.closingDate
    }}).then(result => {
        console.log('result', result);
        if(result.n > 0) {
            req.flash('success', 'Succesfully edit data');
            res.redirect('/university/' + req.params.idAdmin + '/record');
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/university/' + req.params.idAdmin + '/edit/' + req.params.idProgram);
        }
    }).catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/university/' + req.params.idAdmin + '/edit/' + req.params.idProgram);
    });
}

exports.doDeletePorgramme = (req, res, next) => {
    Programme.deleteOne({_id: req.params.idProgram})
    .then(result => {
        if(result.deleteCount > 0) {
            req.flash('success', 'Succesfully delete data');
            res.redirect('/university/' + req.params.idAdmin + '/record');
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/university/' + req.params.idAdmin + '/record');
        }
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/university/' + req.params.idAdmin + '/record');
    })
}