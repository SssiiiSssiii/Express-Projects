const express = require('express');
const app = express();
const router = require('./routes/router');
require('dotenv').config();

app.use(express.json());

app.use('/users', router);

app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})