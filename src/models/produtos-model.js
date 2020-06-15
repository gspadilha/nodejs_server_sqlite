/*jslint node: true */
'use strict';

const dao = require('../repository/dao');

exports.createTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            ativo INTEGER
        )
    `;

    return await dao.run(sql);
};

exports.insert = async (dados) => {
    const sql = `
        INSERT INTO produtos (nome, preco, ativo)
        VALUES (?, ?, 1)
    `;

    const { nome, preco } = dados;

    let executed = await dao.run(sql, [nome, preco]);

    if (executed) {
        return this.getLastInserted();
    }

    return false;
};

exports.update = async (dados) => {
    const sql = `
        UPDATE produtos
        SET nome = ?,
            preco = ?
        WHERE id = ?
    `;

    const { id, nome, preco } = dados;

    return dao.run(sql, [nome, preco, id]);
};

exports.delete = async (id) => {
    const sql = `
        DELETE FROM produtos
        WHERE id = ?
    `;

    return dao.run(sql, [id]);
};

exports.getAll = async () => {
    const results = await dao.all(`SELECT id, nome, ativo FROM produtos`);
    return results;
};

exports.getById = async (id) => {
    const sql = `
        SELECT id, nome, ativo
        FROM produtos
        WHERE id = ?
    `;

    return await dao.get(sql, [id]);
};

exports.getLastInserted = async () => {
    const sql = `
        SELECT id
        FROM produtos
        order by 1 desc
    `;

    return dao.get(sql);
};

exports.mudaStatus = (status) => {
    return `
        UPDATE produtos
        SET ativo = ${status}
        WHERE id = ?
    `;
};

exports.tornaAtivo = async (id) => {
    return dao.run(this.mudaStatus(1), [id]);
};

exports.tornaInativo = async (id) => {
    return dao.run(this.mudaStatus(0), [id]);
};
