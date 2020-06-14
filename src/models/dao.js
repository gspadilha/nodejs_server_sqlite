const sqlite3 = require('sqlite3').verbose();
const promise = require('bluebird');

class dao {
    constructor() {
        const dbFilePath = './db/database.sqlite3';
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log('Could not connect to database', err);
            } else {
                console.log('Connected to database');
            }
        });
    }

    run(sql, params = []) {
        return new promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log(`Error running sql ${sql}`);
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });
    }

    get(sql, params = []) {
        return new promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log(`Error running sql: ${sql}`);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    all(sql, params = []) {
        return new promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log(`Error running sql: ${sql}`);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = dao;