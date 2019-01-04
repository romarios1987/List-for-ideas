const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();


// User Model
const User = require('../models/User');


// Login Page
router.get('/login', (req, res) => res.render('users/login'));

// Register Page
router.get('/register', (req, res) => res.render('users/register'));



// Login Form POST
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect:'/ideas',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req, res, next);
// });


// Register Form POST
router.post('/register', (req, res) => {


        let errors = [];

        if(req.body.password !== req.body.password_confirm){
            errors.push({text:'Passwords do not match'});
        }

        if(req.body.password.length < 4){
            errors.push({text:'Password must be least 4 characters'});
        }

        if(errors.length > 0){
            res.render('users/register',{
                errors:errors,
                name:req.body.name,
                email:req.body.email,
                password: req.body.password,
                password_confirm: req.body.password_confirm,
                sss: console.log(errors)
            });

        }else {
            res.send('passed');
        }




        // if(req.body.password.length < 6){
        //     this.errors.res.body.password = {msg: 'Password must be least 6 characters'}
        // }


        // res.render('users/register', {
        //     data: {
        //         name: req.body.name,
        //         email: req.body.email
        //     },
        //     errors: {
        //         name: {
        //             msg: 'A name is required'
        //         },
        //         email: {
        //             msg: 'That email doesn‘t look right'
        //         }
        //     }
        //
        // })


        //console.log(req.body);
        // let errors = [];

        // if (req.body.password !== req.body.password_confirm) {
        //     this.errors.name = 'Passwords do not match'
        // }

        // if (req.body.password.length < 6) {
        //     errors.push({text: 'Password must be least 6 characters'})
        // }
// if (errors.length > 0) {
//             res.render('users/register', {
//                 name: req.body.name,
//                 errors: this.errors,
//             });
        // }else {
        //     res.send('passed')
        // }

        // let errors = [];
        //
        // if (req.body.password !== req.body.password2) {
        //     errors.push({text: 'Passwords do not match'})
        // }
        // if (req.body.password.length < 6) {
        //     errors.push({text: 'Password must be least 6 characters'})
        // }
        //
        // if (errors.length > 0) {
        //     res.render('users/register', {
        //         errors: errors,
        //         name: req.body.name,
        //         email: req.body.email,
        //         password: req.body.password,
        //         password2: req.body.password2
        //     });
        // } else {
        //     User.findOne({email: req.body.email})
        //         .then(user => {
        //             if (user) {
        //                 req.flash('error_msg', 'Email already registered');
        //                 res.redirect('/users/register')
        //             } else {
        //                 const newUser = new User({
        //                     name: req.body.name,
        //                     email: req.body.email,
        //                     password: req.body.password
        //                 });
        //                 bcrypt.genSalt(10, (err, salt) => {
        //                     bcrypt.hash(newUser.password, salt, (err, hash) => {
        //                         if (err) throw err;
        //                         newUser.password = hash;
        //                         newUser.save()
        //                             .then(user => {
        //                                 req.flash('success_msg', 'You are now registered and can log in');
        //                                 res.redirect('/users/login');
        //                             })
        //                             .catch(err => {
        //                                 console.log(err);
        //                                 return;
        //                             });
        //                     });
        //                 })
        //             }
        //         });
        // }
    }
);

module.exports = router;