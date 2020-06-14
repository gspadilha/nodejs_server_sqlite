/*jslint node: true */
'use strict';

const promise = require('bluebird');
const Validators = require('../plugins/validators');
const produtosModel = require('../models/produtos-model');
const produtos = new produtosModel();

exports.get = (req, res, next) => {
    produtos.getAll()
        .then(_produtos => {
            return _produtos.filter(x => {
                return parseInt(x.ativo) === 1;
            });
        })
        .then(_produtos => {
            res.status(201)
                .send({
                    produtos: _produtos
                });
        })
        .catch(getError(res));
};

exports.getById = (req, res, next) => {
    const id = req.params.id;

    produtos.getById(id)
        .then(_produto => {
            res.status(201)
                .send(_produto);
        })
        .catch(getError(res));
};

exports.post = (req, res, next) => {
    let validacao = new Validators();
    validacao.isRequired(req.body.nome, 'Nome: Campo Obrigatório');
    validacao.isRequired(req.body.preco, 'Preço: Campo Obrigatório');

    if (!validacao.isValid()) {
        res.status(400)
            .send(validacao.errors()).end();
        return;
    }

    const dados = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    produtos.insert(dados)
        .then(() => produtos.getLastInserted())
        .then(_produto => {
            res.status(201)
                .send({
                    message: 'Produto inserido com sucesso',
                    id: _produto.id
                });
        })
        .catch(getError(res));
};

exports.put = (req, res, next) => {
    const dados = {
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    };

    produtos.update(dados)
        .then(() => {
            res.status(200)
                .send({
                    message: 'Produto atualizado com sucesso',
                    id: req.params.id
                });
        })
        .catch(getError(res));
};

exports.delete = (req, res, next) => {
    produtos.tornaInativo(req.params.id)
        .then(() => {
            res.status(200)
                .send({
                    message: 'Produto deletado com sucesso',
                    id: req.params.id
                });
        })
        .catch(getError(res));
};

function getError(res) {
    return err => {
        if (JSON.stringify(err) !== '{}')
            res.status(400)
                .send({
                    message: 'Falha ao executar o comando'
                });
    };
}
