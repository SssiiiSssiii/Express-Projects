const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');

const app = express();

app.use(logger('short'));

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
    res.status(404).send('file not found!');
})

app.listen(3000);