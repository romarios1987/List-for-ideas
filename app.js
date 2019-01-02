const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const methodOverride = require('method-override');


//const flash = require('connect-flash');
//const expressValidator = require('express-validator');
//const session = require('express-session');

//const passport = require('passport');


const app = express();


// DB Config
const db = require('./config/keys').MongoURI;





// BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Views, Layout EJS
app.set('layout', 'layouts/layout');
app.set('view engine', 'ejs');

app.use(expressLayouts);

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));



// function compileEjsTemplate(name, template) {
//     const compiledTemplate = ejs.compile(template, {
//         client: true,
//         outputFunctionName: name
//     });
//     return function compileEjsTemplate(req, res, next) {
//         res.locals.compiledEjsTemplates = res.locals.compiledEjsTemplates || {};
//         res.locals.compiledEjsTemplates[name] = compiledTemplate.toString();
//         return next();
//     };
// }


// Passport config
//require('./config/passport')(passport);

// Map global promise - Get rid of warning
mongoose.Promise = global.Promise;


// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log(`MongoDB Connected...`))
    .catch(err => console.log(err));



// Load Idea model
//require('./models/Idea');
//const Idea = mongoose.model('ideas');


// Method override middleware
app.use(methodOverride('_method'));

// Express Session Middleware
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));

// app.use(session({
//     secret: 'keyboard cat',
//     resave: true,
//     saveUninitialized: true,
// }));


// Express Messages Middleware
// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//     res.locals.messages = require('express-messages')(req, res);
//     next();
// });


// Global variables
// app.use(function (req, res, next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });


// Express Validator Middleware
// app.use(expressValidator({
//     errorFormatter: function(param, msg, value) {
//         let namespace = param.split('.')
//             , root    = namespace.shift()
//             , formParam = root;
//
//         while(namespace.length) {
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return {
//             param : formParam,
//             msg   : msg,
//             value : value
//         };
//     }
// }));


//app.use(flash());


// Index Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome'
    });
});

// About Route
app.get('/about', (req, res) => {
    const title = 'About Page'
    res.render('about', {title});
});


// Use Routes
app.use('/ideas', require('./routes/ideas'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));