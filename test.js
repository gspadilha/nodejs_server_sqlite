// Baseado em https://stackabuse.com/a-sqlite-tutorial-with-node-js/
const promise = require('bluebird');
const AppDAO = require('./src/models/dao');
const produtosRepository = require('./src/models/produtos-model');

function main() {
    const dao = new AppDAO('./db/database.sqlite3');
    const produtoRepo = new produtosRepository(dao);

    const blogProjectData = { nome: 'Produção' };

    produtoRepo
        .insert(blogProjectData.nome)
        .catch((err) => {
            if (JSON.stringify(err) !== '{}')
                console.log('Error: ' + JSON.stringify(err));
        });

    /*produtoRepo.createTable()
        .then(() => produtoRepo.insert(blogProjectData.nome))
        .then(() => produtoRepo.getById(1))
        .then((project) => {
            console.log(`\nRetreived project from database`);
            console.log(`project id = ${project.id}`);
            console.log(`project nome = ${project.nome}`);
            return produtoRepo.getTasks(project.id);
        })
        .catch((err) => {
            console.log('Error: ', JSON.stringify(err));
        });*/

    /*produtoRepo.getById(1)
        .then((project) => {
            console.log(`\nRetreived produto from database`);
            console.log(`project id = ${project.id}`);
            console.log(`project nome = ${project.nome}`);
            return produtoRepo.getTasks(project.id);
        })
        .catch((err) => {
            console.log('Error: ', JSON.stringify(err));
        });*/

    produtoRepo
        .getByNome('ão')
        .then((tasks) => {
            // console.log('tasks :>> ', tasks);
            new promise((resolve, reject) => {
                tasks.forEach((task) => {
                    console.log('task :>> ', task);
                });
            });
            resolve('success');
        })
        .catch((err) => {
            if (JSON.stringify(err) !== '{}')
                console.log('Error: ' + JSON.stringify(err));
        });
}

main();