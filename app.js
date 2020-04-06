const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


const flash = require('connect-flash');
const session = require('express-session');


const app = express();

// Passport config
require('./config/passport')(passport);


// DB Config
const db = require('./config/keys').MongoURI;


// BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Method override middleware
app.use(methodOverride('_method'));


// Views, Layout EJS
app.set('layout', 'layouts/layout');
app.set('view engine', 'ejs');

app.use(expressLayouts);

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    res.locals.user = req.user || null;

    next();
});

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`MongoDB Connected...`))
    .catch(err => console.log(err));

// Index Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome'
    });
});

// About Route
app.get('/about', (req, res) => {
    const title = 'About Page';
    res.render('about', {title});
});


// Use Routes
app.use('/ideas', require('./routes/ideas'));
app.use('/users', require('./routes/users'));


const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on port ${port}`));
