const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
//const { check, validationResult } = require('express-validator/check');


// // Load Idea Modal
// require('../models/Idea');
// const Idea = mongoose.model('ideas');

// User Model
const Idea = require('../models/Idea');


// Idea Index Page GET
router.get('/', (req, res) => {
    Idea.find({})
        .sort({date: 'desc'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

// Add Idea Form GET
router.get('/add', (req, res) => {
    res.render('ideas/add');
});

// Add Idea POST
router.post('/add', (req, res) => {

    const {title, details} = req.body;
    const errors = [];

    console.log(req.body);

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

        // Save User
        newIdea.save()
            .then(() => {
                res.redirect('/ideas');
            })
            .catch(err => console.log(err))
    }
});

// Edit Idea Form
// router.get('/edit/:id', (req, res) => {
//     Idea.findOne({
//         _id: req.params.id
//     })
//         .then(idea => {
//             res.render('ideas/edit', {idea: idea});
//         });
//
// });


// Add Form Process

// router.post('/add',
//     [
//         check('title').isLength({min: 1}).trim().withMessage('Title required'),
//         check('details').isLength({min: 1}).trim().withMessage('details required')
//     ],
//     (req, res, next) => {
//
//         let article = new Idea(req.body);
//
//
//
//         const errors = validationResult(req);
//         console.log(errors);
//
//         if (!errors.isEmpty()) {
//            // console.log(errors);
//             res.render('ideas/add',
//                 {
//                     article: article,
//                     errors: errors.mapped()
//                 });
//         }
//         else {
//             article.save()
//                 .then(() => {
//                     req.flash('info', 'Idea has been added');
//                     res.redirect('ideas/add');
//                 })
//                 .catch(err => console.log(err));
//         }
//     });


// router.post('/', (req, res) => {
//
//     new Idea(req.body).save()
//         .then(() => {
//             req.flash('info', 'Idea has been added');
//             res.redirect('/ideas');
//         })
//         .catch(err => console.log(err));
//         // .catch(() => {
//         //     res.status(400).send("unable to save to database");
//         // });
//
//     //let errors = [];
//
//     // if (!req.body.title) {
//     //     errors.push({text: 'Please add title'})
//     // }
//     //
//     // if (!req.body.details) {
//     //     errors.push({text: 'Please add some details'})
//     // }
//
//     // if (errors.length > 0) {
//     //     res.render('ideas/add', {
//     //         errors: errors,
//     //         title: req.body.title,
//     //         details: req.body.details,
//     //     })
//     // } else {
//         // saving idea to mongoDb
//
//         // Idea.title =  req.body.title;
//         // Idea.details = req.body.details;
//         //
//         // Idea.save(function(err){
//         //     if(err){
//         //         console.log(err);
//         //         return;
//         //     }else {
//         //         req.flash('success', 'Idea has been added');
//         //         res.redirect('/ideas');
//         //     }
//         // })
//     // }
//
//     // console.log(req.body);
//     // res.send('OK');
// });


// Edit Form Process
// router.put('/:id', (req, res) => {
//     Idea.findOne({
//         _id: req.params.id
//     })
//         .then(idea => {
//             // new values
//             idea.title = req.body.title;
//             idea.details = req.body.details;
//
//             idea.save()
//                 .then((idea) => {
//                     req.flash('success_msg', 'Idea has been updated');
//                     res.redirect('/ideas');
//                 })
//         })
//     //res.send('PUT');
// });
//
//
// // Delete Idea Process
// router.delete('/:id', (req, res) => {
//     Idea.remove({_id: req.params.id})
//         .then(() => {
//             req.flash('success_msg', 'Idea has been removed');
//             res.redirect('/ideas');
//         })
// });


module.exports = router;