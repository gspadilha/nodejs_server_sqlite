/*jslint node: true */
'use strict';

const Validators = require('../plugins/validators');
const repository = require('../repository/usuarios-repository');
const auth = require('../services/auth-service');

let validacao = new Validators();

function error(res) {
    return err => {
        if (JSON.stringify(err) !== '{}')
            res.status(400)
                .send({
                    message: 'Falha ao executar o comando'
                })
                .end();
    };
}

function success(res, send, status) {
    status = status == undefined ? 200 : status;
    return res.status(status).send(send);
}

exports.authenticate = async (req, res, next) => {
    const dados = {
        codigo: req.headers['x-access-user'],
        senha: req.headers['x-access-pass'],
    };

    validacao.isRequired(dados.codigo, 'Código: Campo Obrigatório');
    validacao.isRequired(dados.senha, 'Senha: Campo Obrigatório');

    if (!validacao.isValid()) {
        res.status(400).send(validacao.errors()).end();
        return;
    }

    try {
        let existe = await repository.usuarioExiste(dados);

        if (!existe) {
            res.status(401).send({ message: 'Acesso proibido' }).end();
            return;
        }

        if (existe) {
            const token = await auth.generateToken(dados);
            return success(res, { token });
        }

    } catch (e) {
        return error(res);
    }
};
