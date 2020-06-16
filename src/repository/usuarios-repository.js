/*jslint node: true */
'use strict';

const model = require('../models/usuarios-model');

exports.usuarioExiste = async (dados) => {
    try {
        let data = await model.getUser(dados);
        if (data.QUANT > 0) {
            return true;
        }
    } catch (e) {
        console.log('error usuarioExiste:>> ', e);
    }

    return false;
};
