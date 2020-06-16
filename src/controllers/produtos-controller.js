/*jslint node: true */
'use strict';

const Validators = require('../plugins/validators');
const model = require('../models/produtos-model');

let validacao = new Validators();

function error(res) {
    return err => {
        if (JSON.stringify(err) !== '{}')
            res.status(400)
                .send({
                    message: 'Falha ao executar o comando'
                });
    };
}

function success(res, send, status) {
    status = status == undefined ? 200 : status;
    return res.status(status).send(send);
}

exports.get = async (req, res, next) => {
    const ativos = req.params.ativos;
    const inativos = req.params.inativos;

    try {
        let produtosAtivos = await model.getAll();
        return success(res, { produtos: produtosAtivos });
    } catch (e) {
        return error(res);
    }
};

exports.getById = async (req, res, next) => {
    const id = req.params.id;

    validacao.isRequired(id, 'Número do Registro: Campo Obrigatório');

    if (!validacao.isValid()) {
        res.status(400).send(validacao.errors()).end();
        return;
    }

    try {
        let result = await model.getById(id);
        return success(res, { produtos: result });
    } catch (e) {
        return error(res);
    }
};

exports.post = async (req, res, next) => {
    const dados = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    validacao.isRequired(dados.nome, 'Nome: Campo Obrigatório');
    validacao.isRequired(dados.preco, 'Preço: Campo Obrigatório');

    if (!validacao.isValid()) {
        res.status(400).send(validacao.errors()).end();
        return;
    }

    try {
        let result = await model.insert(dados);
        return success(res, {
            message: 'Produto inserido com sucesso',
            id: result.id
        }, 201);
    } catch (e) {
        return error(res);
    }
};

exports.put = async (req, res, next) => {
    const dados = {
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    };

    validacao.isRequired(dados.id, 'Número do Registro: Campo Obrigatório');
    validacao.isRequired(dados.nome, 'Nome: Campo Obrigatório');
    validacao.isRequired(dados.preco, 'Preço: Campo Obrigatório');

    if (!validacao.isValid()) {
        res.status(400).send(validacao.errors()).end();
        return;
    }

    try {
        let result = await model.update(dados);
        return success(res, {
            message: 'Produto atualizado com sucesso',
            id: req.params.id
        });
    } catch (e) {
        return error(res);
    }
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    validacao.isRequired(id, 'Número do Registro: Campo Obrigatório');

    if (!validacao.isValid()) {
        res.status(400).send(validacao.errors()).end();
        return;
    }

    try {
        let result = await model.tornaInativo(req.params.id);
        return success(res, {
            message: 'Produto deletado com sucesso',
            id: req.params.id
        });
    } catch (e) {
        return error(res);
    }
};
