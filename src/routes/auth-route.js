/*jslint node: true */
'use strict';

const router = require('express').Router();
const controller = require('../controllers/usuarios-controller');

router.post('/', controller.authenticate);

module.exports = router;