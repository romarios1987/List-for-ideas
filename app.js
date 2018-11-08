const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Connect to mongoose
mongoose.connect('mongodb://Remi:remi111@ds147033.mlab.com:47033/facts', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Load Idea Modal
require('./models/Idea');
const Idea = mongoose.model('ideas');



app.use(expressLayouts);

app.set('layout', 'layouts/layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //extension of views


// Index Route
app.get('/', (req, res) => {
    res.render('index', {title: 'Welcome'});
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});