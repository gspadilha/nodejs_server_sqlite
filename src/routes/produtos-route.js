/*jslint node: true */
'use strict';

const router = require('express').Router();
const controller = require('../controllers/produtos-controller');
const auth = require('../services/auth-service');

router.get('/', auth.authorize, controller.get);
router.get('/:id', auth.authorize, controller.getById);
router.post('/', auth.authorize, controller.post);
router.put('/:id', auth.authorize, controller.put);
router.delete('/:id', auth.authorize, controller.delete);

module.exports = router;