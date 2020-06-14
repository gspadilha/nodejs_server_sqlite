class ProdutosModel {
    constructor() {
        const dao = require('./dao');
        this.dao = new dao();
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                preco REAL NOT NULL,
                ativo INTEGER
            )
        `;

        return this.dao.run(sql);

    }

    insert(dados) {
        const sql = `
            INSERT INTO produtos (nome, preco, ativo)
            VALUES (?, ?, 0)
        `;

        const { nome, preco } = dados;

        return this.dao.run(
            sql,
            [nome, preco]
        );
    }

    update(dados) {
        const sql = `
            UPDATE produtos 
            SET nome = ? 
            WHERE id = ?
        `;

        const { id, nome } = dados;

        return this.dao.run(
            sql,
            [nome, id]
        );
    }

    delete(id) {
        const sql = `
            DELETE FROM produtos
            WHERE id = ?
        `;

        return this.dao.run(
            sql,
            [id]
        );
    }

    getById(id) {
        const sql = `
            SELECT id, nome, ativo
            FROM produtos 
            WHERE id = ?
        `;

        return this.dao.get(
            sql,
            [id]
        );
    }

    getLastInserted() {
        const sql = `
            SELECT id
            FROM produtos 
            order by 1 desc
        `;

        return this.dao.get(sql);
    }

    getAll() {
        return this.dao.all(`SELECT id, nome, ativo FROM produtos`);
    }

    mudaStatus(status) {
        return `
            UPDATE produtos 
            SET ativo = ${status} 
            WHERE id = ?
        `;
    }

    tornaAtivo(id) {
        return this.dao.run(
            mudaStatus(1),
            [id]
        );
    }

    tornaInativo(id) {
        return this.dao.run(
            mudaStatus(0),
            [id]
        );
    }
}

module.exports = ProdutosModel;