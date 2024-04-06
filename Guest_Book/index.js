const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

let entries = [];
app.locals.entries = entries;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));


//Home Page
app.get('/', (req, res) => {
    res.render("index");
})

app.get('/new-entry', (req, res) => {
    res.render("new-entry");
});

app.post('/new-entry', (req, res) => {
    if (!req.body.body || !req.body.title)
        return res.status(400).send("Entries must have a title and a body.");

    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });

    res.redirect('/');
});

// NOT FOUND Page;
app.use((req, res) => {
    res.status(400).render('404');
})

http.createServer(app).listen(process.env.PORT);
