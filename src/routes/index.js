/*jslint node: true */
'use strict';

const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node API',
        version: '0.0.2'
    });
});

module.exports = router;