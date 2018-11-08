const express = require('express');
const expressLayouts = require('express-ejs-layouts');


const app = express();
const port = 5000;


app.use(expressLayouts);

app.set('layout', 'layouts/layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //extension of views


// Index Route
app.get('/', (req, res) => {
    res.render('index', {title: 'Express'});
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});