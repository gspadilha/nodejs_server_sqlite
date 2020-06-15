/*jslint node: true */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const indexRoute = require('./routes/index');
const produtosRoute = require('./routes/produtos-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/produtos', produtosRoute);

module.exports = app;