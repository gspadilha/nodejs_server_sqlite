/*jslint node: true */
'use strict';

const promise = require('bluebird');
const produtosModel = require('../models/produtos-model');

exports.post = (req, res, next) => {
    console.log('req :>> ', req);
    const dados = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    const produtoRepository = new produtosModel();
    produtoRepository
        .insert(dados)
        .then(() => produtoRepository.getLastInserted())
        .then((produto) => {
            res.status(201).send({ message: 'Produto inserido com sucesso', id: produto.id });
        })
        .catch(err => {
            if (JSON.stringify(err) !== '{}')
                res.status(400).send({ message: 'Falha ao inserir' });
        });
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};