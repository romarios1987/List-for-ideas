const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const {formatDate} = require('../config/helpers');


// User Model
const Idea = require('../models/Idea');

/**
 * Idea Index Page GET
 */
router.get('/', ensureAuthenticated, (req, res) => {
    Idea.find({user: req.user.id})
        .sort({date: 'desc'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas,
                formatDate
            });
        });
});

/**
 * Add Idea Form GET
 */
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
});

/**
 * Add Idea POST
 */
router.post('/add', ensureAuthenticated, (req, res) => {

    const {title, details} = req.body;
    const errors = [];

    // console.log(req.body);

    if (!title) {
        errors.push({msg: 'Please add title'})
    }
    if (details.trim().length < 1) {
        errors.push({msg: 'Please add Some Details'})
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors,
            title,
            details
        });

    } else {
        // Validation passed
        const newIdea = new Idea({
            title,
            details,
            user: req.user.id
        });

        // Save Idea
        newIdea.save()
            .then(() => {
                req.flash('success_msg', 'Idea has been added');
                res.redirect('/ideas');
            })
            .catch(err => console.log(err))
    }
});


/**
 * Edit Idea Form GET
 */
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        const {id, title, details} = idea;
        if (idea.user !== req.user.id) {
            req.flash('error_msg', 'No Authorized');
            res.redirect('/ideas')
        } else {
            res.render('ideas/edit', {id, title, details});
        }
    });

});


/**
 * Add Idea PUT
 */
router.put('/:id', ensureAuthenticated, (req, res) => {
    const {title, details} = req.body;

    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        // new values
        idea.title = title;
        idea.details = details;

        idea.save()
            .then(() => {
                req.flash('success_msg', 'Idea has been updated');
                res.redirect('/ideas');
            })
            .catch(err => console.log(err))
    })
    //res.send('PUT');
});


/**
 * Delete Idea DELETE
 */

router.delete('/:id', ensureAuthenticated, (req, res) => {
    Idea.remove({_id: req.params.id})
        .then(() => {
            req.flash('success_msg', 'Idea has been removed');
            res.redirect('/ideas');
        })
});

module.exports = router;