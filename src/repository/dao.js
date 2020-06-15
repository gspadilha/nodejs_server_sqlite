/*jslint node: true */
'use strict';

const sqlite3 = require('sqlite3').verbose();
const promise = require('bluebird');

const dbFilePath = './db/database.sqlite3';

const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
        console.log('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

exports.run = async (sql, params = []) => {
    return new promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err) {
                console.log(`Erro no sql: ${sql}`);
                console.log(err);
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

exports.get = (sql, params = []) => {
    return new promise((resolve, reject) => {
        db.get(sql, params, (err, result) => {
            if (err) {
                console.log(`Erro no sql: ${sql}`);
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.all = (sql, params = []) => {
    return new promise((resolve, reject) => {
        db.all(sql, params, (err, results) => {
            if (err) {
                console.log(`Erro no sql: ${sql}`);
                console.log(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
