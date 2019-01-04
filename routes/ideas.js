const express = require('express');
const router = express.Router();

// User Model
const Idea = require('../models/Idea');


function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;


    return day + '/' + month + '/' + year;
}

/**
 * Idea Index Page GET
 */
router.get('/', (req, res) => {
    Idea.find({})
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
router.get('/add', (req, res) => {
    res.render('ideas/add');
});

/**
 * Add Idea POST
 */
router.post('/add', (req, res) => {

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
            details
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
router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        const {id, title, details} = idea;
        res.render('ideas/edit', {id, title, details});
    });

});


/**
 * Add Idea PUT
 */
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    Idea.remove({_id: req.params.id})
        .then(() => {
            req.flash('success_msg', 'Idea has been removed');
            res.redirect('/ideas');
        })
});

module.exports = router;