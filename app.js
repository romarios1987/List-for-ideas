const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Connect to mongoose
mongoose.connect('mongodb://Remi:remi111@ds153763.mlab.com:53763/list_ideas', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Load Idea Modal
require('./models/Idea');
const Idea = mongoose.model('ideas');


app.use(expressLayouts);

app.set('layout', 'layouts/layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //extension of views


// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Index Route
app.get('/', (req, res) => {
    res.render('index', {title: 'Welcome'});
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});

// Idea Index Page
app.get('/ideas', (req, res) => {
    Idea.find({})
        .sort({date: 'desc'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });

});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

// Process Form
app.post('/ideas', (req, res) => {

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
                res.redirect('/ideas');
            })
            .catch(err => console.log(err));
    }

    // console.log(req.body);
    // res.send('OK');
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});