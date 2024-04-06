const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const express = require('express');
const app = express();
require('dotenv').config();


app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/users').then(() => { console.log('Connected!'); });

app.use('/users', userRouter);

app.listen(3000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
