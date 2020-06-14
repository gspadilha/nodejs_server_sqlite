/*jslint node: true */
'use strict';

//const promise = require('bluebird');
const Validators = require('../plugins/validators');
//const produtosModel = require('../models/produtos-model');
//const produtos = new produtosModel();
const model = require('../models/produtos-model2');

exports.get = async (req, res, next) => {
    try {
        let results = await model.getAll();
        let produtosAtivos = await results.filter(result => {
            return parseInt(result.ativo) === 1;
        });
        return success(res, { produtos: produtosAtivos });
    } catch (e) {
        return error(res);
    }
};
/*exports.get = async (req, res, next) => {
    try {
        let results = await produtos.getAll();
        let produtosAtivos = await results.filter(result => {
            return parseInt(result.ativo) === 1;
        });
        return success(res, { produtos: produtosAtivos });
    } catch (e) {
        return error(res);
    }
};*/

exports.getById = (req, res, next) => {
    const id = req.params.id;

    produtos.getById(id)
        .then(_produto => {
            res.status(201)
                .send(_produto);
        })
        .catch(error(res));
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
        .then(_ => produtos.getLastInserted())
        .then(_produto => {
            res.status(201)
                .send({
                    message: 'Produto inserido com sucesso',
                    id: _produto.id
                });
        })
        .catch(error(res));
};

exports.put = (req, res, next) => {
    const dados = {
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    };

    produtos.update(dados)
        .then(_ => {
            res.status(200)
                .send({
                    message: 'Produto atualizado com sucesso',
                    id: req.params.id
                });
        })
        .catch(error(res));
};

exports.delete = (req, res, next) => {
    produtos.tornaInativo(req.params.id)
        .then(_ => {
            res.status(200)
                .send({
                    message: 'Produto deletado com sucesso',
                    id: req.params.id
                });
        })
        .catch(error(res));
};

function error(res) {
    return err => {
        if (JSON.stringify(err) !== '{}')
            res.status(400)
                .send({
                    message: 'Falha ao executar o comando'
                });
    };
}

function success(res, send) {
    return res.status(201).send(send);
}
