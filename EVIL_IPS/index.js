const express = require('express');
const app = express();

const EVIL_IPS = [
    "156.195.5.51",
    "10.20.30.40",
    "172.16.0.100",
    "200.100.50.25"
];

app.use(function (req, res, next) {
    if (EVIL_IPS.includes(req.ip)) return res.status(404).send('Not Allowed!');
    next();
});

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(3000);