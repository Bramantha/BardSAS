const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.viewRegister = (req, res, next) => {
    res.render("student/registerPage", {
        title: "Sign Up | Student Application System"
    });
}

exports.doRegister = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash,
                name: req.body.name,
                email: req.body.email,
                level: 0
            });

            user.save()
                .then(result => {
                    req.flash('success', 'Congratulation, you successfuly register to SAS');
                    res.redirect('/signin');
                })
                .catch(err => {
                    req.flash('error', 'Something went wrong, ' + err);
                    res.redirect('/student/signup');
                })
        });
}
