const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();


// User Model
const User = require('../models/User');


/**
 * Login Page
 */
router.get('/login', (req, res) => res.render('users/login'));

/**
 * Register Page
 */
router.get('/register', (req, res) => res.render('users/register'));


/**
 * Login Form POST
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

/**
 * Register Form POST
 */
router.post('/register', (req, res) => {

    let errors = [];

    const {name, email, password, password_confirm} = req.body;

    // Check required fields
    if (!name || !email || !password || !password_confirm) {
        errors.push({msg: 'Please fill in all fields'});
        res.redirect('/users/register')
    }

    if (password !== password_confirm) {
        errors.push({msg: 'Passwords do not match'});
    }

    if (req.body.password.length < 6) {
        errors.push({msg: 'Password must be least 6 characters'});
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors,
            name,
            email,
            password,
            password_confirm,
        });
    } else {
        // Validation passed
        User.findOne({email: email})
            .then(user => {
                if (user) {
                    // User exists
                    req.flash('error_msg', 'Email is already registered');
                    res.redirect('/users/register')
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;

                            // set password to hashed
                            newUser.password = hash;

                            // Save User
                            newUser.save()
                                .then(() => {
                                    req.flash('success_msg', 'You are now registered and can  log in');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    }
});

/**
 * Logout Handle
 */
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
});

module.exports = router;