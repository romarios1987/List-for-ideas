const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Idea Modal
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea Index Page
router.get('/', (req, res) => {
    Idea.find({})
        .sort({date: 'desc'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

// Add Idea Form
router.get('/add', (req, res) => {
    res.render('ideas/add');
});

// Edit Idea Form
router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            res.render('ideas/edit', {idea: idea});
        });

});


// Add Form Process
router.post('/', (req, res) => {

    let errors = [];

    if (!req.body.title) {
        errors.push({text: 'Please add title'})
    }

    if (!req.body.details) {
        errors.push({text: 'Please add some details'})
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details,
        })
    } else {
        // saving idea to mongoDb
        const newUser = {
            title: req.body.title,
            details: req.body.details
        };
        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash('success_msg', 'Idea has been added');
                res.redirect('/ideas');
            })
            .catch(err => console.log(err));
    }

    // console.log(req.body);
    // res.send('OK');
});


// Edit Form Process
router.put('/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
        .then(idea => {
            // new values
            idea.title = req.body.title;
            idea.details = req.body.details;

            idea.save()
                .then(idea => {
                    req.flash('success_msg', 'Idea has been updated');
                    res.redirect('/ideas');
                })
        })
    //res.send('PUT');
});


// Delete Idea Process
router.delete('/:id', (req, res) => {
    Idea.remove({_id: req.params.id})
        .then(() => {
            req.flash('success_msg', 'Idea has been removed');
            res.redirect('/ideas');
        })
});


module.exports = router;