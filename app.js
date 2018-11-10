const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');


// Connect to mongoose
mongoose.connect('mongodb://Remi:remi111@ds153763.mlab.com:53763/list_ideas', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


app.use(expressLayouts);

app.set('layout', 'layouts/layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //extension of views


// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Method override middleware
app.use(methodOverride('_method'));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Index Route
app.get('/', (req, res) => {
    res.render('index', {title: 'Welcome'});
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});


// Use Routes
app.use('/ideas', ideas);
app.use('/users', users);


const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});