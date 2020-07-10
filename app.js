const express = require('express');
var cors = require('cors');
var app = express();
const bodyParser = require('body-parser');
var contactRouter = require('./routes/contactRoute');
var groupRouter = require('./routes/groupRouter');
var authRouter = require('./routes/authRouter');
var smsRouter = require('./routes/smsRouter');

app.use(cors());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());



app.use('/api/contact',contactRouter);
app.use('/api/group',groupRouter);
app.use('/api/auth',authRouter);
app.use('/api/sms',smsRouter);

module.exports = app;