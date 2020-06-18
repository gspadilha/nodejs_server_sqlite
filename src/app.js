/*jslint node: true */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();

app.use(compression());

app.use(bodyParser.json(
    { limit: '5mb' }
));

app.use(bodyParser.urlencoded({
    extended: false
}));

// CORS
app.use((req, res, next) => {
    // libera qualquer url a acessar
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-user, x-access-pass, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth-route');
const usuariosRoute = require('./routes/usuarios-route');
const produtosRoute = require('./routes/produtos-route');

app.use('/', indexRoute);
app.use('/login', authRoute);
app.use('/usuarios', usuariosRoute);
app.use('/produtos', produtosRoute);

module.exports = app;