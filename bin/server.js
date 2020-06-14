/*jslint node: true */
'use strict';

const app = require('../src/app');
const debug = require('debug')('nodestr:server');
const http = require('http');

const port = normalizaPorta(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

console.log(`Servidor iniciado na porta ${port}`);

function normalizaPorta(value) {
    const port = parseInt(value);

    if (isNaN(port)) {
        return value;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}