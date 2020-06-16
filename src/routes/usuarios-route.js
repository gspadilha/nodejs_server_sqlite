/*jslint node: true */
'use strict';

const router = require('express').Router();
const controller = require('../controllers/usuarios-controller');

router.post('/authenticate', controller.authenticate);

module.exports = router;