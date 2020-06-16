/*jslint node: true */
'use strict';

const config = require('../../configs/config');
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    try {
        let token = await jwt.sign(data, config.server.SALT_KEY, { expiresIn: '1d' });
        //console.log('data :>> ', data);
        //console.log('token :>> ', token);
        return token;
    } catch (e) {
        console.log('e :>> ', e);
    }
};

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, config.server.SALT_KEY);
    //console.log('data :>> ', data);
    //console.log('token :>> ', token);
    return data;
};

exports.authorize = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(403).json({
            message: 'Acesso proibido'
        });
    } else {
        jwt.verify(token, config.server.SALT_KEY, (error, decoded) => {
            //console.log('decoded :>> ', decoded);
            if (error) {
                res.status(401).json({
                    message: 'Não autorizado. Token inválido'
                });
            } else {
                next();
            }
        });
    }
};