/*jslint node: true */
'use strict';

const dao = require('../repository/dao');

exports.getUser = async (dados) => {
    const sql = `
        SELECT COUNT(*) QUANT
        FROM usuarios
        WHERE upper(codigo) = upper(?)
            AND upper(senha) = upper(?)
    `;

    const { codigo, senha } = dados;

    return await dao.get(sql, [codigo, senha]);
};
