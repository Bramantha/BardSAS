const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const Programme = require('../models/programme');

exports.viewHome = (req, res, next) => {
    res.render("university/univHome", {
        title: "University Admin Home | Student Application System"
    });
}

exports.viewProgramme = (req, res, next) => {
    let fetchPost;
    const postQuery = Programme.find();
    postQuery.then(documents => {
        fetchPost = documents;
        return Programme.count;
    }).then(count => {
        console.log(fetchPost)
        res.render("university/univRecordProgramme", {
            title: "University Admin Home | Student Application System",
            page: 'record',
            programmeList: fetchPost
        });
    }).catch(err => {
        req.flash('error', 'Cannot load Programme List, ' + err)
        res.render("university/univRecordProgramme", {
            title: "University Admin Home | Student Application System",
            page: 'record',
            programmeList: []
        });
    })
}
exports.addProgramme = (req, res, next) => {
    res.render("university/univAddProgramme", {
        title: "University Admin Record Programme | Student Application System"
    });
}

exports.reviewApplication = (req, res, next) => {
    res.render("university/univReviewApplication", {
        title: "University Admin Review Application | Student Application System"
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
    });

    programme.save()
    .then(result => {
        req.flash('success', 'Succesfully add data');
        res.redirect('/university/record');
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/university/program');
    })
}

// exports.doEditPorgramme = (req, res, next) => {
//     const programme = new Programme({
//         _id: req.body.id,
//         programmeName: req.body.programmeName,
//         description: req.body.description,
//         closingDate: req.body.closingDate,
//     });
//     console.log('programme update', programme, req.body)
//     Programme.updateOne({_id: req.params.id}, programme).then(result => {
//         console.log('result', result);
//         if(result.n > 0) {
//             req.flash('success', 'Succesfully edit data');
//             res.redirect('/university/record');
//         } else {
//             req.flash('error', 'Something went wrong, ');
//             res.redirect('/university/edit/' + req.params.id);
//         }
//     }).catch(err => {
//         req.flash('error', 'Something went wrong, ' + err);
//         res.redirect('/university/edit/' + req.params.id);
//     });
// }

exports.doDeleteProgramme = (req, res, next) => {
    Programme.deleteOne({_id: req.params.id})
    .then(result => {
        if(result.deleteCount > 0) {
            req.flash('success', 'Succesfully delete data');
            res.redirect('/university/record');
        } else {
            req.flash('error', 'Something went wrong, ');
            res.redirect('/university/record');
        }
    })
    .catch(err => {
        req.flash('error', 'Something went wrong, ' + err);
        res.redirect('/university/record');
    })
}