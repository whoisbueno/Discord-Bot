import('../src/structures/BaseClient').then(client => new client.BaseClient().connect());

process.on('unhandledRejection', error => { console.log(error); });