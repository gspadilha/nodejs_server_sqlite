/*jslint node: true */
'use strict';

const debug = require('debug')('nodestr:server');
const http = require('http');
const app = require('../src/app');

const port = normalizaPorta(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);
server.on('listening', onListening);
server.listen(port);

console.log(`Servidor iniciado na porta ${port}`);
setInterval(() => {
    console.log(`Servidor rodando na porta ${port}`);
}, 5000);

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